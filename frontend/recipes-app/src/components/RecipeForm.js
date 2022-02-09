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
    // TODO: Repeat for method and then for recipe (simpler) and put it all together!
    // Or does it need to be one large object?
    const [ingredientList, setIngredientList] = useState([{ ingredient: {
        name: "",
        unit: "",
        quantity: ""
    } }]);

    console.log(ingredientList);

    const handleIngredientAdd = () => {
        setIngredientList([...ingredientList, { ingredient: {
            name: "",
            unit: "",
            quantity: ""
        } }])
    };

    const handleIngredientRemove = (index) => {
        const list = [...ingredientList];
        list.splice(index, 1);
        setIngredientList(list);
    };

    // NOW WORKING!!
    const handleIngredientChange = (e, index) => {
        const { name, value } = e.target;
        console.log(name, value);
        const list = [...ingredientList];
        list[index].ingredient[name] = value;
        setIngredientList(list);
    };

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
                                name="name"
                                // value={ingredients}
                                // onChange={this.changeHandler}
                                placeholder="Ingredient"
                                value={singleIngredient.ingredient.name}
                                onChange={(e) => handleIngredientChange(e, index)}
                            />
                            <input
                                type="text"
                                name="unit"
                                // value={ingredients}
                                // onChange={this.changeHandler}
                                placeholder="Unit"
                                value={singleIngredient.ingredient.unit}
                                onChange={(e) => handleIngredientChange(e, index)}
                            />
                            <input
                                type="text"
                                name="quantity"
                                // value={ingredients}
                                // onChange={this.changeHandler}
                                placeholder="Quantity"
                                value={singleIngredient.ingredient.quantity}
                                onChange={(e) => handleIngredientChange(e, index)}
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