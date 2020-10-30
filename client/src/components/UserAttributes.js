import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import WorkIcon from '@material-ui/icons/Work';
import AlbumIcon from '@material-ui/icons/Album';
import RadioIcon from '@material-ui/icons/Radio';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import './UserAttributes.css'
import Roles from './Roles.js'
import Gallery from './Gallery'
import SpecialButton from '../components/SpecialButton'
import AddCircle from '@material-ui/icons/AddCircle';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
}));

export default function UserAttributes( id ) {
  const classes = useStyles();


  const currentUser = useSelector(state => state.auth.musician);
  const profileUser = useSelector(state => state.user);
  console.log(id.id)
  console.log(currentUser.id)
  const edit = () => {
    if (currentUser.id === parseInt(id.id)) {
        return (
            <NavLink to="/gear/new" className="nav">
                <AddCircle className="edit"/>
            </NavLink>
        )
    }
  }

  return (
    <List className="listy">
      {/* <ListItem className="one">
        <ListItemAvatar>
          <Avatar>
            <WorkIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText className="text" primary="Influences" secondary="Who influences you?" />
      </ListItem>*/}
      {/* <ListItem className="two">
        <ListItemAvatar>
          <Avatar>
            <LibraryMusicIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText className="text" primary="Skills" secondary="What can you do?" />
      </ListItem> */}
      {/* <Roles/> */}
      {/* <ListItem className="three">
        <ListItemAvatar>
          <Avatar>
            <HomeWorkIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText className="text" primary="Spaces" secondary="Show off your space" />
      </ListItem>
      <ListItem className="four">
        <ListItemAvatar>
          <Avatar>
            <AlbumIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText className="text" primary="Projects" secondary="Show off your work" />
      </ListItem> */}
      <ListItem className="five">
        <ListItemAvatar>
          <Avatar>
            <RadioIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText className="text" primary={`${profileUser.firstName}'s Gear`} secondary="Check it out!" />
        {edit()}
      </ListItem>
      <Gallery id={id}/>
    </List>
  );
}
