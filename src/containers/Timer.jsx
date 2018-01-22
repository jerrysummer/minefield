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
    if (this.props.header.gameStatus === nextProps.header.gameStatus) {
      return;
    }

    let gameStatus = nextProps.header.gameStatus;
    
    if(gameStatus === "NEW") {
      this.resetTimer();
      return;
    } 
    if(gameStatus === "PLAYING") {
      this.startTimer();
      return;
    } 
    if(gameStatus === "LOST") {
      this.stopTimer();
    } 
    if(gameStatus === "WON") {
      this.stopTimer();
      return;
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
    this.setState({ seconds: 0 });
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