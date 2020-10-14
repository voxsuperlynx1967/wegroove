import React, { useEffect, useState, useRef } from 'react';
import NavBar from '../components/NavBar'
import UserPanel from '../components/UserPanel'
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersNearby } from '../store/nearby';

import { Grid } from '@material-ui/core';

import './Browse.css'

export default function Browse() {
    const currentUser = useSelector(state => state.auth.musician);
    const lat = currentUser.latitude
    const lng = currentUser.longitude
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchUsersNearby(lat, lng));
        debugger
      }, [dispatch]);

    const userList = useSelector(state => state.nearby);
    debugger

    const panels = ( userList ) => {
        const list1 = []
        debugger
        for (let i=0; i < userList.length; i++) {
            list1.push(
                <Grid item>
                        <UserPanel user={userList[i]}/>
                </Grid>
            )
        }
        return list1
    }



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
        },

      });
    return (
        <>
            <NavBar/>
            <div className="banner"> Meet musicians in your area</div>
            <ThemeProvider theme={theme}>
                <Grid container align="center" direction="row" spacing={4} alignItems="stretch" className="qgridusers">
                    {panels(userList)}
                </Grid>
            </ThemeProvider>

        </>
    )
}
