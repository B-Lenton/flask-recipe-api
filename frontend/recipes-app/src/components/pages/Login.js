import { useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import "./Auth.css";


function Login(props) {
  let navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  })

  function logIn(event) {

    event.preventDefault();
    
    axios({
      method: "POST",
      url:"/api/v1/auth/login",
      data: {
        email: loginForm.email,
        password: loginForm.password
      }
    })
    .then((res) => {
      props.setToken(res.data.access_token);
      props.setRefreshToken(res.data.refresh_token);
    }).catch((error) => {
      if (error.response) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    })
        
    setLoginForm(
      ({
        email: "",
        password: ""
      })
    );
      
    navigate("../recipes", { replace: true });
  }

  function handleChange(event) {
    const {value, name} = event.target;
    setLoginForm(prevState => ({
        ...prevState, [name]: value})
  )}

  return (
    <div>
      <h1>Login</h1>
      <form className="login auth-form">
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input onChange={handleChange}
            type="email"
            text={loginForm.email}
            name="email"
            placeholder="Email"
            value={loginForm.email} />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input onChange={handleChange}
            type="password"
            text={loginForm.password}
            name="password"
            placeholder="Password"
            value={loginForm.password} />
        </div>
        <div className="form-actions">
          <button onClick={logIn}>Submit</button>
        </div>
        <div className="sign-up-link">
          <Link to="/sign-up">
            Don't have an account? Register Now
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
