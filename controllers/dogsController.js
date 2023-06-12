const { Dogs } = require("../collections");

console.log(Dogs());

const pingGet = async (req, res) => {
  return res.json({ message: "Dogshouseservice.Version1.0.1" });
};

const getAllDogs = async (req, res) => {
  const { attribute, order, pageNumber, limit } = req.query;

  try {
    const dogs = await Dogs().findAll({
      order: attribute && order ? [[attribute, order]] : undefined,
      limit: limit ? parseInt(limit) : undefined,
      offset:
        pageNumber && limit
          ? (parseInt(pageNumber) - 1) * parseInt(limit)
          : undefined,
    });

    res.json(dogs);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: "Помилка сервера",
    });
  }
};

const createDog = async (req, res) => {
  const { name, color, tail_length, weight } = req.body;

  try {
    const dog = await Dogs().create({ name, color, tail_length, weight });
    res.json({
      message: "Собака створена",
      dog,
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(400).json({
        message: "Собака з таким ім'ям вже існує",
      });
    } else {
      console.error(error.message);
      res.status(500).json({
        message: "Помилка сервера",
      });
    }
  }
};

module.exports = {
  pingGet,
  getAllDogs,
  createDog,
};
