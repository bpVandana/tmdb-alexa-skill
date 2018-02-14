'use strict';
// =================================================================================
// App Configuration
// =================================================================================

const app = require('jovo-framework').Jovo;
const webhook = require('jovo-framework').Webhook;
const request = require('request');
const fetchAction = require('node-fetch'); //
const CircularJSON = require('circular-json');

const url =  `https://api.themoviedb.org/3/search/movie?api_key=12d5cbb69b55b655341694d23fce8096&language=en-US&query=`;

let intentMap = {
    'AMAZON.YesIntent': 'YesIntent',
    'AMAZON.NoIntent': 'NoIntent',
};
app.setIntentMap(intentMap);

// Listen for post requests
webhook.listen(8080, function() {
    console.log('Local development server listening on port 8080.');
});

webhook.post('/webhook', function(req, res) {
    reqtest(req);
    app.handleRequest(req, res, handlers);
    app.execute();
    restest(res);
});

// =================================================================================
// App Testing - Vipul
// =================================================================================
      //The logging into the requests table
function reqtest(req){
  let strvalue = JSON.stringify(req.body);
  const dbUrl = `https://data.actress71.hasura-app.io/v1/query`;
  var requestOptions = {
      "method": "POST",
      "headers": {
          "Content-Type": "application/json"
      }
  };
  var date = new Date();
  var hh = date.getHours();
  var mm = date.getMinutes();
   var body = {
     "type": "insert",
     "args": {
         "table": "logs",
         "objects": [
             {
                 "json": strvalue,
                 "time": hh+":"+mm
             }
           ]
         }
   };
   requestOptions.body = JSON.stringify(body);
   fetchAction(dbUrl, requestOptions)
   .then(function(response) {
     return response.json();
   })
   .then(function(result) {
     console.log(JSON.stringify(result));
     //console.log(result);
   })
   .catch(function(error) {
     console.log('Request Failed:' + error);
   });

}
      //The logging into the response table
function restest(res){
  //let strvalue = CircularJSON.stringify(res);
  console.log(res.socket.parser.incoming.body);
  let restest = JSON.stringify(res.socket.parser.incoming.body);
  const dbUrl = `https://data.actress71.hasura-app.io/v1/query`;
  var requestOptions = {
      "method": "POST",
      "headers": {
          "Content-Type": "application/json"
      }
  };
  var date = new Date();
  var hh = date.getHours();
  var mm = date.getMinutes();
   var body = {
     "type": "insert",
     "args": {
         "table": "reslogs",
         "objects": [
             {
                 "rjson": restest,
                 "time": hh+":"+mm
             }
           ]
         }
   };
   requestOptions.body = JSON.stringify(body);
   fetchAction(dbUrl, requestOptions)
   .then(function(response) {
     return response.json();
   })
   .then(function(result) {
     console.log(JSON.stringify(result));
     //console.log(result);
   })
   .catch(function(error) {
     console.log('Request Failed:' + error);
   });
}

// =================================================================================
// App Logic
// =================================================================================

const handlers = {
    'LAUNCH': function() {
        app.toIntent('MovieInfo');
    },
    'MovieInfo': function(name){
      let movie_name = name;
      let findUrl = url+movie_name;
      request.get(findUrl,(err,response,body)=>{
            if(err){                                      //If error in reaching the endpoint
              console.log(err);
            }else{
              let json = JSON.parse(body);
              if(json.total_results>0){                   //No. of results
              let result = json.results[0];
              var  movie_id = result.id;
              var speech = 'I found a movie named,'+result.title
                            +' with an average rating of '
                            +result.vote_average
                            +'out of 10.'
                            +'The overview of the movie is: '
                            +result.overview;
                app.tell(speech);
              }else{
                test();
                var speech = `Sorry, I am unable to find the movie.`;
                app.tell(speech);
              }
            }
      });


    },
    'MovieReview': function(name){
      let movie_name=name;
      let findUrl = url+movie_name;
      request.get(findUrl,(err,response,body)=>{
            if(err){                                      //If error in reaching the endpoint
              console.log(err);
            }else{
              let json = JSON.parse(body);
              if(json.total_results>0){                   //No. of results
                let result = json.results[0];
                var  movie_id = result.id;
                let reviewUrl =`https://api.themoviedb.org/3/movie/`+movie_id+`/reviews?api_key=12d5cbb69b55b655341694d23fce8096&`;
                request.get(reviewUrl,(err,response,body)=>{
                    if(err){
                      console.log(err);
                    }else{
                      let json = JSON.parse(body);
                      if(json.total_results>0){
                        let speech=`There is a review from an author:`
                                  + json.results[0].author
                                  +`He has written this:`
                                  +json.results[0].content;
                        app.tell(speech);
                      }else{
                        app.tell(`Sorry! Your requested movie is not found`);
                      }
                    }
                });
              }else{
                let speech = `I am unable to find the movie.`;
                app.tell(speech);
              }
            }
      });
    },
};
