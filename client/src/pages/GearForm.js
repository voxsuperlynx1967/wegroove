import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@material-ui/core';
import GrooveLogo from '../components/GrooveLogo';
import SpecialButton from '../components/SpecialButton';
import './GearForm.css';
import { makeStyles } from "@material-ui/core/styles";
import SpecialTextField from '../components/SpecialTextField';
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { getGearTypes } from '../store/type';
import { getGearTypeTags } from '../store/tags';
import NavBar from '../components/NavBar'
import { Select } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { postGear } from '../store/gear';
import { postAttribute } from '../store/attributes';
import { useHistory, useLocation } from 'react-router-dom';



const useStyles = makeStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    exploreIcon: {
      color: "white",
    },
    root: {
        width: "60%",
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

export default function GearForm() {

    const [name, setName] = useState('');
    const [gearTypeId, setGearTypeId] = useState(1)
    const [mediaLink, setMediaLink] = useState('');
    const currentUser = useSelector(state => state.auth.musician);
    const [musicianId, setMusicianId] = useState(currentUser.id)
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getGearTypes());

      }, [dispatch]);

    useEffect(() => {
        dispatch(getGearTypeTags());

      }, [dispatch]);

    const gearTypes = useSelector(state => state.type)




    // const gearTypeTags = useSelector(state => state.gear.gearTypeTags)
    const classes = useStyles();
    const history = useHistory();

    const handleChange1 = (event) => {
        setGearTypeId(event.target.value);
      };

    const handleChange2 = (event) => {
        setName(event.target.value);
    };

    const handleChange3 = (event) => {
        setMediaLink(event.target.value);
    };





    const handleSubmit1 = (event) => {
        event.preventDefault()
        document.getElementById("firstform").remove();
        dispatch(postGear(name, gearTypeId, musicianId, mediaLink))
        history.push('/gear/attributes')

        // document.getElementById("secondh").innerHTML = "Let's get more specific";
        // const sform = document.getElementById("secondform")
        // sform.classList.remove("hidden")
    }









    const options = (gear) => {
        let list2 = []
        for (let i=0; i < gear.length ; i++) {
            list2.push(
                <MenuItem value={gear[i].id}>{gear[i].name}</MenuItem>
            )

        }
        return list2
    }


    return (
        <>
            <NavBar/>
            <div className="banner"> Show off your gear, mate.</div>
            <div class="pagewrapper2">
            <Container
                id="formcontainer"
                classes={{ root: classes.container }}
                fixed
                maxWidth="sm">
                <ThemeProvider theme={theme}>
                <div className="header" id="secondh"> Let's start out with some basic info</div>
                <form className="form2" id="firstform" onSubmit={handleSubmit1}>
                    <div className="errors-container">
                                <ul className="errors" id="sign-up-errors"></ul>
                                </div>
                        <SpecialTextField id="textfield1"
                        placeholder="Gear name"
                        value={name}
                        onChange={handleChange2}
                        />
                        <Select className = {classes.root} labelId="label" id="select" value={gearTypeId}
                        onChange={handleChange1}>
                            {options(gearTypes)}
                        </Select>
                        <SpecialTextField id="textfield1"
                        placeholder="Link a url to a picture of your gear!"
                        value={mediaLink}
                        onChange={handleChange3}
                        />

                        {/* <SpecialTextField id="textfield2"
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
                        /> */}

                        <SpecialButton id="1submit">Start creating your gear</SpecialButton>

                </form>


                </ThemeProvider>
              </Container>
            </div>
        </>
    )

}
