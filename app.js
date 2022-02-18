// app.js

// jshint esversion:6

const cl = (...args) => console.log(...args);

// use dotenv to access your .env file
require("dotenv").config();
const audienceId = process.env.N1_KEY;
const apiString = process.env.N1_SECRET;
const server = process.env.N1_SERVER;
const apiAuth = "myname:" + apiString;

// note: __dirname did not seem to work in Edge browser so set to variable name and that worked (in GET method)
const dirName = __dirname;

const express = require("express");
// as this app is accessing external website needs to have https module, included by default in node modules. use inside get method.

const https = require("https");

const app = express();

const bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
  express.static(__dirname + "/public")
);

//get
app.get("/", function (req, res) {
  //cl(dirName + "/index.html");
  res.sendFile(__dirname + "/signup.html");
});

//post
app.post("/", function (req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  cl(firstName, lastName, email);
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);
  const url =
    "https://" + server + ".api.mailchimp.com/3.0/lists/" + audienceId;

  const options = {
    method: "POST",
    auth: apiAuth,
  };

  const request = https.request(url, options, function (response) {
    // check if good response!
    if (response.statusCode === 200) {
      //res.send("Successfully subscribed!");
      res.sendFile(__dirname + "/success.html");
    } else {
      cl(response.statusCode);
      //      res.send("There was an error with signing up, please try again!");
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function (data) {
      //console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
});

// add a redirect for failure to sign up
app.post("/failure", function (req, res) {
  res.redirect("/");
});

// open browser at localhost:3000/
// listen for http requests
app.listen(process.env.PORT || 3000, function () {
  cl("Server started at port 3000");
});
