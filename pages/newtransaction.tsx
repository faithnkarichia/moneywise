import React, { useEffect, useState } from 'react';
import { useStore } from '../store';
import axios from 'axios';
import IndexNavbar from '../components/Navbars/IndexNavbar.js';
import TransactionTable from '../components/Cards/TransactionTable.js';
import Footer from '../components/Footers/Footer.js';
import useSWR from 'swr';
import checkAuthClient from '../functions/checkAuthClient';
import prisma from '../lib/prisma';
// import { ToastContainer, toast } from 'react-nextjs-toast';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

const { Convert } = require('easy-currencies');

export const getStaticProps = async () => {
  const accounts = await prisma.account.findMany();
  return {
    props: {
      accounts: JSON.stringify(accounts)
    }
  };
};
export type Accounts = {
  id: number;
  accountNumber: string;
  balance: number;
  userId: number;
  createdAt?: string;
  updatedAt?: string;
};

export type Props = {
  accounts: Accounts[];
};

const NewTransaction: React.FC<Props> = (props) => {
  const store = useStore();

  const [secret, setSecret] = useState(null);
  const [isError, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [auth, setAuth] = useState(false);
  const [sender, setSender] = useState('');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [currencyFrom, setCurrencyFrom] = useState('');
  const [personalNote, setPersonalNote] = useState('');
  const [currencyTo, setCurrencyTo] = useState('');
  const [convertedAmount, setConvertedAmount] = useState();
  const [accountBalance, setAccountBalance] = useState('0');
  const [accounts, setAccounts] = useState([]);
  const [eurAccBal, setEurAccBal] = useState('0');
  const [ngnAccBal, setNgnAccBal] = useState('0');
  const [submitting, setSubmitting] = useState(false);

  const fetcher = async () => {
    return await axios.get('/api/protectedRoute', {
      headers: {
        authorization: `Bearer ${store.accessToken}`
      }
    });
  };

  const router = useRouter();
  const { data, error } = useSWR('/api/', fetcher);

  const fetchAccounts = () => {
    fetch('/api/accounts', {
      method: 'POST',
      body: JSON.stringify({
        userId: store.user.id
      })
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log('data', data);
        setAccounts(data.accounts);
      });
  };
  useEffect(() => {
    // Fetch Accounts
    fetchAccounts();
  }, []);

  useEffect(() => {
    if (data) setSecret(data.data);
    if (error) setError(error);
    setLoading(false);
  }, [data, error]);

  useEffect(() => {
    if (store.accessToken !== null) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [store.accessToken]);

  function fetchAccountBalance() {
    fetch('/api/account_balance', {
      method: 'POST',
      body: JSON.stringify({
        userId: store.user.id
      })
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setAccountBalance(data.accountBalance);
        setEurAccBal(data.balEUR);
        setNgnAccBal(data.balNGN);
      });
  }

  // AccountBalance
  useEffect(() => {
    fetchAccountBalance();
  }, []);

  const convertCurrency = async (
    currencyFrom: string,
    currencyTo: string,
    amountToConvert: number
  ) => {
    const convertedAmount = await Convert(amountToConvert)
      .from(currencyFrom)
      .to(currencyTo);

    if (convertedAmount) {
      setConvertedAmount(convertedAmount);
    }
    return convertedAmount;
  };

  function newTransaction() {
    setSubmitting(true);
    fetch('/api/new_transaction', {
      method: 'POST',
      body: JSON.stringify({
        senderId: store.user.id,
        to: recipient,
        amount: Number(amount),
        currency: currencyFrom,
        personalNote
      })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data.error
          }).then((res) => {
            if (res.value) {
              setSubmitting(false);
            }
          });
          setError(data.error);
        } else {
          setAccountBalance(data.accountBalance);
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Transaction Successful'
          }).then((res) => {
            if (res.isConfirmed) {
              setSubmitting(false);
              router.push('/');
            }
          });
        }
      });
    // setSubmitting(false);
  }

  return (
    <>
      {/* <ToastContainer /> */}
      <IndexNavbar fixed store={store} auth={auth} />
      <main className="profile-page">
        <section className="relative block h-500-px">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1561414927-6d86591d0c4f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80')"
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-16"
            style={{ transform: 'translateZ(0)' }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        <section className="relative py-16 bg-blueGray-200">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <TransactionTable
                  sender={sender}
                  setSender={setSender}
                  recipient={recipient}
                  setRecipient={setRecipient}
                  amount={amount}
                  setAmount={setAmount}
                  message={message}
                  setMessage={setMessage}
                  currencyFrom={currencyFrom}
                  setCurrencyFrom={setCurrencyFrom}
                  currencyTo={currencyTo}
                  setCurrencyTo={setCurrencyTo}
                  accountsList={accounts}
                  convertCurrency={convertCurrency}
                  convertedAmount={convertedAmount}
                  setConvertedAmount={setConvertedAmount}
                  newTransaction={newTransaction}
                  accountBalance={accountBalance}
                  eurAccBal={eurAccBal}
                  ngnAccBal={ngnAccBal}
                  setPersonalNote={setPersonalNote}
                  personalNote={personalNote}
                  submitting={submitting}
                  setSubmitting={setSubmitting}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default checkAuthClient(NewTransaction);
