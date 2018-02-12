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
      //reqJSON: ''
      table:[]
    }
    //this.handleClick = this.handleClick.bind(this);
  }

  //handleClick(){
  componentDidMount(){
    //console.log('Success!');
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
        console.log(response.data);
        const arr = response.data.map((element)=>({sno:element.Serial,reqtext:element.json,time:element.time}));
        console.log(arr);
        this.setState({table:arr});
        //this.setState({table:{sno:arr.sno,reqtext:arr.reqtext,time:arr.time}});
        //this.setState({reqJSON: response.data[0].json });
        //let data = response.data;
        //data.map((member)=>this.setState({table: member }));


      })
      .catch(function (error) {
        console.log(error);
      });
  }


  render(){

    let count =0 ;
    return(
      <div>
          {this.state.table.map(e=>(<Panel key={count++} title={"Request"} sno={e.sno} req={e.reqtext} time={e.time}/>))}
      </div>


    );
  }
}
Requests.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Requests);
