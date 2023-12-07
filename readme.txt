to use this api you should follow these steps:

first: run the command line -> npm install

second: add the .env file to have content like this:
DATABASE=course_registration
HOST=127.0.0.1
DRIVER=pg
PORT=5432
USER=userName
PASSWORD=db_password
SERVERHOST=server_domain
SERVERPORT=3003
PEPPER=any name for encryption
SALTROUND=10
SECRET=afrefer

third: you should create your database 
then
fourth: run the comman -> npm dbUp
fifth: run the comman -> npm dbDown
sixth: run the comman -> npm run dev

