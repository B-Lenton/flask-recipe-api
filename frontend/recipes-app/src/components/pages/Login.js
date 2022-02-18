import "./Login.css";

    const [message, setMessage] = useState("");

import { useState } from 'react';
import axios from "axios";

function Login(props) {

    const [loginForm, setLoginForm] = useState({
      name: "",
      email: "",
      password: ""
    })

    function logIn(event) {
      axios({
        method: "POST",
        url:"/login",
        data:{
          name: loginForm.name,
          email: loginForm.email,
          password: loginForm.password
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

      setLoginForm(
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
      setLoginForm(prevState => ({
          ...prevState, [name]: value})
    )}

    return (
      <div>
        <h1>Login</h1>
          <form className="login">
            <input onChange={handleChange}
                  type="name"
                  text={loginForm.name}
                  name="name"
                  placeholder="Name"
                  value={loginForm.name} />
            <input onChange={handleChange}
                  type="email"
                  text={loginForm.email}
                  name="email"
                  placeholder="Email"
                  value={loginForm.email} />
            <input onChange={handleChange}
                  type="password"
                  text={loginForm.password}
                  name="password"
                  placeholder="Password"
                  value={loginForm.password} />

          <button onClick={logIn}>Submit</button>
        </form>
      </div>
    );
}

export default Login;



        try {
            let res;
            if (isLogin) {
                let requestBody = {
                    username: email,
                    password: password
                };
                console.log(requestBody);
                res = await fetch("/api/v1/auth/login", {
                    method: "POST",
                    body: JSON.stringify(requestBody),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                console.log(res);
            }
            if (!isLogin) {
                let requestBody = {
                    name: name,
                    email: email,
                    password: password
                };
                console.log(requestBody);
                res = await fetch("/api/v1/auth/register", {
                    // configure the request
                    method: "POST",
                    body: JSON.stringify(requestBody),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                console.log(res);
            }

            let resJson = await res.json()
            if (res.status === 200 || res.status === 201) {
                console.log(res);
                console.log(resJson);
            } else {
                setMessage("Incorrect email or password entered.");
                console.log(res);
                console.log(resJson);
            }
            if (resJson.login.token) {
                authContext.login(
                    resJson.login.token, 
                    resJson.login.userId, 
                );
                setName("");
                setEmail("");
                setPassword("");
            }
        } catch (err) {
            throw new Error(err);
        }
    }

    return (
        <form className="auth-form" onSubmit={submitHandler}>
            {!isLogin && (
                <div className="form-control">
                    <label htmlFor="name">Name</label>
                    <input 
                        name="name"
                        type="name" 
                        id="name"
                        onChange={changeHandler}
                        placeholder="Name"
                        required
                    ></input>
                </div>
            )}
            <div className="form-control">
                <label htmlFor="email">Email</label>
                <input 
                    name="email"
                    type="email" 
                    id="email"
                    onChange={changeHandler}
                    placeholder="Email address"
                    required
                ></input>
            </div>
            <div className="form-control">
                <label htmlFor="password">Password</label>
                <input 
                    name="password"
                    type="password" 
                    id="password"
                    onChange={changeHandler}
                    placeholder="Password"
                    required
                ></input>
            </div>
            <div className="form-actions">
                <button type="submit">Submit</button>
            </div>
        </form>
    );
}

export default LoginPage;