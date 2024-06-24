import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router';
import IndexPage from '../pages/IndexPage';

const Layout = () => {
  return (
    <div className='p-4 flex flex-col min-h-screen'>
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
