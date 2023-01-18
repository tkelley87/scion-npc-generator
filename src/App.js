// React
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
  typography: {
    a: {
      fontWeight: "bold",
      fontFamily: ["Marcellus"].join(","),
      fontSize: "1.1em",
    },
    b: {
      fontFamily: ["Marcellus SC"].join(","),
    },
    c: {
      fontFamily: ["Marcellus"].join(","),
      fontSize: "1.25em",
    },
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
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<Form insertedArticle={insertedArticle} />}
              exact
            ></Route>
          </Routes>
        </BrowserRouter>

        <CssBaseline />
      </ThemeProvider>
    </>
  );
}

export default App;
