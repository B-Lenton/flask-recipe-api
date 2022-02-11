import React from "react";

import "./Recipes.css";

export const Recipes = ({ recipes }) => {
    return (
        <section className="recipes__container">
            <ul className="recipes__list">
                { recipes.map(recipe => {
                return (
                    <li key={recipe.recipe_id} className="recipes__list-item">
                        <h1 key={recipe.recipe_id + recipe.recipe_name}>
                            {recipe.recipe_name}
                        </h1>
                        <h4 key={recipe.recipe_id + recipe.creator}>
                            {recipe.creator}
                        </h4>
                        <p key={recipe.recipe_id + recipe.recipe_description}>
                            {recipe.description}
                        </p>
                    </li>
                )
                })}
            </ul>
        </section>
    )
}