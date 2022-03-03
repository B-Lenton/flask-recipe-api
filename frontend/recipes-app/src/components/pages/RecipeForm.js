import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./RecipeForm.css";
import { CheckTokenExpiry, RefreshToken } from "../Auth/AuthVerify";
import useToken from "../Auth/useToken";

function RecipeForm() {
  const navigate = useNavigate();
  const [recipeName, setRecipeName] = useState("");
  const [recipeDescription, setRecipeDescription] = useState("");
  const [units, setUnits] = useState([]);
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const { setToken, token, refreshToken } = useToken();

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

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  }

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
      for (let i = list.length - 1; i >= index; i--) {
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

  let checkToken = async () => {
    if (CheckTokenExpiry(token)) {
      let refresh = await RefreshToken(refreshToken);
      setToken(refresh.token);
      return refresh.token;
    };
  };

  let submitHandler = (e) => {
    e.preventDefault();
    try {
      checkToken().then((refreshedToken) => {
        let jwt;
        if (refreshedToken) {
          jwt = refreshedToken;
        } else {
          jwt = token;
        };
        axios({
          method: "POST",
          url:"/api/v1/recipes/add",
          data: {
            recipe_name: recipeName,
            description: recipeDescription,
            ingredients: ingredientList,
            method: methodList,
            image: image
          },
          headers: {
            Authorization: 'Bearer ' + jwt
          }
        })
        .then(res => {
          if (res.status === 200 || res.status === 201) {
            navigate("../recipes", { replace: true });
            window.location.reload();
          } else {
            setMessage("An error occurred.");
          }
        })
      })
    } catch (err) {
      console.log(err);
    }
  };

  return (
    // TODO: Make semantically correct and style!
    <form className="recipe-form"
      onSubmit={submitHandler}
    >
      <div className="form-field">
        <fieldset>
          {/* TODO: Display none on legends */}
          <legend>Basic Recipe Details</legend>
          <label htmlFor="recipe_name">Recipe Name</label>
          {/* TODO: don't need divs */}
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
          <div className="image">
            <input
              type="file"
              id="image"
              accept="image/png, image/jpeg"
              name="image"
              onChange={handleImageChange}
              placeholder="Image Upload"
              required
            />
          </div>
        </fieldset>

        <fieldset>
          <legend>Ingredient List</legend>
          <label htmlFor="ingredients">Ingredients</label>
          {ingredientList.map((singleIngredient, index) => (
            <div key={index} className="ingredients-list">
              <div className="first-division">
                <input
                  type="text"
                  name="name"
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
                  placeholder="Quantity"
                  value={singleIngredient.quantity}
                  onChange={(e) => handleIngredientChange(e, index)}
                  required
                />
                {ingredientList.length - 1 === index && (
                  <button 
                    type="button" 
                    className="add-btn" 
                    onClick={handleIngredientAdd}
                  >
                    New Ingredient
                  </button>
                )}
              </div>
              <div className="second-division">
                {ingredientList.length > 1 && (
                  <button 
                    type="button" 
                    className="remove-btn" 
                    onClick={() => handleIngredientRemove(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
        </fieldset>

        <fieldset>
          <legend>Method Steps List</legend>
          <label htmlFor="method">Method</label>
          {methodList.map((singleMethod, index) => (
            <div key={index} className="method">
              <div className="first-division">
                <input
                  type="hidden"
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
        </fieldset>
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
