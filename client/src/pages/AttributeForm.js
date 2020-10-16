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
import { useHistory } from 'react-router-dom';

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


export default function AttributeForm() {
    const classes = useStyles();
    const history = useHistory();
    const [tag, setTag] = useState('Attribute')
    const [value, setValue] = useState('')
    const currentUser = useSelector(state => state.auth.musician);
    const gear = useSelector(state => state.gear);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getGearTypeTags());

      }, [dispatch]);





    const gearTags = useSelector(state => state.tags)
    const gearTypeId = gear.gearTypeId;
    const gearId = gear.id
    console.log(gearTypeId, gearTags)

    const handleAttribute = (event) => {
        event.preventDefault()
        console.log(gearId, tag, value)
        dispatch(postAttribute(gearId, tag, value))
        setTag('');
        setValue('');
    }

    const handleSubmit2 = (event) => {
        event.preventDefault()
        console.log(gearId, tag, value)
        dispatch(postAttribute(gearId, tag, value))
        setTag('');
        setValue('');
        history.push(`/users/${currentUser.id}`)
    }

    const renderit = (gearTypeId, gearTags) => {

        let list2=[]
        console.log(gearTypeId, gearTags)
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

    const handleChange4 = (event) => {
        setTag(event.target.value);
    };

    const handleChange5 = (event) => {
        setValue(event.target.value);
    };



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
            <div className="header" id="secondh"> Let's get more specific</div>


                <form className="form2" id="secondform" onSubmit={handleAttribute}>
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

                    </form>
                    <SpecialButton id="3submit" onClick={handleSubmit2}>Finish creating your gear!</SpecialButton>
                    </ThemeProvider>
              </Container>
            </div>
        </>
    )

}
