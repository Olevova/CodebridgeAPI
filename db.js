const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(`mysql://${process.env.USER}:${process.env.PASSWOPD}@localhost/dogsDate`, {
  dialect: 'mysql',
});

// Перевірка наявності бази даних
const checkDatabase = () => {
  return sequelize.query('CREATE DATABASE IF NOT EXISTS dogsDate;')
    .then(() => {
      console.log('База даних успішно створена або вже існує');
    })
    .catch(error => {
      console.error('Помилка створення бази даних:', error);
    });
};

// Створення моделі (таблиці)
const Dog = sequelize.define('Dog', {
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

const defineDogModel = () => {
  return Dog.sync()
    .then(() => {
      console.log('Модель (таблиця) створена в базі даних');
      return Dog;
    })
    .catch(error => {
      console.error('Помилка створення моделі (таблиці):', error);
      throw error;
    });
};

module.exports = {
  sequelize,
  Dog,
  checkDatabase,
  defineDogModel,
};
