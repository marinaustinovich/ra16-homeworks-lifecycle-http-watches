import React, { useCallback, useEffect, useState } from "react";
import "./Clock.css";

export type ClockData = {
  name: string;
  timezone: string;
  offset: number;
};

type Props = {
  clock: ClockData;
  onRemove: () => void;
};

export const Clock = ({ clock, onRemove }: Props) => {
    const [currentTime, setCurrentTime] = useState<Date>(new Date());

  const updateTime = useCallback(() => {
    const timezoneOffset = clock.offset * 60 * 60 * 1000;
    const newTime = new Date(Date.now() + timezoneOffset);
    setCurrentTime(newTime);
  }, [clock.offset]);

  useEffect(() => {
    const timer = setInterval(() => {
      updateTime();
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [updateTime]);

  useEffect(() => {
    updateTime();
  }, [clock.timezone, updateTime]);

  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();

  const hourAngle = (hours % 12) * 30 + minutes / 2;
  const minuteAngle = minutes * 6 + seconds / 10;
  const secondAngle = seconds * 6;

  return (
    <div className="clock">
      <button className="remove-button" onClick={onRemove}>
        &#10005;
      </button>
      <h3 className="clock-name">{clock.name}</h3>
      <div className="clock-face">
        <div
          className="hand hour-hand"
          style={{ transform: `rotate(${hourAngle}deg)` }}
        ></div>
        <div
          className="hand minute-hand"
          style={{ transform: `rotate(${minuteAngle}deg)` }}
        ></div>
        <div
          className="hand second-hand"
          style={{ transform: `rotate(${secondAngle}deg)` }}
        ></div>
      </div>
    </div>
  );
};
