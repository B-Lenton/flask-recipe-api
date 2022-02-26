import axios from "axios";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

export async function AuthVerify(jwt, refreshToken) {
 
  const decodedJwt = parseJwt(jwt);

  if (decodedJwt.exp * 1000 < Date.now()) {
    let response = await axios({
      method: "POST",
      url:"/api/v1/auth/refresh",
      headers: {
        Authorization: 'Bearer ' + refreshToken
      }
    });
    let res = new Object();
    res.token = response.data.access_token;
    return res;
  } else {
    console.log("not expired!");
  }
};
