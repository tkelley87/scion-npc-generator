import { Divider, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

function Stats(stats) {
  const theme = useTheme();

  if (!stats.stats) return "";

  return (
    <>
      <Typography fontFamily={theme.typography.b} sx={{ textAlign: "center" }}>
        {"Stats"}
      </Typography>
      <Divider flexItem={true} variant="fullWidth" />
      {Object.entries(stats?.stats).map((key, idx) => (
          <Grid
            container
            sx={{ display: "flex" }}
            alignItems="center"
            justifyContent="space-between"
            key={idx}
          >
            <Grid item>
              <Typography
                fontFamily={theme.typography.flairs.b}
                sx={{ pl: 1.5, pt: 0.25 }}
              >
                {key[1][0]}:
              </Typography>
            </Grid>
            <Grid item>
              <Grid container>
                <Grid item>
                  <Typography
                    fontFamily={theme.typography.b}
                    sx={{ pr: 1.5, pt: 0.25 }}
                  >
                    {key[1][1]}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
      ))}
    </>
  );
}

export default Stats;
