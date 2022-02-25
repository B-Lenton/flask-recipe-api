import React from "react";

import "./Recipes.css";

export const Recipes = ({ recipes }) => {
  return (
    <section className="recipe-card-container">
        { recipes.map(recipe => {
          return (
            <a href={`/recipes/${recipe.recipe_id}`} key={recipe.recipe_id} className="recipe-card-item">
              <div className="recipe-card u-clearfix">
                <div className="recipe-card-body">
                  <span className="recipe-card-number recipe-card-circle subtle">{recipe.recipe_id}</span>
                  <span className="recipe-card-author subtle">{recipe.creator}</span>
                  <h2 className="recipe-card-title">
                    {recipe.recipe_name}
                  </h2>
                  <span className="recipe-card-description subtle">
                    {recipe.description}
                  </span>
                  <button className="recipe-card-read">View</button>
                </div>
                <img src="https://s15.postimg.cc/temvv7u4r/recipe.jpg" alt="" className="recipe-card-media" />
              </div>
              <div className="recipe-card-shadow"></div>
            </a>
          )
        })}
    </section>
  )
}