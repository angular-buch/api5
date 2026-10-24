import type { NextFunction, Request, Response } from 'express';

// INSECURE, demo only: a fixed, publicly documented token. It only toggles the visibility of the "secure" demo books.
export function fakeBearerMiddleware(req: Request, res: Response, next: NextFunction) {
  const authToken = '1234567890';

  if (req.headers.authorization === `Bearer ${authToken}`) {
    res.locals.authorized = true;
  } else {
    res.locals.authorized = false;
  }

  next();
};
