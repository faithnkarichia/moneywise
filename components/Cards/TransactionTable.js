import React from 'react';
import Link from 'next/link';
import { useStore } from '../../store';

export default function CardSettings(props) {
  // const store = useStore();

  return (
    <>
      <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0'>
        <div className='rounded-t bg-white mb-0 px-6 py-6'>
          <div className='text-center flex justify-between'>
            <h6 className='text-blueGray-700 text-xl font-bold'>
              New Transaction
            </h6>
            <h6 className='text-blueGray-700 text-xl font-bold'>
              Acc Bal{' '}
              <span
                style={{
                  fontSize: '2.5rem',
                  lineHeight: '3 rem',
                  fontFamily:
                    'PayPalSansBig-Light,Helvetica Neue,Arial,sans-serif',
                  fontWeight: '400',
                }}
              >
                ${props.accountBalance}
              </span>
            </h6>
            <Link href='/transactions'>
              <button
                className='bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150'
                type='button'
              >
                <i class='fas fa-arrow-left'></i> Back to Transaction List
              </button>
            </Link>
          </div>
        </div>

        <div className='flex-auto px-4 lg:px-10 py-10 pt-0'>
          <form>
            <h6 className='text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase'>
              How much would you like to transfer?
            </h6>
            <div className='flex flex-wrap'>
              <div className='w-full lg:w-6/12 px-4'>
                <div className='relative w-full mb-3'>
                  <label
                    className='block text-blueGray-600 text-xs font-bold mb-2'
                    htmlFor='grid-password'
                  >
                    You send
                  </label>
                  <input
                    type='number'
                    value={props.amount}
                    onChange={(e) => props.setAmount(e.target.value)}
                    inputmode='decimal'
                    className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                  />
                </div>
              </div>
              <div className='w-full lg:w-6/12 px-4'>
                <div className='relative w-full mb-3'>
                  <label
                    className='block  text-blueGray-600 text-xs font-bold mb-2'
                    htmlFor='grid-password'
                  >
                    Currency
                  </label>
                  <select
                    required
                    onChange={(e) => props.setCurrencyFrom(e.target.value)}
                    value={props.currencyFrom}
                    // defaultValue='USD'
                    className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                  >
                    <option>USD</option>
                    <option>EUR</option>
                    <option>NGN</option>
                  </select>
                </div>
              </div>
              <div className='w-full lg:w-6/12 px-4'>
                <div className='relative w-full mb-3'>
                  <label
                    className='block  text-blueGray-600 text-xs font-bold mb-2'
                    htmlFor='grid-password'
                  >
                    Recipient Gets
                  </label>
                  <input
                    type='number'
                    value={props.convertedAmount}
                    inputmode='decimal'
                    disabled
                    className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                  />
                </div>
              </div>
              <div className='w-full lg:w-6/12 px-4'>
                <div className='relative w-full mb-3'>
                  <label
                    className='block  text-blueGray-600 text-xs font-bold mb-2'
                    htmlFor='grid-password'
                  >
                    Currency
                  </label>
                  <select
                    required
                    value={props.currencyTo}
                    onChange={async (e) => {
                      await props.setCurrencyTo(e.target.value);
                      props.convertCurrency(
                        props.currencyFrom,
                        e.target.value,
                        props.amount
                      );
                      // await props.setConvertedAmount(newAmt);
                    }}
                    className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                  >
                    <option>USD</option>
                    <option>EUR</option>
                    <option>NGN</option>
                  </select>
                </div>
              </div>
            </div>

            <hr className='mt-6 border-b-1 border-blueGray-300' />

            <h6 className='text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase'>
              Recipient Details
            </h6>
            <div className='flex flex-wrap'>
              <div className='w-full lg:w-12/12 px-4'>
                <div className='relative w-full mb-3'>
                  <label
                    className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                    htmlFor='grid-password'
                  >
                    Select user from the dropdown
                  </label>
                  <select
                    onChange={(e) => props.setRecipient(e.target.value)}
                    type='text'
                    className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                  >
                    {JSON.parse(props.accountsList).map((account) => (
                      <option value={account.accountNumber} key={account.id}>
                        {account.accountNumber}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <hr className='mt-6 border-b-1 border-blueGray-300' />

            <h6 className='text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase'>
              A Personal note
            </h6>
            <div className='flex flex-wrap'>
              <div className='w-full lg:w-12/12 px-4'>
                <div className='relative w-full mb-3'>
                  <textarea
                    type='text'
                    value={props.message}
                    onChange={(e) => props.setMessage(e.target.value)}
                    className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                    rows='4'
                  ></textarea>
                </div>
              </div>
            </div>
            {/* <Link > */}
            <button
              typeof='submit'
              onClick={() => props.newTransaction()}
              className='bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150'
              type='button'
            >
              {' '}
              Send Money
            </button>
            {/* </Link> */}
          </form>
        </div>
      </div>
    </>
  );
}
