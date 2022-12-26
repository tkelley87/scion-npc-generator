import { Card, CardHeader, CardContent, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

function Flairs(flairs) {

  const [flair, setFlair] = useState([]);
  const [stat, setStat] = useState("")

  useEffect(() => {
    if (flairs?.flairs) {
      setFlair(flairs.flairs);
      let name =
        Object.entries(flairs)[0][0].charAt(0).toUpperCase() +
        Object.entries(flairs)[0][0].slice(1);
      setStat(name)
    }
  }, [flairs.flairs, flairs]);

  let results = [];
  flair.forEach((object, idx) => {
    let quality = Object.keys(object);
    quality.forEach((qual) => {
      let description = object[qual]?.Description;
      results.push(
        <CardContent key={idx}>
          <Typography>{qual}:</Typography>
          <Typography>{description}</Typography>
        </CardContent>
      );
    });
  });

  if (!flairs.flairs) return "";

  return (
    <>
      <Card>
        <CardHeader title={`${stat}`} />
        {results}
      </Card>
    </>
  );
}

export default Flairs;
