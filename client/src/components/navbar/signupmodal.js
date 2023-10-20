import React, { useState, useContext } from 'react';
import AuthContext from '../../shared/authContext';
import axios from 'axios';
import style from '../../styles/modal';

function SignUpModal(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState(false);

  const authContext = useContext(AuthContext);

  const handleInputChange = (type, val) => {
    const signupDetails = {};
    signupDetails[type] = val;
    switch (type) {
      case 'name':
        setName(val);
        break;
      case 'email':
        setEmail(val);
        break;
      case 'mobile':
        setMobile(val);
        break;
      case 'password':
        setPassword(val);
        break;
      default:
        break;
    }
  };

  const signUpFun = () => {
    axios({
      method: 'post',
      url: 'http://localhost:6556/users',
      headers: { 'Content-Type': 'application/json' },
      data: { name, email, mobile, password },
    })
      .then((res) => {
        authContext.login(res.data.userid, res.data.token, res.data.username);
        props.close();
      })
      .catch((err) => {
        setValidationError(true);
      });
  };

  const closeModal = () => {
    props.close();
  };

  const changeModal = () => {
    props.change('login');
  };

  const validationErr = () => {
    if (validationError) {
      return <div style={style.customStyles.error}>Invalid Credentials!</div>;
    } else {
      return null;
    }
  };

  return (
    <React.Fragment>
      <div style={{ width: '100%' }}>
        <button onClick={closeModal} style={style.customStyles.closebar}>
          ×
        </button>
      </div>
      <h6 style={style.customStyles.signUp}>Sign Up</h6>
      <input
        type="text"
        style={style.customStyles.modalinput}
        placeholder="User Name"
        onChange={(e) => handleInputChange('name', e.target.value)}
      ></input>
      <input
        type="email"
        style={style.customStyles.modalinput}
        placeholder="E-mail Id"
        onChange={(e) => handleInputChange('email', e.target.value)}
      ></input>
      <input
        type="text"
        style={style.customStyles.modalinput}
        placeholder="Mobile no. (10 digit)"
        onChange={(e) => handleInputChange('mobile', e.target.value)}
      ></input>
      <input
        type="password"
        style={style.customStyles.modalinput}
        placeholder="Password (min. 7 characters)"
        onChange={(e) => handleInputChange('password', e.target.value)}
      ></input>
      {validationErr()}
      <div style={{ textAlign: 'center' }}>
        <button onClick={signUpFun} style={style.customStyles.signupbutton}>
          Sign Up
        </button>
      </div>
      <div style={style.customStyles.modalcenter}>
        <p style={style.customStyles.modalalready}>Already have an account?</p>
        <button onClick={changeModal} style={style.customStyles.signupbutton2}>
          Log In
        </button>
      </div>
    </React.Fragment>
  );
}

SignUpModal.contextType = AuthContext;

export default SignUpModal;
