import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import Pages from './pages/Pages';
import Pages from './pages/Pages';
import { setUser } from './store/auth';
import { useDispatch } from 'react-redux';




function App() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
      const loadUser = async () => {
        const res = await fetch("/api/session");
        if (res.ok) {
          res.data = await res.json();
          dispatch(setUser(res.data.user))
        }
        setLoading(false);
      }
      loadUser();
    }, [dispatch]);

    if (loading) return null;
  return (
    <BrowserRouter>
        <Pages/>
    </BrowserRouter>
  );
}

export default App;
