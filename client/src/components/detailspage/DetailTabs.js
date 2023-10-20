// import React, { Component } from 'react';
import { createContext } from 'react';

import React, { useContext, useState, useEffect } from 'react';
import '../../styles/customtabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import MenuModal from '../detailspage/menuModal';
import '../../styles/details.css';
import AuthContext from '../../shared/authContext';
import Modal from 'react-modal';
import ContactModal from '../../components/detailspage/contactModal';
import SuccessModal from '../../components/detailspage/successmodal';
import {loadStripe} from '@stripe/stripe-js';
import style from '../../styles/modal';
import axios from 'axios';
const NewCart = createContext();
function DetailTabs(props) {
  const [cart, setCart] = useState([]);
  const [menu, setMenu] = useState([]);
  const [isContactOpen, setIsContactOpen] = useState(undefined);
  const Auth = useContext(AuthContext);
  
 
  useEffect(() => {
    const id = props.id;
    axios({
      method: 'get',
      url: 'http://localhost:6556/restraunt/id/' + id,
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        setMenu(res.data.restraunt.menu);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.id]);

  const addC = (dishS, cost) => {
    const newCart = [...cart];
    let duplicate = false;

    if (newCart.length === 0) {
      newCart.push({ res: props.name, dish: dishS, cost: cost, quantity: 1 });
    } else {
      for (let i = 0; i < newCart.length; i++) {
        if (newCart[i].res === props.name && newCart[i].dish === dishS) {
          newCart[i].quantity += 1;
          duplicate = true;
          break;
        }
      }

      if (!duplicate) {
        newCart.push({ res: props.name, dish: dishS, cost: cost, quantity: 1 });
      }
    }

    setCart(newCart);
  };

  const removeC = (dishS, cost) => {
    const newCart = [...cart];

    if (newCart.length > 0) {
      for (let i = 0; i < newCart.length; i++) {
        if (newCart[i].cost === cost && newCart[i].dish === dishS) {
          newCart[i].quantity -= 1;
          break;
        }
      }
    }

    setCart(newCart);
  };
   // payment integration
   const makePayment = async()=>{
    const stripe = await loadStripe("pk_test_51NjegeSHFpQzFGcyzfORr54w9KDDVVFdbvGghPwkcx0gSGzMOPWiU3aEIioX8ijlSENvUBB5gBFWjjFudvbSDODn00toeaBnnO");
    const body = {
      products : cart
    }
    const headers = {
        "Content-Type":"application/json"
    }
    const response = await fetch("http://localhost:6556/api/create-checkout-session",{
        method:"POST",
        headers:headers,
        body:JSON.stringify(body)
    
    });

    const session = await response.json();

    const result = stripe.redirectToCheckout({
        sessionId:session.id
    });
    
    if(result.error){
        console.log(result.error);
    }
}
 

  const payNow = () => {
    const subTotal = cart.reduce((acc, item) => acc + item.cost * item.quantity, 0);

    if (subTotal > 0) {
      return (
        <>
        <div className="paynow">
          <div className="menuleft">
            <p className="paynowpara">{'Subtotal: ₹' + subTotal}</p>
          </div>
          <div className="menuright">
            <button className="paynowbutt" onClick={payFunc} >
              Pay Now
            </button>
            <button className="paynowbutt" onClick={makePayment} type='button'>Checkout</button>
          </div>
        </div>
 
        </>
      );
    }
  };

  const payFunc = () => {
    if (Auth.isLoggedIn === true) {
      setIsContactOpen('contact');
    } else {
      Auth.openModalS();
    }
  };

  const closeModal = () => {
    setIsContactOpen(undefined);
  };

  const placeOrder = () => {
    setIsContactOpen('success');
  };
 
  return (
    <>
    {/* <NewCart.Provider value={cart}> */}
      <Tabs>
        <TabList>
          <Tab>Overview</Tab>
          <Tab>Contact</Tab>
          <Tab>Place Order Online</Tab>
        </TabList>

        <TabPanel>
          <h1 className="mainhead">About this place</h1>
          <h2 className="subhead">Cuisine</h2>
          <h2 className="cuisine">{props.cuisine}</h2>
          <h2 className="subhead">Average cost</h2>
          <h2 className="cost">{'₹' + props.cost + ' for two people (approx.)'}</h2>
        </TabPanel>
        <TabPanel>
          <h1 className="mainhead">Contact Details</h1>
          <h2 className="subhead">Phone</h2>
          <h2 className="phone">+91 114004566 </h2>
          <h2 className="subhead">Address</h2>
          <h2 className="address">{props.address}</h2>
        </TabPanel>
        <TabPanel>
          <h1 className="mainhead">{props.name + "'s Menu"}</h1>

          {menu.map((item) => (
            <MenuModal key={item.id} item={item} add={addC} remove={removeC} />
          ))}
          {payNow()}
        </TabPanel>
      </Tabs>
      <Modal isOpen={isContactOpen === 'contact'} style={style.customStyles}>
           
              <ContactModal close={closeModal} place={placeOrder}  cart={cart}></ContactModal>
            
      </Modal>
      <Modal isOpen={isContactOpen === 'success'} style={style.customStyles}>
        <SuccessModal close={closeModal} />
      </Modal>
      {/* </NewCart.Provider> */}

    </>
  );
}

export default DetailTabs;
export  {NewCart}
