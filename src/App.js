// React
import { useState } from "react";

// MUI
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Component imports
import Form from "./Components/Form";

// App specific functions
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

/**
 * most basic level:
 * web page with 2 options
 * pantheon: norse, greek
 * type: mook, professional
 * human: yes, no
 */

function App() {
  // State - TODO change these names
  const [npcGenerators, setNpcGenerator] = useState([]);

  const insertedArticle = (option) => {
    const npcOptions = [...npcGenerators, option];
    setNpcGenerator(npcOptions);
  };

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Form insertedArticle={insertedArticle} />
        <CssBaseline />
      </ThemeProvider>
    </>
  );
}

export default App;
