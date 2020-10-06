import React from 'react'
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  root: {
    width: '60%',
  }
});

function AuthTextField(props) {
  const classes = useStyles();

  return (
    <TextField
      classes={classes}
      variant="standard"
      {...props}
    />
  )

}

export default AuthTextField;
