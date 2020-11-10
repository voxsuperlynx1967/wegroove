import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/auth';
import { Redirect } from 'react-router-dom'
import { Container } from '@material-ui/core';
import GrooveLogo from '../components/GrooveLogo';
import SpecialTextField from '../components/SpecialTextField';
import './LandingPage.css';
import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import SpecialButton from '../components/SpecialButton'
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    top: "50%",
  },
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
  },
});

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const currentUser = useSelector(state => state.auth.musician);
    const currentUserToken = useSelector(state => state.auth.auth_token);
    const dispatch = useDispatch();
    const classes = useStyles();

    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(login(email, password));
     // history.push("/");
    }

    const handleDemoSubmit = (e) => {
        e.preventDefault();
        dispatch(login("javier@aa.io", "password"));
    }

    if (currentUser || currentUserToken) return <Redirect to={`/feed`} />;
  return (
    <>
      <div class="pagewrapper">

        <Container
          classes={{ root: classes.container }}
          fixed
          maxWidth="sm">
          <GrooveLogo id="groovelogo1"/>
          <div className="errors-container">
                      <ul className="errors" id="sign-up-errors"></ul>
                    </div>
          <form className="form1" onSubmit={handleSubmit}>
            <ThemeProvider theme={theme}>
              <SpecialTextField id="textfield1"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <SpecialTextField id="textfield22"
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                />
              <SpecialButton
              className="firstbutt">Log in</SpecialButton>
              <form className ="demosubmit" onSubmit={handleDemoSubmit}>
                <SpecialButton
                className="firstbutt">Log in as demo user</SpecialButton>
              </form>
            </ThemeProvider>
          </form>
        </Container>

      </div>
    </>
  )

}



export default LoginPage;
