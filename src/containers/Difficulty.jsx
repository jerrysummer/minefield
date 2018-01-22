import React from "react";
import { connect } from "react-redux";
import '../styles/difficulty.css';

import { newMinefield } from "../actions/index";

const Difficulty = (props) => {
  return (
    <div className="difficulty">
      <div className="button" onClick={() => props.newMinefield(9,9,5)}>
        Easy
      </div>
      <div className="button" onClick={() => props.newMinefield(15, 15, 40)}>
        Medium
      </div>
      <div className="button" onClick={() => props.newMinefield(15, 25, 99)}>
        Hard
      </div>
    </div>
  );
}

export default connect(null, {newMinefield})(Difficulty);
