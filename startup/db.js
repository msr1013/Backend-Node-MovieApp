const winston = require("winston");
const mongoose = require("mongoose");

module.exports = function () {
  mongoose
    .connect("mongodb://localhost/nodemovie")
    .then(() => winston.info("Connected to mongodb..database"));
};
