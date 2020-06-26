#! /bin/bash

mongoimport --host mongodb --db urls-db --collection urls --type json --file /mongo-seed/urls.json --jsonArray
