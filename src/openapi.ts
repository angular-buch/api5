import { z } from 'zod';
import type { RequestHandler, Router } from 'express';

import { schemas } from './schemas.ts';

type Method = 'get' | 'post' | 'put' | 'delete';
type Handler = RequestHandler<Record<string, string>>;

interface Parameter {
  name: string;
  description: string;
  type: 'string' | 'number';
}

interface ResponseDoc {
  description: string;
  schema?: z.ZodType | { title: string; arrayOf: z.ZodType };
  content?: string;
}

export interface OperationDoc {
  tags: string[];
  summary: string;
  description?: string;
  parameters?: Parameter[];
  requestBody?: { name: string; description: string; schema: z.ZodType };
  responses: Record<string, ResponseDoc>;
  security?: Record<string, string[]>[];
}

export interface DocumentInfo {
  info: { version: string; title: string; description: string };
  tags: { name: string; description: string }[];
  securitySchemes: Record<string, unknown>;
}

/**
 * Collects the documented operations while the routes are registered, so that routes and
 * OpenAPI paths are always the same.
 */
export class OpenApiDocument {
  private paths: Record<string, Partial<Record<Method, OperationDoc>>> = {};
  private documentInfo: DocumentInfo;

  constructor(documentInfo: DocumentInfo) {
    this.documentInfo = documentInfo;
  }

  /**
   * Registers a handler on the router (mounted at basePath) and documents it.
   * Paths use OpenAPI syntax ("/{isbn}"); "" is the mount point itself.
   */
  route(router: Router, basePath: string, method: Method, path: string, doc: OperationDoc | null, handler: Handler) {
    router[method](toExpressPath(path) || '/', handler);
    if (doc) {
      this.document(basePath + path, method, doc);
    }
  }

  document(path: string, method: Method, doc: OperationDoc) {
    (this.paths[path] ??= {})[method] = doc;
  }

  toJSON(servers: string[]) {
    return {
      openapi: '3.0.3',
      info: this.documentInfo.info,
      servers: servers.map(url => ({ url })),
      tags: this.documentInfo.tags,
      paths: Object.fromEntries(Object.entries(this.paths).map(([path, operations]) => [
        path,
        Object.fromEntries(Object.entries(operations).map(([method, doc]) => [method, toOperation(doc)]))
      ])),
      components: {
        securitySchemes: this.documentInfo.securitySchemes,
        schemas: componentSchemas()
      }
    };
  }
}

function toExpressPath(path: string) {
  return path.replace(/\{(\w+)\}/g, ':$1');
}

function toOperation(doc: OperationDoc) {
  const operation: Record<string, unknown> = { tags: doc.tags, summary: doc.summary };
  if (doc.description) {
    operation.description = doc.description;
  }
  if (doc.parameters) {
    operation.parameters = doc.parameters.map(p => ({
      name: p.name,
      in: 'path',
      description: p.description,
      required: true,
      schema: { type: p.type }
    }));
  }
  if (doc.requestBody) {
    operation.requestBody = {
      description: doc.requestBody.description,
      required: true,
      content: { 'application/json': { schema: schemaRef(doc.requestBody.schema) } }
    };
    operation['x-codegen-request-body-name'] = doc.requestBody.name;
  }
  operation.responses = Object.fromEntries(Object.entries(doc.responses).map(([status, response]) => {
    const result: Record<string, unknown> = { description: response.description };
    if (response.schema) {
      result.content = { 'application/json': { schema: responseSchema(response.schema) } };
    }
    if (response.content) {
      result.content = { [response.content]: { schema: { type: 'string', format: 'binary' } } };
    }
    return [status, result];
  }));
  if (doc.security) {
    operation.security = doc.security;
  }
  return operation;
}

function responseSchema(schema: NonNullable<ResponseDoc['schema']>) {
  if ('arrayOf' in schema) {
    return { title: schema.title, type: 'array', items: schemaRef(schema.arrayOf) };
  }
  return schemaRef(schema);
}

function schemaRef(schema: z.ZodType) {
  const id = schemas.get(schema)?.id;
  if (!id) {
    throw new Error('Schema is not registered in schemas.ts');
  }
  return { $ref: `#/components/schemas/${id}` };
}

function componentSchemas() {
  const { schemas: result } = z.toJSONSchema(schemas, {
    target: 'openapi-3.0',
    uri: id => `#/components/schemas/${id}`
  }) as { schemas: Record<string, Record<string, unknown>> };

  for (const schema of Object.values(result)) {
    delete schema.$id;
    // the API ignores unknown properties, it does not reject them
    delete schema.additionalProperties;
  }
  return result;
}
