import axios from 'axios';
import { React, createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

const USerContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isUserReady, setIsUserReady] = useState(false);

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
      value={{ user, setUser, isUserReady, setIsUserReady }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default USerContextProvider;
