const express = require("express");
const {
  pingGet,
  getAllDogs,
  createDog,
} = require("../controllers/dogsController");
const dogValidation = require("../middlewars/dogsvalidation");
const router = express.Router();

router
  .get("/ping", pingGet)
  .get("/dogs", getAllDogs)
  .post("/dogs", dogValidation, createDog);

module.exports = router;
