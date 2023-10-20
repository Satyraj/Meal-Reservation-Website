import React from 'react';
import '../../styles/search.css';
import { withRouter } from 'react-router-dom';

function Resbox(props) {
  // Function to convert array of cuisine data to string
  const cuisine = () => {
    const cuisarr = [];
    for (let i = 0; i < props.data.Cuisine.length; i++) {
      cuisarr.push(props.data.Cuisine[i].name);
    }
    return cuisarr;
  };

  // Function to open details page on click
  const showDetails = (id) => {
    props.history.push('/details?id=' + props.data._id);
  };

  const resName = props.data.name;
  const resArea = props.data.locality;
  const mealType = props.type;
  const cost = props.data.cost;
  const resadd = props.data.contact_number;
  const resId = props.data._id;

  return (
    <div className="searchRestarantBox" onClick={() => showDetails(resId)}>
      <div className="img">
        <img src={require('../../assets/' + mealType + '.png')} alt="Img not found" className="restrauntImg" />
      </div>

      <div className="details">
        <p className="resnameSearch">{resName}</p>
        <p className="area">{resArea}</p>
        <p className="addr">{resadd}</p>
      </div>

      <div className="que">CUISINES:<br />COST FOR TWO:</div>

      <div className="ans">{cuisine().join()}<br />{"₹" + cost.toString()}</div>
    </div>
  );
}

export default withRouter(Resbox);

  