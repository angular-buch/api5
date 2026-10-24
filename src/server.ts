import cors from 'cors';
import express from 'express';
import type { NextFunction, Request, Response } from 'express';
import logger from 'morgan';
import swaggerUi from 'swagger-ui-express';

import { BooksStore } from './books-store.ts';
import { fakeBearerMiddleware } from './fake-bearer-middleware.ts';
import { NotificationService } from './notification-service.ts';
import { OpenApiDocument } from './openapi.ts';
import { PUBLIC_DIR } from './paths.ts';
import { BooksRoute } from './routes/books.ts';
import { IndexRoute } from './routes/index.ts';
import { NotificationsRoute } from './routes/notifications.ts';

const API_URL = 'https://api5.angular-buch.com';

export function createApp(): express.Express {
  const app = express();

  // indentation on json content
  app.set('json spaces', 2);

  app.use(express.static(PUBLIC_DIR, {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.ico')) {
        res.setHeader('Content-Type', 'image/x-icon');
      }
    }
  }));

  app.use(logger('dev'));

  app.use(cors({
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS']
  }));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  // handlers read fields from req.body, also for requests without a body
  app.use((req: Request, res: Response, next: NextFunction) => {
    req.body ??= {};
    next();
  });

  // Errors of the middlewares above (e.g. a malformed JSON body) are answered with 404.
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(404).type('text/plain').send(`${err.name}: ${err.message}`);
  });

  const doc = new OpenApiDocument({
    info: {
      version: '0.1.0',
      title: 'BookMonkey 5 API',
      description: '**DEMO**\n\nThis is a demo backend for serving books. All data is erased after some inactivity.'
    },
    tags: [
      { name: 'books', description: 'BookMonkey 5 books' },
      { name: 'notifications', description: 'Subscribe to BookMonkey Notifications' }
    ],
    securitySchemes: {
      ApiKeyAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: '**Use `Bearer 1234567890` as value!**'
      }
    }
  });

  const store = new BooksStore();
  const notificationService = new NotificationService();

  const booksRouter = express.Router();
  BooksRoute.create(booksRouter, store, notificationService, doc);

  const notificationsRouter = express.Router();
  NotificationsRoute.create(notificationsRouter, notificationService, doc);

  const router = express.Router();
  IndexRoute.create(router, doc);

  const development = app.get('env') === 'development';
  const openApi = doc.toJSON(development ? ['http://localhost:3000', API_URL] : [API_URL]);

  app.get('/swagger.json', (req, res) => res.json(openApi));
  app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(openApi, {
    explorer: false,
    customCss: `.swagger-ui .information-container {
        background: url(/images/monkey-thinking.svg) no-repeat scroll right top;
        background-size: contain;
      }`
  }));

  app.use('/book', fakeBearerMiddleware, booksRouter);
  app.use('/books', fakeBearerMiddleware, booksRouter);
  app.use('/notifications', notificationsRouter);
  app.use(router);

  return app;
}
