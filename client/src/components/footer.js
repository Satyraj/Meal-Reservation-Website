import icon from '../assets/t2.avif';
import { FaInstagram,FaDribbble,FaXTwitter,FaYoutube } from "react-icons/fa6";
import './Footer.css'
const Footer = () => {
    const links = [
        [
            {label : 'Company' , key: 'header-1'},
            {label : 'About us' , key: 'item-1-1'},
            {label : 'blog' , key: 'item-1-2'},
            {label : 'Contact us' , key: 'item-1-3'},
            {label : 'Pricing' , key: 'item-1-4'},
            {label : 'Testimonials' , key: 'item-1-5'},
        ],
        [
            {label : 'Support' , key: 'header-2'},
            {label : 'Help center' , key: 'item-2-1'},
            {label : 'Terms of service' , key: 'item-2-2'},
            {label : 'Legal' , key: 'item-2-3'},
            {label : 'Privacy policy' , key: 'item-2-4'},
            {label : 'Status' , key: 'item-2-5'},
        ]
    ]
    return (
        <div className='footer'>
            <div className="footer-company-info">
                <div className="footer-img">
               
                    <div className='e'style={{margin:0,height:'100px',width:'100px',fontSize:'60px'}}>e!</div>
                    <span>
                    eat !t
                    </span>
                </div>
                
                <div className='infos'>             
                    <span>
                        Copyright © 2021 eat !t.
                    </span>
                    <span>
                        All rights reserved
                    </span>
                </div>
                <div className="footer-icons">
                <a href="http://https://www.instagram.com/" target="_blank" rel="noopener noreferrer"> <FaInstagram/></a>
                   
                <a href="www.linkedin.com/in/jadeja-satyrajsinh-2722a222a" target="_blank" rel="noopener noreferrer">   <FaDribbble/></a>
                <a href="http://https://www.Xtwitter.com/" target="_blank" rel="noopener noreferrer">   <FaXTwitter/></a>
                <a href="http://https://www.youtube.com/" target="_blank" rel="noopener noreferrer">     <FaYoutube/> </a>
                </div>
            </div>
            <div className="footer-links">
                    {links.map((col,index) => (
                        <ul className={`col col-${index+1}`} key={`col-${index}`}>
                            {col.map((link,index) => (
                                <li key={`link-${col}-${index}`}>
                                    {link.label}
                                </li>
                            ))}
                        </ul>
                    ))}
            </div>
            <div className="footer-form">
                <label htmlFor="">
                <div className='subscribe'>Subscribe to our newsletter</div>
                
                </label>
                <div color='forfooter'>
                <input className="forfooterin" type="email" name="email" placeholder='Your email ID' id="" />
                <button className='nsubmit' type='submit' value="Sign Up">Sign Up</button>
                </div>
                <br></br>
          
                <img src={icon} style={{height:'210px',width:'450px'}} alt="" />

            </div>
            
        </div>
    )
}

export default Footer