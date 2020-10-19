import React, {useState}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import SpecialButton from './SpecialButton';
import Typography from '@material-ui/core/Typography';
import './UserView.css'
import { Modal } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import SpecialTextField from '../components/SpecialTextField';
import { update } from '../store/auth'
import axios from 'axios';

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




export default function UserView({ musician }) {
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
  const [open, setOpen] = React.useState(false);

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
      setMediaLink(res.data)
    //   setUploadedFile({ fileName, filePath })
    } catch (err) {
      if (err.response.status === 500) {
        console.log('There was a problem with the server')
      } else {
        console.log(err.response.data.message)
      }
    }
  }




  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
        <SpecialButton className="superspecialbutton"> Update your profile</SpecialButton>

      </form>
    </div>
  );

  const button = () => {
      if (currentUser.id === musician.id) {
        return (
            <div className="editprof">
              <EditIcon onClick={handleOpen} className="edit2">
                Edit profile
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
