import React, { useEffect, useState } from "react";

import { MenuItem, Select } from "@mui/material";

const ControlledSelect = ({ label, options, onChange, theme, value }) => {
  // State
  const [localValue, setLocalValue] = useState(value ?? "");
  useEffect(() => setLocalValue(value ?? ""), [value]);

  // Localized handleChange
  const handleChange = (e) => {
    const value = e.target.value;
    setLocalValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  if (!value) return "";

  return (
    <>
      <Select
        onChange={handleChange}
        sx={{ m: 1, minWidth: 175, fontFamily: theme.typography.a }}
        value={localValue}
        label={label}
      >
        {options?.map((option, idx) => (
          <MenuItem
            key={idx}
            sx={{ fontFamily: theme.typography.b }}
            value={option}
          >
            {capitalizeFirstLetter(option)}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export default ControlledSelect;

/**
 * Function to split string apart on "_",
 * capitalize the first letter of each word,
 * then join words back on empty space.
 * @param {String} string  `my_name_is`
 * @returns `My Name Is`
 */
const capitalizeFirstLetter = (string) => {
  try {
    if (typeof string) {
      let i,
        frags = string.split("_");
      for (i = 0; i < frags.length; i++) {
        frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
      }
      return frags.join(" ");
    }
    throw new Error("\nUhh Ohh Cherrios\nLooks like we need a String");
  } catch (e) {
    console.error(`Houston, we've been BREACHED -`, e);
    return "";
  }
};
