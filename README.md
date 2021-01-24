# Vintrace coding challenge
#### Shane Vincent
###### vincent.shane101@gmail.com
###### https://github.com/101Lizardman

## The API
Go into the API directory `cd API` and run `yarn start`

The API runs on port `3030` by default.
If you wanted to interact with it locally, you could see a breakdown by going to the following:
`localhost:3030/api/breakdown/year/11YVCHAR001`
Or if you wanted to do a search, go the following:
`localhost:3030/api/search/2011`

#### What I've done
The API, complete with breakdown and search endpoints.

#### What I'd like to do
 - Add some Jest tests
 - Break up the project into smaller files for flexibility
 - Replace .json files with a database (maybe something like sqlite, depending on volume of data), add a script to read all .json files and insert into database
 - Add a logger
 - Dockerize the API so that I could make a single docker-compose file to run both the front and back ends

## The Site
Go into the web directory `cd web` and run `yarn start`

The web project runs on port `3000` by default. Go to `localhost:3000` to read the landing page.

#### What I've done

The website with an auto-completing search, the breakdown and detail display of the wines in the .json files.

#### What I'd like to do
 - Transitions on the search options, breakdown component table and wine details change
 - Jest or Cypress tests
 - Implement .json file editing with the edit button (or if I went with db backend, edit queries)
