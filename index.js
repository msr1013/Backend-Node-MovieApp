const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const genres = require("./routes/genres");
const express = require("express");
const customers = require("./routes/customers");
const rentals = require("./routes/rentals");
const movies = require("./routes/movies");
const users = require("./routes/users");

const app = express();

mongoose
  .connect("mongodb://localhost/nodemovie")
  .then(() => console.log("Connected to mongodb..database"))
  .catch((err) => console.error("Could not connect to mongodb.."));

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);

//port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
