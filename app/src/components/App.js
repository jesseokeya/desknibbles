import React, { Component } from 'react';
import { FaveSnackers, Products, Solution } from './common'
import './styles/style.css';

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light">
          <a className="navbar-brand" href="/">
            <b>Desk Nibbles</b>
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto"></ul>
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-dark my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
        </nav>
        <div className="container">
          <br />
          <Solution />
          <br />
          <h5>
            <b><u>Fave Snackers</u></b>
          </h5>
          <br />
          <FaveSnackers />
          <br />
          <div className="row">
            <h5>
              <b><u>Products</u></b>
            </h5>
            <br />
            <Products />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
