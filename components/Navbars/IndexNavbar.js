import React from 'react';
import Link from 'next/link';
// import { useUser } from '@auth0/nextjs-auth0';
import Image from 'next/image';
import { useStore } from '../../store';
import { useRouter } from 'next/router';

// components

import UserDropdown from '../../components/Dropdowns/UserDropdown.js';

export default function Navbar(props) {
  
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const myLoader = () => {
    return 'https://res.cloudinary.com/plaitnum/image/upload/v1641542414/FIN_zuzbzn.png';
  };

  // const { user, error, isLoading } = useUser();

  const store = useStore();
  const router = useRouter()
  function logOut() {
    fetch('/api/logout', {
      method:'POST',
      credentials: 'include'
    }).then(() => {
      store.setAccessToken(null)
      store.setUser(null)
      router.push('/signin')
    })
  }

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>{error.message}</div>;
  return (
    <>
      <nav className='top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white shadow'>
        <div className='container px-4 mx-auto flex flex-wrap items-center justify-between'>
          <div className='w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start'>
            <div class='flex justify-start lg:w-0 lg:flex-1'>
              <Link href='/'>
                <a href='#pablo'>
                  <span class='sr-only'>FIN</span>
                  <Image
                    loader={myLoader}
                    class='h-8 w-auto sm:h-10'
                    src='https://res.cloudinary.com/plaitnum/image/upload/v1641542414/FIN_zuzbzn.png'
                    alt=''
                    width={50}
                    height={50}
                  />
                </a>
              </Link>
            </div>

            <button
              className='cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none'
              type='button'
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className='fas fa-bars'></i>
            </button>
          </div>
          <div
            className={
              'lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none' +
              (navbarOpen ? ' block' : ' hidden')
            }
            id='example-navbar-warning'
          >
            <ul className='flex flex-col lg:flex-row list-none lg:ml-auto'>
              {props.auth ? (
                <>
                  {/* <h2>Welcome {user.name}</h2> */}
                  <ul className='flex-col md:flex-row list-none items-center hidden md:flex'>
                    <UserDropdown auth={props.auth} logOut={logOut} />
                  </ul>
                </>
              ) : (
                <>
                  <li className='flex items-center'>
                    <Link href='/auth/register'>
                      <a className='hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold'>
                        <span className='inline-block ml-2'>Signup</span>
                      </a>
                    </Link>
                  </li>
                  <li className='flex items-center'>
                    <Link href='/api/auth/login'>
                      <button
                        className='bg-blueGray-700 text-white active:bg-blueGray-600 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150'
                        type='button'
                      >
                        <i className='fas fa-lock'></i> Login
                      </button>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
