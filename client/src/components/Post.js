import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import './Post.css'





function Post({ post }) {
  return (
    <div>
      <div className="box">
        <div className = "formtitlebar">
          <label className="usersname">
            {post.firstName} {post.lastName}
          </label>
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
