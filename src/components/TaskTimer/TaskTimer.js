import React, { useEffect, useState } from 'react';

const TaskTimer = ({ min, sec, isChecked }) => {
  const [time, setTime] = useState(Number(min * 60) + Number(sec));
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timerID = null;
    if (isRunning && !isChecked) {
      timerID = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    } else {
      clearInterval(timerID);
      setIsRunning(false);
    }
    return () => clearInterval(timerID);
  }, [isRunning, isChecked]);

  const onClickHandler = () => {
    if (!isChecked) {
      setIsRunning((isRunning) => !isRunning);
    }
  };

  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, 0);
  const seconds = (time - minutes * 60).toString().padStart(2, 0);

  return (
    <span className="description timer">
      {isRunning ? (
        <button className="icon icon-pause" onClick={() => onClickHandler()}></button>
      ) : (
        <button className="icon icon-play" onClick={() => onClickHandler()}></button>
      )}
      <span>
        {minutes}:{seconds}
      </span>
    </span>
  );
};

export default TaskTimer;
