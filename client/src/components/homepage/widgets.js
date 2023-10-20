
import React, { useState, useEffect } from 'react';
import '../../styles/home.css';
import Widget from './singlewidget';
import axios from 'axios';

function Widgets(props) {
  const [widgets, setWidgets] = useState([]);

  useEffect(() => {
    // Initial call for data
    axios({
      method: 'get',
      url: 'http://localhost:6556/widget',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        setWidgets(res.data.widgets);
        console.log(widgets);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []); // Empty dependency array means this effect will run once after the component mounts

  const mealtypes = widgets;
  const selectedCity = props.selCity;

  return (
    <main className="holders">
      <p className="quick">Quick Searches</p>
      <p className="quick_des">Discover restaurants by type of meals</p>
      <div className="container-fluid">
        <div className="row">
          {mealtypes.map((item, index) => {
            return (
              <Widget key={index} name={item.name} selectedCity={selectedCity} />
            );
          })}
        </div>
      </div>
      <div>
        <p className="quick2">What Makes Us <span style={{ color: 'rgb(187, 24, 24)' }}>Special?</span></p>

        <div class="main-div">
          <div class="inner-div">
            <img
              width="600"
              height="600"
              src="https://eatit.co.in/wp-content/uploads/abouteatit-1.jpg"
              alt=""
            />
          </div>
          <div class="inner-div">

            <div className="main-div">
              <div>
                <img width="90" height="120" src="https://eatit.co.in/wp-content/uploads/save-humanity.png" />
              </div>
              <div>
                <p className="quick_des">Save Humanity</p>
                <p className="quick_des2">Share &amp; donate&nbsp;food, and help those who really need it</p></div>
            </div>

            <div className="main-div">
              <div>
                <img width="90" height="120" src="https://eatit.co.in/wp-content/uploads/save-planet.png" />
              </div>
              <div>
                <p className="quick_des">Save Our Planet</p>
                <p className="quick_des2">Stop food wastage. Food waste trashed our planet, and consumers
                  tossed away nearly a billion tons of food. It's very bad for the
                  planet.</p></div>
            </div>

            <div className="main-div">
              <div>
                <img width="90" height="120" src="https://eatit.co.in/wp-content/uploads/share-foodi.png" />
              </div>
              <div>
                <p className="quick_des">Easy To Share, Easy To Collect</p>
                <p className="quick_des2">With EAT IT mobile app, users can share food with a few clicks,
                  and on the other hand, users can search and collect food by
                  their location</p></div>
            </div>

            <div className="main-div">
              <div>
                <img width="90" height="120" src="https://eatit.co.in/wp-content/uploads/search-langar.png" />
              </div>
              <div>
                <p className="quick_des">Find All langar Location Near You</p>
                <p className="quick_des2">Users can find langar by their location on EAT IT mobile app</p></div>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}

export default Widgets;

  