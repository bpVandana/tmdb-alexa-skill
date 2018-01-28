const express = require('express');


const app = express();

//REGISTER
app.post('/signup', function(req,res) {
    var fetchAction =  require('node-fetch');

var url = "https://auth.geomagnetism84.hasura-app.io/v1/signup";

var requestOptions = {
    "method": "POST",
    "headers": {
        "Content-Type": "application/json"
    }
};

var body = {
    "provider": "username",
    "data": {
        "username": "sani123",
        "password": "js@hasura"
    }
};

requestOptions.body = JSON.stringify(body);

fetchAction(url, requestOptions)
.then(function(response) {
	return response.json();
})
.then(function(result) {
	console.log(JSON.stringify(result));
})
.catch(function(error) {
	console.log('Request Failed:' + error);
});
res.send('Registration Cpmplete');

});

//LOGIN
app.post('/login', function(req,res)  {

    var fetchAction =  require('node-fetch');

    var url = "https://auth.geomagnetism84.hasura-app.io/v1/login";
    
    var requestOptions = {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        }
    };
    
    var body = {
        "provider": "username",
        "data": {
            "username": "admin",
            "password": 'hoqgula-czuwulz-edantob-ungaku'
        }
    };
    
    requestOptions.body = JSON.stringify(body);
    
    fetchAction(url, requestOptions)
    .then(function(response) {
        return response.json();
    })
    .then(function(result) {
        console.log(JSON.stringify(result));
    })
    .catch(function(error) {
        console.log('Request Failed:' + error);
    });
    res.send('Successfully logged in');
})

//database
var resu,resu2;
app.get('/movie-db', function(req, res){

var fetchAction =  require('node-fetch');

var url = "https://auth.geomagnetism84.hasura-app.io/v1/admin/user/create-session";

var requestOptions = {
    "method": "POST",
    "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer 45dd5d2a98560dffe75096989cc216ccb4c72f5de1596fa0"
    }
};

var body = {
    "hasura_id": 1
};

requestOptions.body = JSON.stringify(body);

fetchAction(url, requestOptions)
.then(function(response) {
	return response.json();
})
.then(function(result) {
    console.log(JSON.stringify(result));
    if(result["is_active"] === true){
        var url = "https://data.geomagnetism84.hasura-app.io/v1/query";
        
        var requestOptions = {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": "Bearer 45dd5d2a98560dffe75096989cc216ccb4c72f5de1596fa0"
            }
        };
        
        var body = {
            "type": "select",
            "args": {
                "table": "movie_info",
                "columns": [
                    "title",
                    "movie_id",
                    "overview",
                    "vote_average"
                ]
            }
        };
        
        requestOptions.body = JSON.stringify(body);
        
        fetchAction(url, requestOptions)
        .then(function(response) {
            return response.json();
        })
        .then(function(result) {
            console.log(JSON.stringify(result));
            res.send(result)
        })
        .catch(function(error) {
            console.log('Request Failed:' + error);
        });
       // res.send(result);
    }
        else{
            res.send('Your are not logged in!!');
        }
})
.catch(function(error) {
	console.log('Request Failed:' + error);
});


})

//A simple hello-world
app.get('/', (req, res) => res.send('Hello World - Sanidhya'));

// localhost
app.listen(3000, () => console.log('Example app listening on port 3000!'));