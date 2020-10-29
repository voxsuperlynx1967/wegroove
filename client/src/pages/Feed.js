import React, { useState, useEffect } from 'react';
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import SpecialTextField from '../components/SpecialTextField';
import { makeStyles } from "@material-ui/core/styles";
import SpecialButton from '../components/SpecialButton'
import NavBar from '../components/NavBar'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom'
import UserAttributes from '../components/UserAttributes';
import CustomizedAccordions from '../components/Accordion'
import { useParams } from "react-router-dom";
import { fetchFollows } from '../store/follow'
import { fetchPostsFollowing } from '../store/posts'

export default function Feed() {
    let { id } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchFollows(id));
    }, [dispatch, id]);

    const follow = useSelector(state => state.follow)
    const following = follow.Following ? follow.Following : []
    console.log(following ? following : [])

    useEffect(() => {
        dispatch(fetchPostsFollowing(following));
    }, [dispatch, following]);


    return (
        <>
            <NavBar/>
            {/* <div className="banner"> .</div> */}
        </>
    )

}
