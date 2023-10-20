import React from 'react';
import emailjs from 'emailjs-com';



const ContactUs = () => {

    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs.sendForm('service_8cbcaxo', 'template_wk2xrgg', e.target, 'pCK8AtppUNkXq8L3U')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
      };
     
  return (
    <div className='container  max-w-xs text-center rounded font-bold'>
            <div className='header font-bold italic text-4xl text-blue-700'>
              <h1>Contact Us!</h1>
              </div>
        <form className='bg-red-500 shadow-md rounded px-2 py-2 pt-5 pb-3 mb-2 ' onSubmit={sendEmail}>
        <div className='mt-2 text-blue-700 '>
                <label >Name</label>
                </div>
            <div style={{textAlign: 'center',justifyContent:'center'}}>    
                <input type="name" name='name' style={{color: 'rgb(25, 47, 96)', fontWeight: 400, fontSize: '15px', fontFamily: 'Poppins ,sansSerif', width: '398px', height: '50px', borderRadius: '6px', padding: '13px 10px 12px',border: '1px solid rgb(199, 199, 199)'}} placeholder='Enter your name' required />
            </div>

            <div className='mt-2 text-blue-700'>
                <label >Email Address</label>
                </div>
            <div>    
                <input type="email" name='user_email' style={{color: 'rgb(25, 47, 96)', fontWeight: 400, fontSize: '15px', fontFamily: 'Poppins ,sansSerif', width: '398px', height: '50px', padding: '13px 10px 12px', borderRadius: '6px', border: '1px solid rgb(199, 199, 199)'}} placeholder='Enter your email' required />
            </div>
            
            <div className='mt-2 text-blue-700'>
                <label>Message</label>
            </div>
            <div>
            <textarea name="message" style={{color: 'rgb(25, 47, 96)', fontWeight: 400, fontSize: '15px', fontFamily: 'Poppins ,sansSerif', width: '398px', height: '50px', padding: '13px 10px 12px', borderRadius: '6px', border: '1px solid rgb(199, 199, 199)'}}  placeholder='Leave a message here...' required ></textarea>

            </div>
            <div>
                <button style={{backgroundColor:'#bb1818',color:"white",fontFamily: 'Poppins ,sansSerif',width: '120px', height: '40px'}}  type='submit'>Submit</button>
            </div>
   
        </form>
    </div>
 
  )
}

export default ContactUs;