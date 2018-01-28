'use strict';

// =================================================================================
// App Configuration
// =================================================================================

const app = require('jovo-framework').Jovo;
const webhook = require('jovo-framework').Webhook;
const request = require('request');

const url =  `https://api.themoviedb.org/3/search/movie?api_key=12d5cbb69b55b655341694d23fce8096&language=en-US&query=`;

let intentMap = {
    'AMAZON.YesIntent': 'YesIntent',
    'AMAZON.NoIntent': 'NoIntent',
};
app.setIntentMap(intentMap);

// Listen for post requests
webhook.listen(3000, function() {
    console.log('Local development server listening on port 3000.');
});

webhook.post('/webhook', function(req, res) {
    app.handleRequest(req, res, handlers);
    app.execute();
});

var movie_id;
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
                let speech = 'I found a movie named,'+result.title
                            +' with an average rating of '
                            +result.vote_average
                            +'The overview of the movie is like this,'
                            +result.overview
                            +'movie id is'+movie_id;
                app.tell(speech);

              }else{
                let speech = `I am unable to find the movie.`;
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
