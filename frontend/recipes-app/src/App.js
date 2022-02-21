import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
// import AuthContext from "./context/auth-context";
import RecipeForm from "./components//pages/RecipeForm";
import { Recipes } from "./components/pages/Recipes";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Navbar from "./components/Navbar/index";
import Sidebar from "./components/Navbar/Sidebar";
import Header from "./components/Auth/Header";
import useToken from "./components/Auth/useToken";


function App() {

  const { token, removeToken, setToken } = useToken();
  const [recipes, setRecipes] = useState([]);
  const [navToggled, setNavToggled] = useState("false");
  // const [token, setToken] = useState(null);
  // const [userId, setUserId] = useState(null);

  // const login = (token, userId) => {
  //   setToken(token);
  //   setUserId(userId);
  // }

  // const logout = () => {
  //   setToken(null);
  //   setUserId(null);
  // }
    
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

  // const [isLogin, setIsLogin] = useState(true);
  // const switchModeHandler = () => {
  //   setIsLogin(!isLogin);
  // };

  return (
    <Router>
      <div className="App">
        {isOpen ? (
            <Sidebar isOpen={isOpen} toggle={toggle} />
          ) : (
            <Navbar toggle={toggle} />
        )}

        <Routes>
          {!token && token !== "" && token !== undefined ? (
            <>
              <Route
                path="/sign-in"
                element={<Login setToken={setToken} />}
              ></Route>
              <Route
                path="/sign-up"
                element={<Signup />}
              ></Route>
            </>
                
          ) : (
              <>
                  <Route
                    path="/recipes"
                    element={<Recipes recipes={recipes} />}
                  ></Route>
                    <Route
                      path="/create"
                      element={<RecipeForm token={token} setToken={setToken}/>}
                    ></Route>
              </>
          )}            
        </Routes>
      </div>
    </Router>
  );
}

export default App;
