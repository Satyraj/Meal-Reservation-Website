import React, { useEffect, useState } from 'react';
import Widgets from './homepage/widgets';
import '../styles/home.css';
import Optionbox from './homepage/optionbox';
import axios from 'axios';

function Home() {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [resinCity, setResinCity] = useState([]);
  const [filteredRes, setFilteredRes] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:6556/cities', {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((res) => {
        setCities(res.data.cities);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleLocationChange = (event) => {
    setSelectedCity(event.target.value);

    axios
      .get('http://localhost:6556/restraunt/city/' + event.target.value, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((res) => {
        setResinCity(res.data.restraunts);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const automate = (event) => {
    const allRes = resinCity;
    const key = event.target.value.toLowerCase();

    const filteredRes = allRes.filter((res) => {
      return res.name.toLowerCase().includes(key);
    });

    setFilteredRes(filteredRes);
    setShowOptions(true);
  };

  const closeOption = () => {
    setShowOptions(false);
  };

  const showOption = () => {
    if (showOptions) {
      if (filteredRes.length === 0) {
        return <div className='autooptions'>--no results found--</div>;
      } else {
        return (
          <div className='autooptions'>
            {filteredRes.map((fil) => (
              <Optionbox img={fil.thumb} name={fil.name} area={fil.locality} id={fil._id} />
            ))}
          </div>
        );
      }
    } else {
      return null;
    }
  };

  return (
    <React.Fragment>
      <div className='imgholder'>
        <div className='layer'>
          <div className='edu'>e!</div>
          <div className='des'>Find the best restaurants, cafés, and bars</div>
          <div className='drops'>
            <div className='search1'>
              <select name='cars' id='cars' onChange={handleLocationChange}>
                <option value='' hidden>
                  Select city
                </option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            <div className='search2'>
              <div className='input-icons'>
                <i className='fa fa-search icon'></i>
                <input
                  className='input-field'
                  type='text'
                  placeholder='Search restaurants'
                  onChange={automate}
                  onBlur={closeOption}
                />
                {showOption()}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Widgets selCity={selectedCity} />
    </React.Fragment>
  );
}

export default Home;

// In React, <React.Fragment> is a built-in component that allows you to group multiple children elements without adding an extra DOM element to the output. It's often used when you need to return multiple elements from a component, but you don't want to introduce a new parent HTML element in the rendered output