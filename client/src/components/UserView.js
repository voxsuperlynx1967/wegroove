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
import EditIcon from '@material-ui/icons/Edit';




export default function UserView({ musician }) {
  console.log(musician.mediaLink)
  console.log(musician.firstName)


  const currentUser = useSelector(state => state.auth.musician);
  const button = () => {
      if (currentUser.id === musician.id) {
        return (
            <div className="editprof">
              <EditIcon className="edit">
                Edit profile
              </EditIcon>

            </div>

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
          image={musician.mediaLink}
          title="Musician"
        ></CardMedia>
        <CardContent>
          <Typography className="musicianname">
            {musician.firstName}{" "}{musician.lastName}
          </Typography>
          <Typography className="musicianbio">
            {musician.bio}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {button()}
      </CardActions>
    </Card>
  );
}
