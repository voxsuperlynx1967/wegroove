import React, { useState, useEffect } from 'react';
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import SpecialTextField from '../components/SpecialTextField';
import { makeStyles } from "@material-ui/core/styles";
import SpecialButton from '../components/SpecialButton'
import NavBar from '../components/NavBar'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom'
import UserAttributes from '../components/UserAttributes';
import CustomizedAccordions from '../components/Accordion'
import { useParams } from "react-router-dom";
import { fetchFollows } from '../store/follow'
import { fetchPostsFollowing } from '../store/posts'
import { createPost } from '../store/posts'
import Post from '../components/Post'
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import ChatIcon from '@material-ui/icons/Chat';
import { Modal } from '@material-ui/core';
import axios from 'axios';
import GroovyButton from '../components/GroovyButton'
import CameraAltIcon from '@material-ui/icons/CameraAlt';

import './Feed.css'


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
        },
        inputMultiline: {
            background: "white",
            font: "15px Helvetica Neue",
            paddingTop: "10px",
            paddingBottom: "20px",
            paddingLeft: "10px",
            paddingRight: "10px",
            disableUnderline: "true",

        }
      }
    }
  })

export default function Feed() {
    const classes = useStyles();
    const [caption, setCaption] = useState('')
    const [postType, setPostType] = useState('')
    const [filename, setFilename] = useState('Choose File');
    const [modalStyle] = React.useState(getModalStyle);
    const [mediaLink, setMediaLink] = useState('')
    const currentUser = useSelector(state => state.auth.musician);
    const currentUserId = currentUser.id
    const musicianId = currentUserId
    const dispatch = useDispatch();

    const handleFileChange = e => {
        const file = e.target.files[0];
        setFilename(e.target.files[0].name)
        handleSubmitz(file)
      }

      const handleSubmit1 = (event) => {
        dispatch(createPost(musicianId, postType, mediaLink, caption))
        following.push(currentUser)
        dispatch(fetchPostsFollowing(following));
        following.pop()

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
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);

    useEffect(() => {
        dispatch(fetchFollows(currentUserId));
    }, [dispatch, currentUserId]);

    const follow = useSelector(state => state.follow)


    const following = follow.Following ? follow.Following : []


    useEffect(() => {
        following.push(currentUser)
        dispatch(fetchPostsFollowing(following));
        following.pop()
    }, [dispatch, following]);

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

    return (
         <div className="pagewrapper5">
             <ThemeProvider theme={theme}>
                <NavBar/>
                <div className="makepost">
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
                <div className="feeddiv">
                    {feedfunc()}
                </div>
                {/* <div className="banner"> .</div> */}
            </ThemeProvider>
        </div>
    )

}
