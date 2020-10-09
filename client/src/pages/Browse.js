import React, { useEffect, useState, useRef } from 'react';
import NavBar from '../components/NavBar'
import UserPanel from '../components/UserPanel'
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import { Grid } from '@material-ui/core';

import './Browse.css'

export default function Browse() {

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
            <div id="titlecontainer">
                <div id="title"> Musicians in Your Area </div>
            </div>
            <ThemeProvider theme={theme}>
                <Grid container align="center" direction="row" spacing={4} alignItems="stretch" className="qgridusers">
                    <Grid item>
                        <UserPanel/>
                    </Grid>
                    <Grid item>
                        <UserPanel/>
                    </Grid>
                    <Grid item>
                        <UserPanel/>
                    </Grid>
                    <Grid item>
                        <UserPanel/>
                    </Grid>
                    <Grid item>
                        <UserPanel/>
                    </Grid>
                    <Grid item>
                        <UserPanel/>
                    </Grid>
                </Grid>
            </ThemeProvider>

        </>
    )
}
