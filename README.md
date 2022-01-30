# newsletter

Subscribe to Newsletter using MailChimp
This app is developed in Angela Yu's Javascript course to create a newsletter signup page using MailChimp.
A JS app has dependencies express, body-parser, dotenv. Requires these and https. Requires mailchimp account.
Not shown here (as is in .gitignore) but required is a .env file with contents:

N1_KEY="your audience key from mailchimp"
N1_SECRET= "your api key from mailchimp"
N1_SERVER="your server access on mailchimp"

I have used npm package dotenv which uses process.env to get environment variables.
This app is on Heroku and they allow you to set up config vars which are the equivalent of env vars so the same vars as in .env file are set up on heroku. App works fine locally using dotenv.
The app consists of 3 html pages for signup, success, failure and script app.js
app.js now uses .env to get above data.
App.js uses app.get(), app.post(), app.listen() methods to handle getting data from html and sending to mailchimp.
App.post() uses https.request() format needed by mailchimp and requires mailchimp apikey and mailchimp audience key.
Note: app.listen(process.env.PORT ||3000, function() {}); // "process.env.PORT" needed on web while 3000 is localhost port.
