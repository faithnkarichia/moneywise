import {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
} from '../../functions/auth';
import prisma from '../../lib/prisma';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';

const signup = async (req, res) => {
  const { email, username, password } = JSON.parse(req.body);
  //checking if someone have used the email
  const checkIfExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (checkIfExist) return res.status(409).send();
  const hashedPassword = await bcrypt.hashSync(password, crypto.randomInt(8, 10));
  const user = await prisma.user.create({
    data: {
      email,
      username,
      password: hashedPassword,
    },
  });

  const accountNumber = uuidv4().replace(/-/g, '');

  const acc = await prisma.account.create({
    data: {
      accountNumber,
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  });
  const token = createRefreshToken(user);
  sendRefreshToken(res, token);

  const accessToken = createAccessToken(user);
  res.send({ user, accessToken });
};

export default signup;
