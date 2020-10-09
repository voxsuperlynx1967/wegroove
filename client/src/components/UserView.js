import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import SpecialButton from './SpecialButton';
import Typography from '@material-ui/core/Typography';
import './UserView.css'

import { useSelector } from 'react-redux';




export default function UserView({ musician }) {

  const currentUser = useSelector(state => state.auth.musician);

  const button = () => {
      if (currentUser.id === musician.id) {
        return (
            <SpecialButton className="buttons" color="primary">
                 Edit profile
            </SpecialButton>
        )
      } else {
        return (
            <>
            <SpecialButton className="buttons" color="primary">
                 Add mate
            </SpecialButton>
             <SpecialButton className="buttons" color="primary">
                Start chat
            </SpecialButton>
            </>
        )
      }
  }

  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Musician"
          height="100%"
          image="https://static-cdn.123rf.com/stock-audio/images/feb2017/audio_banner_jazz_3.jpg"
          title="Musician"
        ></CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {musician.firstName}{" "}{musician.lastName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {musician.bio ? musician.firstName:musician.firstName + " has not added a bio yet! That's not very groovy..."}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {button()}
      </CardActions>
    </Card>
  );
}
