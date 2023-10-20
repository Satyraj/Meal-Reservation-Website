const express = require('express');
const bodyParser = require('body-parser');
require('./mongoose');

const restraunt = require('./routers/restraunt');
const user = require('./routers/users')
const errorcontroller = require('./controllers/404');
const widget = require('./routers/widget');
require("dotenv").config();

const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const app = express()

const port = 6556;
app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 
//handling CORS issue
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
// intercept OPTIONS method
    if ('OPTIONS' == req.method) {
    res.sendStatus(200);
    } else {
    next();
    }
});
app.post("/api/create-checkout-session",async(req,res)=>{
    
    const {products} = req.body
    // console.log(req.body)

    const lineItems = products.map((product)=>({
        price_data:{
            currency:"inr",
            product_data:{
                name:product.res
            },
            unit_amount:product.cost * 100,
        },
        quantity:product.quantity
    }));
const session = await stripe.checkout.sessions.create({
    payment_method_types:["card"],
    line_items:lineItems,
    mode:"payment",
    success_url:"http://localhost:3000/sucess",
    cancel_url:"http://localhost:3000/cancel",
});

res.json({id:session.id})

});

app.use('/restraunt',restraunt);
app.use(widget);
app.use(user);
app.use(errorcontroller.get404);


app.listen(port , () => {console.log("server is running in port "+port)});