// Credit: https://codepen.io/virsagomk2/pen/EvWRJm

import React, { useState } from 'react';
import { Button, animateScroll as scroll, Link } from "react-scroll";

import "./HomePage.css";

const HomePage = ({ recipes }) => {

  const [suggestions, setSuggestions] = useState([]);
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [value, setValue] = useState("");

  const handleSearchInput = (e) => {
    const query = e.target.value.toLowerCase();
    setValue(query);
    
    if (query.length > 1) {
      const filterSuggestions = recipes.filter(
        (suggestion) => (
          suggestion.recipe_name.toLowerCase().indexOf(query) > -1 
            || 
          suggestion.description.toLowerCase().indexOf(query) > -1
        ) 
      );
      setSuggestions(filterSuggestions);
      setSuggestionsActive(true);
    } else {
      setSuggestionsActive(false);
    };
  }

  const handleSubmit = (e) => {
    e.preventDefault();

  }

  const Suggestions = () => {
    return suggestions.length > 0 ? (
      suggestions.map((suggestion) => {
        return (
          <article className="card" key={suggestion.recipe_id}>
            <a href={`/recipes/${suggestion.recipe_id}`}>
              <div className="box"><img src="https://s15.postimg.cc/temvv7u4r/recipe.jpg" /></div>
              <header className="card-content">
                <span className="card-header">{suggestion.recipe_name}</span>
                <span className="card-desc">{suggestion.description}</span>
              </header>
              <footer className="card-content">
                <div className="contributor">
                  <span className="contributor-name">by {suggestion.creator}</span>
                </div>
                <div className="bookmark"></div>
              </footer>
            </a>
          </article>
        );
      })
    ) : (
      <p>No results found...</p>
    );
  };

  return (
    <React.Fragment>
      <main>
        <section className="jumbo">
          <div className='overlay'>
            <h1>What's cooking?</h1>
            <section role="search">
              <form autoComplete='on' name='search-form' onSubmit={handleSubmit}>
                <fieldset className="search">
                  <legend>Search for recipes:</legend>
                  <label htmlFor="s">
                    <input 
                      type="search" 
                      value={value} 
                      name="s" id="s" 
                      placeholder="Find a recipe..." 
                      maxLength="200" 
                      onChange={handleSearchInput}
                    />
                  </label>
                  <Link 
                    className='find-btn' 
                    label="FIND" 
                    type="submit" 
                    title="Search recipes"
                    value="find"
                    smooth={true}
                    spy={true}
                    to="recipes"
                    isDynamic={true}
                  >
                    FIND
                  </Link>
                </fieldset>
              </form>
            </section>
          </div>
        </section>

        <section id="recipes" className="wrapper product">
          <h2 className="section-name">
            {value.length > 1 ? (
              `Results for '${value}'`
            ) : "Recent Recipes"}
          </h2>
          {suggestionsActive ? <Suggestions /> : (
            recipes.slice(recipes.length > 20 ? recipes.length - 10 : 0)
            .reverse().map(recipe => {
              return (
                <article className="card" key={recipe.recipe_id}>
                  <a href={`/recipes/${recipe.recipe_id}`}>
                    <div className="box"><img src="https://s15.postimg.cc/temvv7u4r/recipe.jpg" /></div>
                    <header className="card-content">
                      <span className="card-header">{recipe.recipe_name}</span>
                      <span className="card-desc">{recipe.description}</span>
                    </header>
                    <footer className="card-content">
                      <div className="contributor">
                        <span className="contributor-name">by {recipe.creator}</span>
                      </div>
                      <div className="bookmark"></div>
                    </footer>
                  </a>
                </article>
              )
            })
          )}
        </section>
        </main>
        <footer>
          <section className="wrapper">
            <nav className="home-nav">
            </nav>
          </section>
        </footer>
    </React.Fragment>
  )
}

export default HomePage;
