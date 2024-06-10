import React, { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import {
  Box,
  Button,
  Flex,
  Icon,
  Spinner,
  Text,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import PlacesPage from './PlacesPage';
import { FaUserLarge, FaListUl, FaBuilding } from 'react-icons/fa6';

const pages = [
  {
    name: 'My Profile',
    path: '/account',
    subpage: 'profile',
    icon: FaUserLarge,
  },
  {
    name: 'My Bookings',
    path: '/account/bookings',
    subpage: 'bookings',
    icon: FaListUl,
  },
  {
    name: 'My Accommodations',
    path: '/account/places',
    subpage: 'places',
    icon: FaBuilding,
  },
];

const AccountPage = () => {
  const { user, isUserReady, setUser, setIsUserReady } =
    useContext(UserContext);
  const [activePage, setActivePage] = useState('profile');
  const [redirect, setRedirect] = useState(null);
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

  if (!isUserReady) {
    return (
      <Flex h='40vh' alignItems='center' justifyContent='center'>
        <Spinner size='md' />
      </Flex>
    );
  }

  if (isUserReady && !user && !redirect) {
    return <Navigate to={'/login'} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <Box mt='40px'>
      <Flex alignItems='center' justifyContent='center' gap='40px'>
        {pages.map((page) => (
          <Link
            key={page.path}
            onClick={() => setActivePage(page.subpage)}
            to={page.path}
            style={{
              backgroundColor:
                activePage === page.subpage ? '#14b8a6' : '#eeeeee',
              color: activePage === page.subpage ? 'white' : 'black',
              borderRadius: '50px',
              padding: '12px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Icon as={page.icon} />
            <Text>{page.name}</Text>
          </Link>
        ))}
      </Flex>

      {activePage === 'profile' && (
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
      )}

      {activePage === 'places' && (
        <Box>
          <PlacesPage />
        </Box>
      )}
    </Box>
  );
};

export default AccountPage;
