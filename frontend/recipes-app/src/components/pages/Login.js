import { useState } from 'react';
import axios from "axios";

import "./Auth.css";


function Login(props) {

    const [message, setMessage] = useState("");

    const [loginForm, setLoginForm] = useState({
      email: "",
      password: ""
    })

    function logIn(event) {
      axios({
        method: "POST",
        url:"/api/v1/auth/login",
        data: {
          email: loginForm.email,
          password: loginForm.password
        }
      })
      .then((response) => {
        props.setToken(response.data.access_token);
        setMessage("Login successful");
      }).catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
          setMessage("Login failed");
        }
      })

      setLoginForm(
        ({
          email: "",
          password: ""
        })
      );

      event.preventDefault();
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
          <div className="message">
            {message ? <p>{message}</p> : null}
          </div>
        </form>
      </div>
    );
}

export default Login;
