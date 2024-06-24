import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Layout from './components/Layout';
import axios from 'axios';
import USerContextProvider from './context/UserContext';
import AccountPage from './pages/AccountPage';
import PlacesPage from './pages/PlacesPage';
import ProfilePage from './pages/ProfilePage';
import PlaceForm from './pages/PlaceForm';
import PlaceContextProvider from './context/PlaceContext';
import IndexPage from './pages/IndexPage';
import PlaceDetails from './components/PlaceDetails';

axios.defaults.baseURL = 'http://localhost:4002';
axios.defaults.withCredentials = true;
axios.defaults.headers = { 'Content-Type': 'application/json' };

const App = () => {
  return (
    <USerContextProvider>
      <PlaceContextProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<IndexPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/account' element={<AccountPage />}>
              <Route path='/account/profile' element={<ProfilePage />} />
              <Route path='/account/bookings' element={<ProfilePage />} />
              <Route path='/account/places' element={<PlacesPage />} />
              <Route path='/account/places/new' element={<PlaceForm />} />
              <Route path='/account/places/:id' element={<PlaceForm />} />
            </Route>
            <Route path='/place/:id' element={<PlaceDetails />} />
          </Route>
        </Routes>
      </PlaceContextProvider>
    </USerContextProvider>
  );
};

export default App;
