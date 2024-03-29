const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// database connections
mongoose.set("strictQuery", false);
mongoose.connect(
    process.env.URL_DB,
    { useNewUrlParser: true },
    { useUnifiedTopology: false }
  )
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(JSON.stringify(err));
  });

function verifyToken(req,res,next){
    const bearerHeader=req.headers["authorization"];
    if(typeof bearerHeader!=='undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken=bearer[1];
        req.token=bearerToken;
        next()
    }else {
        res.sendStatus(403);
    }
}

// API for user creation
app.post('/signup', (req, res) => {
    const sql = "INSERT INTO aquaexperts_db.user (name, email, password) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ]
    db.query(sql, [values], (err, data) => {
        if(err){
            return res.json({error: true, err: err});
        }
        else{
            const id= data.insertId;
            const token = jwt.sign({id}, "key", {expiresIn: 300})
            return res.json({signup: true, data, msg: "User Created", token});
        }
    })
})

// API for user login 
app.post("/login", (req, res) => {
    const sql = "SELECT * FROM aquaexperts_db.user WHERE email = ? AND password=?";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if(err){
            return res.json("Error");
        }
        if(data.length > 0) {
            const id= data[0].id;
            const token = jwt.sign({id}, "aquaExpert", {expiresIn: '12h'})
            return res.json({login: true, token});
        }else {
            return res.json("Fail", err);
        }
    })
})

// API for GET All Products
app.get("/getAllProducts", (req, res) => {
    const sql = "SELECT * FROM aquaexperts_db.product";
    db.query(sql, (err, data) => {
        if (err) {
            return res.json(err);
        }else{
            return res.json(data);
    }})
})

// web - API for GET Latest Arrival Products
app.get("/getLatestArrivalProducts", (req, res) => {
    const sql = "SELECT * FROM aquaexperts_db.product ORDER BY createdDate DESC LIMIT 8";
    db.query(sql, (err, data) => {
        if (err) {
            return res.json(err);
        }else{
            return res.json(data);
    }})
})

// web - API for GET Favorited Products
app.get("/getFavoriteProducts", (req, res) => {
    const sql = "SELECT * FROM aquaexperts_db.product WHERE favorite = true ORDER BY latestUpdatedDate DESC LIMIT 4";
    db.query(sql, (err, data) => {
        if (err) {
            return res.json(err);
        }else{
            return res.json(data);
    }})
})

// web/admin - API for GET Products by category
app.post("/getProductsByCategory", (req, res) => {

    const sql = "SELECT * FROM aquaexperts_db.product WHERE category = (?)";
    const values = req.body.productCategory;

    db.query(sql,[values], (err, data) => {
        if (err) {
            return res.json(err);
        }else{
            return res.json(data);
    }})
})

// admin - API for Add Product
app.post("/addProduct",verifyToken,(req, res) => {
    jwt.verify(req.token,'aquaExpert',(err,authData)=> {
        if(err){
            res.sendStatus(403);
        }else {
            const sql = "INSERT INTO aquaexperts_db.product (name, category, price, oldPrice, description, imageUrl, createdDate, latestUpdatedDate, favorite, sale, outOfStock) VALUES (?)";
            const values = [
                req.body.name,
                req.body.category,
                req.body.price,
                req.body.oldPrice,
                req.body.description,
                req.body.imageUrl,
                req.body.createdDate,
                req.body.latestUpdatedDate,
                req.body.favorite,
                req.body.sale,
                req.body.outOfStock
            ]
            db.query(sql, [values], (err, data) => {
                if(err){
                    return res.json({error: true, err: err});            
                }
                else{
                    return res.json(data);
                }
            })
        }
    })    
})

// admin - API for DELETE a product from DB
app.delete("/deleteProduct/:id",verifyToken,(req, res) => {
    jwt.verify(req.token,'aquaExpert',(err,authData)=> {
        if(err){
            res.sendStatus(403);
        }else {
            const sql = "DELETE FROM aquaexperts_db.product WHERE id = ?";
            const productId = req.params.id;

            db.query(sql,[productId], (err, data) => {
                if (err) {
                    return res.json(err);
                }else{
                    return res.json(data);
            }})
        }
    })  
})

// admin - API for UPDATE a product
app.put("/updateProduct/:id",verifyToken, (req, res) => {
    jwt.verify(req.token,'aquaExpert',(err,authData)=> {
        if(err){
            res.sendStatus(403);
        }else {
            const productId = req.params.id;
            const sql = "UPDATE aquaexperts_db.product SET `name`= ?, `category` = ?, `price` = ?, `oldPrice` = ?, `description` = ?, `imageUrl` = ?, `createdDate` = ?, `latestUpdatedDate` = ?, `favorite` = ?, `sale` = ?, `outOfStock` = ? WHERE (`id` = ?);";
            const values = [
                req.body.name,
                req.body.category,
                req.body.price,
                req.body.oldPrice,
                req.body.description,
                req.body.imageUrl,
                req.body.createdDate,
                req.body.latestUpdatedDate,
                req.body.favorite,
                req.body.sale,
                req.body.outOfStock
            ]
            db.query(sql, [...values, productId], (err, data) => {
            if (err) return res.send(err);
            return res.json(data);
            });
        }
    })
});

app.listen(8800, ()=>{
    console.log("Connected to backend !")
})