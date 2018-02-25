# TMDB-Alexa Skill powered by Hasura


This alexa skill gives the information about the movies asked for it. The information includes the detailed overview of the movie and reviews given by the critics or viewers about the movie.

# How to use?

  - The skill uses the Official TMDB API to extract the information.
  - The skill is invoked by saying _"Ask getmoviedetails to find about sherlock"_ or _"Ask getmoviedetail to find the review of titanic"_
# Implementation
Amazon Alexa development provides two ways to develop the skill one is to use their very own Amazon Lambda serives and other is to code in any preferred language and use the webserives to deploy the skill. This skill is coded in Node.js and used jovo framework.
  - When the skill in invoked the skill request the API and fetch the response in json, If the movie is found is tell the user about it after proper parsing of the response json from the API and if the movie is not found it tells the inability to find the details.
  - After the request from the API the request/response which is sent/received to/from the Amazon server is stored in the database implemented using the Hasura data-api.
  - The user can visit [https://ui.advisedly28.hasura-app.io](https://ui.advisedly28.hasura-app.io) to see the logs of the skill.

# How to get it running ?
### Deployment
Amazon whenever implement any custom-skill through webservices will always check for the proper SSL certificates to ensure the connection, and Hasura automatically provides the SSL authentication from your side.

Install the [Hasura-CLI](https://docs.hasura.io/0.15/manual/install-hasura-cli.html) first if not already.

```sh
$ hasura quickstart vipulrawat/tmdb-alexa-skill	
$ cd tmdb-alexa-skill
$ git add . && git commit -m "First Phase"
$ git push hasura master
```
### Amazon developer setup

Now your skill is deployed (Hope So!). You need to head over to the [Amazon Developer Portal](https://developer.amazon.com) and register yourself up if not so the start building the skill. I'll not go through the steps of making account in amazon presuming that you are well enough in doing that. Jump to the alexa tab in developer console and click on create new skill.

 - Name the skill anything, say `Movie details` and give it a invocation name _(this is important as this name will be used to start/open the skill)_ , lets name it `getmoviedetails`
 <img src="https://github.com/vipulrawat/tmdb-alexa-skill/blob/master/assets/images/amz-1.png">
 - Go to the iteraction model and then to the _Code Editor_ tab (Hope you are in new Skill Building environment, blue themed screen,if not there will be an option to go to the Skill Builder Beta)
 - Copy the intent schema from the `microservices/api/src/assets` folder in your directory and paste it there. Save the model and Build it.
 - Now in the `Configuration` tab in amazon developer console, select _HTTPS_ as _Service Endpoint Type_. Place the [https://api.advisedly28.hasura-app.io](https://api.advisedly28.hasura-app.io) URL at default field and click Next.
 - At SSL certificate's tab ,you have to check the radio button that says `My development endpoint has a certificate from a trusted certificate authority` as Hasura provides the SSL certification to the amazon servers automatically.
Click next.
- Your skill is ready now. You can either use the `Test` tab there or your alexa devie or Echosim like testing simulator
__NOTE:__ _The device or testing simulator should be logged in via the same email address which you used in amazon developer console otherwise it will not work._

### How to code this skill

Head over to the directory `/microservices/api/src` and there lies all your source code files, you can alter it accordingly and even code from start.

# Built in Web-Application 
<img src="https://github.com/vipulrawat/tmdb-alexa-skill/blob/master/assets/images/webApp1.png">
This quickstart comes with the web-application built on ReactJS and an Android App built using ReactNative to show the logs of the skill.
Demo: [https://ui.advisedly28.hausra-app.io]

- To check the code go to `/microservice/ui/app/src` in your directory.
- To run locally you need these steps, make sure you are in `/microservice/ui/app` and ReactJS installed.

```sh
$ npm install
$ npm start
```
# Built-in Mobile Application

Demo: [Download the apk](https://drive.google.com/file/d/1Ic3K8_6Kq1xuLtqek154yeU3Bg_InLzw/view)
* Clone this repo.
 * cd to react-native/
 * run `npm start`
 * open the app in expo.
 * Check for the console logs about the cluster status.
 * If the cluster is waking try again after some time.
 * Once the app is opened click `TMDB Alexa logs`
 * Fetched JSON will render in the app.
# Resources to study
Trust me on official docs are the best resources to start with.
 - [Hasura Docs](https://docs.hasura.io/0.15/manual/getting-started/index.html)
 - [Amazon Alexa Docs](https://developer.amazon.com/docs/ask-overviews/build-skills-with-the-alexa-skills-kit.html)
 - [Jovo Framework Docs](https://www.jovo.tech/framework/docs/)

I don't find docs as easy for beginners.

- [Alexa Development 101](https://www.youtube.com/watch?v=4SXCHvxRSNE)
- [Developing alexa skill](https://www.youtube.com/watch?v=QxgdPI1B7rg)
- [Spin Atomic Article](https://spin.atomicobject.com/2017/01/13/alexa-skill-on-heroku/)
# Support
Feel free to create the issue here or mail me at vipulrawat.imi@live.in
