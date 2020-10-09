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
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import './UserPanel.css'
import Gallery from './Gallery'

const useStyles = makeStyles((theme) => ({
  fun: {
    backgroundImage: "linear-gradient(to bottom right, purple, blue, green, yellow, red)",
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
    backgroundColor: red[500]
  }
}));

export default function UserPanel() {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <div className="headerdiv">
          <Avatar aria-label="recipe" className={classes.avatar}>
            SC
          </Avatar>
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>


        </div>
      <Gallery/>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
      <CardActions className = {classes.fun} disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
