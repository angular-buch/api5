import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as logger from 'morgan';
import * as path from 'path';
import * as swaggerUi from 'swagger-ui-express';
import errorHandler = require('errorhandler');
import methodOverride = require('method-override');

import { IndexRoute } from './routes/index';
import { BooksStore } from './books-store';
import { BooksRoute } from './routes/books';
import { NotificationsRoute } from './routes/notifications';
import { GraphQLRoute } from './graphql/routes';
import { fakeBearerMiddleware } from './fake-bearer-middleware';
import { NotificationService } from './notification-service';

var fs = require('fs');

/**
 * The server.
 *
 * @class Server
 */
export class Server {

  public app: express.Application;

  /**
   * Bootstrap the application.
   *
   * @class Server
   * @method bootstrap
   * @static
   * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
   */
  public static bootstrap(): Server {
    return new Server();
  }

  /**
   * Constructor.
   *
   * @class Server
   * @constructor
   */
  constructor() {
    //create expressjs application
    this.app = express();

    //configure application
    this.config();

    //add routes
    this.routes();
  }

  /**
   * Configure application
   *
   * @class Server
   * @method config
   */
  public config() {
    //add static paths
    this.app.use(express.static(path.join(__dirname, "public")));

    //configure pug
    this.app.set("views", path.join(__dirname, "views"));
    this.app.set("view engine", "pug");

    //mount logger
    this.app.use(logger("dev"));

    //cors configuration
    this.app.use(cors({
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS']
    }));

    //mount json form parser
    this.app.use(bodyParser.json());

    //mount query string parser
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));

    //mount override?
    this.app.use(methodOverride());

    // catch 404 and forward to error handler
    this.app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
      err.status = 404;
      next(err);
    });

    //error handling
    this.app.use(errorHandler());

    let swaggerJson = {
      schemes: ''
    }

    // when serving from dist
    if (fs.existsSync('../public/swagger.json')) {
      swaggerJson = require('../public/swagger.json')
    }

    // when serving via watch
    if (fs.existsSync('./public/swagger.json')) {
        swaggerJson = require('./public/swagger.json')
    }

    if (this.app.get('env') === 'development') {
      swaggerJson.schemes = 'http'; // fixes JSON schema for localhost
    }

    const options = {
      explorer: false, // show explorer
      customCss: `.swagger-ui .information-container {
        background: url(/images/monkey-thinking.svg) no-repeat scroll right top;
        background-size: contain;
      }`
    }

    this.app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(
      swaggerJson,
      options
    ));
  }

  /**
   * Create and return Router.
   *
   * @class Server
   * @method config
   * @return void
   */
  private routes() {

    const store = new BooksStore();
    const notificationService = new NotificationService();

    const booksRouter = express.Router();
    BooksRoute.create(booksRouter, store, notificationService)

    const graphQLRouter = express.Router();
    GraphQLRoute.create(graphQLRouter, store);

    const notificationsRouter = express.Router();
    NotificationsRoute.create(notificationsRouter, notificationService)

    const router = express.Router();
    IndexRoute.create(router);


    // use router middleware
    this.app.use('/book', booksRouter);
    this.app.use('/books', booksRouter);
    this.app.use('/secure/book', fakeBearerMiddleware, booksRouter);
    this.app.use('/secure/books', fakeBearerMiddleware, booksRouter);
    this.app.use('/graphql', graphQLRouter);
    this.app.use('/notifications', notificationsRouter);
    this.app.use(router);
  }
}
