const express = require("express");
const router = new express.Router();
const conn = require("../db/conn");


// register client data
router.post("/create", (req, res) => {

    console.log(req.body);

    const { customer_name, email, mobile_number, country, state,city, password } = req.body;

    if (!customer_name || !email || !mobile_number || !country || !state || ! city || !password) {
        res.status(422).json("plz fill the all data");
    }

    try {
        conn.query("SELECT * FROM customer_details WHERE email = ?", email, (err, result) => {
            if (result.length) {
                res.status(422).json("This Data is Already Exist")
            } else
             {
                conn.query("INSERT INTO customer_details SET ?", { customer_name, email, mobile_number, country, state,city,password }, (err, result) => {
                    if (err) {
                        console.log("err" + err);
                    } else {
                        res.status(201).json(req.body);
                    }
                })
            }
        })
    } catch (error) {
        res.status(422).json(error);
    }

});




// get clientdata

router.get("/getclients",(req,res)=>{

    conn.query("SELECT * FROM customer_details",(err,result)=>{
        if(err){
            res.status(422).json("nodata available");
        }else{
            res.status(201).json(result);
        }
    })
});


// client delete api

router.delete("/deleteclient/:id",(req,res)=>{

    const {id} = req.params;

    conn.query("DELETE FROM customer_details WHERE id = ? ",id,(err,result)=>{
        if(err){
            res.status(422).json("error");
        }else{
            res.status(201).json(result);
        }
    })
});



// get single client

router.get("/indclient/:id",(req,res)=>{

    const {id} = req.params;

    conn.query("SELECT * FROM customer_details WHERE id = ? ",id,(err,result)=>{
        if(err){
            res.status(422).json("error");
        }else{
            res.status(201).json(result);
        }
    })
});


// update users api


router.patch("/updateuser/:id",(req,res)=>{

    const {id} = req.params;

    const data = req.body;

    conn.query("UPDATE customer_details SET ? WHERE id = ? ",[data,id],(err,result)=>{
        if(err){
            res.status(422).json({message:"error"});
        }else{
            res.status(201).json(result);
        }
    })
});

module.exports = router;



