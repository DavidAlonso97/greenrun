# GreenRun
Backend challenge for GreenRun

## How to launch
This application was developed with docker and docker compose. In order to use the application on local enviroment should follow next steps:
- ```cp .env.example .env```
- Complete .env values that match with your enviroment
- ```docker compose build```
- ```docker compose up``` (only very first time)
- ```docker compose start``` (if is not the first time launching the application)
- Enter the container app ```docker exec -it greenrun /bin/sh```
- run ```yarn run start``` inside container in order to compile and start server
- start to use the app on the url http://172.21.0.5:3000/

## Swagger documentation
Launch swagger editor and use either both files, the ```swagger.json``` or the ```swagger.yaml``` as you want
