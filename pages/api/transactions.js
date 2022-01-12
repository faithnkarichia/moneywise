import prisma from '../../lib/prisma';

const transactions = async (req, res) => {
  if (req.method === 'POST') {
    const { userId } = JSON.parse(req.body);
    const transactions1 = await prisma.transaction.findMany({
      where: {
        userId,
      },
    });
    const account = await prisma.account.findUnique({
      where: {
        userId,
      },
    });

    const transactions = await prisma.transaction.findMany({
      where: {
        OR: [
          {
            from: account?.accountNumber,
          },
          {
            to: account?.accountNumber,
          },
        ],
      },
    });
    return res.status(200).send({ transactions });
  }
};

export default transactions;
