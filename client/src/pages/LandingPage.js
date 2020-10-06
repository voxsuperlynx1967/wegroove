
import React from 'react';
import { Container } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import SpecialButton from '../components/SpecialButton';
import GrooveLogo from '../components/GrooveLogo.js'
import { useHistory } from "react-router-dom";

import './LandingPage.css'

const useStyles = makeStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: "absolute"

    },
    exploreIcon: {
      color: "white",
    }
  })

  const theme = createMuiTheme({
    overrides: {
      MuiInputBase: {
        input: {
          background: "white",
          font: "15px Helvetica Neue",
          padding: "20px",
        }
      },
      MuiButtonBase: {
        root: {
          margin: "10px 0px 0px 10px",
        },
      },
      MuiButton: {
        label: {
          textTransform: "none",
          font: "15px Helvetica Neue",
          fontWeight: "bold",
          padding: "10px"
        }
      }
    },
  });

function LandingPage(){

    const classes = useStyles();

    const history = useHistory();



    const loginclick = async (e) => {
        e.preventDefault();
        history.push("/login");
    }

    const signupclick = async (e) => {
        e.preventDefault();
        history.push("/signup");
    }



    return (
        <>
        <div class="pagewrapper">
            <Container
                classes={{ root: classes.container }}
                fixed
                maxWidth="sm">
                <GrooveLogo id="groovelogo1"/>
                <span id="bigspan">
                <span>Some people need a date.
                </span>
                <span>Others just need a drummer.
                </span>
                </span>
                <ThemeProvider theme={theme}>
                <SpecialButton
                    onClick={signupclick}
                    >Join us</SpecialButton>
                    <SpecialButton
                    onClick={loginclick}
                    >Log in</SpecialButton>
                    </ThemeProvider>
            </Container>

            </div>
        </>
    )
}

export default LandingPage;
