// import React, { Component } from 'react';
import React, { useContext, useState } from 'react';
import axios from 'axios';
import AuthContext from '../../shared/authContext';
import style from '../../styles/modal';
// import {loadStripe} from '@stripe/stripe-js';
import { NewCart } from './DetailTabs';
function ContactModal(props) {
  const [name, setName] = useState(undefined);
  const [mobileno, setMobileNo] = useState(undefined);
  const [address, setAddress] = useState(undefined);

  const Auth = useContext(AuthContext);
  const newcart1 = useContext(NewCart);
  const handleInputChange = (type, val) => {
    if (type === 'name') setName(val);
    else if (type === 'mobileno') setMobileNo(val);
    else if (type === 'address') setAddress(val);
  };

  const closeModal = () => {
    props.close();
  };

  const orderState = () => {
    const newcart = props.cart.filter((item) => item.quantity !== 0);

    axios({
      method: 'post',
      url: 'http://localhost:6556/order',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + Auth.token,
      },
      data: {
        name,
        mobile: mobileno,
        address,
        items: newcart,
      },
    })
      .then((res) => {
        props.place();
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <>
      <div style={{ width: '100%' }}>
        <button onClick={closeModal} style={style.customStyles.closebar}>
          X
        </button>
      </div>
      <h6 style={style.customStyles.signUp}>Contact Details</h6>
      <input
        type="text"
        style={style.customStyles.modalinput}
        placeholder="Name"
        onInput={(e) => handleInputChange('name', e.target.value)}
      />
      <input
        type="text"
        style={style.customStyles.modalinput}
        placeholder="Mobile no."
        onInput={(e) => handleInputChange('mobileno', e.target.value)}
      />
      <textarea
        style={style.customStyles.modaltextarea}
        placeholder="Address"
        onInput={(e) => handleInputChange('address', e.target.value)}
        rows="4"
      ></textarea>
      <div style={{ 'text-align': 'center' }}>
        <button style={style.customStyles.signupbutton} onClick={orderState}>
          Place Order
        </button>
  
      </div>
    </>
  );
}

export default ContactModal;
