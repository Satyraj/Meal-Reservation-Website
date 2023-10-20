import React from 'react';
import '../../styles/home.css';
import { withRouter } from 'react-router-dom';

function OptionBox(props) {
  const showDetails = () => {
    console.log('clicked');
    props.history.push('/details?id=' + props.id);
  };

  return (
    <div className='optionBox' onMouseDown={showDetails}>
      <div className='optionBoxl'>
        <img className='optionBoximg' src={props.img} alt='nope'></img>
      </div>
      <div className='optionBoxr'>
        <div className='optionResname'>{props.name}</div>
        <div className='optionResarea'>{props.area}</div>
      </div>
    </div>
  );
}

export default withRouter(OptionBox);
