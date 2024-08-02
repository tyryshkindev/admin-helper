# Admins Helper
## English
### Description:
App-helper for HASSLE ONLINE admins. Provides features, that earlier were impossible out of the game:  
Statistics view for day/month  
View players statistics, list of punishments  
Punishing player  
Sr. adm: viewing admins metrics  
Sr. adm: viewing admins statistics with charts  
Sr. adm: metrics permission managment  
Multilanguage (EN/RU)  
Dev. features:  
Authorization  
Client-Server interaction (GET/PUT)  
Data visualisation (ApexCharts/HTML tables)  
Multilanguage support (i18n)  
Server implementation with JSON-server lib  
### Project setup
Copy this repository into an empty folder:
```bash
git clone https://github.com/tyryshkindev/admin-helper
```
Navigate into project's folder:
```bash
cd admin-helper
```
Install the dependencies:
```bash
npm i
```
Run the project:
```bash
npm run build
npm run preview
```
### Server setup
Copy the server repository into another empty folder
```bash
git clone https://github.com/tyryshkindev/admin-helper-server
```
Navigate into server's folder:
```bash
cd admin-helper-server
```
Install the dependencies:
```bash
npm i
```
Run the server:
```bash
npx json-server --port 4000 server.json
```
### To log in, open "server.json" in admin-helper-server dir and goto "admins" field, choose nickname and password from any admin, enter them in authorization form. The functionality of an app will vary from admins level (see adminLvl field in server.json) 

## Russian
### Описание проекта:
Приложение-помощник для администраторов проекта HASSLE ONLINE, предоставляет возможности, ранее недоступные вне игры:  
Авторизация  
Просмотр своей статистики нормы за день/месяц  
Просмотр статистики, истории наказаний игрока  
Выдача наказаний игроку  
Ст. адм: просмотр метрик нормы мл. адм.  
Ст. адм: статистика администраторов с использованием графиков  
Ст. адм: управление разрешениями на просмотр метрик  
Мультиязычность (EN/RU)  
Функционал с точки зрения разработчика:  
Авторизация  
Клиент-серверное взаимодействие (GET/PUT)  
Визуализация данных (ApexCharts/HTML tables)  
Поддержка мультиязычности (i18n)  
Реализация сервера, с использованием JSON-server бибилотеки  
### Настройка проекта
Скопируйте данный репозиторий в свободную папку:
```bash
git clone https://github.com/tyryshkindev/admin-helper
```
Перейдите в директорию проекта:
```bash
cd admin-helper
```
Установите зависимости:
```bash
npm i
```
Запустите проект:
```bash
npm run build
npm run preview
```
### Настройка сервер
Скопируйте репозиторий сервера в другую свободную папку
```bash
git clone https://github.com/tyryshkindev/admin-helper-server
```
Перейдите в директорию сервера:
```bash
cd admin-helper-server
```
Установите зависимости:
```bash
npm i
```
Запустите сервер:
```bash
npx json-server --port 4000 server.json
```
### Чтобы войти, откройте "server.json" в папке admin-helper-server и перейдите в поле "admins", выберите никнейм и пароль от любого админа, введите эти данные в форму авторизации. Функционал приложения зависит от уровня админа (смотрите поле adminLvl в server.json) 
