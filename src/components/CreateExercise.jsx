import React, { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const localServer = "http://localhost:5000/";

const CreateExercise = () => {
  //states
  const [exercise, setExercise] = useState({
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
  });

  const [users, setUsers] = useState([]);

  //functions
  //changeHandler()
  const changeHandler = (e) => {
    setExercise((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  //dateChangeHandler()
  const dateChangeHandler = (date) => {
    setExercise((prev) => {
      return {
        ...prev,
        date: date,
      };
    });
  };

  //submitHandler()
  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post(`${localServer}exercises/add`, exercise)
      .then((res) => alert(res.data))
      .catch((err) => alert("Something Went Wrong!"));
    // window.location = "/";
  };

  //useEffects
  useEffect(() => {
    axios
      .get(`${localServer}users`)
      .then((users) => {
        if (users.data.length > 0) {
          setUsers(users.data.map((user) => user.username));
          setExercise({ ...exercise, username: users.data[0].username });
        }
      })
      .catch((err) => alert("Something Went Wrong!"));
  }, []);

  return (
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={(e) => submitHandler(e)}>
        <div className="form-group">
          <label>Username: </label>
          <select
            name="username"
            required
            className="form-control"
            value={exercise.username}
            onChange={(e) => changeHandler(e)}
          >
            {users.map((user) => {
              return (
                <option key={user} value={user}>
                  {user}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            className="form-control"
            name="description"
            onChange={(e) => changeHandler(e)}
          />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input
            type="text"
            className="form-control"
            name="duration"
            onChange={(e) => changeHandler(e)}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              onChange={(date) => dateChangeHandler(date)}
              selected={exercise.date}
              value={exercise.date}
            />
          </div>
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateExercise;
