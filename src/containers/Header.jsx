import React, { Component } from "react";
import { connect } from "react-redux";
import { newMinefield } from "../actions/index";
import '../styles/header.css';

import Timer from './Timer.jsx'

class Header extends Component {

  render() { 
    let { mineCount, row, col } = this.props.header;
    return (
      <div className="header">
        <Timer />
        <div className="reset" onClick={() => { this.props.newMinefield(row, col, mineCount)}}>RESET</div>
        <div className="flagCount">FLAGS:  {this.props.header.flagCount} </div>
      </div>
    );
  }

}
function mapStateToProps( {header} ) {
  return { 
    header 
  };
}

export default connect(mapStateToProps, { newMinefield } )(Header);
