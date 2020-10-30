import React from 'react';

import { Route } from  'react-router-dom';

import LandingPage from './LandingPage';

import LoginPage from './LoginPage'

import SignupPage from './SignupPage'

import UserProfile from './UserProfile'

import Browse from './Browse'

import GearForm from './GearForm'

import AttributeForm from './AttributeForm'

import Feed from './Feed'

import GearProfile from './GearProfile'



export default function Pages() {

    return (
      <>
        <Route exact path="/" component={LandingPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
        <Route exact path ="/users/:id" component={UserProfile}/>
        <Route path ="/users/:id/gear" component={GearProfile}/>
        <Route path = "/browse/gear/all" component={Browse}/>
        <Route path ="/gear/new" component={GearForm}/>
        <Route path ="/gear/attributes" component={AttributeForm}/>
        <Route path ="/feed" component={Feed}/>
      </>
    );
  }
