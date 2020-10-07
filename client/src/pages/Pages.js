import React from 'react';

import { Route } from  'react-router-dom';

import LandingPage from './LandingPage';

import LoginPage from './LoginPage'

import SignupPage from './SignupPage'

import UserProfile from './UserProfile'


export default function Pages() {
    return (
      <>
        <Route exact path="/" component={LandingPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path ="/user" component={UserProfile}/>


      </>
    );
  }
