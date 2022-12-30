import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

function Flairs(flairs) {
  const [flair, setFlair] = useState([]);
  const [stat, setStat] = useState("");

  useEffect(() => {
    setFlair([]);
    setStat("");

    if (flairs?.flairs) {
      setFlair(flairs.flairs);
      let name =
        Object.entries(flairs)[0][0].charAt(0).toUpperCase() +
        Object.entries(flairs)[0][0].slice(1);
      setStat(name);
    }
  }, [flairs.flairs, flairs]);

  let results = [];
  flair.forEach((object, idx) => {
    let quality = Object.keys(object);
    quality.forEach((qual) => {
      let action = object[qual]?.Action;
      let cooldown = object[qual]?.Cooldown;
      let cost = object[qual]?.Cost;
      let description = object[qual]?.Description;
      let duration = object[qual]?.Duration;
      let range = object[qual]?.Range;
      let subject = object[qual]?.Subject;

      results.push(
        <Typography key={idx} sx={{ p: 1 }} component="div">
          <Typography>{qual}:</Typography>
          <Typography sx={{ pl: 1, pt: 0.5 }}>Action: {action}</Typography>
          <Typography sx={{ pl: 1, pt: 0.5 }}>Cooldown: {cooldown}</Typography>
          <Typography sx={{ pl: 1, pt: 0.5 }}>Cost: {cost}</Typography>
          <Typography sx={{ pl: 1, pt: 0.5 }}>
            Description: {description}
          </Typography>
          <Typography sx={{ pl: 1, pt: 0.5 }}>Duration: {duration}</Typography>
          <Typography sx={{ pl: 1, pt: 0.5 }}>Range: {range}</Typography>
          <Typography sx={{ pl: 1, pt: 0.5 }}>Subject: {subject}</Typography>
        </Typography>
      );
    });
  });

  if (!flairs.flairs) return "";

  return (
    <>
        <Typography >{`${stat}: `} </Typography>
        {results}
    </>
  );
}

export default Flairs;
