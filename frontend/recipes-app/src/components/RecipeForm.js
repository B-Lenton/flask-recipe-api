import React, { useState } from "react";

import "./RecipeForm.css"


// export default class RecipeForm extends React.Component {
//     constructor(props) {
//       super(props);

//         this.state = {
//             recipe_name: "",
//             description: "",
//             ingredients: [
//                 {
//                     name: "",
//                     unit: "",
//                     quantity: ""
//                 }
//             ],
//             method: [
//                 {
//                     step_no: 1,
//                     step: ""
//                 }
//             ]
//         };
//     }

//     changeHandler = e => {
//         this.setState({ [e.target.name]: e.target.value })
//     }

//     submitHandler = e => {
//         e.preventDefault();
//         console.log(this.state)
//     }

function RecipeForm() {
// TODO: change ingredient state to an object with name, unit, quantity...
    const [ingredientList, setIngredientList] = useState([{ingredient: ''}]);

        // const { recipe_name, description, ingredients, method } = this.state
        return (
            <form className="recipe-form"
                // onSubmit={this.submitHandler}
            >
                <div className="form-field">
                    {/* <label htmlFor="recipe_name">Recipe Name</label>
                    <div className="recipe-name">
                        <input
                            type="text"
                            name="recipe_name"
                            // value={recipe_name}
                            // onChange={this.changeHandler}
                            placeholder="Recipe Name"
                            required
                        />
                    </div>
                    <label htmlFor="description">Description</label>
                    <div className="description">
                        <textarea
                            type="text"
                            name="description"
                            // value={description}
                            // onChange={this.changeHandler}
                            placeholder="Description"
                            required
                        />
                    </div> */}
                    <label htmlFor="ingredients">Ingredients</label>

                    {ingredientList.map((singleIngredient, index) => (
                        <div key={index} className="ingredients">
                            <div className="first-division">
                                <input
                                    type="text"
                                    name="ingredients"
                                    // value={ingredients}
                                    // onChange={this.changeHandler}
                                    placeholder="Ingredient"
                                />
                                <input
                                    type="text"
                                    name="unit"
                                    // value={ingredients}
                                    // onChange={this.changeHandler}
                                    placeholder="Unit"
                                />
                                <input
                                    type="text"
                                    name="quantity"
                                    // value={ingredients}
                                    // onChange={this.changeHandler}
                                    placeholder="Quantity"
                                />
                            </div>
                                {ingredientList.length - 1 === index && (
                                    <button type="button" className="add-btn">
                                        New Ingredient
                                    </button>
                                )}
                            <div className="second-division">
                                <button type="button" className="remove-btn">
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                    {/* <div>
                        <input
                            type="text"
                            name="method"
                            // value={method}
                            // onChange={this.changeHandler}
                            placeholder="Method"
                        />
                    </div> */}
                    <button type="submit">Publish Recipe</button>
                </div>
            </form>
        )

    // fetchMeasurementUnits = () => {
    //     //show progress bar
    //     this.setState({ isLoading: true });
 
    //     // TODO: Need to create this endpoint to fetch units rather than recipes (for drop down list)
    //     // fetch(`/api/v1/recipes/measurement-units`)
    //     fetch(`/api/v1/recipes`)
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log(data.recipes)
    //         if (Array.isArray(data.recipes)) {
    //             console.log(JSON.stringify(data));
    //             this.setState({ ingredients: data ,
    //                             isLoading: false});
    //         } else {
    //             this.setState({ ingredients: [],
    //                             isLoading: false  
    //                             });
    //         }
    //     });
    // };

    // componentDidMount() {
    //     this.fetchMeasurementUnits();
    // }
  
    // handleRecipeNameChanged(event) {
    //     var recipe = this.state.recipe;
    //     recipe.recipe_name = event.target.value;
    //     this.setState({ recipe: recipe });
    // }
  
    // handleDescriptionChanged(event) {
    //     var recipe = this.state.recipe;
    //     recipe.description = event.target.value;
    //     this.setState({ recipe: recipe });
    // }
  
    // handleIngredientsChanged(event) {
    //     var recipe = this.state.recipe;
    //     recipe.ingredients = event.target.value;
    //     this.setState({ recipe: recipe });
    // }
  
    // handleButtonClicked() {
    //     console.log(this.state.recipe);
    // }
 
    // render() {
    //     return (
    //         <div>
    //         <label>
    //             Recipe Name: 
    //         </label>
    //         <input type="text" value={this.state.recipe.recipe_name || ""} onChange={this.handleRecipeNameChanged.bind(this)}/>
    //         <br/>
    //         <label>
    //             Description:
    //         </label>
    //         <textarea type="text" value={this.state.recipe.description || ""} onChange={this.handleDescriptionChanged.bind(this)}/>
    //         <br/>
    //         <label>
    //             Ingredients:
    //         </label>
    //         <select value={this.state.recipe.ingredients || ""} onChange={this.handleIngredientsChanged.bind(this)}>
    //             <option value="PENDING">
    //             Pending
    //             </option>
    //             <option value="APPROVED">
    //             Approved
    //             </option>
    //         </select>
    //         <hr/>
    //         <button onClick={this.handleButtonClicked.bind(this)}>
    //             Publish Recipe
    //         </button>
    //         </div>
    //     );
    // }
}

export default RecipeForm;

// export const RecipeForm = () => {
//     const [inputList, setInputList] = useState({
//         recipe_name: "",
//         description: "",
//         ingredients: [
//             {
//                 name: "",
//                 unit: "",
//                 quantity: ""
//             }
//         ],
//         method: [
//             {
//                 step_no: 1,
//                 step: ""
//             }
//         ]
//     });

//     const handleChange = e => {
//         const { name, value } = e.target;
//         setInputList({
//             ...inputList,
//             [name]: value
//         });
//     };

//     // const [title, setTitle] = useState('');
//     // const [description, setDescription] = useState('');
//     // const [ingredients, setIngredients] = useState('');

//     return (
//         <form action="" method="post">
//             <input 
//                 type="text" 
//                 name="recipe_name" 
//                 id="recipe_name" 
//                 placeholder="Recipe Title" 
//                 value={ inputList.recipe_name }
//                 onChange={handleChange}
//             />
//             <input 
//                 type="text" 
//                 name="description" 
//                 id="description" 
//                 placeholder="Description" 
//                 value={ inputList.description } 
//                 onChange={handleChange}
//             />
//             {/* TODO: needs an input wrapper with value as below, so then a list of ingredients can be created (and separate fields for quantity etc) */}
//             <input 
//                 type="text" 
//                 name="ingredients" 
//                 id="ingredients" 
//                 placeholder="Ingredients" 
//                 value={ inputList.ingredients.name } 
//                 onChange={handleChange}
//             />
//             {/* checking output: */}
//             <pre>
//                 {console.log(inputList)}
//             </pre>

//             <button type="submit" value="Add Recipe">Publish Recipe</button>
//         </form>
//     )
// }