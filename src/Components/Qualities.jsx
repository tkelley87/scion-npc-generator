import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

function Qualities(props) {
  const [quality, setQuality] = useState([]);
  const [toxics, setToxics] = useState([]);

  useEffect(() => {
    if (props.qualities) {
      setQuality(props.qualities);
    }
  }, [props.qualities]);

  useEffect(() => {
    if (props.toxic) {
      setToxics(props.toxic);
    }
  }, [props.toxic, toxics]);

  let results = [];
  quality.forEach((object, idx) => {
    let quality = Object.keys(object);
    quality.forEach((qual) => {
      let description = object[qual]?.Description;
      if (qual === "Toxic") {
        results.push(
          <Typography key={idx} sx={{ p: 1 }} component="div">
            <Typography>{qual}:</Typography>
            <Typography sx={{ pl: 1, pt: 0.5 }}>
              Description: {description}
            </Typography>
            {Object.entries(toxics).map((key, idx) => (
              <Typography key={idx} sx={{ pl: 1, pt: 0.5 }}>
                {key[0]}: {key[1]}
              </Typography>
            ))}
          </Typography>
        );
      } else {
              results.push(
                <Typography key={idx} sx={{ p: 1 }} component="div">
                  <Typography>{qual}:</Typography>
                  <Typography sx={{ pl: 1, pt: 0.5 }}>
                    Description: {description}
                  </Typography>
                </Typography>
              );
      }
    });
  });

  if (!props.qualities) return "";

  return (
    <>
        <Typography sx={{ p: 0.5 }}>Qualities: </Typography>
        {results}
    </>
  );
}

export default Qualities;
