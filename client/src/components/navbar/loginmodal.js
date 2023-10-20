import React, { useState, useContext } from 'react';
import AuthContext from '../../shared/authContext';
import axios from 'axios';
import style from '../../styles/modal';

function LogInModal(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState(false);

  const authContext = useContext(AuthContext);

  // Handling input change
  const handleInputChange = (type, val) => {
    if (type === 'email') {
      setEmail(val);
    } else if (type === 'password') {
      setPassword(val);
    }
  };

  // Logging in function
  const logInFun = () => {
    axios({
      method: 'post',
      url: 'http://localhost:6556/login',
      headers: { 'Content-Type': 'application/json' },
      data: { email, password },
    })
      .then((res) => {
        authContext.login(res.data.userid, res.data.token, res.data.username);
        props.close();
      })
      .catch((err) => {
        setValidationError(true);
      });
  };

  // Closing the modal function
  const closeModal = () => {
    props.close();
  };

  // Changing to signup modal function
  const changeModal = () => {
    props.change('signup');
  };

  // Handling invalid credentials
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
      <h6 style={style.customStyles.signUp}>Log In</h6>
      <input
        type="email"
        style={style.customStyles.modalinput}
        placeholder="E-mail Id"
        onChange={(e) => handleInputChange('email', e.target.value)}
      ></input>
      <input
        type="password"
        style={style.customStyles.modalinput}
        placeholder="Password (min. 7 characters)"
        onChange={(e) => handleInputChange('password', e.target.value)}
      ></input>
      {validationErr()}
      <div style={{ textAlign: 'center' }}>
        <button onClick={logInFun} style={style.customStyles.signupbutton}>
          Log In
        </button>
      </div>
      <div style={style.customStyles.modalcenter}>
        <p style={style.customStyles.modalalready}>Don't have an account?</p>
        <button onClick={changeModal} style={style.customStyles.signupbutton2}>
          Create Account
        </button>
      </div>
    </React.Fragment>
  );
}

export default LogInModal;
