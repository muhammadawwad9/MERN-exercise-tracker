import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const localServer = "http://localhost:5000/";

//Exercise component
const Exercise = ({ exercise, deleteFunc }) => {
  return (
    <tr>
      <td>{exercise.username}</td>
      <td>{exercise.description}</td>
      <td>{exercise.duration}</td>
      <td>{exercise.date.slice(0, 10)}</td>
      <td>
        <Link to={"edit/" + exercise._id}> edit</Link> |
        <a href="#" onClick={() => deleteFunc(exercise._id)}>
          delete
        </a>
      </td>
    </tr>
  );
};

const ExercisesList = () => {
  //states
  const [exercises, setExercises] = useState([]);

  //functions
  const deleteHandler = (id) => {
    axios
      .delete(`${localServer}exercises/${id}`)
      .then((res) => {
        alert(res.data);
        window.location = "/";
      })
      .catch((err) => alert("Something Went Wrong!"));
  };

  //useEffects
  useEffect(() => {
    axios
      .get(`${localServer}exercises`)
      .then((exercises) => setExercises(exercises.data))
      .catch((err) => alert("Something Went Wrong!"));
  }, []);
  return (
    <div>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {exercises.map((exercise) => {
            return (
              <Exercise
                exercise={exercise}
                deleteFunc={deleteHandler}
                key={exercise._id}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ExercisesList;
