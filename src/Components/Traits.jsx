import { Typography } from "@mui/material";

function Traits(traits) {
  return (
    <>
      <Typography sx={{ padding: 0.5 }}>{"Traits: "}</Typography>
      {traits?.traits?.map((key, idx) => (
        <Typography key={idx} sx={{  pl: 2, py: .25 }}>
          {key}
        </Typography>
      ))}
    </>
  );
}

export default Traits;
