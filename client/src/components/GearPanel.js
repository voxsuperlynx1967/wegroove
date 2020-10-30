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
import './GearPanel.css'
import UserPanelGallery from './UserPanelGallery'
import { useHistory, NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  fun: {
    background: '#00B8FF',
    height: "20%",
  },
  root: {
    width: "100%",
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

export default function UserPanel( gear ) {
  const history = useHistory();
  const classes = useStyles();
  const profgear = gear.gear
  const attributes =  (gear) => {
    let list2 = []
    let atts = gear.attributes
    for (let i=0; i<atts.length; i++) {
        list2.push(
            <div>
                <span className="attributes2">{atts[i].tag}: {atts[i].value}</span>

            </div>
        )


        }
    return list2
}

  return (
    <Card className={classes.root}>
      <div className="headerdiv">
          {profgear.name}
          {/* <IconButton aria-label="settings">
            <MusicNoteIcon />
          </IconButton> */}


        </div>
        <div className="imageholder">
            <img className="panelimage" src={profgear.mediaLink}/>
            {attributes(profgear)}
         </div>
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
