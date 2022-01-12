import React, { useEffect, useState } from 'react';
import axios from 'axios';
import IndexNavbar from '../components/Navbars/IndexNavbar.js';
import CardPageVisits from '../components/Cards/CardPageVisits.js';
import Footer from '../components/Footers/Footer.js';
import { GetStaticProps } from 'next';
import useSWR from 'swr';
import checkAuthClient from '../functions/checkAuthClient';
import { useRouter } from 'next/router';

import { useStore } from '../store';
import prisma from '../lib/prisma';

export type TransactionProps = {
  id: number;
  from: string;
  to: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
  currency: string;
  description: string;
  status: Boolean;
};

type Props = {
  transactions: TransactionProps[];
};
const HomePage: React.FC<Props> = (props) => {
  const [auth, setAuth] = useState(false);
  const [isError, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [userAccountNumber, setUserAccountNumber] = useState('');

  const store = useStore();
  const router = useRouter();
  useEffect(() => {
    if (store.accessToken !== null) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [store.accessToken]);

  function fetchTransactions() {
    fetch('/api/transactions', {
      method: 'POST',
      body: JSON.stringify({
        userId: store.user.id,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTransactions(data.transactions);
        setUserAccountNumber(data.accountNumber)
      });
  }
  useEffect(() => {
    // fetch transactions
    fetchTransactions();
  }, []);

  const fetcher = async () => {
    return await axios.get('/api/protectedRoute', {
      headers: {
        authorization: `Bearer ${store.accessToken}`,
      },
    });
  };

  const { data, error } = useSWR('/api/', fetcher);
  useEffect(() => {
    if (error !== undefined) setError(error);
    // router.push('/signin');
    setLoading(false);
  }, [data, error, router]);

  // useEffect(() => {
  //   if (store.accessToken == null) {
  //     router.replace('/');
  //   }
  // }, [store.accessToken, router]);

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        {auth && (
          <>
            <IndexNavbar fixed store={store} auth={auth} />
            <main className='profile-page'>
              <section className='relative block h-500-px'>
                <div
                  className='absolute top-0 w-full h-full bg-center bg-cover'
                  style={{
                    backgroundImage:
                      "url('https://res.cloudinary.com/plaitnum/image/upload/v1641548172/undraw_server_status_re_n8ln_qtfnbj.svg')",
                  }}
                >
                  <span
                    id='blackOverlay'
                    className='w-full h-full absolute opacity-50 bg-black'
                  ></span>
                </div>
                <div
                  className='top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-16'
                  style={{ transform: 'translateZ(0)' }}
                >
                  <svg
                    className='absolute bottom-0 overflow-hidden'
                    xmlns='http://www.w3.org/2000/svg'
                    preserveAspectRatio='none'
                    version='1.1'
                    viewBox='0 0 2560 100'
                    x='0'
                    y='0'
                  >
                    <polygon
                      className='text-blueGray-200 fill-current'
                      points='2560 0 2560 100 0 100'
                    ></polygon>
                  </svg>
                </div>
              </section>
              <section className='relative py-16 bg-blueGray-200'>
                <div className='container mx-auto px-4'>
                  <div className='relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64'>
                    <div className='px-6'>
                      <CardPageVisits
                        transactions={transactions}
                        userId={store.user.id}
                        userAccountNumber={userAccountNumber}
                      />
                    </div>
                  </div>
                </div>
              </section>
            </main>
            <Footer />
          </>
        )}
      </>
    );
  }
};

export default checkAuthClient(HomePage);
