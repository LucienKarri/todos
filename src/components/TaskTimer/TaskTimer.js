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
    this.setState(({ min, sec }) => {
      if (sec < 59) {
        sec++;
      } else {
        sec = 0;
        min++;
      }

      return {
        min,
        sec,
      };
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
    const { min, sec, started } = this.state;

    return (
      <span className="description">
        {started ? (
          <button className="icon icon-pause" onClick={this.onPauseClick}></button>
        ) : (
          <button className="icon icon-play" onClick={this.onPlayClick}></button>
        )}
        <span>{` ${this.transformTimer(min)}:${this.transformTimer(sec)} `}</span>
      </span>
    );
  }
}
