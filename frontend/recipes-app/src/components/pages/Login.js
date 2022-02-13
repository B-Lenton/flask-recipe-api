import React, { useContext, useState } from "react";
import { Buffer } from "bu"

import "./Login.css";
import AuthContext from "../../context/auth-context";

function LoginPage() {

    const authContext = useContext(AuthContext);
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const switchModeHandler = () => {
        setIsLogin(!isLogin);
    };

    const changeHandler = (event) => {
        const { name, value } = event.target;

        if (name === "name") {
            console.log(name, value);
            setName(value);
        }
        if (name === "email") {
            console.log(name, value);
            setEmail(value);
        }
        if (name === "password") {
            console.log(name, value);
            setPassword(value);
        }
    }

    let submitHandler = async (event) => {
        event.preventDefault();

        // try {
            let res;
            if (isLogin) {
                const encodedUsername = Buffer.from(email).toString('base64');
                const encodedPassword = Buffer.from(password).toString('base64');
                let requestBody = {
                    username: encodedUsername,
                    password: encodedPassword
                };
                console.log(requestBody);
                res = await fetch("/api/v1/auth/login", {
                    method: "POST",
                    body: JSON.stringify(requestBody),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Basic" + requestBody
                    }
                });
                console.log(res);
                console.log(res.headers);
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
        // } catch (err) {
        //     throw new Error(err);
        // }
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
                <button type="button" onClick={switchModeHandler}>Switch to {isLogin ? "Signup" : "Login"}</button>
            </div>
        </form>
    );
}

export default LoginPage;