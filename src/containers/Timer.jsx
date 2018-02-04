import React, { Component } from 'react';
import { connect } from "react-redux";
import '../styles/timer.css';


class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: '000'
    };
    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
    this.tick = this.tick.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    let { gameStatus } = nextProps.header;
    let { resetTimer, startTimer, stopTimer } = this;

    if (this.props.header.gameStatus === gameStatus) {
      return;
    } else if (gameStatus === "NEW") {
      resetTimer();
    } else if (gameStatus === "PLAYING") {
      startTimer();
    } else if (gameStatus === "LOST") {
      stopTimer();
    } else if (gameStatus === "WON") {
      stopTimer();
    } 
  }

  startTimer() {
    clearInterval(this.clockWork);
    this.clockWork = setInterval(this.tick, 1000);
  }

  stopTimer() {
    clearInterval(this.clockWork)
  }

  resetTimer() {
    this.setState({ seconds: '000' });
    clearInterval(this.clockWork);
  }

  // converts second count between number and string to pad start with 0s
  tick() {
    let currentTime = parseInt(this.state.seconds, 10) + 1;
    let currentTimeString = currentTime + '';
    let newTime = currentTimeString.padStart(3,'0')
    this.setState({ seconds: newTime });
  }

  render() {
    return (
      <div className="timer">: {this.state.seconds} </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    header: state.header
  };
}

export default connect(mapStateToProps)(Timer);