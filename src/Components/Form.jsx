// React
import { useState } from "react";
// Component imports
import APIService from "../Components/APIService";

const Form = (props) => {
  // State
  const [pantheon, setPantheon] = useState("norse");
  const [type, setType] = useState("Mook");
  const [human, setHuman] = useState("yes");
  const [nameGeneric, setNameGeneric] = useState("yes");
  const [currentNpc, setCurrentNpc] = useState("");

  const insertArticle = async () => {
    try {
      let response = await APIService({ pantheon, type, human, nameGeneric });
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
      <form onSubmit={handleSubmit}>
        <label htmlFor="pantheon" className="form-label">
          Pantheon
        </label>
        <select onChange={(e) => setPantheon(e.target.value)}>
          <option value="norse">Norse</option>
          <option value="theoi">Theoi</option>
        </select>

        <label htmlFor="type" className="form-label">
          Type
        </label>
        <select onChange={(e) => setType(e.target.value)}>
          <option value="Mook">Mook</option>
          <option value="Professional">Professional</option>
        </select>

        <label htmlFor="human" className="form-label">
          Human
        </label>
        <select onChange={(e) => setHuman(e.target.value)}>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>

        <label htmlFor="nameGeneric" className="form-label">
          Is name generic?
        </label>
        <select onChange={(e) => setNameGeneric(e.target.value)}>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>

        <button className="btn btn-primary mt-2">Submit</button>
      </form>
      {/* Remove below div when done */}
      <div>id:{currentNpc}</div>
    </>
  );
};

export default Form;
