import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Layout from './components/Layout';
import axios from 'axios';
import USerContextProvider from './context/UserContext';
import AccountPage from './pages/AccountPage';

axios.defaults.baseURL = 'http://localhost:4002';
axios.defaults.withCredentials = true;
axios.defaults.headers = { 'Content-Type': 'application/json' };

const App = () => {
  return (
    <USerContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/account' element={<AccountPage />} />
        </Route>
      </Routes>
    </USerContextProvider>
  );
};

export default App;
