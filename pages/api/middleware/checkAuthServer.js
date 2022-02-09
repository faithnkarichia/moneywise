import { verify } from 'jsonwebtoken';

const checkAuth = (handler) => {
  return async (req, res) => {
    try {
      // Check if authorization header exists in headers
      const authorization = req.headers['authorization'];
      if (!authorization) throw new Error('not authenticated');

      const token = authorization.split(' ')[1];
      verify(token, process.env.ACCESS_TOKEN_SECRET);

      return handler(req, res);
    } catch (e) {
      res.status(401).send();
    }
  };
};

export default checkAuth;
