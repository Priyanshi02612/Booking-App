import axios from 'axios';
import { React, createContext, useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';

export const UserContext = createContext();

const USerContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isUserReady, setIsUserReady] = useState(false);

  let apiUrl = API_BASE_URL;
  axios.defaults.baseURL = apiUrl;

  useEffect(() => {
    if (!user) {
      axios.get('/profile').then(({ data }) => {
        setUser(data);
        setIsUserReady(true);
      });
    }
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, isUserReady, setIsUserReady, apiUrl }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default USerContextProvider;
