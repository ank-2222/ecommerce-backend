const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config({path:"./config.env"});
const port = process.env.PORT||5050;


const authRoutes = require("./routes/auth/authRoutes");
const sellerRoutes = require("./routes/seller/sellerRoutes");
const buyerRoutes = require('./routes/buyer/buyerRoutes');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use(authRoutes);
app.use(sellerRoutes);
app.use(buyerRoutes);

app.use(cors);



app.get("*",(req,res)=>{
    res.status(404).send({message:"Route not found"});
});

app.listen(process.env.PORT,()=>{
    console.log(`server is running at port ${port} `)
})