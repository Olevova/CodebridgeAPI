const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();
const { dogsCollectionName } = require("./db");

const getDogs = () => {
  const sequelize = new Sequelize({
    dialect: "mssql",
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dialectOptions: {
      trustServerCertificate: true,
      encrypt: false,
    },
  });

  const Dogs = sequelize.define(dogsCollectionName, {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tail_length: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Dogs;
};

module.exports = {
  Dogs: getDogs,
};
