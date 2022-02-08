import React, { useEffect, useState } from "react";

import './App.css';
import { RecipeForm } from "./components/RecipeForm";
import { Recipes } from "./components/Recipes";

function App() {
  const [recipes, setRecipes] = useState([]);
  
  useEffect(() => {
    fetch("/api/v1/recipes").then(response => 
      response.json().then(data => {
        setRecipes(data.recipes);
      })
    );
  }, []);

  
  return (
    <div className="App">
      <section className="container">
        <RecipeForm />
        <Recipes recipes={recipes}/>
      </section>
    </div>
  );
}

export default App;
