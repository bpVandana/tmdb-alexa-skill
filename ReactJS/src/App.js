<<<<<<< HEAD
import React, { Component } from 'react';
import NavBar from './components/NavBar';
import Requests from './components/Requests';
import Responses from './components/Responses';
import Grid from 'material-ui/Grid';

class App extends Component {
  render() {
      <div>
        <Grid container spacing={24}>
              <Grid item xs={12}>
                <NavBar/>
              </Grid>
              <Grid item xs={12} sm={6} >
                <Requests/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Responses/>
              </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
=======
import React, { Component } from 'react'
import axios from 'axios'

class App extends Component {
  constructor () {
    super()
    this.state = {
      reqJson: ''
    }
  this.handleClick = this.handleClick.bind(this);

}
  handleClick () {
    console.log('Success!')
    var url = "https://data.embargo25.hasura-app.io/v1/query";
      var body = {
          "type": "select",
          "args": {
              "table": "logs",
              "columns": [
                  "*"
              ]
          }
      };

      body = JSON.stringify(body);

      axios.post(url, body)
      .then( (response)=> {
        console.log(response.data[0].json);
        let rqst = JSON.stringify(response.data[0].json);
        this.setState({reqJson: rqst })
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render () {
    return (
      <div className='button__container'>
        <button className='button' onClick={this.handleClick}>
          Show Requests
        </button>
         <p>{this.state.reqJson}</p>
         <pre>Check console if result is not shown here</pre>
      </div>
    )
  }
}
export default App
>>>>>>> 3c5d042b9cb086bbd1753746fde8a3dd857b6859
