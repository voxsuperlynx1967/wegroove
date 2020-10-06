import React from 'react';

import { Route } from  'react-router-dom';

import LandingPage from './LandingPage';

import LoginPage from './LoginPage'

import SignupPage from './SignupPage'


export default function Pages() {
    return (
      <>
        <Route exact path="/" component={LandingPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />


      </>
    );
  }
