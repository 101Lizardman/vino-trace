# Vintrace coding challenge
#### Shane Vincent
#### vincent.shane101@gmail.com
#### https://github.com/101Lizardman

## The API
This API allows for queries on wine data.

## Running the application
`yarn start` will begin the application locally. By default, it begins on port `3030`.

## Accessing the API
Once the API is running locally, go to `localhost:3030/api/breakdown/<BreakdownType>/<LotCode>`.

## Adding new data
Wine data is stored in the `data/` directory as json files, using the lot code as the filename. For example:
`11YVCHAR001.json`
