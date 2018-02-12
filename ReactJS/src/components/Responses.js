import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import axios from 'axios';
import Panel from './Panel';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});


class Requests extends React.Component{
  constructor(){
    super();
    this.state = {
      table:[]
    }

  }


  componentDidMount(){
    //console.log('Success!');
    var url = "https://data.<cluster-name>.hasura-app.io/v1/query";
      var body = {
          "type": "select",
          "args": {
              "table": "reslogs",
              "columns": [
                  "*"
              ]
          }
      };
      body = JSON.stringify(body);
      axios.post(url, body)
      .then( (response)=> {
        console.log(response.data);
        const arr = response.data.map((element)=>({sno:element.serial,reqtext:element.rjson,time:element.time}));
        console.log(arr);
        this.setState({table:arr});

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render(){
    let count =0 ;
    return(
      <div>
          {this.state.table.map(e=>(<Panel key={count++} title={"Response"} sno={e.sno} req={e.reqtext} time={e.time}/>))}
      </div>
    );
  }
}
Requests.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Requests);
