import prisma from '../../lib/prisma';
import * as bcrypt from 'bcryptjs'; //which i have used to encrypt the password

import {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken
} from '../../functions/auth';

const signin = async (req, res) => {
  if (req.method === 'POST') {
    // destructuring the body to get the email and password
    const { email, password } = JSON.parse(req.body);

    // Check if user exists in db
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });
    
    if (!user) {
      return res.status(401).send({ error: 'Invalid credentials' });
    }

    // Check if password is correct
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).send({ error: 'Invalid credentials' });
    }

    const userForTheClient = {
      id: user.id,
      username: user.username,
      email: user.email
    };

    // Create a refresh token
    const token = createRefreshToken(user);
    sendRefreshToken(res, token);
    const accessToken = createAccessToken(user);
    res.send({
      user: userForTheClient,
      accessToken
    });
  }
};

export default signin;
