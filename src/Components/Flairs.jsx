import { Card, CardHeader, CardContent, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

function Flairs(flairs) {
  const [flair, setFlair] = useState("");
  const [stats, setStats] = useState([]);

  useEffect(() => {
    if (flairs?.flairs) {
      Object.entries(flairs.flairs).forEach((key) => {
        setFlair(key[0]);
        setStats(flairs.flairs[key[0]]);
      });
    }
  }, [flairs.flairs, stats]);

  if (!flairs.flairs) return "";

  return (
    <>
      <Card>
        <CardHeader title={flair} />
        {Object.entries(stats).map((key, idx) => (
          <CardContent key={idx}>
            <Typography>{key[0]}:</Typography>
            <Typography>{key[1]}</Typography>
          </CardContent>
        ))}
      </Card>
    </>
  );
}

export default Flairs;
