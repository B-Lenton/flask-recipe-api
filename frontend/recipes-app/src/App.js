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
import Navbar from "./components/Navbar";
import Sidebar from "./components/Navbar/Sidebar";

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

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  }

  
  return (
    <Router>
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
            <Route 
              path="/create"
              element={<RecipeForm />}
            ></Route>
          </Routes>
        </section>
      </div>
    </Router>
  );
}

export default App;
