import React, { useEffect, useState } from 'react';
import axios from 'axios';
import IndexNavbar from '../components/Navbars/IndexNavbar.js';
import CardPageVisits from '../components/Cards/CardPageVisits.js';
import Footer from '../components/Footers/Footer.js';
import { GetStaticProps } from 'next';
import useSWR from 'swr';
import checkAuthClient from '../functions/checkAuthClient';
import { useRouter } from 'next/router';
import Auth from '../layouts/Auth.js';

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
        userId: store.user.id
      })
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTransactions(data.transactions);
        setUserAccountNumber(data.accountNumber);
      });
  }
  useEffect(() => {
    // fetch transactions
    fetchTransactions();
  }, []);

  const fetcher = async () => {
    return await axios.get('/api/protectedRoute', {
      headers: {
        authorization: `Bearer ${store.accessToken}`
      }
    });
  };

  const { data, error } = useSWR('/api/', fetcher);
  useEffect(() => {
    if (error !== undefined) setError(error);
    // router.push('/signin');
    setLoading(false);
  }, [data, error, router]);

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        {auth ? (
          <>
            <IndexNavbar fixed store={store} auth={auth} />
            <main className="profile-page">
              <section className="relative block h-500-px">
                <div
                  className="absolute top-0 w-full h-full bg-center bg-cover"
                  style={{
                    backgroundImage:
                      "url('https://res.cloudinary.com/plaitnum/image/upload/v1641548172/undraw_server_status_re_n8ln_qtfnbj.svg')"
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
        ) : (
          <>
            <Auth>
              <div className="container mx-auto px-4 h-full">
                <div className="flex content-center items-center justify-center h-full">
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                      <div className="rounded-t mb-0 px-6 py-6">
                        <hr className="mt-6 border-b-1 border-blueGray-300" />
                      </div>
                      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                        <div className="text-blueGray-400 text-center mb-3 font-bold">
                          <small>Sign in with credentials</small>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap mt-6 relative">
                      <div className="w-1/2">
                        <a
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          className="text-blueGray-200"
                        >
                          <small>Forgot password?</small>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Auth>
          </>
        )}
      </>
    );
  }
};

export default checkAuthClient(HomePage);
