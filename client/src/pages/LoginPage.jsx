import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, useToast } from '@chakra-ui/react';

const LoginPage = () => {
  const [userLoginData, setUserLoginData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const toast = useToast();

  const handleUserLogin = async () => {
    try {
      const response = await axios.post('/user/login', userLoginData);

      if (response.status === 200) {
        toast({
          title: response.data.message,
          status: 'success',
          isClosable: true,
          duration: 3000,
        });

        setUserLoginData({ email: '', password: '' });

        navigate('/');
      } else {
        toast({
          title: 'Failed to Login. Please try again.',
          status: 'error',
          isClosable: true,
          duration: 3000,
        });
      }
    } catch (error) {
      toast({
        title: error.response.data.message,
        status: 'error',
        isClosable: true,
        duration: 3000,
      });
    }
  };

  return (
    <div className='mt-4 grow flex items-center justify-around'>
      <div className='mb-64'>
        <h1 className='text-4xl text-center mb-4'>Login</h1>

        <form className='max-w-md mx-auto'>
          <input
            type='email'
            placeholder='your@email.com'
            value={userLoginData.email}
            onChange={(e) =>
              setUserLoginData({ ...userLoginData, email: e.target.value })
            }
          />

          <input
            type='password'
            placeholder='password'
            value={userLoginData.password}
            onChange={(e) =>
              setUserLoginData({ ...userLoginData, password: e.target.value })
            }
          />

          <Button
            bgColor='#14b8a6'
            color='white'
            _hover={{ backgroundColor: '#2da195' }}
            onClick={handleUserLogin}
          >
            Login
          </Button>

          <div className='text-center py-2'>
            Don't have account?
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
