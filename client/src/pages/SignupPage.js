import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../store/auth';
import { Container } from '@material-ui/core';
import YumblrLogo from '../components/auth/YumblrLogo';
import AuthSubmitButton from '../components/auth/AuthSubmitButton';
import './SignupPage.css';
import { makeStyles } from "@material-ui/core/styles";
import AuthTextField from '../components/auth/AuthTextField';
import { NavLink } from 'react-router-dom';
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import { useHistory } from "react-router-dom";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Redirect } from 'react-router-dom'
import SignupNavBar from "../components/auth/SignupNavBar";

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
        margin: "20px",
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

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const currentUserId = useSelector(state => state.auth.id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(signup( email, password, username ));
    history.push("/dashboard");
  }

  if (currentUserId) return <Redirect to="/dashboard" />;
  return (
    <div class="page-wrapper">
      <SignupNavBar/>
      <Container
        classes={{ root: classes.container }}
        fixed
        maxWidth="sm">
        <YumblrLogo id="yumblrlogo1"/>
        <span id="bigspan">
          <span>Come for what you crave.
          </span>
          <span>Stay for what you devour.
          </span>
        </span>
        <form onSubmit={handleSubmit}>
          <ThemeProvider theme={theme}>
            <AuthTextField id="textfield1"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />

            <AuthTextField id="textfield2"
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              />
            <AuthTextField id="textfield3"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              />

            <AuthSubmitButton>Sign up</AuthSubmitButton>
          </ThemeProvider>
        </form>
        <div id="expore">
          <NavLink id ="navtoexplore" to="/">
            <ExploreOutlinedIcon classes={{ root: classes.exploreIcon }}/>
            <span id="trending">
              Here's what's trending
            </span>
          </NavLink>
        </div>
      </Container>
    </div>
  )
}



export default SignupPage;
