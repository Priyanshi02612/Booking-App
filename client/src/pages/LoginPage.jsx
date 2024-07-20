import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Flex, Input, Text, useToast } from '@chakra-ui/react';
import { UserContext } from '../context/UserContext';
import { UserService } from '../services/user.service';

const LoginPage = () => {
  const [userLoginData, setUserLoginData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const toast = useToast();

  const { setUser } = useContext(UserContext);

  const handleUserLogin = async () => {
    try {
      const response = await UserService.login(userLoginData);
      setUser(response.data);

      if (response.success === true) {
        toast({
          title: response.message,
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
    <Flex
      m='16px 28px 0px 28px'
      alignItems='center'
      justifyContent='space-around'
      flexGrow='1'
    >
      <Box mb='256px'>
        <Text fontSize='36px' textAlign='center' my='16px'>
          Login
        </Text>

        <Box maxW='448px' mx='auto'>
          <Input
            mb='12px'
            type='email'
            placeholder='your@email.com'
            value={userLoginData.email}
            onChange={(e) =>
              setUserLoginData({ ...userLoginData, email: e.target.value })
            }
          />

          <Input
            mb='12px'
            type='password'
            placeholder='password'
            value={userLoginData.password}
            onChange={(e) =>
              setUserLoginData({ ...userLoginData, password: e.target.value })
            }
          />

          <Button colorScheme='teal' w='100%' onClick={handleUserLogin}>
            Login
          </Button>

          <Text display='flex' gap='8px' justifyContent='center' py='16px'>
            Don't have account?
            <Link
              to={'/register'}
              style={{ color: '#14b8a6', textDecoration: 'underline' }}
            >
              Register Now
            </Link>
          </Text>
        </Box>
      </Box>
    </Flex>
  );
};

export default LoginPage;
