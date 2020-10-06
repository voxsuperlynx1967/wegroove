import React from 'react';

import { Route } from  'react-router-dom';

import LandingPage from './LandingPage';

export default function Pages() {
    return (
      <>
        <Route exact path="/" component={LandingPage} />
      </>
    );
  }
