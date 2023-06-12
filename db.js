const sql = require("mssql");
const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const DOGS_TABLE = "Dogs";

const initDb = () => {
  return sql
    .connect({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      server: process.env.DB_HOST,
      options: {
        encrypt: false,
        trustServerCertificate: true,
      },
    })
    .then(() => {
      const query = `IF DB_ID('${process.env.DB_NAME}') IS NULL CREATE DATABASE ${process.env.DB_NAME}`;
      return sql.query(query).then(() => {
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

        const Dogs = sequelize.define(DOGS_TABLE, {
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

        return Dogs.sync();
      });
    });
};

module.exports = {
  initDb,
  dogsCollectionName: DOGS_TABLE,
};
