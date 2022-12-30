import { useTheme } from "@mui/material/styles";

// React
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useState } from "react";
// Component imports
import { postBody } from "../Components/APIService";
import NpcTable from "./NpcTable";

const Form = (props) => {
  const theme = useTheme();

  // State
  const [pantheon, setPantheon] = useState("norse");
  const [type, setType] = useState("Mook");
  const [human, setHuman] = useState("yes");
  const [nameGeneric, setNameGeneric] = useState("yes");
  const [npcFavoredArena, setNpcFavoredArena] = useState("Combat");
  const [currentNpc, setCurrentNpc] = useState("");

  const insertArticle = async () => {
    try {
      let response = await postBody({
        pantheon,
        type,
        human,
        nameGeneric,
        npcFavoredArena,
      });
      props.insertedArticle(response);
      setCurrentNpc(response.id);
    } catch (e) {
      console.log("error", e);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    insertArticle();
  };

  return (
    <>
      <form>
        <Grid container justifyContent="center" spacing={1} sx={{ pt: 3 }}>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Grid item xs={6}>
              <InputLabel
                sx={{ fontFamily: theme.typography.c }}
                fontFamily={theme.typography.a}
              >
                Pantheon
              </InputLabel>
              <Select
                label="Pantheon"
                onChange={(e) => setPantheon(e.target.value)}
                sx={{
                  m: 1,
                  minWidth: 175,
                  fontFamily: theme.typography.a,
                }}
                value={pantheon}
              >
                <MenuItem sx={{ fontFamily: theme.typography.b }} value="norse">
                  Norse
                </MenuItem>
                <MenuItem sx={{ fontFamily: theme.typography.b }} value="theoi">
                  Theoi
                </MenuItem>
              </Select>
            </Grid>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Grid item xs={6}>
              <InputLabel sx={{ fontFamily: theme.typography.c }}>
                Type
              </InputLabel>
              <Select
                label="Type"
                onChange={(e) => setType(e.target.value)}
                sx={{ m: 1, minWidth: 175, fontFamily: theme.typography.a }}
                value={type}
              >
                <MenuItem sx={{ fontFamily: theme.typography.b }} value="Mook">
                  Mook
                </MenuItem>
                <MenuItem sx={{ fontFamily: theme.typography.b }} value="Professional">Professional</MenuItem>
                <MenuItem sx={{ fontFamily: theme.typography.b }} value="Villian">Villian</MenuItem>
                <MenuItem sx={{ fontFamily: theme.typography.b }} value="Monster">Monster</MenuItem>
              </Select>
            </Grid>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Grid item xs={6}>
              <InputLabel sx={{ fontFamily: theme.typography.c }}>
                Human
              </InputLabel>
              <Select
                label="Human"
                onChange={(e) => setHuman(e.target.value)}
                sx={{ m: 1, minWidth: 175, fontFamily: theme.typography.a }}
                value={human}
              >
                <MenuItem sx={{ fontFamily: theme.typography.b }} value="yes">Yes</MenuItem>
                <MenuItem sx={{ fontFamily: theme.typography.b }} value="no">No</MenuItem>
              </Select>
            </Grid>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Grid item xs={6}>
              <InputLabel sx={{ fontFamily: theme.typography.c }}>
                Is name generic?
              </InputLabel>
              <Select
                label="nameGeneric"
                onChange={(e) => setNameGeneric(e.target.value)}
                sx={{ m: 1, minWidth: 175, fontFamily: theme.typography.a }}
                value={nameGeneric}
              >
                <MenuItem sx={{ fontFamily: theme.typography.b }} value="yes">Yes</MenuItem>
                <MenuItem sx={{ fontFamily: theme.typography.b }} value="no">No</MenuItem>
              </Select>
            </Grid>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Grid item xs={6}>
              <InputLabel sx={{ fontFamily: theme.typography.c }}>
                NPC Favored Arena
              </InputLabel>
              <Select
                label="npcFavoredArena"
                onChange={(e) => setNpcFavoredArena(e.target.value)}
                sx={{ m: 1, minWidth: 175, fontFamily: theme.typography.a }}
                value={npcFavoredArena}
              >
                <MenuItem sx={{ fontFamily: theme.typography.b }} value="Combat">Combat</MenuItem>
                <MenuItem sx={{ fontFamily: theme.typography.b }} value="Social">Social</MenuItem>
                <MenuItem sx={{ fontFamily: theme.typography.b }} value="Combat_focused">Combat Focused</MenuItem>
                <MenuItem sx={{ fontFamily: theme.typography.b }} value="Social_focused">Social Focused</MenuItem>
              </Select>
            </Grid>
          </FormControl>

          <Grid container justifyContent="center">
            <Grid item>
              <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  color: "#fff",
                  fontFamily: ["Marcellus SC"].join(","),
                }}
              >
                Generate NPC
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>

      <NpcTable currentNpc={currentNpc} />
    </>
  );
};

export default Form;
