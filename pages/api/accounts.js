import prisma from '../../lib/prisma';

const accounts = async (req, res) => {
  if (req.method === 'POST') {
    const { userId } = JSON.parse(req.body);

    const account = await prisma.account.findUnique({
      where: {
        userId
      }
    });
    // Find all accounts except the one that has accountNumber account.accountNumber
    const accounts = await prisma.account.findMany({
      where: {
        accountNumber: {
          not: account.accountNumber
        }
      }
    });

    return res.status(200).send({ accounts });
  }
};

export default accounts;
