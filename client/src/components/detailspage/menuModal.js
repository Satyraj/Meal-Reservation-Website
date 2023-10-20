// import React, { Component } from 'react';
import React, { useState } from 'react';
import '../../styles/details.css';

function MenuModal(props) {
  const [buttonState, setButtonState] = useState(0);

  const quandec = () => {
    if (buttonState > 0) {
      props.remove(props.item.dish, props.item.cost);
      setButtonState(buttonState - 1);
    }
  };

  const quaninc = () => {
    if (buttonState < 10) {
      props.add(props.item.dish, props.item.cost);
      setButtonState(buttonState + 1);
    }
  };

  const orderButton = () => {
    if (buttonState === 0) {
      return <button className="addDish" onClick={quaninc}>Add</button>;
    } else {
      return (
        <div className="addDish2">
          <input type="button" className="indec" value="-" onClick={quandec} />
          <input type="button" name="quantity" value={buttonState} className="quantity" />
          <input type="button" className="indec" value="+" onClick={quaninc} />
        </div>
      );
    }
  };

  return (
    <div className="menuItem">
      <div className="menuleft">
        <p className="vegetarianicon">⊡</p>
        <p className="dish">{props.item.dish.toUpperCase()}</p>
        <p className="dishcost">{props.item.cost + '₹'}</p>
        <p className="dishdes">{props.item.des}</p>
      </div>
      <div className="menuright">
        <div className="menuimg">
          <img
            src={require('../../assets/' + props.item.dish + '.jpg')}
            alt="Img not found"
            className="dishImg"
          />
          {orderButton()}
        </div>
      </div>
    </div>
  );
}

export default MenuModal;
