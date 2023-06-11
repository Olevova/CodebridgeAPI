const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const { checkDatabase, defineDogModel } = require('./db');
const dogRoutes = require('./routes/dogs');

const app = express();
app.use(cors());
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
app.use(logger(formatsLogger));
app.use(express.json());

app.use('/', dogRoutes);

// Перевірка бази даних та визначення моделі
checkDatabase()
  .then(() => defineDogModel())
  .then(Dog => {
    // Використовуйте модель `Dog` для взаємодії з базою даних
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Сервер запущено на порту ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Помилка підключення до бази даних:', error);
  });


