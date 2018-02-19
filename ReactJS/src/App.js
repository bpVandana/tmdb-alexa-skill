import React, { Component } from 'react';
import NavBar from './components/NavBar';
import Requests from './components/Requests';
import Responses from './components/Responses';
import Grid from 'material-ui/Grid';

class App extends Component {
  render() {
    return(
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
