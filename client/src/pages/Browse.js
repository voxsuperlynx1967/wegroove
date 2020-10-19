import React, { useEffect, useState, useRef } from 'react';
import NavBar from '../components/NavBar'
import UserPanel from '../components/UserPanel'
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersNearby } from '../store/nearby';
import { Select } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { Button } from '@material-ui/core';

import { Grid } from '@material-ui/core';

import './Browse.css'

export default function Browse() {
    const currentUser = useSelector(state => state.auth.musician);
    const [radius, setRadius] = useState(10)
    const lat = currentUser.latitude
    const lng = currentUser.longitude
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchUsersNearby(lat, lng, radius));
        debugger
      }, [dispatch]);

    const userList = useSelector(state => state.nearby);
    debugger

    const panels = ( userList ) => {
        const list1 = []
        debugger
        for (let i=0; i < userList.length; i++) {
            if (userList[i].id !== currentUser.id) {
            list1.push(
                <Grid item>
                        <UserPanel user={userList[i]}/>
                </Grid>
            )
            }
        }
        if (list1.length === 0) {
            console.log("hi")
            // document.querySelectorAll(".MuiGrid-root.qgridusers.MuiGrid-container.MuiGrid-spacing-xs-4").classList.remove("qgridusers")
            // document.getElementById("browsegrid").classList.add()
            return (
                <Grid item className="sorry">
                    <span>We're so sorry, we can't find any musicians in your area!</span>
                </Grid>
            )
        } else {
            return list1
        }

    }

    const handleRadiusChange = (event) => {
        setRadius(event.target.value)

    }

    const handleRadiusSubmit = (event) => {
        event.preventDefault();
        dispatch(fetchUsersNearby(lat, lng, radius))
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
            <div className="radius">
              <form className="radform" onSubmit={handleRadiusSubmit}>
                <Select className="radselect" labelId="label" id="select" value={radius}
                        onChange={handleRadiusChange}>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={25}>25</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                    <MenuItem value={50000}>I wanna see everybody!</MenuItem>

                </Select>
                <Button type="submit" className="radbutton"> Change search radius!</Button>
              </form>
            </div>
            <ThemeProvider theme={theme}>
                <Grid id="browsegrid" container align="center" direction="row" spacing={4} alignItems="stretch" className="qgridusers">
                    {panels(userList)}
                </Grid>
            </ThemeProvider>

        </>
    )
}
