import prisma from '../../lib/prisma';

const transactions = async (req, res) => {
  const { userId } = JSON.parse(req.body);
  const account = await prisma.account.findUnique({
    where: {
      userId,
    },
  });

  return res.status(200).send({ accountBalance: account.balance });
};

export default transactions;
