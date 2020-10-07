import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import SpecialTextField from '../components/SpecialTextField';
import { makeStyles } from "@material-ui/core/styles";
import SpecialButton from '../components/SpecialButton'
import NavBar from '../components/NavBar'
import './UserProfile.css'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom'



export default function UserProfile() {
    const currentUser = useSelector(state => state.auth.id);
    const currentUserToken = useSelector(state => state.auth.auth_token);
    if (!currentUser && !currentUserToken) return <Redirect to="/"/>;
    return (
        <NavBar/>
    )
}
