import React, {useState} from 'react';
import {connect} from 'react-redux';
import Axios from 'axios';

import './index.scss';

const defaultFiles = new Array(4).fill(undefined);

const FileUploader = ({dispatch}) => {
  const [username, setUsername] = useState('');
  const [files, setFiles] = useState(defaultFiles);

  const handleUserNameInput = (evt) => {
    const value = evt.target.value;
    setUsername(value);
  }

  const fileUploadRequest = (file) => {
    const data = new FormData();
    data.append('file', file);
    return Axios.post('/api/file/imageUpload', data);
  }

  const handleFileUpload = (evt) => {
    const file = evt.target.files[0];
    const fileId = +evt.target.parentElement.getAttribute('data-fileid');
    setFiles(files.map((item, index) => {
      if (index === fileId) {
        return file;
      } else {
        return item;
      }
    }));

    fileUploadRequest(file).then((resp) => {
      console.log(resp);
    }, (err) => {
      console.log(err);
    });
  }

  return (
    <div className='FileUploader'>
      <div className='NameInput'>
        <input type='input' placeholder='Please input your name...' value={username} onChange={handleUserNameInput} />
      </div>
      <div className='ImageUploader'>
        <div className='ImageUploadSpace'>
          {
            files.map((file, idx) => (
              <div className='ImageUploadFrame' key={idx} data-fileId={idx}>
                <input className={`FileUpload__Input MyWacai-File-Uploader ${file ? 'FileUpload--Transparent' : ''}`} type='file' name='file' onChange={handleFileUpload} />
                {
                  file && <div className='FileUpload__Name'>
                    <div>{file.name}</div>
                  </div>
                }
              </div>
            ))
          }
        </div>
      </div>
      <div className='ButtonGroup'>
        <div className='SubmitButton Button'>Submit</div>
        <div className='CancelButton Button'>Cancel</div>
      </div>
    </div>
  );
}

export default connect()(FileUploader);
