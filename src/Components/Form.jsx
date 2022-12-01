// React
import { useState } from "react";
// Component imports
import APIService from "../Components/APIService";

const Form = (props) => {
  // State
  const [pantheon, setPantheon] = useState("");
  const [type, setType] = useState("");
  const [human, setHuman] = useState(null);

  const insertArticle = () => {
    APIService.InsertForm({ pantheon, type, human })
      .then((response) => props.insertedArticle(response))
      .catch((error) => console.log("error", error));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    insertArticle();
    setPantheon("");
    setType("");
    setHuman(null);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="pantheon" className="form-label">
          Pantheon
        </label>
        <select onChange={(e) => setPantheon(e.target.value)}>
          <option value="norse">Norse</option>
          <option value="greek">Greek</option>
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

        <button className="btn btn-primary mt-2">Submit</button>
      </form>
    </>
  );
};

export default Form;
