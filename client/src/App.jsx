import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Layout from './components/Layout';
import axios from 'axios';
import USerContextProvider from './context/UserContext';
import AccountPage from './pages/AccountPage';
import ProfilePage from './pages/ProfilePage';
import PlaceContextProvider from './context/PlaceContext';
import IndexPage from './pages/IndexPage';
import PlaceDetails from './components/PlaceDetails';
import BookingsPage from './pages/BookingsPage';
import BookingPage from './pages/BookingPage';

axios.defaults.withCredentials = true;
axios.defaults.headers = { 'Content-Type': 'application/json' };

const App = () => {
  return (
    <USerContextProvider>
      <PlaceContextProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<IndexPage />} />
            <Route path='/account' element={<AccountPage />}>
              <Route path='/account/profile' element={<ProfilePage />} />
              <Route path='/account/bookings' element={<BookingsPage />} />
              <Route path='/account/bookings/:id' element={<BookingPage />} />
            </Route>
            <Route path='/place/:id' element={<PlaceDetails />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
          </Route>
        </Routes>
      </PlaceContextProvider>
    </USerContextProvider>
  );
};

export default App;
