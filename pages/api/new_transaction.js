import prisma from '../../lib/prisma';

const { Convert } = require('easy-currencies');

const newTransaction = async (req, res) => {
  let transaction;
  let error;

  const { senderId, to, amount, currency, personalNote } = JSON.parse(req.body);
  console.log('personalNote', personalNote);
  // find sender's account
  const senderAccount = await prisma.account.findUnique({
    where: {
      userId: senderId
    }
  });

  const data = {
    from: senderAccount.accountNumber,
    to,
    amount,
    currency,
    userId: senderId,
    personalNote
  };

  // Check if sender has enough balance to complete the transaction
  const foundAcc = await prisma.account.findUnique({
    where: {
      accountNumber: senderAccount.accountNumber
    }
  });
  console.log(foundAcc);

  console.log(senderAccount.accountNumber, to);
  if (senderAccount.accountNumber === to) {
    console.log('You cannot send money to yourself');
    error = 'You cannot send money to yourself';
    return res.status(400).send({
      error: 'You cannot send money to yourself'
    });
  }
  console.log('Reached here');
  console.log('foundAcc.balance', foundAcc.balance);
  const convtAmt = await Convert(amount).from(currency.toUpperCase()).to('USD');
  console.log('convtAmt', convtAmt);
  if (Number(foundAcc.balance) < Number(convtAmt)) {
    data.message = 'Transaction failed due to Insufficient funds';
    data.description = 'Insufficient funds';
    transaction = await prisma.transaction.create({ data });
    error = 'Insufficient funds';
    console.log('error', error);
    return res.status(400).send({ error: 'Insufficient funds' });
  }
  console.log(currency);
  // Check if specified currency is USD, else convert to USD (default currency id USD)
  if (currency.toLowerCase() !== 'usd') {
    const converted = await Convert(amount)
      .from(currency.toUpperCase())
      .to('USD');
    console.log('Currency is not USD');
    // Subtract amou nt in USD from sender's balance and add the equivalent amount to receiver's balance
    const toBeAdded = foundAcc.balance + converted;
    const toBeSubtracted = foundAcc.balance - converted;
    console.log('old', foundAcc.balance, 'toBeAdded', toBeAdded);
    console.log('toBeSubtracted', toBeSubtracted);
    await prisma.account.update({
      where: {
        accountNumber: senderAccount.accountNumber
      },
      data: {
        balance: toBeSubtracted
      }
    });
    console.log('Updated sender balance1');

    const receiverAccount = await prisma.account.findUnique({
      where: {
        accountNumber: to
      }
    });

    if (!receiverAccount) {
      return res.status(400).send({ error: 'Receiver account does not exist' });
    }

    await prisma.account.update({
      where: {
        accountNumber: to
      },
      data: {
        balance: receiverAccount.balance + converted
      }
    });
    console.log('Updated receiver balance1');
    data.message = 'Success';
    data.description = 'Successfully sent money';
    data.status = true;
    transaction = await prisma.transaction.create({ data });
    res.status(200).send({ transaction, message: 'Transaction successful' });
  } else {
    // Subtract amount in USD from sender's balance and add the equivalent amount to receiver's balance
    await prisma.account.update({
      where: {
        accountNumber: senderAccount.accountNumber
      },
      data: {
        balance: foundAcc.balance - amount
      }
    });

    // Get receivers balance
    const receiverAccount = await prisma.account.findUnique({
      where: {
        accountNumber: to
      }
    });

    if (!receiverAccount) {
      return res.status(400).send({ error: 'Receiver account does not exist' });
    }
    await prisma.account.update({
      where: {
        accountNumber: to
      },
      data: {
        balance: receiverAccount.balance + amount
      }
    });

    data.message = 'Success';
    data.description = 'Successfully sent money';
    data.status = true;
    transaction = await prisma.transaction.create({ data });
    console.log('Transaction successful, currency is USD');
    return res
      .status(200)
      .send({ transaction, message: 'Transaction successful' });
  }
  // transaction
  //   ? res.status(200).send({ transaction })
  //   : res.status(400).send({ error: 'Transaction failed' });

  // if (error) {
  //   res.status(400).send({ error });
  // } else {
  //   res.status(200).send({ transaction });
  // }
};

export default newTransaction;
