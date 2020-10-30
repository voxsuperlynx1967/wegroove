import React, { useState }from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import SpecialButton from './SpecialButton';
import GroovyButton from './GroovyButton'
import Typography from '@material-ui/core/Typography';
import './UserView.css'
import { Modal } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import SpecialTextField from '../components/SpecialTextField';
import { update } from '../store/auth'
import axios from 'axios';
import Avatar from "@material-ui/core/Avatar";
import { NavLink } from 'react-router-dom';
import { fetchFollows } from '../store/follow'


function rand() {
    return Math.round(Math.random() * 20) - 10;
  }

  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: '#00B8ff',
      borderRadius: '5px',
      padding: theme.spacing(2, 4, 3),
    },
  }));




export default function UserView({ musician, followers, following }) {
  console.log("Hi", following, followers)
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.auth.musician);
  console.log(musician.mediaLink)
  console.log(musician.firstName)
  const [email, setEmail] = useState(musician.email)
  const [bio, setBio] = useState(musician.bio)
  const [mediaLink, setMediaLink] = useState(musician.mediaLink)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const currentUserId = currentUser.id
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [followed, setFollowed] = useState(false)
  const handleFileChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name)
  }



  const handleSubmitz = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file)
    formData.append('id', currentUserId)

    try {
      const res = await axios.post('/api/photo/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      const link = await res.data
      setMediaLink(link)
    //   setUploadedFile({ fileName, filePath })
    } catch (err) {
      if (err.response.status === 500) {
        console.log('There was a problem with the server')
      } else {
        console.log(err.response.data.message)
      }
    }
  }


  const followmusician = async () => {
    const id2 = musician.id
    const res = await fetch(`/api/follow/${musician.id}`, {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id2, currentUserId})

    });
    dispatch(fetchFollows(musician.id));

  }

  const unfollowmusician = async () => {
    const id2 = musician.id
    const res = await fetch(`/api/follow/${musician.id}`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id2, currentUserId})

    });
    dispatch(fetchFollows(musician.id));

  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen1 = () => {
    setOpen1(true);
    console.log(open1)
  };

  const handleClose1 = () => {
    setOpen1(false);
    console.log(open1)
  };

  const handleOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleOpen4 = () => {
    setOpen4(true);
  };

  const handleClose4 = () => {
    setOpen4(false);
  };

  const handleChange1 = (event) => {
      setEmail(event.target.value)


  }
  const handleChange2 = (event) => {
    setBio(event.target.value)
  }
  const handleChange3 = (event) => {
    setMediaLink(event.target.value)
  }
  const handleChange4 = (event) => {
    setPassword(event.target.value)
  }
  const handleChange5 = (event) => {
    setConfirmPassword(event.target.value)
  }

  const handleSubmit = (event) => {
      const id = musician.id
      dispatch(update(id, email, password, confirmPassword, bio, mediaLink))
  }

  const followingcount = (following) => {
      let count = 0
      for (let i = 0; i < following.length; i++) {
        count++
      }
      return count
  }

  const followercount = (followers) => {
    let count = 0
    for (let i = 0; i < followers.length; i++) {
      count++
    }
    return count
  }
    const create = (folls) => {
        const list1 = [];
        if (folls.length === 0 || !folls) {
            return (
                <div className="nobody12">Nobody here!</div>
            )
        }
        for (let i = 0; i < folls.length; i++) {
            if (folls[i].followinginfo) {
                list1.push(
                    <div className="followlis">
                        <NavLink className="nope1" to={`/users/${folls[i].followinginfo.id}`}>
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            {folls[i].followinginfo.firstName[0]}{folls[i].followinginfo.lastName[0]}
                        </Avatar>
                        </NavLink>
                        <span className="followname">
                            {folls[i].followinginfo.firstName}
                        </span>

                    </div>
                )
            } else {
                list1.push(
                    <div className="followlis">
                        <NavLink className="nope1" to={`/users/${folls[i].followerinfo.id}`}>
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            {folls[i].followerinfo.firstName[0]}{folls[i].followerinfo.lastName[0]}
                        </Avatar>
                        </NavLink>
                        <span className="followname">
                            {folls[i].followerinfo.firstName}
                        </span>

                    </div>
                )
            }

        }

        return list1
    }

  const body2 = (input) => {
        return (
            <div style={modalStyle} className={classes.paper}>
                <ul>
                  {create(input)}
                </ul>
            </div>
          )



  }


  const followfunc = () => {
    if (followers) {
        for (let i = 0; i < followers.length; i++) {
            if (followers[i].followerId === currentUserId) {
                return (
                    <span onClick={unfollowmusician} id="checkme">Unfollow</span>
                )
            }

        }
    }
    return (

        <span onClick={followmusician} id="checkme">Follow</span>
    )
  }




  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div className="formheaderbox"><div className="formheader">Edit your profile info</div></div>
      <form onSubmit={handleSubmit}>
        <div className="errors-container">
          <ul className="errors" id="sign-up-errors"></ul>
        </div>
        <div className="formlabels">Email</div>
        <SpecialTextField
        value={email}
        onChange={handleChange1}>

        </SpecialTextField>
        <div className="formlabels">Password</div>
        <SpecialTextField onChange={handleChange4} value={password} placeholder={'New password'}>

        </SpecialTextField>
        <SpecialTextField onChange={handleChange5} value={confirmPassword} placeholder = {'Confirm password'}>

        </SpecialTextField>
        <div className="formlabels">Bio</div>
        <SpecialTextField
        value={bio}
        onChange={handleChange2}>

        </SpecialTextField>
        <div className="formlabels">Profile picture</div>
        <div>
        <div className='upload-photo'>
          <input type='file' className='upload-photo' id='customPhoto'
            onChange={handleFileChange}
          />
        </div>
        <input type='button' onClick={handleSubmitz} value="Upload" className='uploadButton' />
        </div>
        <GroovyButton className="superspecialbutton"> Update your profile</GroovyButton>

      </form>
    </div>
  );

  const button = () => {
      if (currentUser.id === musician.id) {
        return (
            <div className="editprof">
              <EditIcon onClick={handleOpen} className="edit2">
              </EditIcon>
              <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    {body}
                </Modal>

            </div>

        )
      } else {
        return (
            <>
            <GroovyButton className="buttons" color="primary">
                 {followfunc()}
            </GroovyButton>

             <GroovyButton onClick={handleOpen4} className="buttons" color="primary">
                Start chat
            </GroovyButton>
            </>
        )
      }
  }

  return (
    <Card>
      <CardActionArea>
        <img className="musicimage" src={musician.mediaLink}/>
        <CardContent>
          <Typography className="musicianname">
            {musician.firstName}{" "}{musician.lastName}
          </Typography>
          <Typography className="musicianbio">
            {musician.bio}
          </Typography>
          <span className ="followFlex">
          <span onClick={handleOpen1} className="follow">
            {followingcount(following ? following : 0)} Following
          </span>

            <Modal
                    open={open1}
                    onClose={handleClose1}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    {body2(following ? following : [])}
            </Modal>

          <span onClick={handleOpen2} className="follow">
            {followercount(followers ? followers : 0)} Followers
          </span>
            <Modal
                    open={open2}
                    onClose={handleClose2}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    {body2(followers ? followers : [])}
            </Modal>

          </span>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {button()}
      </CardActions>
    </Card>
  );
}
