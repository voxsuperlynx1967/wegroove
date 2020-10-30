import React, { useState, useEffect } from 'react';
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import NavBar from '../components/NavBar'
import UserView from '../components/UserView'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { Grid } from '@material-ui/core';
import UserAttributes from '../components/UserAttributes';
import CustomizedAccordions from '../components/Accordion'
import { useParams } from "react-router-dom";

import { fetchUser } from '../store/user'
import { fetchGear } from '../store/gear'
import GearPanel from '../components/GearPanel.js'
import AddCircle from '@material-ui/icons/AddCircle';
import { NavLink } from 'react-router-dom';


import './GearProfile.css'


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
          fontSize: "15px",
          fontFamily: "'Fredoka One', cursive",
          fontWeight: "bold",
          padding: "10px"
        }
      },
      MuiGrid: {
        container: {
            width: "50%",
            borderRadius: "5px",
        }
    },
    },
  });



export default function UserProfile() {
    let { id } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchUser(id));
        debugger
      }, [dispatch, id]);
      useEffect(() => {
        dispatch(fetchGear(id));
      }, [dispatch, id]);


    const profileUser = useSelector(state => state.user)
    const profileGears = useSelector(state => state.gear)

    const panels = ( gear ) => {
        const list1 = []
        debugger
        for (let i=0; i < gear.length; i++) {
                    list1.push(
                        <Grid item className="gearpanel">
                            <GearPanel gear={gear[i]}/>
                        </Grid>
                    )

        }
        if (list1.length === 0) {
            console.log("hi")
            // document.querySelectorAll(".MuiGrid-root.qgridusers.MuiGrid-container.MuiGrid-spacing-xs-4").classList.remove("qgridusers")
            // document.getElementById("browsegrid").classList.add()
            return (
                <Grid item className="sorry">
                    <span>We're so sorry, there's no gear here!</span>
                </Grid>
            )
        } else {
            return list1
        }

    }
    const currentUser = useSelector(state => state.auth.musician);

    const edit = () => {
    if (currentUser.id === profileUser.id) {
        return (
            <NavLink to="/gear/new" className="nav">
                <AddCircle className="edit"/>
            </NavLink>
        )
        }
     }
    const currentUserToken = useSelector(state => state.auth.auth_token);
    if (!currentUser && !currentUserToken) return <Redirect to="/"/>;
    return (
        <>
            <NavBar/>
            <div className="banner3">{`Check out ${profileUser.firstName}'s gear`}
            {edit()}
            </div>
            <Grid id="geargrid" container align="center" direction="row" spacing={4} alignItems="stretch" className="qgridusers2">
                   {/* <UserAttributes id={id}/> */}
                   {panels(profileGears)}



            </Grid>
            <div className="accorddiv2">
                <CustomizedAccordions user={currentUser}/>
            </div>

        </>
    )
}
