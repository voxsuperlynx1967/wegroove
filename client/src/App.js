import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import Pages from './pages/Pages';
import { setUser } from './store/auth';
import { useDispatch } from 'react-redux';
import { CssBaseline } from '@material-ui/core';




function App() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
      const loadUser = async () => {
        const res = await fetch("/api/users/session");
        debugger
        if (res.ok) {
          const data = await res.json();
          debugger
          dispatch(setUser(data))
        }
        setLoading(false);
      }
      loadUser();
    }, [dispatch]);

    if (loading) return null;
  return (

    <>
      <CssBaseline>
        <BrowserRouter>
          <Pages/>
        </BrowserRouter>
      </CssBaseline>
    </>
  );
}

export default App;
