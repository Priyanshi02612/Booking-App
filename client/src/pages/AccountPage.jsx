import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { Box } from '@chakra-ui/react';

import AccountNavbar from '../components/AccountNavbar';

const AccountPage = () => {
  const { user, isUserReady } = useContext(UserContext);

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
