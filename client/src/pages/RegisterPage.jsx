import React from 'react';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  return (
    <div className='mt-4 grow flex items-center justify-around'>
      <div className='mb-64'>
        <h1 className='text-4xl text-center mb-4'>Register</h1>

        <form className='max-w-md mx-auto'>
          <input type='text' placeholder='Firstname Lastname' />

          <input type='email' placeholder='your@email.com' />

          <input type='password' placeholder='Password' />

          <button className=''>Register</button>

          <div className='text-center py-2'>
            Already have an account?
            <Link to={'/login'} className='text-teal-600 underline'>
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
