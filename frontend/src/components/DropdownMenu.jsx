import React, { useState } from "react";
import { Select } from "@geist-ui/core";

const DropdownMenu = ({ onDisplay }) => {
  const [category, setCategory] = useState(null);
  const [saLevel, setSaLevel] = useState(null);

  return (
    <div className="dropdown-menu">
      <Select placeholder={"Category"} onChange={(value) => setCategory(value)}>
        <Select.Option value="1">Category 1</Select.Option>
        <Select.Option value="2">Category 2</Select.Option>
      </Select>
      <Select
        placeholder={"Statistical Area Level"}
        onChange={(value) => setSaLevel(value)}
      >
        <Select.Option value="2">Statistical Area Level 2</Select.Option>
        <Select.Option value="3">Statistical Area Level 3</Select.Option>
        <Select.Option value="4">Statistical Area Level 4</Select.Option>
      </Select>
      <button
        className="dropdown-menu__display-button"
        onClick={() => {
          onDisplay(category, saLevel);
        }}
        disabled={!category || !saLevel}
      >
        DISPLAY
      </button>
    </div>
  );
};

export default DropdownMenu;
