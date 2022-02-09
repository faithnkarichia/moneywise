import prisma from '../../lib/prisma';

const transactions = async (req, res) => {
  if (req.method === 'POST') {
    const { userId } = JSON.parse(req.body);
    // const transactions1 = await prisma.transaction.findMany({
    //   where: {
    //     userId,
    //   },
    // });

    // Fetch the account of the user 
    const account = await prisma.account.findUnique({
      where: {
        userId,
      },
    });

    // Fech all transactions where FROM or TO matches the account number of the user
    // User?.id => id may not be existing
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
    return res.status(200).send({ transactions, accountNumber: account?.accountNumber });
  }
};

export default transactions;
