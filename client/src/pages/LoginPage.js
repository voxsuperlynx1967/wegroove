import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { login } from '../store/auth';
// import { Redirect } from 'react-router-dom'
import { Container } from '@material-ui/core';
import GrooveLogo from '../components/GrooveLogo';
import SpecialTextField from '../components/SpecialTextField';
import './LandingPage.css';
import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import SpecialButton from '../components/SpecialButton'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
    MuiButtonBase: {
      root: {
        margin: "10px 0px 0px 0px",
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

function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const currentUserId = useSelector(state => state.auth.id);
//   const dispatch = useDispatch();
    const classes = useStyles();


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await dispatch(login(email, password));
//     history.push("/dashboard");
//   }
//   const handleDemoSubmit = async (e) => {
//     e.preventDefault();
//     await dispatch(login("flavor@example.com", "password"));
//     history.push("/dashboard");
//   }



//   if (currentUserId) return <Redirect to="/dashboard" />;
  return (
    <>
      <div class="pagewrapper">

        <Container
          classes={{ root: classes.container }}
          fixed
          maxWidth="sm">
          <GrooveLogo id="groovelogo1"/>
          <form>
            <ThemeProvider theme={theme}>
              <SpecialTextField id="textfield1"
                placeholder="Email"
                // value={email}
                // onChange={e => setEmail(e.target.value)}
              />
              <SpecialTextField id="textfield22"
                type="password"
                placeholder="Password"
                // value={password}
                // onChange={e => setPassword(e.target.value)}
                />
              <SpecialButton>Log in</SpecialButton>
              <form>
                <SpecialButton>Log in as demo user</SpecialButton>
              </form>
            </ThemeProvider>
          </form>
        </Container>

      </div>
    </>
  )

}



export default LoginPage;
