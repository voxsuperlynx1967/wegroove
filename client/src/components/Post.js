import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
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

  const like = (e) => {
      document.getElementById(e.target.id).classList.add("hidden")
      document.getElementById("heart2").classList.remove("hidden")
  }

  const renderimage = () => {
      if (post.mediaLink) {
        return (
            <img className="postpic" src={post.mediaLink} />
        )
      }
  }

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
            {renderimage()}
        </div>
        <div className="caption">
            {post.caption}
        </div>
        <div className="bottombarheart">
          <FavoriteBorderIcon onClick={like} className="heart"/>
        </div>
      </div>
    </div>
  )
}

export default Post;
