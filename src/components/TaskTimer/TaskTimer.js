import React, { Component } from 'react';

export default class TaskTimer extends Component {
  state = {
    min: null,
    sec: null,
    started: false,
  };

  componentDidMount() {
    const { timerMin, timerSec } = this.props;

    this.setState({
      min: timerMin || 0,
      sec: timerSec || 0,
    });
  }

  componentDidUpdate() {
    if (this.props.isChecked && this.state.started) {
      clearInterval(this.timerID);
      this.setState({ started: false });
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick = () => {
    let min = this.state.min;
    let sec = this.state.sec;

    if (sec < 59) {
      sec++;
    } else {
      sec = 0;
      min++;
    }

    this.setState({
      min,
      sec,
    });
  };

  transformTimer = (num) => {
    return num < 10 ? '0' + num : num;
  };

  onPlayClick = () => {
    if (this.state.started || this.props.isChecked) {
      clearInterval(this.timerID);
      this.setState({ started: false });
    } else {
      this.setState({ started: true });
      this.timerID = setInterval(() => this.tick(), 1000);
    }
  };

  onPauseClick = () => {
    clearInterval(this.timerID);
    this.setState({ started: false });
  };

  render() {
    const { min, sec } = this.state;

    return (
      <span className="description">
        <button className="icon icon-play" onClick={this.onPlayClick}></button>
        <button className="icon icon-pause" onClick={this.onPauseClick}></button>
        <span>{` ${this.transformTimer(min)}:${this.transformTimer(sec)} `}</span>
      </span>
    );
  }
}
