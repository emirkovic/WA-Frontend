import React, { useState } from 'react';

function Signup(props) {
  const [state, setState] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    props.signUp({ ...state });
  };

  return (
    <div className="sign-in-wrapper">
      <div className="form">
        <div className="input-wrapper">
          <div>Email Address</div> 
          <input className="input" type="text" placeholder="Email Address" value={state.email} name="email" onChange={handleChange} />
        </div>
        <div className="input-wrapper">
          <div>Password</div> 
          <input className="input" type="password" placeholder="Password" value={state.password} name="password" onChange={handleChange} />
        </div>
        <div className="input-wrapper">
          <div>First Name</div> 
          <input className="input" type="text" placeholder="First Name" value={state.firstName} name="firstName" onChange={handleChange} />
        </div>
        <div className="input-wrapper">
          <div>Last Name</div> 
          <input className="input" type="text" placeholder="Last Name" value={state.lastName} name="lastName" onChange={handleChange} />
        </div>
        <div className="btn" onClick={handleClick}>Sign Up</div> 
      </div> 
    </div>
  )
}

export default Signup;