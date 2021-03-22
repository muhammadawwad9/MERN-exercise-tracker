import React, { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const localServer = "http://localhost:5000/";

const EditExercise = () => {
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
      .post(
        `${localServer}exercises/update/${
          window.location.pathname.split("/")[2]
        }`,
        exercise
      )
      .then((res) => {
        alert("Updated!");
        window.location = "/";
      })
      .catch((err) => alert("Something Went Wrong!"));
    // window.location = "/";
  };

  //useEffects
  useEffect(() => {
    axios
      .get(`${localServer}exercises/${window.location.pathname.split("/")[2]}`)
      .then((exercise) => {
        setExercise({
          username: exercise.data.username,
          description: exercise.data.description,
          duration: exercise.data.duration,
          date: new Date(),
        });
      })
      .catch((err) => console.error(err));
    axios
      .get(`${localServer}users`)
      .then((users) => {
        if (users.data.length > 0) {
          setUsers(users.data.map((user) => user.username));
        }
      })
      .catch((err) => alert("Something Went Wrong!"));
  }, []);

  return (
    <div>
      <h3>Edit Exercise Log</h3>
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
            value={exercise.description}
            onChange={(e) => changeHandler(e)}
          />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input
            type="text"
            className="form-control"
            name="duration"
            value={exercise.duration}
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
            value="Edit Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default EditExercise;
