const mongoose = require('mongoose');

mongoose
.connect(
  'mongodb+srv://jadejasatyrajsinh77:satuinmongo@cluster0.chocbmp.mongodb.net/eatit',{
  useNewUrlParser : true,
  useCreateIndex: true,
  useUnifiedTopology: true
}
)
.then(result => {
  
  console.log("Connected to database Successfully!")
  
})
.catch(err => {
  console.log("Can't connect to database!",err);
});