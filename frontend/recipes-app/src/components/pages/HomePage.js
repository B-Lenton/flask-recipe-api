// Credit: https://codepen.io/virsagomk2/pen/EvWRJm

import React from 'react';

import "./HomePage.css";

const HomePage = () => {
  return (
    <React.Fragment>
      <main>
      <section class="jumbo">
      <h1>what's cooking today?</h1>
      <div class="search">
      <input type="search" placeholder="find a recipe" />
        <button className='find-btn' label="FIND">FIND</button>
      </div>
      </section>

      <section class="wrapper product">
        <h2 class="section-name">our delicious collections</h2>
        <article class="card featured">
          <div class="box"><img src="http://img.sndimg.com/food/image/upload/w_614,h_461/v1/img/recipes/36/78/07/picgLdb1z.jpg" /></div>
          <header class="card-content">
            <span class="card-category chicken">food category</span>
            <span class="card-header">recipe name</span>
            <span class="card-desc">recipe short description goes here.</span>
          </header>
          <footer class="card-content">
            <div class="contributor"><span class="contributor-name">by <a href="#">Bryan</a></span></div>
            <div class="bookmark"></div>
          </footer>
        </article>
        <article class="card">
          <div class="box"><img src="http://img.sndimg.com/food/image/upload/w_614,h_461/v1/img/recipes/36/78/07/picgLdb1z.jpg" /></div>
          <header class="card-content">
            <span class="card-category chicken">food category</span>
            <span class="card-header">recipe name</span>
            <span class="card-desc">recipe short description goes here.</span>
          </header>
          <footer class="card-content">
            <div class="contributor"><span class="contributor-name">by <a href="#">Bryan</a></span></div>
            <div class="bookmark"></div>
          </footer>
        </article>
        <article class="card">
          <div class="box"><img src="http://img.sndimg.com/food/image/upload/w_614,h_461/v1/img/recipes/36/78/07/picgLdb1z.jpg" /></div>
          <header class="card-content">
            <span class="card-category chicken">food category</span>
            <span class="card-header">recipe name</span>
            <span class="card-desc">recipe short description goes here.</span>
          </header>
          <footer class="card-content">
            <div class="contributor"><span class="contributor-name">by <a href="#">Bryan</a></span></div>
            <div class="bookmark"></div>
          </footer>
        </article>
        <article class="card">
          <div class="box"><img src="http://img.sndimg.com/food/image/upload/w_614,h_461/v1/img/recipes/36/78/07/picgLdb1z.jpg" /></div>
          <header class="card-content">
            <span class="card-category chicken">food category</span>
            <span class="card-header">recipe name</span>
            <span class="card-desc">recipe short description goes here.</span>
          </header>
          <footer class="card-content">
            <div class="contributor"><span class="contributor-name">by <a href="#">Bryan</a></span></div>
            <div class="bookmark"></div>
          </footer>
        </article>
        <article class="card">
          <div class="box"><img src="http://img.sndimg.com/food/image/upload/w_614,h_461/v1/img/recipes/36/78/07/picgLdb1z.jpg" /></div>
          <header class="card-content">
            <span class="card-category chicken">food category</span>
            <span class="card-header">recipe name</span>
            <span class="card-desc">recipe short description goes here.</span>
          </header>
          <footer class="card-content">
            <div class="contributor"><span class="contributor-name">by <a href="#">Bryan</a></span></div>
            <div class="bookmark"></div>
          </footer>
        </article>
      </section>
      </main>

      <footer>
      <section class="wrapper">
            <nav class="home-nav">
            </nav>
        </section>
      </footer>
    </React.Fragment>
  )
}

export default HomePage;
