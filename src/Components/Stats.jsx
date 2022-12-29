import { Divider, Typography } from "@mui/material";

function Stats(stats) {
  if (!stats.stats) return "";

  return (
    <>
      <Typography sx={{ textAlign: "center" }}>{"Stats"}</Typography>
      <Divider />
      {Object.entries(stats?.stats).map((key, idx) => (
        <Typography key={idx} sx={{ pl: 2, py: 0.25 }}>
          {key[0]}: {key[1]}
        </Typography>
      ))}
    </>
  );
}

export default Stats;
