import React, { useEffect, useState, useRef } from 'react';
import NavBar from '../components/NavBar'
import UserPanel from '../components/UserPanel'
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersNearby } from '../store/nearby';
import { Select } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import TinyGroovyButton from '../components/TinyGroovyButton';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from "react-router-dom";
import { getGearTypes } from '../store/type';

import { Grid } from '@material-ui/core';

import './Browse.css'

export default function Browse() {
    let { filt } = useParams()
    const [filtz, setFiltz] = useState(0);
    const currentUser = useSelector(state => state.auth.musician);
    const [radius, setRadius] = useState(10)
    const lat = currentUser.latitude
    const lng = currentUser.longitude
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getGearTypes());

      }, [dispatch]);
    useEffect(() => {
        dispatch(fetchUsersNearby(lat, lng, radius, filtz));
        debugger
      }, [dispatch]);


    const gearTypes = useSelector(state => state.type)
    const userList = useSelector(state => state.nearby);
    debugger
    const options = (gear) => {
        let list2 = []
        list2.push(
            <MenuItem value={0}>All gear</MenuItem>
        )
        for (let i=0; i < gear.length ; i++) {
            list2.push(
                <MenuItem value={gear[i].id}>{gear[i].name}</MenuItem>
            )

        }
        return list2
    }

    const panels = ( userList ) => {
        const list1 = []
        debugger
        for (let i=0; i < userList.length; i++) {
            if (userList[i].id !== currentUser.id) {
                if (userList[i].gear.length !== 0) {
                    list1.push(
                        <Grid item>
                                <UserPanel user={userList[i]}/>
                        </Grid>
                    )
                }

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

    const handleFiltzChange = (event) => {
        setFiltz(event.target.value)

    }

    const handleRadiusSubmit = (event) => {
        event.preventDefault();
        dispatch(fetchUsersNearby(lat, lng, radius, filtz))
    }



    return (
        <>
            <NavBar/>
            <div className="banner"> Meet musicians in your area</div>
            <div className="radius">
              <form className="radform" onSubmit={handleRadiusSubmit}>
              <Select className="filtselect" labelId="label" id="select" value={filtz}
                        onChange={handleFiltzChange}>
                    {options(gearTypes)}


                </Select>
                <TinyGroovyButton type="submit" className="radbutton"> Filter</TinyGroovyButton>
                <Select className="radselect" labelId="label" id="select" value={radius}
                        onChange={handleRadiusChange}>
                    <MenuItem value={1}>1 mi</MenuItem>
                    <MenuItem value={10}>10 mi</MenuItem>
                    <MenuItem value={25}>25 mi</MenuItem>
                    <MenuItem value={50}>50 mi</MenuItem>
                    <MenuItem value={100}>100 mi</MenuItem>
                    <MenuItem value={50000}>Everyone</MenuItem>

                </Select>
                <TinyGroovyButton type="submit" className="radbutton"> Change search radius!</TinyGroovyButton>
              </form>
            </div>

                <Grid id="browsegrid" container align="center" direction="row" spacing={4} alignItems="stretch" className="qgridusers">
                    {panels(userList)}
                </Grid>

        </>
    )
}
