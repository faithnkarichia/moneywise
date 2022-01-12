import prisma from '../../lib/prisma';
const { Convert } = require('easy-currencies');

const transactions = async (req, res) => {
  const { userId } = JSON.parse(req.body);
  const account = await prisma.account.findUnique({
    where: {
      userId
    }
  });
  const balEUR = await Convert(account.balance).from('USD').to('EUR');

  const balNGN = await Convert(account.balance).from('USD').to('NGN');

  return res
    .status(200)
    .send({ accountBalance: account.balance, balEUR, balNGN });
};

export default transactions;
