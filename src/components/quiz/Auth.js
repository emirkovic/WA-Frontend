import React, { useState } from 'react';
import Signup from './Signup';
import Signin from './Signin';
import Toast from './Toast/Toast';
import store from '../store/index';
import axios from 'axios';
import './Auth.css';

function Auth(props) {
  const [tab, setTab] = useState('signin');
  const [showToast, setShowToast] = useState(false);

  const signIn = (email, password) => {
    axios
      .post('/api/users/login', { email, password })
      .then((res) => {
        if (res.data.success) {
          store.dispatch({
            type: 'login',
            _id: res.data.user._id,
            user: res.data.user,
            token: res.data.token,
          });
          props.history.push('/dashboard');
        } else {
          setShowToast(true);
          setTimeout(() => {
            setShowToast(false);
          }, 3000);
        }
      })
      .catch((er) => {
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      });
  };

  const signUp = ({ firstName, lastName, email, password }) => {
    axios
      .post('/api/users/register', { firstName, lastName, email, password })
      .then((res) => {
        if (res.data.success) {
          setTab('signin');
        }
      })
      .catch((er) => {
        console.log(er);
      });
  };

  const changeTab = () => {
    setTab((prevTab) => (prevTab === 'signup' ? 'signin' : 'signup'));
  };

  let page = tab === 'signin' ? <Signin signIn={signIn} /> : <Signup signUp={signUp} />;
  return (
    <div className="auth-wrapper">
      <Toast model={showToast} message="Incorrect login" backgroundColor="#FF4539" />
      <div className="left">
        <img src="https://freesvg.org/img/chemist.png" alt=""/>
      </div>

      <div className="right">
        <div className="header">Kviz Aplikacija</div>
        <div className="sub-header">Welcome to Kviz Aplikacija</div>
        {page}
        <div className="new" onClick={changeTab}>
          {tab === 'signin' ? 'Novi korisnik? Registrirajte se ovdje' : 'Vec imate profil? Logirajte se ovdje'}
        </div>
      </div>
    </div>
  );
}

export default Auth;