1. Створи файл .env в корневій папці, та пропиши туди свій USER, та PASSWOPD - який ти використовуєш для підключення до бази даних mysql.
2. Після командою npm start dev запускай додаток. В тебе автоматично створиться база даних та таблиця. Вона пуста. Для створеня та читання даних використовуй слідуючі роути:
- http://localhost/ping - повертає  message: "Dogshouseservice.Version1.0.1"
- curl -X POST http://localhost/dog - створює dog (заносить данні) в таблиці, потрібно передати в body(name, color, tail_length, weight), як приклад {"name": "Neo", "color": "red&amber", "tail_length": 22, "weight": 32}
- curl -X GET http://localhost/dogs - читає данні з таблиці
- також є можливість сортування та пагінації, може працювати в парі ось приклади запитів  curl -X GET http://localhost/dogs?attribute=weight&order=desc, та curl -X GET http://localhost/dogs?pageNumber=3&limit=pageSize=10