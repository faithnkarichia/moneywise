import prisma from '../../lib/prisma';

const { Convert } = require('easy-currencies');

const newTransaction = async (req, res) => {
  let transaction;
  const { senderId, to, amount, currency } = JSON.parse(req.body);
  // find sender's account
  const senderAccount = await prisma.account.findUnique({
    where: {
      userId: senderId,
    },
  });
  console.log(senderAccount.accountNumber, to);
  if (senderAccount.accountNumber == to) {
    return res.status(400).send({
      error: 'You cannot send money to yourself',
    });
  }
  const data = {
    from: senderAccount.accountNumber,
    to,
    amount,
    currency,
    userId: senderId,
  };

  // Check if sender has enough balance to complete the transaction
  const foundAcc = await prisma.account.findUnique({
    where: {
      accountNumber: senderAccount.accountNumber,
    },
  });
  console.log(foundAcc);
  if (
    foundAcc.balance <
    (await Convert(amount).from(currency.toUpperCase()).to('USD'))
  ) {
    data.message = 'Transaction failed due to Insufficient funds';
    data.description = 'Insufficient funds';
    transaction = await prisma.transaction.create({ data });
    res.status(400).send({ error: 'Insufficient funds' });
  }
  console.log(currency)
  // Check if specified currency is USD, else convert to USD (default currency id USD)
  if (currency.toLowerCase() !== 'usd') {
    const converted = await Convert(amount)
      .from(currency.toUpperCase())
      .to('USD');

    // Subtract amount in USD from sender's balance and add the equivalent amount to receiver's balance
    await prisma.account.update({
      where: {
        accountNumber: senderAccount.accountNumber,
      },
      data: {
        balance: foundAcc.balance - converted,
      },
    });

    await prisma.account.update({
      where: {
        accountNumber: to,
      },
      data: {
        balance: foundAcc.balance + converted,
      },
    });

    data.message = 'Success';
    data.description = 'Successfully sent money';
    data.status = true;
    transaction = await prisma.transaction.create({ data });
    // res.status(200).send({ transaction, message: 'Transaction successful' });
  }
  else {
    // Subtract amount in USD from sender's balance and add the equivalent amount to receiver's balance
    await prisma.account.update({
      where: {
        accountNumber: senderAccount.accountNumber,
      },
      data: {
        balance: foundAcc.balance - amount,
      },
    });

    await prisma.account.update({
      where: {
        accountNumber: to,
      },
      data: {
        balance: foundAcc.balance + amount,
      },
    });

    data.message = 'Success';
    data.description = 'Successfully sent money';
    data.status = true;
    transaction = await prisma.transaction.create({ data });
    // res.status(200).send({ transaction, message: 'Transaction successful' });
  }
  transaction
    ? res.status(200).send({ transaction })
    : res.status(400).send({ error: 'Transaction failed' });
};

export default newTransaction;
