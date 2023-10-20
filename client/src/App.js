
import React, { useState, useEffect } from 'react';
import Router from './router';
import AuthContext from './shared/authContext';
import Footer from './components/footer';
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(null);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [openedModal, setOpenedModal] = useState(null);
  const [expirationDate, setExpirationDate] = useState(null);

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem('userData'));

    if (localData && localData.token && new Date(localData.expiration) > new Date()) {
      login(localData.id, localData.token, localData.name, new Date(localData.expiration));
    }
  }, []);

  const login = (id, token, name, expire) => {
    setIsLoggedIn(true);
    setUserName(name);
    setUserId(id);
    setToken(token);

    const tokenExpirationDate = expire || new Date(new Date().getTime() + 1000 * 60 * 60);
    setExpirationDate(tokenExpirationDate);

    localStorage.setItem(
      'userData',
      JSON.stringify({ id: id, token: token, name: name, expiration: tokenExpirationDate.toISOString() })
    );
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserName(null);
    setUserId(null);
    setToken(null);
    setExpirationDate(null);

    localStorage.removeItem('userData');
  };

  const openModalS = () => {
    setOpenedModal('signup');
  };

  const openModalL = () => {
    setOpenedModal('login');
  };

  const closeModal = () => {
    setOpenedModal(undefined);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        userId: userId,
        userName: userName,
        token: token,
        openedModal: openedModal,
        login: login,
        logout: logout,
        openModalS: openModalS,
        openModalL: openModalL,
        closeModal: closeModal,
      }}
    >
      <Router />
      <Footer></Footer>
    </AuthContext.Provider>
  );
};

export default App;
