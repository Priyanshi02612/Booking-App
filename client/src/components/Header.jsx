import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div>
      <header className='flex justify-between items-center'>
        <a href='/' className='flex items-center gap-1'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-6 -rotate-90'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5'
            />
          </svg>

          <span className='font-bold text-xl text-teal-500'>airbnb</span>
        </a>

        <div className='flex border border-gray-300 rounded-full py-2 px-4 gap-2 items-center shadow-md shadow-gray-200'>
          <div className='px-3'>Anywhere</div>

          <div className='px-3 border-l'>Any week</div>

          <div className='px-3 border-l text-slate-500 cursor-pointer'>
            Add guests
          </div>

          <button className='search p-2 bg-teal-500 rounded-full text-white text-xs'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              className='size-4'
            >
              <path
                fillRule='evenodd'
                d='M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z'
                clipRule='evenodd'
              />
            </svg>
          </button>
        </div>

        <Link
          to={'/login'}
          className='flex gap-2 items-center border border-gray-300 rounded-full py-2 px-4 cursor-pointer'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
            />
          </svg>

          <div className='bg-gray-400 text-white rounded-full border border-gray-400 overflow-hidden '>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='size-6 relative top-1'
            >
              <path
                fillRule='evenodd'
                d='M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z'
                clipRule='evenodd'
              />
            </svg>
          </div>
        </Link>
      </header>
    </div>
  );
};

export default Header;
