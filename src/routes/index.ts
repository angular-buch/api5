import { NextFunction, Request, Response, Router } from 'express';
import { BaseRoute } from './route';
import * as fs from 'fs';
import * as path from 'path';

/**
 * / route
 *
 * @class IndexRoute
 */
export class IndexRoute extends BaseRoute {

  /**
   * Create the routes.
   *
   * @class IndexRoute
   * @method create
   * @static
   */
  public static create(router: Router) {
    const indexRoute = new IndexRoute();

    router.get('/', indexRoute.index.bind(indexRoute));
  }

  /**
   * Constructor
   *
   * @class IndexRoute
   * @constructor
   */
  constructor() {
    super();
  }

  /**
   * The home page route.
   *
   * @class IndexRoute
   * @method index
   * @param req {Request} The express Request object.
   * @param res {Response} The express Response object.
   * @next {NextFunction} Execute the next method.
   */
  public index(req: Request, res: Response, next: NextFunction) {

    this.title = 'BookMonkey 3 API';

    //set message
    let options: Object = {
      environment: req.app.get('env'),
      time: this.formatSeconds(process.uptime())
    };

    //render template
    this.render(req, res, 'index', options);
  }

  private formatSeconds(seconds) {
    const pad = function (s) {
      return (s < 10 ? '0' : '') + s;
    }
    const hours = Math.floor(seconds / (60 * 60));
    const minutes = Math.floor(seconds % (60 * 60) / 60);
    const secs = Math.floor(seconds % 60);

    return pad(hours) + ':' + pad(minutes) + ':' + pad(secs);
  }
}
