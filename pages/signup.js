import React, { useState } from 'react';
import { useStore } from '../store';

// layout for page

import Auth from '../layouts/Auth.js';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Swal from 'sweetalert2';

export default function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const store = useStore();
  const router = useRouter();
  
  function signUp() {
    fetch('/api/signup',{
      method:'POST',
      body:JSON.stringify({
        email,
        username,
        password
      })
    }).then(res => {
      if(res.status === 409) {
        throw new Error('Please use other email')
      }

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Successfully created your account!'
      }).then((res) => {
        if (res.isConfirmed) {
          router.push('/signin');
        }
      })
      return res.json()
    }).then(data => {
      store.setAccessToken(data.accessToken)
      store.setUser(data.user)
    })
    .catch(e => {
      console.log(e)
    })
  }

  return (
    <>
      <div className='container mx-auto px-4 h-full'>
        <div className='flex content-center items-center justify-center h-full'>
          <div className='w-full lg:w-6/12 px-4'>
            <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0'>
              <div className='rounded-t mb-0 px-6 py-6'>
                <hr className='mt-6 border-b-1 border-blueGray-300' />
              </div>
              <div className='flex-auto px-4 lg:px-10 py-10 pt-0'>
                <div className='text-blueGray-400 text-center mb-3 font-bold'>
                  <small>Sign up with credentials</small>
                </div>
                <form>
                  <div className='relative w-full mb-3'>
                    <label
                      className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                      htmlFor='grid-password'
                    >
                      Name
                    </label>
                    <input
                      type='text'
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder='johndoe'
                      className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                    />
                  </div>

                  <div className='relative w-full mb-3'>
                    <label
                      className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                      htmlFor='grid-password'
                    >
                      Email
                    </label>
                    <input
                      type='email'
                      onChange={(e) => setEmail(e.target.value)}
                      className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                      placeholder='Email'
                    />
                  </div>

                  <div className='relative w-full mb-3'>
                    <label
                      className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                      htmlFor='grid-password'
                    >
                      Password
                    </label>
                    <input
                      type='password'
                      onChange={(e) => setPassword(e.target.value)}
                      className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                      placeholder='Password'
                    />
                  </div>

                  <div>
                    <label className='inline-flex items-center cursor-pointer'>
                      <input
                        id='customCheckLogin'
                        type='checkbox'
                        className='form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150'
                      />
                      <span className='ml-2 text-sm font-semibold text-blueGray-600'>
                        I agree with the{' '}
                        <a
                          href='#pablo'
                          className='text-lightBlue-500'
                          onClick={(e) => e.preventDefault()}
                        >
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div>

                  <div className='text-center mt-6'>
                    <button
                    onClick={() => signUp()}
                      className='bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150'
                      type='button'
                    >
                      Create Account
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className='flex flex-wrap mt-6 relative'>
              <div className='w-1/2'>
                <a
                  href='#pablo'
                  onClick={(e) => e.preventDefault()}
                  className='text-blueGray-200'
                >
                  <small>How it works?</small>
                </a>
              </div>
              <div className='w-1/2 text-right'>
                <Link href='/signin'>
                  <a href='#pablo' className='text-blueGray-200'>
                    <small>Login to your account</small>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Register.layout = Auth;
