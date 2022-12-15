// React
import { useState } from "react";

// Component imports
import Form from "./Components/Form";

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
    console.log(npcGenerators);
  };

  return (
    <>
      <Form insertedArticle={insertedArticle} />
    </>
  );
}

export default App;
