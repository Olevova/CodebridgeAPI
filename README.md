# Локальний зупуск

### MSSQL використовуючи Docker

`docker run --cap-add SYS_PTRACE -e 'ACCEPT_EULA=1' -e 'MSSQL_SA_PASSWORD=12345678qQ1!' -p 1433:1433 --name azuresqledge -d mcr.microsoft.com/azure-sql-edge`

- Створи файл .env в корневій папці, та пропиши туди наступні змінні середовища:
  -- DB_USER="sa"
  -- DB_PASSWORD="12345678qQ1!"
  -- DB_HOST="localhost"
  -- DB_NAME="testdb"
  -- DB_PORT=1433
- Запустити команду встановлення пакетів - `npm install`
- Після командою `npm start start:dev` запускай додаток. В тебе автоматично створиться база даних та таблиця(без даних). Для створеня та читання даних використовуй слідуючі роути:
  -- [HTTP_GET] http://localhost:3000/ping - повертає message: "Dogshouseservice.Version1.0.1"
  -- [HTTP_POST] http://localhost:3000/dogs - створює dog (заносить данні) в таблицю, потрібно передати в body(name, color, tail_length, weight), як приклад {"name": "Neo", "color": "red&amber", "tail_length": 22, "weight": 32}
  -- [HTTP_GET] http://localhost:3000/dogs - читає данні з таблиці
- також є можливість сортування та пагінації, може працювати в парі ось приклади запитів [HTTP_GET] http://localhost/dogs?attribute=weight&order=desc, та [HTTP_GET] http://localhost/dogs?pageNumber=3&limit=pageSize=10
