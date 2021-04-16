import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert';
import { connect, useDispatch } from 'react-redux';
import { sendAlert } from '../actions';

const useStyles = makeStyles((theme) => ({
  close: {
    padding: theme.spacing(0.5),
  },
  snackbar: {
    marginBottom: '5%'
  }
}));

function AlertSnackbar(props) {
  

  const [snackPack, setSnackPack] = useState([]);
  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState(undefined);
  const [alertMessage, setAlertMessage] = useState(undefined);

  /*
  messageInfo = {
    message:
    severity: 
  }
  */

  useEffect(() => {
    if (!props.alertMessage) return;
    if (props.alertMessage.message && alertMessage != props.alertMessage) {
      const message = props.alertMessage.message;
      const severity = props.alertMessage.severity;
      addAlert(message, severity);
    }
  }, [props.alertMessage])

  useEffect(() => {
    if (snackPack.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      // Close an active snack when a new one is added
      setOpen(false);
    }
  }, [snackPack, messageInfo, open]);

  function addAlert(message, severity) {
    setSnackPack((prev) => [...prev, { message, severity, key: new Date().getTime() }]);
    // console.log('snackPack', snackPack);
  }

  // const handleClick = (message, severity) => {
  //   addAlert(message, severity);
  // };

  // const reduxDispatch = () => {
  //   dispatch(sendAlert("Message!!!", "success"));
  // }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  const classes = useStyles();
  return (
    <div>
      {/* <Button onClick={reduxDispatch}>Redux Test</Button> */}
      <Snackbar
        className={classes.snackbar}
        key={messageInfo ? messageInfo.key : undefined}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        onExited={handleExited}>
          <Alert 
            onClose={handleClose} 
            variant="filled" 
            severity={messageInfo && messageInfo.severity ? messageInfo.severity : "info"}>
            { messageInfo ? messageInfo.message : undefined }
          </Alert>
      </Snackbar>
    </div>
  );
}

const mapState = (state) => {
  return {
    alertMessage: state.alertMessage
  }
}

const connectedComponent = connect(mapState, null)(AlertSnackbar);
export { connectedComponent as AlertSnackbar };

// export default AlertSnackbar;
