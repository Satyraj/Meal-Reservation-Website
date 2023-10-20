import React from 'react';
import './aboutus.css';
import abc from '../assets/abc.png';
import p1 from '../assets/p1.jpg';
import p2 from '../assets/p2.jpg';
import p3 from '../assets/p3.jpg';

function AboutUs()
{
    return(
        <div className="main-container">
        <h2>Our Team</h2>
        <hr/>
      
        <div className="members">
        <div className="team-member1">
            <img src={abc} className='myimg1'/>

        </div>
            <div className="team-member">
                <img src={p1} className='myimg'/>
                <h4>John Doe</h4>
                <p>Web Developer</p>
            </div>
            <div className="team-member">
                <img src={p2} className='myimg'/>
                <h4>John Doe</h4>
                <p>Web Developer</p>
            </div>
            <div className="team-member">
                <img src={p3} className='myimg' />
                <h4>John Doe</h4>
                <p>Web Developer</p>
            </div>
           
        </div>
    </div>
    )
}
export default AboutUs