// import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const TopNavbar = () => {
  // const [darkMode, setDarkMode] = useState(true);

  // const toggleDarkMode = () => {
  //   setDarkMode(!darkMode);
  //   document.body.classList.toggle('bg-dark', darkMode);
  //   document.body.classList.toggle('text-light', darkMode);
  //   document.body.classList.toggle('bg-light', !darkMode);
  //   document.body.classList.toggle('text-dark', !darkMode);
  // };

  // const toggleFullScreen = () => {
  //   if (document.fullscreenElement) {
  //     document.exitFullscreen();
  //   } else {
  //     document.documentElement.requestFullscreen();
  //   }
  // };

  return (
    // CONVERT THIS TO OFFCANVAS NAVBAR
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-body fixed-top'>
      <Link className="navbar-brand" to="#">Your Logo</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
              aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>
          {/* <li className="nav-item">
            <button className='btn btn-secondary' onClick={toggleDarkMode}>
              Dark Mode Toggle
            </button>
          </li>
          <li className="nav-item">
            <button className='btn btn-secondary' onClick={toggleFullScreen}>
              Full Screen Toggle
            </button>
          </li> */}
          <li className="nav-item dropdown">
            <Link className="nav-link dropdown-toggle" to="#" id="messagesDropdown" role="button"
               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Messages
            </Link>
            <div className="dropdown-menu" aria-labelledby="messagesDropdown">
              <Link className="dropdown-item" to="#">Message 1</Link>
              <Link className="dropdown-item" to="#">Message 2</Link>
              <Link className="dropdown-item" to="#">Message 3</Link>
            </div>
          </li>
          <li className="nav-item dropdown">
            <Link className="nav-link dropdown-toggle" to="#" id="notificationsDropdown" role="button"
               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Notifications
            </Link>
            <div className="dropdown-menu" aria-labelledby="notificationsDropdown">
              <Link className="dropdown-item" to="#">Notification 1</Link>
              <Link className="dropdown-item" to="#">Notification 2</Link>
              <Link className="dropdown-item" to="#">Notification 3</Link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default TopNavbar;
