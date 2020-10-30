import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import './Post.css'
import { Avatar } from '@material-ui/core'
import { lightGreen } from "@material-ui/core/colors";
import { NavLink } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    avatar: {
      backgroundColor: lightGreen[500],
    }
  }));



function Post({ post }) {

  const classes = useStyles();
  return (
    <div>
      <div className="box">
        <div className = "formtitlebar">
        <div className="namestuff">
        <NavLink className="nope2" to={`/users/${post.musicianId}`}>
        <Avatar aria-label="recipe" className={classes.avatar}>
            <img className="thumbnail" src={post.musicianmediaLink}/>

          </Avatar>

        </NavLink>
          <label className="usersname">
          <NavLink className="nope2" to={`/users/${post.musicianId}`}>
            {post.firstName} {post.lastName}
            </NavLink>
          </label>


          </div>
          {/* <MoreHorizIcon /> */}
        </div>
        <div>
          <img className="postpic" src={post.mediaLink} />
        </div>
        <div className="caption">
            {post.caption}
        </div>
        <div className="bottombar">
          <FavoriteBorderIcon className="heart"/>
        </div>
      </div>
    </div>
  )
}

export default Post;
