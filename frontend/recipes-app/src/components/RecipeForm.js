import React, { useState, useEffect } from "react";

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

    const handleRecipeOverviewChange = e => {
        const { name, value } = e.target;
        if (name === "recipe_name") {
            setRecipeName(value);
            console.log(recipeName);
        }
        if (name === "description") {
            setRecipeDescription(value);
            console.log(recipeDescription);
        }
    };

    // TODO: Repeat for method and then for recipe (simpler) and put it all together!
    // Or does it need to be one large object?
    const [ingredientList, setIngredientList] = useState([{
        name: "",
        unit: "",
        quantity: ""
    }]);

    console.log(ingredientList);

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

    // This needs to be called on the main recipe change handler
    const handleIngredientChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...ingredientList];
        list[index][name] = value;
        setIngredientList(list);
    };

    // Method
    const [methodList, setMethodList] = useState([{
        step_no: 1,
        step: ""
    }]);

    console.log(methodList);

    const handleStepAdd = (index) => {
        setMethodList([...methodList, {
            step_no: index + 2,
            step: ""
        }])
    };

    const handleStepRemove = (index) => {
        const list = [...methodList];
        list.splice(index, 1);
        console.log(index, list.length)
        if (index < list.length) {
            for (let i = list.length -1; i >= index; i--) {
                list[i].step_no += -1;
            }
        }
        setMethodList(list);
    };

    // This needs to be called on the main recipe change handler
    const handleMethodChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...methodList];
        list[index][name] = value;
        setMethodList(list);
    };

    let submitHandler = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch("/api/v1/recipes/add", {
                method: "POST",
                body: JSON.stringify({
                    recipe_name: recipeName,
                    description: recipeDescription,
                    ingredients: ingredientList,
                    method: methodList,
                }),
            });
            let resJson = await res.json();
            if (res.status === 200 || res.status === 201) {
                setRecipeName("");
                setRecipeDescription("");
                setIngredientList([{
                    name: "",
                    unit: "",
                    quantity: ""
                }]);
                setMethodList([{
                    step_no: 1,
                    step: ""
                }]);
                setMessage("Recipe created successfully!");
            } else {
                setMessage("An error occurred.");
            }
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
                                // onChange={(e) => handleMethodChange(e, index)}
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
                <button type="submit">Publish Recipe</button>

                <div className="message">
                    {message ? <p>{message}</p> : null}
                </div>
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