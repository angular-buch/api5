import { after, before, test } from 'node:test';
import assert from 'node:assert/strict';
import type { AddressInfo } from 'node:net';
import type { Server } from 'node:http';

import { MAX_BOOKS } from '../src/books-store.ts';
import { isPushServiceEndpoint } from '../src/notification-service.ts';
import { createApp } from '../src/server.ts';

let server: Server;
let base: string;

before(async () => {
  server = createApp().listen(0);
  await new Promise(resolve => server.once('listening', resolve));
  base = `http://localhost:${(server.address() as AddressInfo).port}`;
});

after(() => server.close());

const AUTH = { authorization: 'Bearer 1234567890' };
const json = (method: string, path: string, body: unknown, headers = {}) =>
  fetch(base + path, { method, headers: { 'content-type': 'application/json', ...headers }, body: JSON.stringify(body) });

test('lists public books, secure books only with the token', async () => {
  const books: { isbn: string; title: string }[] = await (await fetch(`${base}/books`)).json();
  assert.equal(books[0].isbn, '9783864909467');
  assert.ok(books.every(b => !b.title.startsWith('[SECURE]')));

  const all = await (await fetch(`${base}/books`, { headers: AUTH })).json();
  assert.ok(all[0].title.startsWith('[SECURE] '));
  assert.ok(all.length > books.length);
});

test('creates, updates and deletes a book', async () => {
  const created = await json('POST', '/books', { isbn: '978-1-11111-111-1', title: 'Test' });
  assert.equal(created.status, 201);
  assert.equal((await created.json()).isbn, '9781111111111');
  assert.equal((await json('POST', '/books', { isbn: '9781111111111', title: 'Test' })).status, 409);

  const updated = await json('PUT', '/books/9781111111111', { isbn: '9781111111111', title: 'Neu' });
  assert.equal((await updated.json()).title, 'Neu');

  assert.deepEqual(await (await fetch(`${base}/books/9781111111111`, { method: 'DELETE' })).json(), { success: true });
  assert.equal((await fetch(`${base}/books/9781111111111`)).status, 404);
});

test('searches case insensitive', async () => {
  const books = await (await fetch(`${base}/books/search/ANGULAR`)).json();
  assert.ok(books.length > 0);
});

test('rejects malformed notification subscriptions', async () => {
  assert.equal((await json('POST', '/notifications', { endpoint: 'x' })).status, 422);
});

test('accepts only browser push services as notification endpoints', async () => {
  const keys = { auth: 'a', p256dh: 'b' };
  for (const endpoint of ['http://fcm.googleapis.com/fcm/send/x', 'https://example.org/push', 'https://169.254.169.254/', 'https://fcm.googleapis.com.evil.org/x']) {
    assert.equal((await json('POST', '/notifications', { endpoint, keys })).status, 400, endpoint);
  }
});

test('push service endpoints', () => {
  assert.ok(isPushServiceEndpoint('https://fcm.googleapis.com/fcm/send/abc'));
  assert.ok(isPushServiceEndpoint('https://updates.push.services.mozilla.com/wpush/v2/abc'));
  assert.ok(isPushServiceEndpoint('https://web.push.apple.com/abc'));
  assert.ok(isPushServiceEndpoint('https://db5p.notify.windows.com/w/?token=abc'));
  assert.ok(!isPushServiceEndpoint('https://evilpush.apple.com.example.org/'));
  assert.ok(!isPushServiceEndpoint('not a url'));
});

test('refuses new books when the store is full', async () => {
  const { length } = await (await fetch(`${base}/books`, { headers: AUTH })).json();
  for (let i = length; i < MAX_BOOKS; i++) {
    assert.equal((await json('POST', '/books', { isbn: String(1_000_000 + i), title: 'x' })).status, 201);
  }
  assert.equal((await json('POST', '/books', { isbn: '42', title: 'x' })).status, 400);

  await fetch(`${base}/books`, { method: 'DELETE' });
  assert.equal((await json('POST', '/books', { isbn: '42', title: 'x' })).status, 201);
  await fetch(`${base}/books/42`, { method: 'DELETE' });
});

test('serves start page and Swagger UI', async () => {
  assert.match(await (await fetch(base)).text(), /BookMonkey 5 API/);
  assert.equal((await fetch(`${base}/swagger-ui/`)).status, 200);
});

test('documents every route in the generated OpenAPI spec', async () => {
  const spec = await (await fetch(`${base}/swagger.json`)).json();
  assert.equal(spec.openapi, '3.0.3');
  assert.deepEqual(Object.keys(spec.paths).toSorted(), [
    '/books', '/books/search/{searchTerm}', '/books/{isbn}', '/books/{isbn}/check', '/notifications'
  ]);
  assert.deepEqual(spec.components.schemas.Book.required, ['isbn', 'title']);
});
