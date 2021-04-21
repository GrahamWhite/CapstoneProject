/*
 *  AlertSnackbar.js
 *  Popup message system for the web app
 *
 *  Revision History
 *      Tyler Mills, 4-20-2021: Init
 */

import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { connect, useDispatch } from 'react-redux';
import { clearAlert } from '../actions';

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

  const dispatch = useDispatch();

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
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      setOpen(false);
    }
  }, [snackPack, messageInfo, open]);

  function addAlert(message, severity) {
    setSnackPack((prev) => [...prev, { message, severity, key: new Date().getTime() }]);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    dispatch(clearAlert());
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  const classes = useStyles();
  return (
    <div>
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
