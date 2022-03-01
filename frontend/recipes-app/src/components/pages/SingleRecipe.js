import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import uuid from 'react-uuid';

import "./SingleRecipe.css";

const SingleRecipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [method, setMethod] = useState([]);

  useEffect(() => {
    fetch(`/api/v1/recipes/${id}`).then(response => 
      response.json().then(data => {
        setRecipe(data);
        setIngredients(data.ingredients);
        setMethod(data.method);
      })
    );
  }, []);

  return (
    // Credit: Adapted from https://codepen.io/UliTroyo/pen/MWpPrdQ
    <main className='recipe-main'>
      <section className='recipe-container'>
        <h1>{recipe.recipe_name}</h1>
        <figure>
          <img src="https://images.unsplash.com/photo-1593253787226-567eda4ad32d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2434&q=80" alt="spaghetti with pesto sauce and cherry tomatoes." />

          {/* Make below a clickable link to user profile (endpoint exists) */}
          <figcaption>Recipe by {recipe.name}</figcaption>
        </figure>

        <div className="description">
          <p>{recipe.description}</p>
          <figure>
            <img src="https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="tomato halves surrounded by basil leaves and peppercorns." />

            {/* <figcaption>Recipe by {recipe.creator}</figcaption> */}
          </figure>
        </div>

        <div className="recipe_details">
          <ul>
            <li>Servings: 4</li>
            <li>Prep Time: 5 minutes</li>
            <li>Cook Time: 25 minutes</li>
            <li>Total Time: 30 minutes</li>
          </ul>
        </div>
        <h2>The Ingredients</h2>
        <ul className="ingredients">
        {ingredients.map(ingredient => {
            let key_id = uuid();
            return (
              <React.Fragment key={key_id}>
                <li key={ingredient.name + key_id}>
                  <span className='ingredient-name'>
                    {ingredient.name}:&nbsp;
                  </span>
                  <span>
                    {ingredient.quantity}&nbsp;
                  </span>
                  <span>
                    {ingredient.unit}
                  </span>
                </li>
              </React.Fragment>
            )
          })}
        </ul>

        {/* <p className="variation">Variation: Got no time, or no fresh basil? Use a 6 ounce jar of prepared pesto instead.</p> */}

        <h2>The Process</h2>
        <ol className="instructions">
          {method.map(step => {
              return (
                <React.Fragment key={uuid()}>
                  <li key={step.step_no}>
                    <span>
                      {step.step}
                    </span>
                  </li>
                </React.Fragment>
              )
            })}
        </ol>
      </section>
    </main>
  )
}

export default SingleRecipe;