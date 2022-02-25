import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import uuid from 'react-uuid';

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
    <section className='recipe-container'>
      <h1>
        {recipe.recipe_name}
      </h1>
      <h3>
        {recipe.description}
      </h3>
      <ul>
        {ingredients.map(ingredient => {
          let key_id = uuid();
          return (
            <React.Fragment key={key_id}>
              <li key={ingredient.name + key_id}>
                {ingredient.name}
              </li>
              <li key={ingredient.quantity + key_id}>
                {ingredient.quantity}
              </li>
              <li key={ingredient.unit + key_id}>
                {ingredient.unit}
              </li>
            </React.Fragment>
          )
        })}
        {/* Beans on Toast
        A British staple, on standby for breakfast, lunch, or dinner!
        Empty beans into pot, add tomato puree, cook for 3-5 mins. 
        Put both slices of bread into the toaster and pop down.
        Once toasted, remove bread from toaster and spread with marmite.
        Turn off hob and poured beans lavishly over your toast. */}
        {method.map(step => {
          let key_id = uuid();
          return (
            <React.Fragment key={key_id}>
              <li key={step.step_no + key_id}>
                <span>
                  {step.step_no}
                </span>
                <span>
                  {step.step}
                </span>
              </li>
            </React.Fragment>
          )
        })}
      </ul>
    </section>
  )
}

export default SingleRecipe;