const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");

const app = express();
const topapi = require('./topapi');
const shopapi = require('./shopapi')
const homeapi = require('./homedealsapi')
const productsRoutes = require('./routes/products')
const path = require('path');

require("dotenv").config();
app.use(express.json());
app.use(cors())
const register = require('./routes/register')
const login = require('./routes/login')


app.use('/api/register', register)
app.use('/api/login', login)
app.use('/api/products', productsRoutes)


app.get('/topSellingProducts',(req,res)=>{
    res.status(201).send(topapi)
})
app.get('/topSellingShops',(req,res)=>{
    res.status(201).send(shopapi)
})
app.get('/topSellingDeals',(req,res)=>{
    res.status(201).send(homeapi)
})
const port = process.env.PORT || 3000;
const uri = process.env.DB_URI;
if(process.env.NODE_ENV === "production"){
     app.use(express.static("frontEnd/build"));
     app.get('*',(req, res)=>{
        res.sendFile(path.resolve(__dirname, 'frontEnd','build','index.html'));
     })
}
app.listen(port, console.log(`server is listening on localHost ${port}`));
mongoose.connect(uri,{

    useNewUrlParser:true,
    useUnifiedTopology:true,

}).then(()=> console.log("MogoDB connection successful..."))
.catch((err)=>console.log("MongoDB connection failed", err.message));