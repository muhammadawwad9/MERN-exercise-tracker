import React, { useState } from "react";
import axios from "axios";
const localServer = "http://localhost:5000/";

const CreateUser = () => {
  //states
  const [username, setUsername] = useState("");

  //functions

  //changeHandler()
  const changeHandler = (e) => {
    setUsername(e.target.value);
  };

  //submitHandler()
  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post(`${localServer}users/add`, { username })
      .then((res) => {
        alert(res.data);
      })
      .catch((err) => alert(err.message));
    setUsername("");
  };

  return (
    <div>
      <h3>Create New User</h3>
      <form onSubmit={(e) => submitHandler(e)}>
        <div className="form-group">
          <label>Username: </label>
          <input
            type="text"
            required
            className="form-control"
            value={username}
            onChange={(e) => changeHandler(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create User"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
