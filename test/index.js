/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import Link from 'next/link';

import IndexNavbar from 'components/Navbars/IndexNavbar.js';
import Footer from 'components/Footers/Footer.js';
import Layout from 'layouts/Layout.js';

export default function Index() {
  return (
    <>
      <section className='header relative pt-16 items-center flex h-screen max-h-860-px'>
        <div className='container mx-auto items-center flex flex-wrap'>
          <div className='w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4'>
            <div className='pt-32 sm:pt-0'>
              <h2 className='font-semibold text-4xl text-blueGray-600'>
                Easy, fee-free banking for entrepreneurs
              </h2>
              <p className='mt-4 text-lg leading-relaxed text-blueGray-500'>
                The simpler, safer way to pay and get paid.{' '}
              </p>
              <div className='mt-12'>
                <Link href='/api/auth/login'>
                  <a
                    href='#kash'
                    className='get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-blueGray-400 active:bg-blueGray-500 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150'
                  >
                    Get Started
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <img
          className='absolute top-0 b-auto right-0 pt-16 sm:w-6/12 -mt-48 sm:mt-0 w-10/12 max-h-860-px'
          src='https://images.unsplash.com/photo-1498335746477-0c73d7353a07?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80'
          alt='...'
        />
      </section>

      <section className='mt-48 md:mt-40 pb-40 relative bg-blueGray-100'>
        <div
          className='-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20'
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
              className='text-blueGray-100 fill-current'
              points='2560 0 2560 100 0 100'
            ></polygon>
          </svg>
        </div>
        <div className='container mx-auto'>
          <div className='flex flex-wrap items-center'>
            <div className='w-10/12 md:w-6/12 lg:w-4/12 px-12 md:px-4 mr-auto ml-auto -mt-32'>
              <div className='relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-blueGray-700'>
                <img
                  alt='...'
                  src='https://images.unsplash.com/photo-1616077168712-fc6c788db4af?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80'
                  className='w-full align-middle rounded-t-lg'
                />
                <blockquote className='relative p-8 mb-4'>
                  <svg
                    preserveAspectRatio='none'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 583 95'
                    className='absolute left-0 w-full block h-95-px -top-94-px'
                  >
                    <polygon
                      points='-30,95 583,95 583,65'
                      className='text-blueGray-700 fill-current'
                    ></polygon>
                  </svg>
                  <h4 className='text-xl font-bold text-white'>
                    Celebrating a decate of powerful banking
                  </h4>
                  <p className='text-md font-light mt-2 text-white'>
                    Get the financial tools and insights to start, build and
                    grow your business.
                  </p>
                </blockquote>
              </div>
            </div>

            <div className='w-full md:w-6/12 px-4'>
              <div className='flex flex-wrap'>
                <div className='w-full md:w-6/12 px-4'>
                  <div className='relative flex flex-col mt-4'>
                    <div className='px-4 py-5 flex-auto'>
                      <div className='text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white'>
                        <i class='fas fa-piggy-bank'></i>
                      </div>
                      <h6 className='text-xl mb-1 font-semibold'>
                        Transparent Pricing
                      </h6>
                      <p className='mb-4 text-blueGray-500'>
                        Find out why we have more than 200M active accounts
                        worldwide.
                      </p>
                    </div>
                  </div>
                  <div className='relative flex flex-col min-w-0'>
                    <div className='px-4 py-5 flex-auto'>
                      <div className='text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white'>
                        <i class='fas fa-fingerprint'></i>
                      </div>
                      <h6 className='text-xl mb-1 font-semibold'>
                        Fully Encrypted
                      </h6>
                      <p className='mb-4 text-blueGray-500'>
                        Work with PayPal to offer your customers world class
                        payment solutions.
                      </p>
                    </div>
                  </div>
                </div>
                <div className='w-full md:w-6/12 px-4'>
                  <div className='relative flex flex-col min-w-0 mt-4'>
                    <div className='px-4 py-5 flex-auto'>
                      <div className='text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white'>
                        <i class='fas fa-money-check-alt'></i>
                      </div>
                      <h6 className='text-xl mb-1 font-semibold'>
                        Instant Cashout
                      </h6>
                      <p className='mb-4 text-blueGray-500'>
                        With just one account, you can shop at millions of
                        merchants around the world
                      </p>
                    </div>
                  </div>
                  <div className='relative flex flex-col min-w-0'>
                    <div className='px-4 py-5 flex-auto'>
                      <div className='text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white'>
                        <i class='fas fa-shield-alt'></i>
                      </div>
                      <h6 className='text-xl mb-1 font-semibold'>
                        Safe and Secure
                      </h6>
                      <p className='mb-4 text-blueGray-500'>
                        Join more than 7 million businesses around the world
                        offering PayPal.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='pb-16 bg-blueGray-200 relative pt-32'>
        <div
          className='-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20'
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

        <div className='container mx-auto'>
          <div className='flex flex-wrap justify-center bg-white shadow-xl rounded-lg -mt-64 py-16 px-12 relative z-10'>
            <div className='w-full text-center lg:w-8/12'>
              <p className='text-4xl text-center'>
                <span role='img' aria-label='love'>
                  😍
                </span>
              </p>
              <h3 className='font-semibold text-3xl'>Do you love Fin?</h3>
              <p className='text-blueGray-500 text-lg leading-relaxed mt-4 mb-4'>
                Cause if you do, it can be yours now. Hit the buttons below to
                navigate to get the Free version for your next project. Build a
                new web app or give an old project a new look!
              </p>
              <div className='sm:block flex flex-col mt-10'>
                <a
                  href='#pablo'
                  className='get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-2 bg-blueGray-400 active:bg-blueGray-500 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150'
                >
                  Get started
                </a>
              </div>
              <div className='text-center mt-16'></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

Index.layout = Layout;
