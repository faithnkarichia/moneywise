import React from 'react';
import { createPopper } from '@popperjs/core';
import Link from 'next/link';
import { useStore } from '../../store';
import { useRouter } from 'next/router';

const UserDropdown = ({ auth, logOut }) => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: 'bottom-start',
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  const store = useStore();
  const router = useRouter();

  return (
    <>
      <a
        className='text-blueGray-500 block'
        href='#pablo'
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className='items-center flex'>
          <span className='w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full'>
            <img
              alt='...'
              className='w-full rounded-full align-middle border-none shadow-lg'
              src='https://res.cloudinary.com/plaitnum/image/upload/v1599051817/sgl9moa8n9kyctdkxa3q.jpg'
            />
          </span>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? 'block ' : 'hidden ') +
          'bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48'
        }
      >
        <Link href='/profile'>
          <a
            href='#pablo'
            className={
              'text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700'
            }
          >
            <i class='fas fa-address-card'></i> Your Profile
          </a>
        </Link>
        <Link href='/transactions'>
          <a
            href='#pablo'
            className={
              'text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700'
            }
          >
            <i class='fas fa-stream'></i> Transactions
          </a>
        </Link>

        <a
          href='#pablo'
          className={
            'text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700'
          }
          onClick={() => logOut()}
        >
          <i class='fas fa-sign-out-alt'></i> Logout
        </a>
      </div>
    </>
  );
};

export default UserDropdown;
