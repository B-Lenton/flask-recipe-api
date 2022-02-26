// Credit: https://codepen.io/virsagomk2/pen/EvWRJm

import React from 'react';

import "./HomePage.css";

const HomePage = () => {
  return (
    <React.Fragment>
      <main>
      <section className="jumbo">
      <h1>what's cooking today?</h1>
      <div className="search">
      <input type="search" placeholder="find a recipe" />
        <button className='find-btn' label="FIND">FIND</button>
      </div>
      </section>

      <section className="wrapper product">
        <h2 className="section-name">our delicious collections</h2>
        <article className="card featured">
          <div className="box"><img src="http://img.sndimg.com/food/image/upload/w_614,h_461/v1/img/recipes/36/78/07/picgLdb1z.jpg" /></div>
          <header className="card-content">
            <span className="card-category chicken">food category</span>
            <span className="card-header">recipe name</span>
            <span className="card-desc">recipe short description goes here.</span>
          </header>
          <footer className="card-content">
            <div className="contributor"><span className="contributor-name">by <a href="#">Bryan</a></span></div>
            <div className="bookmark"></div>
          </footer>
        </article>
        <article className="card">
          <div className="box"><img src="http://img.sndimg.com/food/image/upload/w_614,h_461/v1/img/recipes/36/78/07/picgLdb1z.jpg" /></div>
          <header className="card-content">
            <span className="card-category chicken">food category</span>
            <span className="card-header">recipe name</span>
            <span className="card-desc">recipe short description goes here.</span>
          </header>
          <footer className="card-content">
            <div className="contributor"><span className="contributor-name">by <a href="#">Bryan</a></span></div>
            <div className="bookmark"></div>
          </footer>
        </article>
        <article className="card">
          <div className="box"><img src="http://img.sndimg.com/food/image/upload/w_614,h_461/v1/img/recipes/36/78/07/picgLdb1z.jpg" /></div>
          <header className="card-content">
            <span className="card-category chicken">food category</span>
            <span className="card-header">recipe name</span>
            <span className="card-desc">recipe short description goes here.</span>
          </header>
          <footer className="card-content">
            <div className="contributor"><span className="contributor-name">by <a href="#">Bryan</a></span></div>
            <div className="bookmark"></div>
          </footer>
        </article>
        <article className="card">
          <div className="box"><img src="http://img.sndimg.com/food/image/upload/w_614,h_461/v1/img/recipes/36/78/07/picgLdb1z.jpg" /></div>
          <header className="card-content">
            <span className="card-category chicken">food category</span>
            <span className="card-header">recipe name</span>
            <span className="card-desc">recipe short description goes here.</span>
          </header>
          <footer className="card-content">
            <div className="contributor"><span className="contributor-name">by <a href="#">Bryan</a></span></div>
            <div className="bookmark"></div>
          </footer>
        </article>
        <article className="card">
          <div className="box"><img src="http://img.sndimg.com/food/image/upload/w_614,h_461/v1/img/recipes/36/78/07/picgLdb1z.jpg" /></div>
          <header className="card-content">
            <span className="card-category chicken">food category</span>
            <span className="card-header">recipe name</span>
            <span className="card-desc">recipe short description goes here.</span>
          </header>
          <footer className="card-content">
            <div className="contributor"><span className="contributor-name">by <a href="#">Bryan</a></span></div>
            <div className="bookmark"></div>
          </footer>
        </article>
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
