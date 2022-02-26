import { useState } from 'react';

function useToken() {

  function getToken() {
    const userToken = localStorage.getItem('token');
    return userToken && userToken;
  }

  const [token, setToken] = useState(getToken());
  
  function saveToken(userToken) {
    localStorage.setItem('token', userToken);
    setToken(userToken);
  };
  
  function removeToken() {
    localStorage.removeItem("token");
    setToken(null);
  };

  function getRefreshToken() {
    const userRefreshToken = localStorage.getItem('refresh_token');
    return userRefreshToken && userRefreshToken;
  };

  const [refreshToken, setRefreshToken] = useState(getRefreshToken());

  function saveRefreshToken(userRefreshToken) {
    localStorage.setItem('refresh_token', userRefreshToken);
    setRefreshToken(userRefreshToken);
  };

  return {
    setToken: saveToken,
    token,
    removeToken,
    setRefreshToken: saveRefreshToken,
    refreshToken
  }

}

export default useToken;