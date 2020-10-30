import React, { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import SpecialTextField from '../components/SpecialTextField';
import { makeStyles } from "@material-ui/core/styles";
import SpecialButton from '../components/SpecialButton'
import NavBar from '../components/NavBar'
import UserView from '../components/UserView'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { Grid } from '@material-ui/core';
import UserAttributes from '../components/UserAttributes';
import CustomizedAccordions from '../components/Accordion'
import { useParams } from "react-router-dom";

import { fetchUser } from '../store/user'
import { fetchGear } from '../store/gear'
import { fetchFollows } from '../store/follow'
import { fetchPosts } from '../store/posts'
import Post from '../components/Post'
import { createPost } from '../store/posts'
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import ChatIcon from '@material-ui/icons/Chat';
import { Modal } from '@material-ui/core';
import axios from 'axios';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import GroovyButton from '../components/GroovyButton';



import './UserProfile.css'

function getModalStyle() {
    const top = 50
    const left = 50

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 600,
      backgroundColor: 'white',
      borderRadius: '5px',
      padding: theme.spacing(2, 4, 3),
    },
  }));



const theme = createMuiTheme({
    overrides: {
      MuiInputBase: {
        input: {
          background: "white",
          font: "15px Helvetica Neue",
          padding: "20px",
        }
      },
      MuiButtonBase: {
        root: {
          margin: "10px 0px 0px 0px",
          height: "50%",

        },
      },
      MuiButton: {
        label: {
          textTransform: "none",
          fontSize: "15px",
          fontFamily: "'Fredoka One', cursive",
          fontWeight: "bold",
          padding: "10px"
        }
      },
      MuiGrid: {
        container: {
            width: "50%",
            borderRadius: "5px",
        }
    },
    inputMultiline: {
        background: "white",
        font: "15px Helvetica Neue",
        paddingTop: "10px",
        paddingBottom: "20px",
        paddingLeft: "10px",
        paddingRight: "10px",
        disableUnderline: "true",

    },
    },
  });

export default function UserProfile() {
    const classes = useStyles();
    const [caption, setCaption] = useState('')
    const [postType, setPostType] = useState('')
    const [filename, setFilename] = useState('Choose File');
    const [modalStyle] = React.useState(getModalStyle);
    const [mediaLink, setMediaLink] = useState('')
    const currentUser = useSelector(state => state.auth.musician);
    const currentUserId = currentUser.id
    const musicianId = currentUserId
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const dispatch = useDispatch();
    let { id } = useParams();
    useEffect(() => {
        dispatch(fetchUser(id));
        debugger
      }, [dispatch, id]);
      useEffect(() => {
        dispatch(fetchGear(id));
      }, [dispatch, id]);

    useEffect(() => {
        dispatch(fetchFollows(id));
    }, [dispatch, id]);

    useEffect(() => {
        dispatch(fetchPosts(id));
    }, [dispatch, id]);

    const handleOpen = () => {

        setOpen(true);
        setPostType('Text')
      };

      const handleClose = () => {
        setOpen(false);
        setPostType('')
      };

      const handleOpen1 = () => {
        setOpen1(true);
        setPostType('Image')
      };

      const handleClose1 = () => {
        setOpen1(false);
        setPostType('')
      };
    const profileUser = useSelector(state => state.user)
    const profileGears = useSelector(state => state.gear)
    const follow = useSelector(state => state.follow)
    const posts = useSelector(state => state.posts)
    const feedfunc = () => {
        const list1 = []
        if (posts) {
            for (let i=0; i <posts.length; i++) {
                list1.push(
                    <Post post={posts[i]}/>
                )
            }
        }
        return list1
    }

    const displaypost = () => {
        if (currentUserId === profileUser.id) {
            return (
                <Grid item className="item2">
                    <div className="makepost2">
                        <ChatIcon onClick={handleOpen} id="posticon"/>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                        >
                            {body}
                        </Modal>
                        <CameraAltIcon onClick={handleOpen1} id="posticon"/>
                        <Modal
                            open={open1}
                            onClose={handleClose1}
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                        >
                            {body2}
                        </Modal>

                    </div>
                </Grid>

            )
        }
    }
    const currentUserToken = useSelector(state => state.auth.auth_token);
    const handleFileChange = e => {
        const file = e.target.files[0];
        setFilename(e.target.files[0].name)
        handleSubmitz(file)
      }

      const handleSubmit1 = (event) => {
        dispatch(createPost(musicianId, postType, mediaLink, caption))
        dispatch(fetchPosts(id));


    }

      const handleSubmitz = async (file) => {
        console.log(file)
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
          document.getElementById("addmepic").classList.add("postedpic")
          setMediaLink(link)
          document.getElementById("hideme").classList.add("hidden")
        //   setUploadedFile({ fileName, filePath })
        } catch (err) {
          if (err.response.status === 500) {
            console.log('There was a problem with the server')
          } else {
            console.log(err.response.data.message)
          }
        }
      }
    const body = (
        <div style={modalStyle} className={classes.paper}>
          <div className="formheaderbox"><div className="formheader2">What's on your mind?</div></div>
          <form className="postform" onSubmit={handleSubmit1}>
            <div className="errors-container">
              <ul className="errors" id="sign-up-errors"></ul>
            </div>
            <div className ="fields">
            <SpecialTextField
            className="thoughts"
            multiline
            onChange={e => setCaption(e.target.value)}>

            </SpecialTextField>
            <GroovyButton className="superspecialbutton"> Post</GroovyButton>
            </div>


          </form>
        </div>
      );

      const body2 = (
        <div style={modalStyle} className={classes.paper}>
          <div className="formheaderbox"><div className="formheader2">Post a picture!</div></div>
          <form className="postform" onSubmit={handleSubmit1}>
            <div className="errors-container">
              <ul className="errors" id="sign-up-errors"></ul>
            </div>
            <div className ="fields">
            <img id="addmepic" src={mediaLink}/>
            <div id ="hideme" className='upload-photo'>
              <input type='file' className='upload-photo' id='customPhoto'
                onChange={handleFileChange}
              />
            </div>
            <SpecialTextField
            placeholder="Add a caption!" onChange={e => setCaption(e.target.value)}>
            </SpecialTextField>
            <GroovyButton className="superspecialbutton">Post</GroovyButton>
            </div>


          </form>
        </div>
      );
    if (!currentUser && !currentUserToken) return <Redirect to="/"/>;
    return (
        <>
            <NavBar/>
            {/* <div className="banner"> Get your groove on.</div> */}
            <Grid container direction="column" spacing={0} alignItems="stretch" className="qgrid1">
                <ThemeProvider theme={theme}>
                <Grid item className="item1" key={profileUser.id}>
                    <UserView key={profileUser.id} musician={profileUser} followers={follow.Followers ? follow.Followers: []} following={follow.Following ? follow.Following : []}/>
                </Grid>
                {displaypost()}
                <Grid item className="item3">
                        {feedfunc()}
                </Grid>

                </ThemeProvider>

            </Grid>
            {/* <Grid container direction="column" spacing={0} alignItems="stretch" className="qgrid333">

            </Grid> */}
            <div className="accorddiv">
                <CustomizedAccordions user={currentUser}/>
            </div>
            {/* <UserAttributes id={id}/> */}
        </>
    )
}
