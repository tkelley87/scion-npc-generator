// React
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";

// MUI
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Component imports
import FormV2 from "./Components/FormV2";
import Health from "./Components/Health";

// Config imports
import config_mui from "./config/mui_config";

// App specific functions
const darkTheme = createTheme(config_mui);

function App() {
  // State
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
            {/* App Health Check Endpoint */}
            <Route path="/health" element={<Health />} />

            {/* Main Route into App */}
            <Route
              path="/"
              element={<FormV2 insertedArticle={insertedArticle} />}
              exact
            />
          </Routes>
        </BrowserRouter>

        <CssBaseline />
      </ThemeProvider>
    </>
  );
}

export default App;
