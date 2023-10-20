import React, { useEffect, useState } from 'react';
import '../styles/details.css';
import Detailtabs from '../components/detailspage/DetailTabs';
import queryString from 'query-string';
import axios from 'axios';

function Details(props) {
  const [restaurantData, setRestaurantData] = useState({
    name: '',
    address: '',
    imgurl: '',
    cost: '',
    cuisine: '',
  });

  const cuisine = (arr) => {
    return arr.map((item) => item.name).join(', ');
  };

  useEffect(() => {
    const values = queryString.parse(props.location.search);

    axios
      .get(`http://localhost:6556/restraunt/id/${values.id}`, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((res) => {
        const newState = {
          name: res.data.restraunt.name,
          address: res.data.restraunt.address,
          imgurl: res.data.restraunt.thumb,
          cost: res.data.restraunt.cost,
          cuisine: cuisine(res.data.restraunt.Cuisine),
        };

        setRestaurantData(newState);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.location.search]);

  return (
    <div className="container">
      <img src={restaurantData.imgurl} alt={restaurantData.name} className="banner" />
      <h1 className="resname">{restaurantData.name}</h1>
      <Detailtabs
        cost={restaurantData.cost}
        cuisine={restaurantData.cuisine}
        address={restaurantData.address}
        name={restaurantData.name}
        id={queryString.parse(props.location.search).id}
      />
    </div>
  );
}

export default Details;
