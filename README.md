# Flask REST API with React Frontend for Recipes

##### A passion for cooking, a passion for Software Development, and a desire to learn and grow have culminated in the fruition of this project.

This independent project was started during the penultimate week of a three-month Skills Bootcamp and was showcased as part of my final [portfolio](https://benlenton.co.uk/portfolio-home/static/home.html) presentation.
I have since developed it further with the aim being to eventually host the API and website for public use.

## Backend
Flask, a Python microframework, is used for the implementation of the REST API, with SQLite being used for database storage. Tested with Postman before working on the React frontend.

### The API enables the following:
 - Creation of recipes (name, description, ingredient and method lists)
 - GET request for all recipes in the database
 - Fetching recipes by ID
 - Updating existing recipes
 - Deleting existing recipes
 - Full-text search of the database for recipes (virtual external content tables used)
 - Endpoint for fetching the controlled vocabulary of measurement units (e.g. teaspoon)
 - GET request for information about specific users (by ID), such as their published recipes

  #### Authentication:
  - User registration
  - User login
  - Logout
  - Token refresh
  - Utilises flask-jwt-extended
  - Protects endpoints with jwt_required()
 
 ### Planned API improvements:
- [] Write automated tests (previously tested manually with Postman)
- [] Create accessible documentation with Swagger or similar
- [] Enable image uploads for recipes
- [] Email confirmation following user registration
- [] Include servings, preparation and cooking time in recipe data
- [] Improve ability to update recipes (currently only for basic data)

## Frontend
React.js, a very popular JavaScript framework, has been used to enable users to interact with the Recipes API.

### Key Features:
- Heavy use of React Hooks in functional components
- React-router-dom utilised with specific routes protected by a PrivateRoute parent component
- Axios used for API calls
- A combination of vanilla CSS and CSS-in-JS for styling

