import { React, createContext, useState } from 'react';

export const UserContext = createContext();

const USerContextProvider = ({ children }) => {
  const [user, setUser] = useState(
    localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null
  );

  const [isUserReady, setIsUserReady] = useState(false);

  return (
    <UserContext.Provider
      value={{ user, setUser, isUserReady, setIsUserReady }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default USerContextProvider;
