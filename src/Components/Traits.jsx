import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

function Traits(traits) {
  const theme = useTheme();

  if (!traits.traits) return "";

  return (
    <>
      <Typography fontFamily={theme.typography.flairs.b} sx={{ pl: 0.5 }}>
        {"Traits - "}
      </Typography>
      {traits?.traits?.map((key, idx) => (
        <Typography
          fontFamily={theme.typography.b}
          key={idx}
          sx={{ pl: 2, pr: 5, py: 0.25 }}
        >
          {key}
        </Typography>
      ))}
    </>
  );
}

export default Traits;
