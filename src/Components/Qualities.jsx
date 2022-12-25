import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

function Qualities(qualities) {
  const [quality, setQuality] = useState([]);

  useEffect(() => {
    if (qualities?.qualities) {
      setQuality(qualities.qualities);
    }
  }, [qualities.qualities]);

  let results = []
  quality.forEach((object, idx) => {
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

  if (!qualities.qualities) return "";

  return (
    <>
      <Card>
        <CardHeader title={"Qualities: "} />
        {results}
      </Card>
    </>
  );
}

export default Qualities;
