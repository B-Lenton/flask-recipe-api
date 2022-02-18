import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import AuthContext from "./context/auth-context";
import RecipeForm from "./components//pages/RecipeForm";
import { Recipes } from "./components/pages/Recipes";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Navbar/Sidebar";
import { Header, useToken } from "./components/Auth";

function App() {

  const { token, removeToken, setToken } = useToken();
  const [recipes, setRecipes] = useState([]);
  const [navToggled, setNavToggled] = useState("false");
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = (token, userId) => {
    setToken(token);
    setUserId(userId);
  }

  const logout = () => {
    setToken(null);
    setUserId(null);
  }
    
  const handleNavToggle = () => {
      setNavToggled(!navToggled);
  }
  
  useEffect(() => {
    fetch("/api/v1/recipes").then(response => 
      response.json().then(data => {
        setRecipes(data.recipes);
      })
    );
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  }

  const [isLogin, setIsLogin] = useState(true);
  const switchModeHandler = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Router>
        <div className="App">
          {isOpen ? (
              <Sidebar isOpen={isOpen} toggle={toggle} />
            ) : (
              <Navbar toggle={toggle} />
          )}

          {!token && token !== "" && token !== undefined ? (
            // TODO: does this need to be routed?
            {isLogin ? (
              <Login setToken={setToken} />
            ) : (
              <Signup />
            )
            <button
              type="button"
              onClick={switchModeHandler}
            >
              Switch to {isLogin ? "Signup" : "Login"}
            </button>
          ) : (
            <section className="container">
              <Routes>
                <Route
                  path="/recipes"
                  element={<Recipes recipes={recipes} />}
                ></Route>
                  <Route
                    path="/create"
                    element={<RecipeForm token={token} setToken={setToken}/>}
                  ></Route>
//                <Route
//                  path="/sign-in"
//                  element={<LoginPage />}
//                ></Route>
              </Routes>
            </section>
          )
        </div>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
