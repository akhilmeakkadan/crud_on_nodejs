var path = require("path");
const express=require("express");
const mongoose=require("mongoose");
const app = express();
const Product = require(path.join(__dirname,'models/Product'));
const indexRoute = require('./routes');
const fs = require("fs");
app.use(indexRoute);

// View Engine Setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');


mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost:27017/latestdb",{
	useNewUrlParser:true,useUnifiedTopology:true
},(err)=>{
	if(err){
		console.log(err);
	}else{
		console.log("Successfullty connected");
	}
}); 
//mongoose.set('strictQuery', true);
//const Drone = mongoose.model('Drone', productSchema);

//Startinng server
app.listen(3000,()=>{
	console.log("On port 3000");
})