import React, { useContext, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { Box, Flex, Spinner } from '@chakra-ui/react';

import AccountNavbar from '../components/AccountNavbar';

const AccountPage = () => {
  const { user, isUserReady } = useContext(UserContext);

  if (!isUserReady) {
    return (
      <Flex h='40vh' alignItems='center' justifyContent='center'>
        <Spinner size='md' />
      </Flex>
    );
  }

  if (isUserReady && !user) {
    return <Navigate to={'/login'} />;
  }

  return (
    <Box mt='40px'>
      <AccountNavbar />

      <Outlet />
    </Box>
  );
};

export default AccountPage;
