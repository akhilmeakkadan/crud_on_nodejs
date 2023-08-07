var path = require("path");
const express=require("express");
const mongoose=require("mongoose");
const Product = require('../models/Product');
const app = express();
const EventEmitter = require("events");
const emitter = new EventEmitter(); 

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');
  
class IndexController{

	static index(req,res){
		Product.find((err, docs) => {
	        if (!err) {
	            res.render("home", {
	                 data: docs, 
	                 sucess_message: req.flash('success'),
	                 error_message: req.flash('error')
	            });
	        } else {
	            res.send('Failed to retrieve the Course List: ' + err);
	        }
	    });
	}
	static create_product(req,res){
		res.render('create_product', {
	        title: 'Create Product'
	    });
	}
	static create_product_request(req,res){	
		var pName = req.body.name;
		var pPrice = req.body.price;
		var pPrice = req.body.price;
		var pUtility = new Array(req.body.utility);
		var pWeight = req.body.weight;
		var pOnsale = req.body.on_sale;
		let req_data =  {
		    name: pName,
		    price: pPrice,
		    utility: pUtility,
		    weight: pWeight,
		    onSale: pOnsale
		};
		const product =  Product.create(req_data);
		req.flash('success', 'Product has been created successfully.');
		res.redirect('/');
	}
	static delete_product(req,res){
		let produtId = req.params.productId;
		let delte_condition = {_id:produtId};
		Product.findByIdAndDelete(delte_condition,function(err, result) {
			  	  if (err) {
				    req.flash('error', 'Error while deleting product.');
				    res.redirect('/');
				  } else {
					req.flash('success', 'Product has been deleted successfully.');
				    res.redirect('/');
				  }
			});
	}
	static edit_product(req,res){
		let produtId = req.params.productId;
		let select_condition = {_id:produtId};
		Product.findById(select_condition,function(err, result) {
			console.log(result);
			  	  if (err) {
				    req.flash('error', 'Error while Updating product.');
				    res.redirect('/');
				  } else {
				  	res.render('edit_product', {
				  		data:result,
				        title: 'Update Product'
				    });
				  }
		}); 
		
	}
	static edit_product_request(req,res){
		var pName = req.body.name;
		var pPrice = req.body.price;
		var pPrice = req.body.price;
		var pUtility = new Array(req.body.utility);
		var pWeight = req.body.weight;
		var pOnsale = (req.body.on_sale) ? true :false;
		let req_data =  {
		    name: pName,
		    price: pPrice,
		    utility: pUtility,
		    weight: pWeight,
		    onSale: pOnsale
		};
		Product.findOneAndUpdate({_id:req.body.identifier}, req_data, function (err, place) {
		  req.flash('success', 'Product has been updated successfully.');
			res.redirect('/');
		});
	}
}	

module.exports = IndexController;
 