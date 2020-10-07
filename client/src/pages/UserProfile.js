import React from 'react';
import { Container } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import SpecialTextField from '../components/SpecialTextField';
import { makeStyles } from "@material-ui/core/styles";
import SpecialButton from '../components/SpecialButton'
import NavBar from '../components/NavBar'
import './UserProfile.css'

export default function UserProfile() {
    return (
        <NavBar/>
    )
}
