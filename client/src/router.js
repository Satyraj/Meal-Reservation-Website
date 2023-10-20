import {Route , BrowserRouter, Switch} from 'react-router-dom';
import React from 'react';
import Navbar from './components/navbar'
import Home from './components/home';
import Search from './components/search';
import Details from './components/details';
import Pagenotfound from './components/404';
import ContactUs from './components/contactus';
import AboutUs from './components/aboutus';
import SuccessModal from './components/detailspage/successmodal'
const Router = () => {

    return(
        <BrowserRouter>

           <Navbar/>
           <Switch>
           <Route exact path='/' component={Home}></Route>
           <Route exact path='/details' component={Details}></Route>
           <Route exact path='/search' component={Search}></Route>
           <Route exact path='/contactus' component={ContactUs}></Route>
           <Route exact path='/aboutus' component={AboutUs}></Route>
           <Route exact path='/sucess' component={SuccessModal}></Route>
           <Route component={Pagenotfound}></Route>
           </Switch>

        </BrowserRouter>
    );
};

export default Router;
