import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@material-ui/core';
import GrooveLogo from '../components/GrooveLogo';
import SpecialButton from '../components/SpecialButton';
import './GearForm.css';
import { makeStyles } from "@material-ui/core/styles";
import SpecialTextField from '../components/SpecialTextField';
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { getGearTypes } from '../store/gear';
import { getGearTypeTags } from '../store/tags';
import NavBar from '../components/NavBar'
import { Select } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { postGear } from '../store/gear';


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
    const [tag, setTag] = useState('Attribute')
    const [value, setValue] = useState('')
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getGearTypes());
        debugger
      }, [dispatch]);

    useEffect(() => {
        dispatch(getGearTypeTags());
        debugger
      }, [dispatch]);



    const gear = useSelector(state => state.gear);
    const gearTags = useSelector(state => state.tags);
    debugger
    // const gearTypeTags = useSelector(state => state.gear.gearTypeTags)
    const classes = useStyles();

    const handleChange1 = (event) => {
        setGearTypeId(event.target.value);
      };

    const handleChange2 = (event) => {
        setName(event.target.value);
    };

    const handleChange3 = (event) => {
        setMediaLink(event.target.value);
    };

    const handleChange4 = (event) => {
        setTag(event.target.value);
    };

    const handleChange5 = (event) => {
        setValue(event.target.value);
    };



    const handleSubmit1 = (event) => {
        event.preventDefault()
        document.getElementById("firstform").classList.add("hidden");
        dispatch(postGear(name, gearTypeId, musicianId, mediaLink))
        document.getElementById("secondh").innerHTML = "Let's get more specific";
        const sform = document.getElementById("secondform")
        sform.classList.remove("hidden")
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

    const renderit = (gearTypeId, gearTags) => {
        let list2=[]
        for (let i=0; i<gearTags.length; i++) {
            if (gearTags[i].gearTypeId === gearTypeId) {
                console.log(gearTags[i])
                list2.push(gearTags[i])
            }
        }
        const list3 = []
        for (let i=0; i<list2.length; i++) {
            list3.push(
            <MenuItem value={list2[i].tagName}>{list2[i].tagName}</MenuItem>
            )

        }
        return list3

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
                <form id="firstform" onSubmit={handleSubmit1}>
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
                            {options(gear)}
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

                <form id="secondform" className="hidden">
                <div className="errors-container">
                                    <ul className="errors" id="sign-up-errors"></ul>
                                    </div>
                            <Select className = {classes.root} labelId="label" id="select2" value={tag}
                            onChange={handleChange4}>
                                {renderit(gearTypeId, gearTags)}
                            </Select>
                            <SpecialTextField id="textfield1"
                                placeholder="Value"
                                value={value}
                                onChange={handleChange5}
                            />


                        <SpecialButton id="2submit">Add attribute</SpecialButton>
                        <SpecialButton id="2submit">Finish creating your gear!</SpecialButton>
                </form>
                </ThemeProvider>
              </Container>
            </div>
        </>
    )

}
