import cookie from 'cookie';
const logout = (req, res) => {
  if (req.method === 'POST') {
    //deletes refresh token
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('refreshToken', '', {
        httpOnly: true,
        maxAge: 0,
        path: '/',
      })
    );
    res.status(200).send();
  }
};

export default logout;
