import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { lightGreen } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import './UserPanel.css'
import UserPanelGallery from './UserPanelGallery'
import { useHistory, NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  fun: {
    background: '#00B8FF',
    height: "20%",
  },
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
    paddingLeft: "20%"
  },
  avatar: {
    backgroundColor: lightGreen[500]
  }
}));

export default function UserPanel( user ) {
  const history = useHistory();
  const classes = useStyles();
  const usercard = user.user
  return (
    <Card className={classes.root}>
      <div className="headerdiv">
          <NavLink className="nope" to={`/users/${usercard.id}`}>
          <Avatar aria-label="recipe" className={classes.avatar}>
            <img className="thumbnail" src={usercard.mediaLink}/>

          </Avatar>
          </NavLink>
          <NavLink className="nope" to={`/users/${usercard.id}/gear`}>
          {usercard.firstName}'s Board
          </NavLink>
          {/* <IconButton aria-label="settings">
            <MusicNoteIcon />
          </IconButton> */}


        </div>
      <UserPanelGallery user={usercard}/>
      <CardContent>
      </CardContent>
      <CardActions className = {classes.fun} disableSpacing>
        <IconButton aria-label="add to favorites">
          {/* <FavoriteIcon /> */}
        </IconButton>
      </CardActions>
    </Card>
  );
}
