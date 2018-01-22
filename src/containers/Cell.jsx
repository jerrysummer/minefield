import React from 'react';
import { connect } from "react-redux";
import '../styles/cell.css';

import { openMine, flagMine, endGame } from '../actions/index';

class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.handleOpenMine = this.handleOpenMine.bind(this)
    this.handleFlagMine = this.handleFlagMine.bind(this)
  }

  handleOpenMine(row, col) {
    let { hasMine, hasFlag, isOpen, mineCount} = this.props.mine;
    let { gameStatus } = this.props.header;
    // stops clicking when game is over or cell is open
    if (gameStatus === "WON" || gameStatus === "LOST" ) {
      return;
    }

    if(hasMine) {
      this.props.endGame('LOST')
    } else if( isOpen ) {
      return;
    } else {
      this.props.openMine(row, col)
    }   
    return;
  }

  handleFlagMine(row, col, hasFlag) {
    let { hasMine, isOpen, mineCount} = this.props.mine;
    let { gameStatus } = this.props.header;

    // stops clicking when game is over or cell is open
    if (gameStatus === "WON" || gameStatus === "LOST" || isOpen) {
      return;
    }

    this.props.flagMine(row, col, hasFlag)
    return;
  }

  render() {
    let { mine, openMine, flagMine, header} = this.props;
    let { hasMine, isOpen, hadFlag, mineCount} = mine;
    let { gameStatus } = this.props.header;
    let cellValue = '';

    if (isOpen && mineCount && mineCount < 9) {
      cellValue = mineCount;
    }

    return (
      <div
        onClick={() => this.handleOpenMine(mine.row, mine.col)}
        onContextMenu={(e) => {
          e.preventDefault();
          this.handleFlagMine(mine.row, mine.col, mine.hasFlag);
        }}
        className={`cell ${mine.isOpen ? 'isOpen' : ''} ${mine.hasFlag ? 'hasflag' : ''} count${mine.mineCount} ${(mine.hasMine && mine.isOpen) ? 'hasMine' : ''} ${(gameStatus === "WON") ? 'won' : ''}`}
      >
        {
          cellValue
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    header: state.header,
  };
}

export default connect(mapStateToProps, { openMine, flagMine, endGame })(Cell);


