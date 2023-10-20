import React from 'react';
import '../../styles/home.css';
import { useHistory } from 'react-router-dom';

function Widget(props) {
  const history = useHistory();

  // Routing to search page after clicking
  const clickHandle = () => {
    const selectedCity = props.selectedCity;
    history.push(`/search?type=${props.name}&city=${selectedCity}`);
  };

  return (
    <div className="col-sm-12 col-lg-4" onClick={clickHandle}>
      <div className="boxes">
        <div className="box-img">
          <img src={require(`../../assets/${props.name}.png`)} alt={props.name} className="box-img_img" />
        </div>
        <div className="box-content">
          <p className="box-content_title">{props.name}</p>
          <p className="box-content_des">

          Start your day with exclusive breakfast options
              </p>
          {function widgetWrite(props) {
            if (props.name == 'breakfast') {
              <p className="box-content_des">
                Start your day with exclusive breakfast options
              </p>
            }
          }}
        </div>
      </div>
    </div>
  );
}

export default Widget;
