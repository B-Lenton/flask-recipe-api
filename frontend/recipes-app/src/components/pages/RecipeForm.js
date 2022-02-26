import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./RecipeForm.css"
import { AuthVerify } from "../Auth/AuthVerify";

function RecipeForm(props) {
    const navigate = useNavigate();
    const [recipeName, setRecipeName] = useState("");
    const [recipeDescription, setRecipeDescription] = useState("");
    const [units, setUnits] = useState([]);
    const [message, setMessage] = useState("");
      
    useEffect(() => {
        fetch("/api/v1/recipes/units").then(response => 
            response.json().then(data => {
                setUnits(data);
            })
        );
    }, []);

    /**
     * Handles the state of recipe_name and description onChange. 
     */
    const handleRecipeOverviewChange = e => {
        const { name, value } = e.target;
        if (name === "recipe_name") {
            setRecipeName(value);
        }
        if (name === "description") {
            setRecipeDescription(value);
        }
    };

    /**
     * Ingredients handlers:
     */
    const [ingredientList, setIngredientList] = useState([{
        name: "",
        unit: "",
        quantity: ""
    }]);

    const handleIngredientAdd = () => {
        setIngredientList([...ingredientList, {
            name: "",
            unit: "",
            quantity: ""
        }])
    };

    const handleIngredientRemove = (index) => {
        const list = [...ingredientList];
        list.splice(index, 1);
        setIngredientList(list);
    };

    const handleIngredientChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...ingredientList];
        list[index][name] = value;
        setIngredientList(list);
    };

    /**
     * Method handlers:
     */
    const [methodList, setMethodList] = useState([{
        step_no: 1,
        step: ""
    }]);

    const handleStepAdd = (index) => {
        setMethodList([...methodList, {
            step_no: index + 2,
            step: ""
        }])
    };

    const handleStepRemove = (index) => {
        const list = [...methodList];
        list.splice(index, 1);
        if (index < list.length) {
            for (let i = list.length -1; i >= index; i--) {
                list[i].step_no += -1;
            }
        }
        setMethodList(list);
    };

    const handleMethodChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...methodList];
        list[index][name] = value;
        setMethodList(list);
    };

    let submitHandler = async (e) => {
        e.preventDefault();
        try {
						if (AuthVerify(props.token) == "expired") {
							setMessage("Authentication expired. Save progress and sign in?");
							// TODO: Create separate function for: 
							// - handling option to sign in
							// - saving progress in local storage.
							props.logout();
							navigate("../sign-in", { replace: true })
						}
            axios({
                method: "POST",
                url:"/api/v1/recipes/add",
                data: {
                    recipe_name: recipeName,
                    description: recipeDescription,
                    ingredients: ingredientList,
                    method: methodList
                },
                headers: {
                    Authorization: 'Bearer ' + props.token
                }
              })
              .then((res) => {
                if (res.status === 200 || res.status === 201) {
                    navigate("../recipes", { replace: true });
                    window.location.reload();
                } else {
                    setMessage("An error occurred.");
                }
              }).catch((error) => {
                if (error.response.data.msg === "Token has expired") {
                  setMessage("Authentication failed");
									if (AuthVerify(props.token) == "expired") {
										props.logout();
										navigate("../sign-in", { replace: true })
									}
                }
              })
        } catch (err) {
            throw new Error(err);
        }
    };

    return (
        <form className="recipe-form"
        onSubmit={submitHandler}
        >
            <div className="form-field">
                <label htmlFor="recipe_name">Recipe Name</label>
                <div className="recipe-name">
                    <input
                        type="text"
                        name="recipe_name"
                        value={recipeName}
                        onChange={handleRecipeOverviewChange}
                        placeholder="Recipe Name"
                        required
                    />
                </div>
                <label htmlFor="description">Description</label>
                <div className="description">
                    <textarea
                        type="text"
                        name="description"
                        value={recipeDescription}
                        onChange={handleRecipeOverviewChange}
                        placeholder="Description"
                        required
                    />
                </div>

                <label htmlFor="ingredients">Ingredients</label>
                {ingredientList.map((singleIngredient, index) => (
                    <div key={index} className="ingredients">
                        <div className="first-division">
                            <input
                                type="text"
                                name="name"
                                // value={ingredients}
                                // onChange={this.changeHandler}
                                placeholder="Ingredient"
                                value={singleIngredient.name}
                                onChange={(e) => handleIngredientChange(e, index)}
                                required
                            />
                            <select
                                name="unit"
                                value={singleIngredient.unit}
                                onChange={(e) => handleIngredientChange(e, index)}
                                required
                            >
                                <option>Select Quantity</option>
                                {units.map((unit, index) => {
                                    return (
                                        <option 
                                            key={index} 
                                            value={unit.measurement_type}
                                        >
                                            {unit.measurement_type}
                                        </option>
                                    )
                                })}
                            </select>
                            <input
                                type="text"
                                name="quantity"
                                // value={ingredients}
                                // onChange={this.changeHandler}
                                placeholder="Quantity"
                                value={singleIngredient.quantity}
                                onChange={(e) => handleIngredientChange(e, index)}
                                required
                            />
                            {ingredientList.length - 1 === index && (
                                <button type="button" className="add-btn" onClick={handleIngredientAdd}>
                                    New Ingredient
                                </button>
                            )}
                        </div>
                        <div className="second-division">
                            {ingredientList.length > 1 && (
                                <button type="button" className="remove-btn" onClick={() => handleIngredientRemove(index)}>
                                    Remove
                                </button>
                            )}
                        </div>
                    </div>
                ))}

                <label htmlFor="method">Method</label>
                {methodList.map((singleMethod, index) => (
                    <div key={index} className="method">
                        <div className="first-division">
                            <input
                                type="number"
                                name="step_no"
                                placeholder={singleMethod.step_no}
                                value={singleMethod.step_no}
                                required
                                disabled
                            />
                            <input
                                type="text"
                                name="step"
                                placeholder="Step Instructions"
                                value={singleMethod.step}
                                onChange={(e) => handleMethodChange(e, index)}
                                required
                            />
                            {methodList.length - 1 === index && (
                                <button type="button" className="add-btn" onClick={() => handleStepAdd(index)}>
                                    New Step
                                </button>
                            )}
                        </div>
                        <div className="second-division">
                            {methodList.length > 1 && (
                                <button type="button" className="remove-btn" onClick={() => handleStepRemove(index)}>
                                    Remove
                                </button>
                            )}
                        </div>
                    </div>
                ))}
                <button type="submit" className="submit-btn">
                    Publish Recipe
                </button>

                <div className="message">
                    {message ? <p>{message}</p> : null}
                </div>
            </div>
        </form>
    )
}

export default RecipeForm;
