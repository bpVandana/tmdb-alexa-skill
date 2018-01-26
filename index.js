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
//let user = app.user();
app.setIntentMap(intentMap);
// Listen for post requests
webhook.listen(3000, function() {
    console.log('Local development server listening on port 3000.');
});

webhook.post('/webhook', function(req, res) {
    app.handleRequest(req, res, handlers);
    app.execute();
});


// =================================================================================
// App Logic
// =================================================================================

const handlers = {

    'LAUNCH': function() {
        let speech =`Which movie's information you want?`;
        let reprompt =`Please say your request!` ;
        app.ask(speech,reprompt);
    },

    'MovieInfo': function(name){
      let movie_name = name;
      let findUrl = `https://api.themoviedb.org/3/search/movie?api_key=12d5cbb69b55b655341694d23fce8096&language=en-US&query=`+movie_name;
      request.get(findUrl,(err,response,body)=>{
            if(err){                                      //If error in reaching the endpoint
              console.log(err);
            }else{
              let json = JSON.parse(body);
              if(json.total_results>0){                   //No. of results
                let result = json.results[0];
                var movie_id = result.id;
                let speech = 'I found a movie named,'+result.title
                            +' with an average rating of '
                            +result.vote_average
                            +'The overview of the movie is like this,';
                            +result.overview;
                let reprompt=`Do you want to listen more?`;
                app.followUpState('MovieInfoState')
                   .ask(speech,reprompt);

              }else{
                let speech = `I am unable to find the movie.`;
                app.tell(speech);
              }
            }
      });
    },
    'MovieInfoState':{
      'YesIntent':function(){
        app.tell('Your movie id is'+movie_id);
      },
      'NoIntent':function(){
        app.tell('NOOOOOOOO');
      }
    }

};
