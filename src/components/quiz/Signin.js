import React, { useState } from 'react';

function Signin(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }
    
    const handleSignIn = () => {
        props.signIn(email, password);
    }

    return (
        <div className="sign-in-wrapper">
          <div className="form">
            <div className="input-wrapper">
              <div>Email Address</div>
              <input
                className="input"
                type="text"
                placeholder="Email Address"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="input-wrapper">
              <div>Password</div>
              <input
                className="input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
    
            <div className="btn" onClick={handleSignIn}>Sign in</div>
          </div>
        </div>
      );
    }

export default Signin;

