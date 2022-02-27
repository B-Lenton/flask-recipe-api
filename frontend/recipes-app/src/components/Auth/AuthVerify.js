import axios from "axios";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

export function CheckTokenExpiry(jwt) {
 
  const decodedJwt = parseJwt(jwt);

  if (decodedJwt.exp * 1000 < Date.now()) {
    return true;
  } else {
    return false;
  }
};

export async function RefreshToken(refreshToken) {
  let res = {};
  try {
    let response = await axios({
      method: "POST",
      url:"/api/v1/auth/refresh",
      headers: {
        Authorization: 'Bearer ' + refreshToken
      }
    });
    res.token = response.data.access_token;
    return res;
  } catch (err) {
    console.log(err);
  }
};
