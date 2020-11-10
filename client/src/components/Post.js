import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import './Post.css'
import { Avatar } from '@material-ui/core'
import { lightGreen } from "@material-ui/core/colors";
import { NavLink } from 'react-router-dom'
import { fetchLikes } from '../store/like'

const useStyles = makeStyles((theme) => ({
    avatar: {
      backgroundColor: lightGreen[500],
    }
  }));



export default function Post({ post }) {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.auth.musician);
  const currentUserId = currentUser.id
  const postId = post.id
  console.log(postId)

  const likes = useSelector(state => state.like)
  const likerender = () => {
      if (likes) {
        for (let i = 0; i < likes.length; i++) {
            if (likes[i].postId === postId) {
                return (
                <FavoriteIcon onClick={unlike} id="liked" className="heart"/>
                )

            }
        }

      }

      return (
        <FavoriteBorderIcon onClick={like} id="unliked" className="heart"/>
      )


  }

  const like = async () => {
    const res = await fetch(`/api/like/${currentUserId}`, {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ currentUserId, postId })

    });
    dispatch(fetchLikes(currentUserId));
  }

  const unlike = async () => {
    const res = await fetch(`/api/like/${currentUserId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ currentUserId, postId })

    });
    dispatch(fetchLikes(currentUserId));
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
            {likerender()}
        </div>
      </div>
    </div>
  )
}
