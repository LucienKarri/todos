/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';

const TaskTimer = ({ time, isChecked, id, onTaskEdited }) => {
  const [timeLeft, setTimeLeft] = useState(time);
  const [isRunning, setIsRunning] = useState(false);
  const [timerId, setTimerId] = useState(null);
  const lastTimerId = useRef();
  const lastTime = useRef();

  useEffect(() => {
    lastTime.current = timeLeft;
    if (!timeLeft || isChecked) {
      stopTimer();
    }
  }, [timeLeft, isChecked]);

  useEffect(() => {
    lastTimerId.current = timerId;
  }, [timerId]);

  useEffect(() => {
    return () => {
      clearInterval(lastTimerId.current);
      onTaskEdited(id, { timeLeft: lastTime.current });
    };
  }, []);

  const startTimer = () => {
    setTimerId(
      setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
      }, 1000)
    );
    setIsRunning(true);
  };

  const stopTimer = () => {
    clearInterval(timerId);
    setIsRunning(false);
    onTaskEdited(id, { timeLeft });
  };

  const transformTimeLeft = (time) => {
    const hour = Math.floor(time / 3600)
      .toString()
      .padStart(2, '0');
    const min = Math.floor((time - hour * 3600) / 60)
      .toString()
      .padStart(2, '0');
    const sec = (time - hour * 3600 - min * 60).toString().padStart(2, '0');

    return ` ${hour}:${min}:${sec} `;
  };

  const button = isRunning ? (
    <button className="icon icon-pause" onClick={() => stopTimer()}></button>
  ) : (
    <button className="icon icon-play" onClick={() => startTimer()}></button>
  );

  return timeLeft !== null ? (
    <span className="description timer">
      {timeLeft && !isChecked ? button : null}
      <span>{timeLeft ? transformTimeLeft(timeLeft) : 'game over'}</span>
    </span>
  ) : null;
};

export default TaskTimer;
