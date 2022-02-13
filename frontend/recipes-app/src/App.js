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
import LoginPage from "./components/pages/Login";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Navbar/Sidebar";

function App() {

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

  return (
    <Router>
      <AuthContext.Provider
        value={{
          token: token,
          userId: userId,
          login: login,
          logout: logout
        }}
      >
        {isOpen ? (
          <Sidebar isOpen={isOpen} toggle={toggle} />
        ) : (
          <Navbar toggle={toggle} />
        )}
        <div className="App">
          <section className="container">
            <Routes>
              <Route 
                path="/recipes"
                element={<Recipes recipes={recipes} />}
              ></Route>
              {token && (
                <Route 
                  path="/create"
                  element={<RecipeForm />}
                ></Route>
              )}
              <Route 
                path="/sign-in"
                element={<LoginPage />}
              ></Route>
            </Routes>
          </section>
        </div>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
