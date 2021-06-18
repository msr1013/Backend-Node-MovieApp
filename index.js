const Joi = require("joi");
const logger = require("./middleware/logger");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("config");
const debug = require("debug")("app:startup");
const app = express();
const courses = require("./routes/courses");
const home = require("./routes/home");

app.set("view engine", "pug");
app.set("views", "./views");

app.use(morgan("tiny"));
debug("Morgan Enabled");

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get("env")}`);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
app.use("/api/courses", courses);
app.use("/", home);

//configuration
// console.log("Application Name:" + config.get("name"));
// console.log("Mail Server:" + config.get("mail.host"));
// console.log("Mail Password:" + config.get("mail.password"));

// app.use(morgan("tiny"));
// debug("Morgan enabled");

app.use(logger);

// app.use(function (req, res, next) {
//   console.log("authenticating");
//   next();
// });

//port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
