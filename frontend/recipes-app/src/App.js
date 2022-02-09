import React, { useEffect, useState } from "react";

// TODO: run 'npm i semantic-ui-react semantic-ui-css' in recipe-app/frontend/recipes-app THEN import into index.js and use (https://www.youtube.com/watch?v=06pWsB_hoD4)

import './App.css';
import RecipeForm from "./components/RecipeForm";
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
        <Recipes recipes={recipes}/>
        <RecipeForm />
      </section>
    </div>
  );
}

export default App;
