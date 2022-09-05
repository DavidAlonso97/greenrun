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
- run ```yarn run install``` inside container in order to install dependencies
- Run migrations with ```./node_modules/.bin/knex migrate:up``` inside container for creating tables
- Run seeders with ```./node_modules/.bin/knex seed:run userSeeds``` inside container for seeding database
- Run ```yarn run start``` inside container in order to compile and start server
- Start to use the app on the url http://172.21.0.5:3000/
- Use for login use credentials ```{"username": "johndoe", "password": "greenrun"}```

## Swagger documentation
Launch swagger editor and use either both files, the ```swagger.json``` or the ```swagger.yaml``` as you want

## Test suite
In order to exceute tests just run ```yarn run jest``` inside container.

## Prettier check
In order to exceute prettier just run ```yarn run prettier:ckeck``` for a prettier check and ```yarn run prettier:run``` for file formating.

## Postman collection
If what you want is import postman collection, you can use this link
```
https://www.getpostman.com/collections/35e0eae7b79f77624584
```
This will import automatically the collection used for develop this application.

# Considerations
- Due to time issues, no further tests could be carried out. Only 3 were made to show that the environment was developed with the intention of doing more tests.
- The github repository where the code is uploaded is ```https://github.com/DavidAlonso97/greenrun```. In that repository, exists two workflows, one for prettier and one for test suite.
- 