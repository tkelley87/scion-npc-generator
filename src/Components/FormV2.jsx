// React
import { useState } from "react";

// MUI imports
import { useTheme } from "@mui/material/styles";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

// Component imports
import { postBody } from "../Components/APIService";
import NpcTable from "./NpcTable";
// Config imports
import config from "../config/form_config";
import ControlledSelect from "./Form/ControlledSelect";

const FormV2 = (props) => {
  const theme = useTheme();

  // State
  const [currentNpc, setCurrentNpc] = useState("");
  const [human, setHuman] = useState("yes");
  const [nameGeneric, setNameGeneric] = useState("yes");
  const [npcFavoredArena, setNpcFavoredArena] = useState("Combat");
  const [pantheon, setPantheon] = useState("aesir");
  const [value, setValue] = useState("Origin");

  const [npcType, setNpcType] = useState("Mook");
  const [type, setType] = useState({
    label: "Origin",
    value: ["Mook", "Professional", "Villain", "Monster"],
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setValue(value);
    for (let option of config.bookOptions) {
      if (value === option.label) {
        setType(option);
        setNpcType(option.value[0]);
      }
    }
  };

  const handleHuman = (value) => {
    setHuman(value);
  };

  const handleNameGeneric = (value) => {
    setNameGeneric(value);
  };

  const handleNpcFavoredArena = (value) => {
    setNpcFavoredArena(value);
  };

  const insertArticle = async () => {
    try {
      let response = await postBody({
        pantheon,
        npcType,
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
              <InputLabel sx={{ fontFamily: theme.typography.c }}>
                Book
              </InputLabel>
              <Select
                label="Book"
                onChange={handleChange}
                sx={{ m: 1, minWidth: 175, fontFamily: theme.typography.a }}
                value={value}
              >
                {config?.bookOptions?.map((label, idx) => (
                  <MenuItem
                    key={idx}
                    sx={{ fontFamily: theme.typography.b }}
                    value={label?.label}
                  >
                    {label?.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Grid item xs={6}>
              <InputLabel sx={{ fontFamily: theme.typography.c }}>
                Type
              </InputLabel>
              <Select
                label={"Type"}
                name={type?.label}
                onChange={(e) => setNpcType(e.target.value)}
                sx={{ m: 1, minWidth: 175, fontFamily: theme.typography.a }}
                value={npcType}
              >
                {type?.value?.map((t, i) => (
                  <MenuItem
                    key={i}
                    sx={{ fontFamily: theme.typography.b }}
                    value={t}
                  >
                    {t}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Grid item xs={6}>
              <InputLabel sx={{ fontFamily: theme.typography.c }}>
                Pantheon
              </InputLabel>
              <Select
                label="Pantheon"
                onChange={(e) => setPantheon(e.target.value)}
                sx={{ m: 1, minWidth: 175, fontFamily: theme.typography.a }}
                value={pantheon}
              >
                {config.pantheonOptions?.map((t, i) => (
                  <MenuItem
                    key={i}
                    sx={{ fontFamily: theme.typography.b }}
                    value={t.value}
                  >
                    {`${t.value[0].toUpperCase()}${t.value
                      .slice(1)
                      .toLowerCase()}`}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Grid item xs={6}>
              <InputLabel sx={{ fontFamily: theme.typography.c }}>
                Human
              </InputLabel>
              <ControlledSelect
                label={config.human[0].label}
                onChange={handleHuman}
                options={config.human[0].value}
                theme={theme}
                value={human}
              />
            </Grid>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Grid item xs={6}>
              <InputLabel sx={{ fontFamily: theme.typography.c }}>
                Is name generic?
              </InputLabel>
              <ControlledSelect
                label={config.nameGeneric[0].label}
                onChange={handleNameGeneric}
                options={config.nameGeneric[0].value}
                theme={theme}
                value={nameGeneric}
              />
            </Grid>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Grid item xs={6}>
              <InputLabel sx={{ fontFamily: theme.typography.c }}>
                NPC Favored Arena
              </InputLabel>
              <ControlledSelect
                label={config.npcFavoredArena[0].label}
                onChange={handleNpcFavoredArena}
                options={config.npcFavoredArena[0].value}
                theme={theme}
                value={npcFavoredArena}
              />
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
                  ":hover": {
                    bgcolor: "white",
                    color: "black",
                  },
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

export default FormV2;
