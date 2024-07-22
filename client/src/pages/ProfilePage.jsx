import { Button, Flex, Text, useToast } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router';

const ProfilePage = () => {
  const { user, setUser } = useContext(UserContext);
  const toast = useToast();
  const navigate = useNavigate();

  const handleUserLogout = async () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');

    toast({
      title: 'Logout successfully!',
      status: 'success',
      isClosable: true,
      duration: 3000,
    });
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

      <Button colorScheme='teal' px='50px' onClick={handleUserLogout}>
        Log out
      </Button>
    </Flex>
  );
};

export default ProfilePage;
