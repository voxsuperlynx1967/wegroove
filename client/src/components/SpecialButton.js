import React from 'react'
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const colors = {
  text: 'white',
  background: '#00B8FF',

}

const useStyles = makeStyles({
  root: {
    color: colors.text,
    width: "60%",
    backgroundColor: colors.background,
    "&:hover": {
      backgroundColor: colors.background
    }
  }
})
function AuthSubmitButton(props) {
  const classes = useStyles();

  return (
    <Button
      type="submit"
      classes={classes}
      variant="contained"
      size="large"
      {...props}
      >
    </Button>
  )

}

export default AuthSubmitButton;
