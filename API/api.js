const { exception } = require('console');
const express = require('express');
const fs = require('fs').promises;
const cors = require('cors');

const app = express();

app.use(cors());

const port = 3030;
const dataDir = 'data/';

// Endpoint for returning breakdown data
app.get('/api/breakdown/:breakdownType/:lotCode', async (req, res) => {
    
    let lotCode = req.params.lotCode;
    let breakdownType = req.params.breakdownType;
    // The console.log done below is replacing a log file insert
    console.log("Breakdown being performed: lotCode: " + lotCode + " | breakdownType: " + breakdownType);

    // Attempt to read the file directly
    // This would be a database read if we were using a db instead of .json files
    var fileName = lotCode + ".json";
    try {
        var rawData = await fs.readFile(dataDir + fileName);
    } catch (error) {
        console.log("Error with file read | " + error);
    }

    var lotData = JSON.parse(rawData);

    // Perform a very rudimentary shape check
    if (!lotData.hasOwnProperty('lotCode') || !lotData.hasOwnProperty('components')) {
        throw new exception("Data in file " + fileName + " is not of the correct format");
    }

    // Begin constructing return object
    let returnObject = {};
    returnObject["breakDownType"] = breakdownType;

    let lotComponents = lotData["components"];

    // Pull the data out into a dictionary so that it is easy to combine values that have the same key
    let dataDict = {};
    let value;

    // Go through raw data, translate it into a dict
    for(let key in lotComponents) {

        let dataPoint = lotComponents[key];

        value = dataPoint.percentage;

        switch(breakdownType) {
            case "year":
                key = dataPoint.year;
                break;
            case "variety":
                key = dataPoint.variety;
                break;
            case "region":
                key = dataPoint.region;
                break;
            case "year-variety":
                key = dataPoint.year + " " + dataPoint.variety;
                break;
        }

        // Check to see if the dictionary has this key or not, set the value if not
        if (!dataDict.hasOwnProperty(key)) dataDict[key] = value;
        // If it does have the value, add to it
        else dataDict[key] += value;
    }

    // Translate the dictionary into the appropriate shape to return it
    const breakdownData = [];

    for(let key in dataDict) {
        breakdownData.push({"key": key, "percentage": dataDict[key]});
    }

    // Sort the return data by percentage, highest first
    breakdownData.sort((a, b) => b.percentage - a.percentage);

    returnObject["breakdown"] = breakdownData;

    res.send(returnObject);
});

// Endpoint for performing lotCode/description searches
app.get('/api/search/:searchTerm', async (req, res) => {

    let searchTerm = req.params.searchTerm;
    // The console.log done below is replacing a log file insert
    console.log("Search being performed, search term: " + searchTerm);
    
    let returnObjects = [];

    // Get all lot codes and associated descriptions
    let fileData = await ReadAllFilesAsJSON(dataDir);

    for (var key in fileData) {

        // Compare the searchTerm against the name and description
        // Do a null check for description as it is nullable
        if (fileData[key].lotCode.includes(searchTerm) || 
            (!(fileData[key].description === null) && fileData[key].description.includes(searchTerm))) {
                console.log("Match found! " + "| lotCode: " + fileData[key].lotCode + " | desc: " + fileData[key].description);
                returnObjects.push(fileData[key]);
        }
    }

    res.send(returnObjects);
});

// This method is replacing a database lookup, were the data of this project stored in a db and not as .json files
async function ReadAllFilesAsJSON(dataDir) {

    var jsonFileContents = [];

    var fileNames = await fs.readdir(dataDir);

    for (var key in fileNames) {
    
            // Only include .json files
            if (fileNames[key].includes(".json")) {

                let fileContent = await fs.readFile(dataDir + fileNames[key], 'utf-8');
                let jsonFileContent = JSON.parse(fileContent);
                jsonFileContents.push(jsonFileContent);
               
            }
    }

    return jsonFileContents;
}

app.listen(port, () => console.log(`Vintrace coding challenge - REST API listening on port ${port}`))