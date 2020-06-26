# Distributed workers

##### Main file: ```cluster.js```

##### Commands for Docker (the checks for local):
* ```npm run docker:start``` (run mongoDb and Redis on the local Machine nodejs app described in Dockerfile)
* ```npm run docker:down``` (stop containers mongoDb and Redis on the local Machine)
* ```npm run docker:down:v``` (stop and clear volumes of containers mongoDb and Redis on the local Machine)
* ```npm run dev``` (run nodejs app for local development)

#### For custom MongoDb and Redis 
* change ./config/development.json with another credentials
* run ```npm run dev```
