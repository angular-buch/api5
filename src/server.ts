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
import { GraphQLRoute } from './graphql/routes';
import { fakeBearerMiddleware } from './fake-bearer-middleware';

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

    this.app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(
      swaggerJson,
      false // show explorer
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

    let booksRouter = express.Router();
    BooksRoute.create(booksRouter, store)

    let graphQLRouter = express.Router();
    GraphQLRoute.create(graphQLRouter, store);

    let router = express.Router();
    IndexRoute.create(router);


    // use router middleware
    this.app.use('/book', booksRouter);
    this.app.use('/books', booksRouter);
    this.app.use('/secure/book', fakeBearerMiddleware, booksRouter);
    this.app.use('/secure/books', fakeBearerMiddleware, booksRouter);
    this.app.use('/graphql', graphQLRouter);
    this.app.use(router);
  }
}
