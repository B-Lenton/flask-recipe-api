import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import RecipeForm from "./components//pages/RecipeForm";
import { Recipes } from "./components/pages/Recipes";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Navbar from "./components/Navbar/index";
import Sidebar from "./components/Navbar/Sidebar";
import useToken from "./components/Auth/useToken";


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
          {!token && token !== "" && token !== undefined ? (
            <>
              <Route
                path="/sign-in"
                element={<Login setToken={setToken} />}
              ></Route>
              <Route
                path="/sign-up"
                element={<Signup setToken={setToken} />}
              ></Route>
            </>
          ) : (
            <Route
            path="/create"
            element={<RecipeForm token={token} setToken={setToken}/>}
            ></Route>
          )}            
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
