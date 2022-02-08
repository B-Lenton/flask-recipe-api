import React from "react";

export const Recipes = ({ recipes }) => {
    return (
        <ul>
            { recipes.map(recipe => {
            return (
                <li key={recipe.recipe_id}>
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
    )
}