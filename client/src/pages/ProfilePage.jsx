import { Button, Flex, Text, useToast } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router';
import { UserService } from '../services/user.service';

const ProfilePage = () => {
  const { user, setUser } = useContext(UserContext);
  const toast = useToast();
  const navigate = useNavigate();

  const handleUserLogout = async () => {
    try {
      const response = await UserService.logOut();

      toast({
        title: response.message,
        status: 'success',
        isClosable: true,
        duration: 3000,
      });

      setUser(null);
      navigate('/');
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

      <Button colorScheme='teal' px='50px' onClick={handleUserLogout}>
        Log out
      </Button>
    </Flex>
  );
};

export default ProfilePage;
