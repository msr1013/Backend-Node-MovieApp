const mongoose = require("mongoose");
const genres = require("./routes/genres");
const express = require("express");
const customers = require("./routes/customers");

mongoose
  .connect("mongodb://localhost/nodemovie")
  .then(() => console.log("Connected to mongodb..database"))
  .catch((err) => console.error("Could not connect to mongodb.."));

const app = express();
app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);

//port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
