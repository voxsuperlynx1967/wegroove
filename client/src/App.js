import React from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import Pages from './pages/Pages';




function App() {
  console.log("____Rendering app_____")
  return (
    <BrowserRouter>
        <Pages/>
    </BrowserRouter>
  );
}

export default App;
