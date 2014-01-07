//http://localhost:1235/eventful/rest/events/search?location=dallas&sort_order=popularity
var express = require('express');
var azure = require('azure');
var request = require('request')

var accountName = process.env.CUSTOMCONNSTR_ACCOUNT_NAME;
var accountKey = process.env.CUSTOMCONNSTR_ACCOUNT_KEY;
var eventfulKey = process.env.CUSTOMCONNSTR_EVENTFUL_KEY;

var app = express();

//Example request: http://localhost:1235/api?location=dallas&sort_order=popularity
// change "yourkeygoeshere" to your own Eventful.com api key

var apiUrl = "http://api.eventful.com/"
app.use('/eventful', function (req, res) {
    url = apiUrl + req.url + "&app_key=" + eventfulKey;
    req.pipe(request(url)).pipe(res);
});

app.use('/cache', function (req, res) {
    var blobname = req.query.blobname;
    url = apiUrl + req.url + "&app_key=" + eventfulKey;
    res.send("success");
    request.get(url, function (err, response, body) {
        if (err) {
            console.log('Unable to connect.' + err);
        } else if (response.statusCode !== 200) {
            console.log('response=' + response.statusCode);
        } else {
            save(body, blobname);
        }
    });
    
});


function save(body, blobname) {
    var containerName = 'austinevents';
    var blobService = azure.createBlobService(accountName, accountKey);
    console.log(body)
    blobService.createBlockBlobFromText(containerName, blobname, body, { contentEncoding: 'UTF-8', contentType: 'application/json' }, function (error) {
        if (!error) {
            // File has been uploaded
        }
    });
}


app.listen(process.env.PORT || 1235);