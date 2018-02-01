import React from "react";
import { Component } from "react";

import Minefield from '../containers/Minefield.jsx'
import Header from '../containers/Header.jsx';
import Difficulty from '../containers/Difficulty.jsx';

import '../styles/app.css';

export default class App extends Component {
  render() {
    return (
      <div className="container-wall">
        <div className="container">
            <Header />
            <Minefield />
            <Difficulty />
        </div>
      </div>
    );
  }
}
