import { Button, Flex, Text, useToast } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';

const ProfilePage = ({ setRedirect }) => {
  const { user, setUser, setIsUserReady } = useContext(UserContext);
  const toast = useToast();

  const handleUserLogout = async () => {
    try {
      const response = await axios.post('/auth/logout');

      toast({
        title: response.data.message,
        status: 'success',
        isClosable: true,
        duration: 3000,
      });

      setUser(null);
      setIsUserReady(true);
      setRedirect('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <Flex
      alignItems='center'
      justifyContent='center'
      flexDir='column'
      padding='40px'
      gap='20px'
    >
      <Text>
        Logged in as {user?.name} ({user?.email})
      </Text>

      <Button
        bgColor='#14b8a6'
        color='white'
        px='50px'
        _hover={{ backgroundColor: '#2da195' }}
        onClick={handleUserLogout}
      >
        Log out
      </Button>
    </Flex>
  );
};

export default ProfilePage;
