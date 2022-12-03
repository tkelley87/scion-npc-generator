// React
import { useState } from "react";
// Component imports
import APIService from "../Components/APIService";

const Form = (props) => {
  // State
  const [pantheon, setPantheon] = useState("norse");
  const [type, setType] = useState("mook");
  const [human, setHuman] = useState("yes");
  const [nameGeneric, setNameGeneric] = useState("yes");

  const insertArticle = () => {
    APIService.InsertForm({ pantheon, type, human, nameGeneric })
      .then((response) => props.insertedArticle(response))
      .catch((error) => console.log("error", error));
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
          <option value="mook">Mook</option>
          <option value="professional">Professional</option>
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
    </>
  );
};

export default Form;