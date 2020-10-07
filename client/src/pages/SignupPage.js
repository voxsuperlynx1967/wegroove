import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@material-ui/core';
import GrooveLogo from '../components/GrooveLogo';
import SpecialButton from '../components/SpecialButton';
import './LandingPage.css';
import { makeStyles } from "@material-ui/core/styles";
import SpecialTextField from '../components/SpecialTextField';
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { signup } from '../store/auth';



import { Redirect } from 'react-router-dom'

import Geocode from "react-geocode";

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey("AIzaSyDirIihZcTuaXMGGfCdU7dCD1DhtfsC-eA");

// set response language. Defaults to english.
Geocode.setLanguage("en");

// Enable or disable logs. Its optional.
Geocode.enableDebug();

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
    const [display, setDisplay] = useState(false);
    const [address, setAddress] = useState("")
    const [options, setOptions] = useState([]);
    const [location, setLocation] = useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('')
    const wrapperRef = useRef(null);
    const currentUser = useSelector(state => state.auth.id);
    const currentUserToken = useSelector(state => state.auth.auth_token);
    const dispatch = useDispatch();
    const classes = useStyles();

    const setItem = async item => {

        setAddress(item)
        setDisplay(false);
        const response = await Geocode.fromAddress(item)
        const { lat, lng } = await response.results[0].geometry.location;
        setLocation(lat + "," + lng)
    }
    const handleAddressChange = (e) => {

        setAddress(e.target.value)

    }

    const handleAddressInput = async (e) => {
        let search2 = e.target.value
        console.log(search2)
        if (search2) {
            if (search2.includes(" ")) {
                const searchval = search2.split(" ")
                search2 = searchval.join("+")
            }
        }
        const response = await fetch(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${search2}&key=AIzaSyDirIihZcTuaXMGGfCdU7dCD1DhtfsC-eA`)
        const res = await response.json()
        const predictions = res.predictions
        const nicelist = predictions.map(prediction => prediction.description)
        const small = nicelist.slice(0,3)
        setOptions(small)
        setDisplay(!display)

    }

   useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const handleClickOutside = event => {
        const {current: wrap} = wrapperRef;
        if (wrap && !wrap.contains(event.target)) {
            setDisplay(false)
        }
    }



  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(location)
    dispatch(signup( email, firstName, lastName, password, location ));

  }

  if (currentUser || currentUserToken ) return <Redirect to="/user" />;
  return (
    <div class="pagewrapper">
      <Container
        classes={{ root: classes.container }}
        fixed
        maxWidth="sm">
        <GrooveLogo id="groovelogo1"/>
        <span id="bigspan">
          <span>Some people want the world.
          </span>
          <span>Others just want good tone.
          </span>
        </span>
        <ThemeProvider theme={theme}>
        <form onSubmit={handleSubmit}>
        <div className="errors-container">
                      <ul className="errors" id="sign-up-errors"></ul>
                    </div>

            <SpecialTextField id="textfield1"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />

            <SpecialTextField id="textfield2"
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              />
            <SpecialTextField id="textfield3"
              placeholder="First name"
              value={firstName}
              onChange={e => setfirstName(e.target.value)}
              />

            <SpecialTextField id="textfield4"
              placeholder="Last name"
              value={lastName}
              onChange={e => setlastName(e.target.value)}
              />

                <SpecialTextField id="textfield4"
                    value={address}
                    placeholder="Enter address..."
                    onChange={handleAddressChange}
                    onInput ={handleAddressInput}
                        />
                {display && (
                <div ref={wrapperRef} className="autoContainer">
                {options.map((v, i) => {
                return <div onClick={() => setItem(v)} className="option" key={i}>
                            <div>{v}</div>
                        </div>
                        })}
                        </div>

                    )}

            <SpecialButton>Sign up</SpecialButton>

        </form>
        </ThemeProvider>
      </Container>
    </div>
  )
}



export default SignupPage;
