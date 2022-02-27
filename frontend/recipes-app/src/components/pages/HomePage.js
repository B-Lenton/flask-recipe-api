// Credit: https://codepen.io/virsagomk2/pen/EvWRJm

import React, { useState } from 'react';

import "./HomePage.css";

const HomePage = ({ recipes }) => {

  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [value, setValue] = useState("");

  const handleSearchInput = (e) => {
    const query = e.target.value.toLowerCase();
    setValue(query);
    
    if (query.length > 1) {
      const filterSuggestions = recipes.filter(
        (suggestion) => suggestion.recipe_name.toLowerCase().indexOf(query) > -1 || suggestion.description.toLowerCase().indexOf(query) > -1
      );
      setSuggestions(filterSuggestions);
      setSuggestionsActive(true);
    } else {
      setSuggestionsActive(false);
    };
  }

  const handleClick = (e) => {
    setSuggestions([]);
    setValue(e.target.textContent);
    setSuggestionsActive(false);
  };

  const handleKeyDown = (e) => {
    // UP ARROW
    if (e.keyCode === 38) {
      if (suggestionIndex === 0) {
        return;
      }
      setSuggestionIndex(suggestionIndex - 1);
    }
    // DOWN ARROW
    else if (e.keyCode === 40) {
      if (suggestionIndex - 1 === suggestions.length) {
        return;
      }
      setSuggestionIndex(suggestionIndex + 1);
    }
    // ENTER
    else if (e.keyCode === 13) {
      setValue(suggestions[suggestionIndex]);
      setSuggestionIndex(0);
      setSuggestionsActive(false);
    }
  };

  const Suggestions = () => {
    // TODO: Move entire card section from below into this component to create dynamic search.
    return (
      <ul className="suggestions">
        {suggestions.map((suggestion, index) => {
          return (
            <li
              className={index === suggestionIndex ? "active" : ""}
              key={index}
              onClick={handleClick}
            >
              {suggestion.recipe_name}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <React.Fragment>
      <main>
        <section className="jumbo">
          <h1>what's cooking today?</h1>
          <section role="search">
            <form method='get' autoComplete='on' name='search-form' >
              <fieldset className="search">
                <legend>Search this website:</legend>
                <label htmlFor="s">
                  <input type="search" value={value} name="s" id="s" placeholder="Find a recipe..." maxLength="200" onChange={handleSearchInput} onKeyDown={handleKeyDown}/>
                </label>
                <div>{suggestionsActive && <Suggestions />}</div>
                <button className='find-btn' label="FIND" type="submit" title="Search recipes">
                  FIND
                </button>
              </fieldset>
            </form>
          </section>
        </section>

        <section className="wrapper product">
          <h2 className="section-name">
            {searchTerm ? searchTerm : "Delicious Recipes"}
          </h2>
          { recipes.map(recipe => {
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
          })}
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
