import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className='mt-4 grow flex items-center justify-around'>
      <div className='mb-64'>
        <h1 className='text-4xl text-center mb-4'>Login</h1>

        <form className='max-w-md mx-auto'>
          <input type='email' placeholder='your@email.com' />

          <input type='password' placeholder='password' />

          <button className=''>Login</button>

          <div className='text-center py-2'>
            Don't have account?{' '}
            <Link to={'/register'} className='text-teal-600 underline'>
              Register Now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
