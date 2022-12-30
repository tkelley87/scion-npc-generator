import { Divider, Grid, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { useEffect, useState } from "react";

import Stats from "./Stats";
import Traits from "./Traits";
import Qualities from "./Qualities";
import Flairs from "./Flairs";
import Drawbacks from "./Drawbacks";

function Npc(props) {
  const theme = useTheme();
  // State
  const [char, setChar] = useState({});
  const [qualities, setQualities] = useState([]);
  const [stats, setStats] = useState([]);
  const [traits, setTraits] = useState([]);
  const [flairs, setFlairs] = useState([]);
  const [drawbacks, setDrawbacks] = useState([]);
  const [toxic, setToxic] = useState([]);
  const [vul, setVul] = useState([]);
  const [human, setHuman] = useState(false);

  useEffect(() => {
    if (props.npc) {
      setChar([]);
      setChar(props.npc);
    }
  }, [props.npc, char]);

  useEffect(() => {
    if (char) {
      setVul([]);
      setTraits([]);
      setStats([]);
      setQualities([]);
      setFlairs([]);
      setDrawbacks([]);
      setToxic([]);
      setHuman(false);

      if (char["Human"] === "yes") {
        setHuman(true);
      }
      if (char["Vulnerability"]) {
        setVul(char["Vulnerability"]);
      }
      if (char["Traits"]) {
        setTraits(char["Traits"]);
      }
      if (char["Stats"]) {
        setStats(char["Stats"]);
      }
      if (char["Qualities"]) {
        setQualities(char["Qualities"]);
      }
      if (char["Flairs"]) {
        setFlairs(char["Flairs"]);
      }
      if (char["Drawbacks"]) {
        setDrawbacks(char["Drawbacks"]);
      }
      if (char["Toxic"]) {
        setToxic(char["Toxic"]);
      }
    }
  }, [char]);

  useEffect(() => {
    setVul([]);
    setVul(char["Vulnerability"]);
  }, [vul, char]);

  if (!props.npc) return "";

  return (
    <>
      <Grid container spacing={1} justifyContent="center" sx={{ pt: 3, pb: 2 }}>
        <Paper sx={{ width: 900, padding: 1, border: "none" }}>
          <Grid
            container
            spacing={3}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={9}>
              <Grid container sx={{ display: "flex" }} alignItems="center">
                <Grid item>
                  <Typography fontFamily={theme.typography.a} sx={{ pl: 0.5 }}>
                    Name:{" "}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography fontFamily={theme.typography.b} sx={{ pl: 0.5 }}>
                    {" "}
                    {char["Name"]}
                  </Typography>
                </Grid>
              </Grid>

              <Grid container sx={{ display: "flex" }} alignItems="center">
                <Grid item>
                  <Typography fontFamily={theme.typography.a} sx={{ pl: 0.5 }}>
                    Gender:{" "}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography fontFamily={theme.typography.b} sx={{ pl: 0.5 }}>
                    {" "}
                    {char["Gender"]}
                  </Typography>
                </Grid>
              </Grid>

              <Traits traits={traits} />

              <Grid container sx={{ display: "flex" }} alignItems="center">
                <Grid item>
                  <Typography fontFamily={theme.typography.a} sx={{ pl: 0.5 }}>
                    Pantheon:{" "}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography fontFamily={theme.typography.b} sx={{ pl: 0.5 }}>
                    {" "}
                    {char["Pantheon"]?.charAt(0).toUpperCase() +
                      char["Pantheon"]?.slice(1)}
                  </Typography>
                </Grid>
              </Grid>

              <Grid container sx={{ display: "flex" }} alignItems="center">
                <Grid item>
                  <Typography fontFamily={theme.typography.a} sx={{ pl: 0.5 }}>
                    Drive:{" "}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography fontFamily={theme.typography.b} sx={{ pl: 0.5 }}>
                    {" "}
                    {char["Drive"]}
                  </Typography>
                </Grid>
              </Grid>

              <Grid container sx={{ display: "flex" }} alignItems="center">
                <Grid item>
                  <Typography fontFamily={theme.typography.a} sx={{ pl: 0.5 }}>
                    Attitude Towards Player:{" "}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography fontFamily={theme.typography.b} sx={{ pl: 0.5 }}>
                    {" "}
                    {char["Attitude towards player"]}
                  </Typography>
                </Grid>
              </Grid>

              {human ? (
                <Grid container sx={{ display: "flex" }} alignItems="center">
                  <Grid item>
                    <Typography
                      fontFamily={theme.typography.a}
                      sx={{ pl: 0.5 }}
                    >
                      Apart of Cult?:{" "}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      fontFamily={theme.typography.b}
                      sx={{ pl: 0.5 }}
                    >
                      {" "}
                      {char["Apart of Cult?"]}
                    </Typography>
                  </Grid>
                </Grid>
              ) : (
                ""
              )}

              {/* <Typography sx={{ padding: 0.5 }}>
                Name: {char["Name"]}
              </Typography> */}
              {/* <Typography sx={{ padding: 0.5 }}>
                Gender: {char["Gender"]}
              </Typography> */}
              {/* <Traits traits={traits} /> */}
              {/* <Typography sx={{ padding: 0.5 }}>
                Pantheon:{" "}
                {char["Pantheon"]?.charAt(0).toUpperCase() +
                  char["Pantheon"]?.slice(1)}
              </Typography> */}
              {/* <Typography sx={{ padding: 0.5 }}>
                Drive: {char["Drive"]}
              </Typography> */}
              {/* <Typography sx={{ padding: 0.5 }}>
                Attitude Towards Player: {char["Attitude towards player"]}
              </Typography> */}

              {/* {human ? (
                <Typography sx={{ padding: 0.5 }}>
                  Apart of Cult?: {char["Apart of Cult?"]}
                </Typography>
              ) : (
                ""
              )} */}
            </Grid>

            <Grid item xs={3}>
              <Stats stats={stats} />
            </Grid>
          </Grid>

          <Divider />

          <Grid container>
            <Grid item>
              <Qualities qualities={qualities} toxic={toxic} />
              <Divider />
              <Flairs flairs={flairs} />
              {drawbacks.length > 0 ? (
                <Drawbacks drawbacks={drawbacks} vul={vul} />
              ) : (
                ""
              )}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
}

export default Npc;
