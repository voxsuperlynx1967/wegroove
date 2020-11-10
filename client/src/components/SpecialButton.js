import React from 'react'
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";



const colors = {
  text: 'white',
  background: '#00B8FF',

}

const theme = createMuiTheme({
    overrides: {
      MuiButtonBase: {
        root: {
          margin: "10px 0px 0px 10px",
        },
      },
      MuiButton: {
        label: {
          textTransform: "none",
          fontWeight: "bold",
        }
      }
    },
  });

const useStyles = makeStyles({
  root: {
    color: colors.text,
    padding: "10px",
    font: "15px Helvetica Neue",
    width: "62%",
    backgroundColor: colors.background,
    "&:hover": {
      backgroundColor: colors.background
    },
  }
})
function AuthSubmitButton(props) {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
        <Button
        type="submit"
        classes={classes}
        variant="contained"
        size="large"
        {...props}
        >
        </Button>
    </ThemeProvider>
  )

}

export default AuthSubmitButton;
