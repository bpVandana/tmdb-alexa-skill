import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Modal from 'material-ui/Modal';
import Button from 'material-ui/Button';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
  mode:{
    width: '100%',
    textAlign: 'center',
    backgroundColor:'#d1c4e9 '
  },
  error:{
      color: 'red'
  }
});

class SimpleModal extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.mode}>
        <Typography gutterBottom>To get more details on this click the below button.</Typography>
        <Button onClick={this.handleOpen}>Get Details</Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
          className={classes.mode}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="title" id="modal-title">
             <u> Alexa TMDB Movie skill</u>
            </Typography>
            <Typography variant="subheading" id="simple-modal-description">
            <b> To start:</b> say <i>'Alexa, open getmymoviedetails'</i> <br/>
            <b> To get details:</b> say <i>'ask getmymoviedetails find about revenant'</i> <br/>
             <b>To get reviews:</b> say <i>'ask getmymoviedetails what is the review of titanic'</i> <br/>
            </Typography>
            <Typography className={classes.error}>
                <i>If no request and responses are shown then check the console for the possible errors.(Do ignore warnings :/)</i>
            </Typography>
          </div>
        </Modal>
      </div>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;