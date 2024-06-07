import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, Input, Text, useToast } from '@chakra-ui/react';

const RegisterPage = () => {
  const [registrationData, setRegistrationData] = useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
  });

  const [registeringUser, setRegisteringUser] = useState(false);

  const toast = useToast();

  const navigate = useNavigate();

  const handleRegisterUser = async (e) => {
    e.preventDefault();

    if (registrationData.password !== registrationData.repeatPassword) {
      toast({
        title: 'Passwords do not match.',
        status: 'warning',
        isClosable: true,
        duration: 3000,
      });
      return;
    }

    try {
      setRegisteringUser(true);

      const response = await axios.post('/booking/register', registrationData, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 200) {
        toast({
          title: response.data.message,
          status: 'success',
          isClosable: true,
          duration: 3000,
        });

        setRegistrationData({
          name: '',
          email: '',
          password: '',
          repeatPassword: '',
        });
      } else {
        toast({
          title: 'Failed to registration. Please try again.',
          status: 'error',
          isClosable: true,
          duration: 3000,
        });
      }

      setRegisteringUser(false);

      navigate('/login');
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
    <Box
      mt='12px'
      display='flex'
      alignItems='center'
      flexGrow='1'
      justifyContent='space-around'
    >
      <Box mb='256px'>
        <Text fontSize='36px' textAlign='center' mb='16px'>
          Register
        </Text>

        <Box maxW='448px' mx='auto'>
          <Input
            type='text'
            placeholder='Firstname Lastname'
            value={registrationData.name}
            onChange={(e) =>
              setRegistrationData({
                ...registrationData,
                name: e.target.value,
              })
            }
          />

          <Input
            type='email'
            placeholder='your@email.com'
            value={registrationData.email}
            onChange={(e) =>
              setRegistrationData({
                ...registrationData,
                email: e.target.value,
              })
            }
          />

          <Input
            type='password'
            placeholder='Password'
            value={registrationData.password}
            onChange={(e) =>
              setRegistrationData({
                ...registrationData,
                password: e.target.value,
              })
            }
          />

          <Input
            type='password'
            placeholder='Re-enter password'
            value={registrationData.repeatPassword}
            onChange={(e) =>
              setRegistrationData({
                ...registrationData,
                repeatPassword: e.target.value,
              })
            }
          />

          <Button
            bgColor='#14b8a6'
            color='white'
            _hover={{ backgroundColor: '#2da195' }}
            onClick={handleRegisterUser}
            // isLoading={registeringUser}
          >
            Register
          </Button>

          <Text textAlign='center' py='8px'>
            Already have an account?
            <Link
              to={'/login'}
              style={{
                color: '#14b8a6',
                textDecoration: 'underline',
              }}
            >
              Login here
            </Link>
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterPage;
