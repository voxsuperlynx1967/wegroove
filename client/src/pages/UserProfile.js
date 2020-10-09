import React, { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import SpecialTextField from '../components/SpecialTextField';
import { makeStyles } from "@material-ui/core/styles";
import SpecialButton from '../components/SpecialButton'
import NavBar from '../components/NavBar'
import UserView from '../components/UserView'
import './UserProfile.css'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { Grid } from '@material-ui/core';
import UserAttributes from '../components/UserAttributes';
import CustomizedAccordions from '../components/Accordion'
import { useParams } from "react-router-dom";

import { fetchUser } from '../store/user'
import { fetchGear } from '../store/gear'

import './UserProfile.css'


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
          height: "50%",

        },
      },
      MuiButton: {
        label: {
          textTransform: "none",
          font: "15px Helvetica Neue",
          fontWeight: "bold",
          padding: "10px"
        }
      },
      MuiGrid: {
        container: {
            width: "50%"
        }
    },
    },
  });

export default function UserProfile() {
    let { id } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchUser(id));
      }, [dispatch, id]);
      useEffect(() => {
        dispatch(fetchGear(id));
      }, [dispatch, id]);
    const profileUser = useSelector(state => state.user)
    const profileGears = useSelector(state => state.gear)

    const currentUser = useSelector(state => state.auth.musician);
    const currentUserToken = useSelector(state => state.auth.auth_token);
    if (!currentUser && !currentUserToken) return <Redirect to="/"/>;
    return (
        <>
            <NavBar/>
            <div id="titlecontainer1">
                <div id="title1"> Hi {currentUser.firstName}! </div>
            </div>
            <Grid container align="center" direction="column" spacing={0} alignItems="stretch" className="qgrid1">
                <ThemeProvider theme={theme}>
                <Grid item className="item1" key={profileUser.id}>
                    <UserView key={profileUser.id} musician={profileUser}/>
                </Grid>
                <Grid item className="item2">
                    <UserAttributes id={id}/>
                </Grid>
                </ThemeProvider>

            </Grid>
            <div className="accorddiv">
                <CustomizedAccordions/>
            </div>
        </>
    )
}
