import axios from "axios";

function Logout(props) {

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
  }

    return(
        <div className="App-header">
            <button onClick={logOut}>
                Logout
            </button>
        </div>
    )
}

export default Logout;
