import React, { useCallback, useState } from "react";
import { Clock, ClockData } from "../Clock/Clock";
import { ClockForm } from "../ClockForm/ClockForm";

export const Watches = () => {
  const [clocks, setClocks] = useState<ClockData[]>([]);

  const addClock = useCallback(
    (clock: ClockData) => {
      setClocks([...clocks, clock]);
    },
    [clocks]
  );

  const removeClock = (index: number) => {
    const newClocks = [...clocks];
    newClocks.splice(index, 1);
    setClocks(newClocks);
  };

  return (
    <div className="container">
      <h2>Часы различных столиц</h2>
      <ClockForm onAddClock={addClock} />
      {clocks.map((clock, index) => (
        <Clock key={index} clock={clock} onRemove={() => removeClock(index)} />
      ))}
    </div>
  );
};
