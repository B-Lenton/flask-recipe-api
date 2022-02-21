import { useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";

import "./Auth.css";

function Signup(props) {

    const [message, setMessage] = useState("");

    const [signupForm, setSignupForm] = useState({
      name: "",
      email: "",
      password: ""
    })

    function signUp(event) {
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
        // TODO: revisit register API endpoint - what happens there?
        props.setToken(response.data.access_token);
        setMessage("Signup successful");
      }).catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
          setMessage("Signup failed");
        }
      })

      setSignupForm(
        ({
          name: "",
          email: "",
          password: ""
        })
      );

      event.preventDefault();
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
          <div className="sign-up-link">
            <Link to="/sign-in">
              Already have an account? Login Now
            </Link>
          </div>
          <div className="message">
            {message ? <p>{message}</p> : null}
          </div>
        </form>
      </div>
    );
}

export default Signup;
