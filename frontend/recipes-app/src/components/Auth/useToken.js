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
  
  function getRefreshToken() {
    const userRefreshToken = localStorage.getItem('refresh_token');
    return userRefreshToken && userRefreshToken;
  };

  const [refreshToken, setRefreshToken] = useState(getRefreshToken());

  function saveRefreshToken(userRefreshToken) {
    localStorage.setItem('refresh_token', userRefreshToken);
    setRefreshToken(userRefreshToken);
  };

  function removeToken() {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    setToken(null);
    setRefreshToken(null);
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