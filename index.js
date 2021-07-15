const config = require("config");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const genres = require("./routes/genres");
const express = require("express");
const customers = require("./routes/customers");
const rentals = require("./routes/rentals");
const movies = require("./routes/movies");
const users = require("./routes/users");
const auth = require("./routes/auth");
const error = require("./middleware/error");
require("express-async-errors");
const winston = require("winston");
require("winston-mongodb");
const app = express();

process.on("uncaughtException", (ex) => {
  winston.error(ex.message, ex);
  process.exit(1);
});

winston.handleException(
  new winston.transports.File({ filename: "uncaughtExceptions.log" })
);

process.on("unhandledRejection", (ex) => {
  throw ex;
});

winston.add(winston.transports.File, { filename: "logfile.log" });
winston.add(winston.transports.MongoDB, {
  db: "mongodb://localhost/nodemovie",
  level: "info",
});

const p = Promise.reject(new Error("Something failed miserably!"));
p.then(() => console.log("Done"));

// if (!config.get("jwtPrivateKey")) {
//   console.log("FATAL ERROR:jwtPrivateKey is not defined");
//   process.exit(1);
// }

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
app.use("/api/auth", auth);

app.use(error);

//port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
