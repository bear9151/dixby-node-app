var myKeys = require("./keys.js"),
    keyList = myKeys.twitterKeys,
    twitter = require('twitter'),
    spotify = require('spotify'),
    request = require('request'),
    fs = require('fs'),
    firstInput = process.argv[2],
    secondInput = process.argv[3];