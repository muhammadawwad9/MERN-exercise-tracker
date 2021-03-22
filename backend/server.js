const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); //mongoose help us to connect to our mongoDB database

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); //this allows us to parse JSON

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
/*once the connection is open, we will see this log*/
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");

app.use(
  "/exercises",
  exercisesRouter
); /*if there is /exercises at the end of the route it will go into the exerciseRouter*/
app.use(
  "/users",
  usersRouter
); /*If there is /users at the end of the route it will go into the usersRouter*/

app.listen(port, () => console.log(`Server is running on port: ${port}`));
