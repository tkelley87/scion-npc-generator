import { Card, CardHeader, CardContent, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

function Flairs(flairs) {
  const [flair, setFlair] = useState([]);

  useEffect(() => {
    if (flairs?.flairs) {
      setFlair(flairs.flairs);
    }
  }, [flairs.flairs]);

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
        <CardHeader title={`Flairs:`} />
        {results}
      </Card>
    </>
  );
}

export default Flairs;
