import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import axios from 'axios';

export default function PhotoUpload() {
  // const dispatch = useDispatch();

  const currentUserId = useSelector(state => state.auth.id);
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});

  const handleFileChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name)
  }



  const handleSubmit = async e => {
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

  return (
    <div>
        <div className='upload-photo'>
          <input type='file' className='upload-photo' id='customPhoto'
            onChange={handleFileChange}
          />
        </div>
        <input type='button' onClick={handleSubmit} value="Upload" className='uploadButton' />
    </div>
  )
}
