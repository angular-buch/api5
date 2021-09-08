export function fakeBearerMiddleware(req, res, next) {
  const authToken = '1234567890';

  if (req.headers.authorization === `Bearer ${authToken}`) {
    res.locals.authorized = true;
  } else {
    res.locals.authorized = false;
  }

  next();
};

