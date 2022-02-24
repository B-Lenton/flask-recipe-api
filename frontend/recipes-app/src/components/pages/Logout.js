import axios from "axios";
import { useNavigate } from "react-router-dom";

import useToken from "../Auth/useToken";
import "./Auth.css";

function Logout(props) {
  const { removeToken } = useToken();
  const navigate = useNavigate();

  function logOut() {
    axios({
      method: "POST",
      url:"/api/v1/auth/logout",
    })
    .then((response) => {
       props.token();
    }).catch((error) => {
      if (error.response) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    });

    removeToken();
    navigate("../sign-in", { replace: true });
    window.location.reload();
  }

    return(
        <div className="App-header">
            <button className="logout-btn" onClick={logOut}>
                Logout
            </button>
        </div>
    )
}

export default Logout;
