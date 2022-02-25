import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import PrivateRoute from "./components/Auth/PrivateRoute";
import PublicRoute from "./components/Auth/PublicRoute";
import RecipeForm from "./components//pages/RecipeForm";
import { Recipes } from "./components/pages/Recipes";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Navbar from "./components/Navbar/index";
import Sidebar from "./components/Navbar/Sidebar";
import useToken from "./components/Auth/useToken";
import SingleRecipe from "./components/pages/SingleRecipe";
import HomePage from "./components/pages/HomePage";

// TODO: Original token remains in local storage after refresh on the backend
// Need to set a timeout to check for new token on frontend maybe?

function App() {

  useEffect(() => {
    fetch("/api/v1/recipes").then(response => 
      response.json().then(data => {
        setRecipes(data.recipes);
      })
    );
  }, []);

  const { token, setToken } = useToken();
  const [recipes, setRecipes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  }

  return (
    <Router>
      <div className="App">
        {isOpen ? (
            <Sidebar isOpen={isOpen} toggle={toggle} token={token} />
          ) : (
            <Navbar toggle={toggle} token={token} />
        )}
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          ></Route>
          <Route
            path="/sign-in"
            element={
              <PublicRoute>
                <Login setToken={setToken} />
              </PublicRoute>
            }
          ></Route>
          <Route
            path="/sign-up"
            element={
              <PublicRoute>
                <Signup setToken={setToken} />
              </PublicRoute>
            }
          ></Route>
          <Route
            path="/create"
            element={
              <PrivateRoute>
                <RecipeForm token={token} setToken={setToken}/>
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="recipes/:id"
            element={
              <PrivateRoute>
                <SingleRecipe />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/recipes"
            element={<Recipes recipes={recipes} />}
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
