import React, { useEffect } from 'react';
import Sidebar from '../Menu/Menu';
import './Dashboard.css';

function Dashboard(props) {
  useEffect(() => {
    if (!localStorage.getItem('JWT_PAYLOAD')) {
      props.history.push('/');
    }
  }, [props.history])

  return (
    <div className="dashboard-wrapper">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="main">
        <div className="top">
          <div className="left">
            <div className="header">Statistika</div>
          </div>
          <div className="right">
            <div className="header">Moji kvizevi</div>
          </div>
        </div>

        <div className="bottom"></div>
      </div>
    </div>
  )
}

export default Dashboard;