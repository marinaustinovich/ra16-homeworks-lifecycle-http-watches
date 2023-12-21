import React, { useState, ChangeEvent, FormEvent } from "react";
import { ClockData } from "../Clock/Clock";

import "./ClockForm.css";

type Props = {
  onAddClock: (value: ClockData) => void;
};

type FormData = {
  name: string;
  timezone: string;
};

export const ClockForm: React.FC<Props> = ({ onAddClock }) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    timezone: "",
  });

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, name: e.target.value });
  };

  const handleTimezoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, timezone: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, timezone } = formData;
    const newClock: ClockData = {
      name,
      timezone,
      offset: parseInt(timezone, 10), // You can add any logic here if needed.
    };
    onAddClock(newClock);
    setFormData({ name: "", timezone: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Название:
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={formData.name}
          onChange={handleNameChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="timezone" className="form-label">
          Временная зона:
        </label>
        <input
          type="text"
          className="form-control"
          id="timezone"
          value={formData.timezone}
          onChange={handleTimezoneChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Добавить
      </button>
    </form>
  );
};
