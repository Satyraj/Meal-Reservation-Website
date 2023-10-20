import React, { useContext } from 'react';
import Modal from 'react-modal';
import AuthContext from '../shared/authContext';
import '../styles/navbar.css';
import Signupmodal from '../components/navbar/signupmodal';
import Loginmodal from '../components/navbar/loginmodal';
import { Link } from "react-router-dom"
const style = require('../styles/modal');
import ContactUs from './contactus'
import AboutUs from './aboutus';
function Navbar() {
  const authContext = useContext(AuthContext);

  const closeModal = () => {
    authContext.closeModal();
  };

  const openModalS = () => {
    authContext.openModalS();
  };

  const openModalL = () => {
    authContext.openModalL();
  };

  const logout = () => {
    authContext.logout();
  };

  return (
    <div className="topnav">
      <ul className="navul">
      <Link to='/'>
        <li className="e">e!</li>
        </Link>

        {authContext.isLoggedIn ? (
          <>
            <li className="right">
              <button className="border" onClick={logout}>
                Log Out
              </button>
            </li>
            <li className="right">
              <button>{authContext.userName}</button>
            </li>
            <li className="right">
            <Link to="/aboutus">
              <button className='signup'>
              About Us
              </button>
              </Link>
            </li>
          
            <li className="right">
            <Link to="/contactus">
              <button className= 'signup' >
              Contact Us
              </button>
            </Link>
            </li>
          </>
        ) : (
          <>
          <li className="right">
          <Link to="/aboutus">
              <button className='signup'>
              About Us
              </button>
              </Link>
            </li>
          
            <li className="right">
            <Link to="/contactus">
              <button className= 'signup' >
              Contact Us
              </button>
            </Link>
            </li>
            <li className="right">
              <button className={authContext.openedModal === 'login' ? 'border' : ''} onClick={openModalL}>
                Login
              </button>
            </li>
            <li className="right">
              <button className={authContext.openedModal === 'signup' ? 'border' : ''} onClick={openModalS}>
                Create Account
              </button>
            </li>
         
          
          </>
        )}
      </ul>
      <Modal isOpen={authContext.openedModal === 'signup'} style={style.customStyles}>
        <Signupmodal close={closeModal} change={openModalL} />
      </Modal>
      <Modal isOpen={authContext.openedModal === 'login'} style={style.customStyles}>
        <Loginmodal close={closeModal} change={openModalS} />
      </Modal>
    </div>
  );
}

export default Navbar;
