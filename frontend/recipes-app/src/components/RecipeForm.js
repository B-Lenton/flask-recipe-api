import React, { useState } from "react";

export const RecipeForm = () => {
    const [inputList, setInputList] = useState({
        recipe_name: "",
        description: "",
        ingredients: [
            {
                name: "",
                unit: "",
                quantity: ""
            }
        ],
        method: [
            {
                step_no: 1,
                step: ""
            }
        ]
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setInputList({
            ...inputList,
            [name]: value
        });
    }

    // const [title, setTitle] = useState('');
    // const [description, setDescription] = useState('');
    // const [ingredients, setIngredients] = useState('');

    return (
        <form action="" method="post">
            <input 
                type="text" 
                name="Title" 
                id="title" 
                placeholder="Recipe Title" 
                value={ inputList.recipe_name }
                onChange={handleChange}
            />
            <input 
                type="text" 
                name="Description" 
                id="description" 
                placeholder="Description" 
                value={ inputList.description } 
                onChange={handleChange}
            />
            {/* TODO: needs an input wrapper with value as below, so then a list of ingredients can be created (and separate fields for quantity etc) */}
            <input 
                type="text" 
                name="Ingredients" 
                id="ingredients" 
                placeholder="Ingredients" 
                value={ inputList.ingredients } 
                onChange={handleChange}
            />
            {/* checking output: */}
            <pre>
                {console.log(inputList)}
            </pre>

            <button type="submit" value="Add Recipe">Publish Recipe</button>
        </form>
    )
}