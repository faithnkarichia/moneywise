import prisma from '../../lib/prisma';
import * as bcrypt from 'bcryptjs';

import {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
} from '../../functions/auth';

const signin = async (req, res) => {
  if (req.method === 'POST') {
    const { email, password } = JSON.parse(req.body);
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(401).send({ error: 'Invalid credentials' });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).send({ error: 'Invalid credentials' });
    }

    const userForTheClient = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    const token = createRefreshToken(user);
    sendRefreshToken(res, token);
    const accessToken = createAccessToken(user);
    res.send({ user: userForTheClient, accessToken });
    // if (user.password === password) {
    //   const token = createRefreshToken(user);
    //   sendRefreshToken(res, token);
    //   const accessToken = createAccessToken(user);
    //   res.send({ user: userForTheClient, accessToken });
    // } else {
    //   res.status(404).send();
    // }
  }
};

export default signin;
