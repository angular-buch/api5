export function fakeBearerMiddleware(req, res, next) {

  const authToken = '1234567890';

  if (!req.headers.authorization) {
    return res.status(403).json(
      {
        error: 'No authorization header sent!',
        hint: `Please send the following header: 'Authorization: Bearer ${ authToken }' (without quotes)`
      });
  }

  if (req.headers.authorization !== `Bearer ${ authToken }`) {
    return res.status(403).json(
      {
        error: 'Wrong authorization header sent!',
        hint: `Please send exactly the following header: 'Authorization: Bearer ${ authToken }' (without quotes)`
      });
  }

  res.locals.authorized = true;

  next();
};

