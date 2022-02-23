import React from "react";

import "./Recipes.css";

export const Recipes = ({ recipes }) => {
  return (
    <section className="card-container">
        { recipes.map(recipe => {
          return (
            <div key={recipe.recipe_id} className="card-item">
              <div className="card u-clearfix">
                <div className="card-body">
                  <span className="card-number card-circle subtle">{recipe.recipe_id}</span>
                  <span className="card-author subtle">{recipe.creator}</span>
                  <h2 className="card-title">{recipe.recipe_name}</h2>
                  <span className="card-description subtle">{recipe.description}</span>
                  <div className="card-read">Read</div>
                </div>
                <img src="https://s15.postimg.cc/temvv7u4r/recipe.jpg" alt="" className="card-media" />
              </div>
              <div className="card-shadow"></div>
            </div>
          )
        })}
    </section>
  )
}