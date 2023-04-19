import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Sidebar from '../Menu/Menu';
import Toast from '../Toast/Toast';
import './Profil.css';

function Profile(props) {
    const [user, setUser] = useState(null);
    const [previewSource, setPreviewSource] = useState('');
    const [message, setMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const fileTypes = ['jpg', 'pdf', 'png', 'jpeg', 'image/jpg', 'image/pdf', 'image/png', 'image/jpeg'];

    const getUser = useCallback(() => {
        let id = localStorage.getItem('_ID');
        if (!id) {
            props.history.push('/');
            localStorage.clear();
        }
        axios.get('/api/users/' + id).then((res) => {
            setUser(res.data.user);
        });
    }, [props.history])

    useEffect(() => {
        getUser();
    }, [getUser])

    const handleFileInputChange = e => {
        const file = e.target.files[0];
        if(!fileTypes.includes(file.type)) {
            setMessage('Mora biti jpg, pdf, or png');
        } else {
            setMessage('');
            previewFile(file);
        }
    }

    const previewFile = (file) => {
        if(file.size > 10000000) {
            setMessage('Prevelik');
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        }
    }

    const handleSubmitFile = (e) => {
        e.preventDefault();
        if (message.length > 0 || !previewSource || !user._id) {
          return;
        }
        axios.post('/api/users/upload-image', JSON.stringify({
          data: previewSource,
          _id: user._id
        })).then((res) => {
          const success = !!(res.data && res.data.message);
          setMessage(success ? 'Success' : '');
          setPreviewSource('');
          setShowToast(true);
          getUser();
        }).catch((err) => {
          console.log(err);
          setMessage('Pogreska u postavljanju slike');
          setShowToast(true);
        })
      }

    return (
        <div className="profile-wrapper">
            <Toast model={showToast} messsage={message} />
            <div>
                <Sidebar />
            </div>

            <div className="body">
                {user &&
                    <div className="cards">
                        <div className="left">
                            <div className="img-uploader">
                                <div>Stavi svoju sliku</div>
                                <div className="upload-box">
                                    <input onChange={(e) => handleFileInputChange(e)} type="file" />
                                    {previewSource ?
                                        <img className="display-image" src={previewSource} alt="Pozadina" />
                                        : (user.avatar && user.avatar.url ? <img style={{borderRadius: '50%', objectFit: 'cover', margin: '20px auto 0 25px', width: '25vw', height: '25vw'}} className="display-image" src={user.avatar.url} alt="avatar"/>  : <img className="display-image" src={previewSource} alt="Profilna"/> )}
                                </div>
                                <div style={{color: message === 'Success' ? 'green' : 'red', fontSize: '.8em', margin: '20px 0'}}>{ message }</div>
                                <button className="image-btn" style={{marginTop: '20px'}} onClick={(e) => handleSubmitFile(e)}>Save</button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Profile;