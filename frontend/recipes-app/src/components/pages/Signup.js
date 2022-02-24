import { useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import "./Auth.css";

function Signup(props) {
  let navigate = useNavigate();

  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: ""
  })

  function signUp(event) {
    event.preventDefault();

    axios({
      method: "POST",
      url:"/api/v1/auth/register",
      data: {
        name: signupForm.name,
        email: signupForm.email,
        password: signupForm.password
      }
    })
    .then((response) => {
      props.setToken(response.data.access_token);
    }).catch((error) => {
      if (error.response) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    })

    setSignupForm(
      ({
        name: "",
        email: "",
        password: ""
      })
    );

    navigate("../recipes", { replace: true });
  }

  function handleChange(event) {
    const {value, name} = event.target;
    setSignupForm(prevState => ({
        ...prevState, [name]: value})
  )}

  return (
    <div>
      <h1>Sign Up</h1>
      <form className="signup auth-form">
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <input onChange={handleChange}
            type="name"
            text={signupForm.name}
            name="name"
            placeholder="Name"
            value={signupForm.name} />
        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input onChange={handleChange}
            type="email"
            text={signupForm.email}
            name="email"
            placeholder="Email"
            value={signupForm.email} />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input onChange={handleChange}
            type="password"
            text={signupForm.password}
            name="password"
            placeholder="Password"
            value={signupForm.password} />
        </div>
        <div className="form-actions">
          <button onClick={signUp}>Submit</button>
        </div>
        <div className="sign-in-link">
          <Link to="/sign-in">
            Already have an account? Login Now
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
