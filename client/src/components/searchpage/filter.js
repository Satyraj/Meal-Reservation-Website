import React, { useState, useEffect } from 'react';
import '../../styles/search.css';
import axios from 'axios';

function Filter(props) {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(props.selectedCity);

  useEffect(() => {
    // Initial call for data
    axios({
      method: 'get',
      url: 'http://localhost:6556/cities',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        setCities(res.data.cities);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSortChange = (sortOrder) => {
    props.onFilterDataChange('sort', sortOrder);
  };

  const handleCostChange = (min, max) => {
    props.onCostChange(min, max);
  };

  const handleLocationChange = (event) => {
    setSelectedCity(event.target.value);
    props.onFilterDataChange('city_name', event.target.value);
  };

  const handleCuisineChange = (event) => {
    const target = event.target;
    const value = target.value;
    if (target.checked) {
      props.onCuisineChange(value, 0); // Add
    } else {
      props.onCuisineChange(value, 1); // Remove
    }
  };

  return (
    <div className="filterSelect">
      <h4 className="filtermhead">Filters</h4>
      <p className="filtershead">Change Location</p>
      <div className="custom-select-search">
        <select onChange={handleLocationChange} value={selectedCity}>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      <p className="filtershead">Cuisine</p>
      <input
        type="checkbox"
        id="NorthIndian"
        name="NorthIndian"
        className="checkbox"
        value="northindian"
        onChange={handleCuisineChange}
      />
      <label htmlFor="NorthIndian" className="checkboxl">
        North Indian
      </label>
      <br />
      {/* Add other cuisine checkboxes here */}
      <input type="checkbox" id="SouthIndian" name="SouthIndian" className="checkbox" value="southindian" onChange ={handleCuisineChange}/>
      <label for="SouthIndian" className="checkboxl">South Indian</label><br/>
         <input type="checkbox" id="Chinese" name="Chinese" className="checkbox" value="chinese" onChange ={handleCuisineChange}/>
         <label for="Chinese" className="checkboxl">Chinese</label><br/>
           <input type="checkbox" id="FastFood" name="FastFood" className="checkbox" value="fastfood" onChange ={handleCuisineChange}/>
           <label for="FastFood" className="checkboxl">Fast Food</label><br/>
         <input type="checkbox" id="StreetFood" name="StreetFood" className="checkbox" value="streetfood" onChange ={handleCuisineChange}/>
          <label for="StreetFood" className="checkboxl">Street Food</label><br/>
      <p className="filtershead">Cost for two</p>
      <input
        type="radio"
        id="cost0"
        name="cost"
        className="checkbox"
        onChange={() => handleCostChange(0, 500)}
      />
      <label htmlFor="cost0" className="checkboxl">
        Less than ₹500
      </label>
      <br />
      <input type="radio" id="cost1" name="cost" className="checkbox" onChange ={()=>handleCostChange(501,1000)}/>
           <label for="cost1" className="checkboxl" >₹500 to ₹1000</label><br/>
           <input type="radio" id="cost2" name="cost" className="checkbox" onChange ={()=>handleCostChange(1001,1500)}/>
           <label for="cost2" className="checkboxl" >₹1000 to ₹1500</label><br/>
           <input type="radio" id="cost3" name="cost" className="checkbox" onChange ={()=>handleCostChange(1501,2000)}/>
           <label for="cost3" className="checkboxl" >₹1500 to ₹2000</label><br/>
          <input type="radio" id="cost4" name="cost" className="checkbox" onChange ={()=>handleCostChange(2001,99999)}/>
          <label for="cost4" className="checkboxl" >₹2000 +</label><br/>
      <h4 className="filtermhead">Sort</h4>
      <input type="radio"
        id="sort1"
        name="sort"
        className="checkbox"
        onChange={() => handleSortChange(1)}
      />
      <label htmlFor="sort1" className="checkboxl">
        Low to High
      </label>
      <br />
      <input type="radio" id="sort2" name="sort" className="checkbox" onChange ={()=>handleSortChange(-1)}/>         
       <label for="sort2" className="checkboxl">High to Low</label><br/>
    </div>
  );
}

export default Filter;
