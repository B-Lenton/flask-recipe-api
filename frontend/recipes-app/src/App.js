import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import RecipeForm from "./components/RecipeForm";
import { Recipes } from "./components/Recipes";
import NavBar from "./components/Navbar/index";
import { StyledToggle } from "./components/Navbar/NavbarElements";
import RightNav from "./components/Navbar/RightNav";

function App() {
  const [recipes, setRecipes] = useState([]);

  const [navToggled, setNavToggled] = useState("false");
    
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

  
  return (
    <Router>
      {navToggled ? (
        <NavBar handleNavToggle={handleNavToggle}/>
      ) : <RightNav handleNavToggle={handleNavToggle}/> }
      <div className="App">
        <section className="container">
          <Routes>
            <Route 
              path="recipes"
              element={<Recipes recipes={recipes}/>}
            ></Route>
            <Route 
              path="create"
              element={<RecipeForm />}
            ></Route>
          </Routes>
        </section>
      </div>
    </Router>
  );
}

export default App;
