const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const dogRoutes = require("./routes/dogs");
const { initDb } = require("./db");
const PORT = process.env.PORT || 3000;
const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

initDb()
  .then(() => {
    app.use(cors());
    app.use(logger(formatsLogger));
    app.use(express.json());
    app.use("/", dogRoutes);

    app.listen(PORT, () => {
      console.log(`Server run on  ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error initial");
    console.error(error);
  });
