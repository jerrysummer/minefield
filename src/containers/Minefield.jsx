import React, { Component } from "react";
import { connect } from "react-redux";
import Confetti from 'react-dom-confetti';
import '../styles/minefield.css';


import { endGame } from '../actions/index';
import Cell from './Cell'

class Minefield extends Component {

  componentDidUpdate() {
    let that = this;
    judge();
    // check to see if game is over 
    // endgame action is fired if game is won
    function judge() {
      let hasWon = true;
      let row = that.props.minefield.length;
      let col = that.props.minefield[0].length;

      for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
          let { hasMine, isOpen } = that.props.minefield[i][j];
          if (!hasMine && !isOpen) {
            hasWon = false;
            break;
          }
        }
      }

      let gameStatus = that.props.header.gameStatus;

      if (hasWon && gameStatus === 'PLAYING') {
        that.props.endGame('WON')
      }
    }
  }

  render() {
    // confetti configs
    const configWin = {
      angle: 90,
      spread: 180,
      startVelocity: 25,
      elementCount: 150,
      decay: 0.94
    };
    const configLoss = {
      angle: 90,
      spread: 360,
      startVelocity: 17,
      elementCount: 10,
      decay: 0.92
    };
    return (
      <div className="minefield">
        <Confetti active={this.props.header.gameStatus === "LOST"} config={configLoss} className="confetti"/>
        {
          this.props.minefield.map((row, index) => {
            return (
              <div className="minerow" key={'row' + index}>
                {
                  row.map((mine, index) => {
                    return <Cell mine={mine} key={'mine' + index} /> 
                  })
                }
              </div>
            )
          })
        }
        <Confetti active={this.props.header.gameStatus === "WON"} config={configWin} className="confetti"/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    header: state.header,
    minefield: state.minefield
  };
}

export default connect(mapStateToProps, { endGame })(Minefield);
