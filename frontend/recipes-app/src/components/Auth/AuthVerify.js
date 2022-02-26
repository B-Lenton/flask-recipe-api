import { useNavigate } from "react-router-dom";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

export function AuthVerify(jwt) {
    const decodedJwt = parseJwt(jwt);
    if (decodedJwt.exp * 1000 < Date.now()) {
      console.log("expired!")
      return "expired";
      // navigate("../logout", { replace: true})
      // navigate("../login", { replace: true})
  } else {
    console.log("not expired!");
  }
  return null;
};
