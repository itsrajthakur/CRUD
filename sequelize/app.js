// MVC = model view controller 

//Db -> dbConfig.js -> database connection

//Model -> product.model.js -> schema or entity of database table

//Controller -> product.controller.js -> main logics or operation

//Route -> product.route.js -> routing

//aap.js -> main or root file

// sequelize -> sequelize is a ORM Tool (object relationship mapping) which used to mange database operation.
// insert -> create
// red or get or seletct -> find or findall 
// update -> update
// delete -> destroy

import bodyParser from "body-parser";
import express from "express";
import { Sequelize, DataTypes, where } from "sequelize";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// database connection using sequelize
const sequelize = new Sequelize("sequelize_CRUD", "root", "Raj@882714", {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '+05:30'
});

sequelize.authenticate()
    .then(() => {
        console.log("Database connected....");
    })
    .catch((err) => {
        console.log("Database connection failed...", err);
    });

// create database table schema
const Product = sequelize.define("Product", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING, //varchar default value - 255
        allowNull: false,
        unique: true
    },
    brand: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
});

sequelize.sync()
    .then(() => {
        console.log("product table created....");
    })
    .catch((err) => {
        console.log("failed to create product table", err);
    });

// Add operation
app.post('/addProduct', (req, res) => {

    // insert into product (key) values (value);
    // product.create({ key : value, key : value });

    Product.create({ name: req.body.name, brand: req.body.brand, category: req.body.category, price: req.body.price })
        .then((result) => {
            res.status(200).json({ Message: "Product added successfully" });
        })
        .catch((error) => {
            res.status(500).json({ Message: "Internal Server Error", error });
        });
});

// Update operation
app.put('/updateProduct', (req, res) => {
    Product.update({
        brand: req.body.brand,
        name: req.body.name,
        price: req.body.price,
        category: req.body.category
    }, {
        where: { id: req.body.id },
        raw: true,
    })
        .then((result) => {
            res.status(200).json({ Message: "Product updated successfully" });
        })
        .catch((error) => {
            res.status(500).json({ Message: "Internal Server Error", error });
        });
});

// Get operation
app.get('/getProduct', (req, res) => {
    Product.findAll()
        .then((result) => {
            res.status(200).json({ Data: result });
        })
        .catch((error) => {
            res.status(500).json({ Message: "Internal Server Error", error });
        });
});

// Delete operation
app.delete('/deleteProduct', (req, res) => {
    Product.destroy({
        where: { id: req.body.id },
        raw: true,
    })
        .then(result => {
            res.status(200).json({ message: "product deleted...." })
        })
        .catch(err => {
            res.status(500).json({ error: "Internal server error.....", err })
        })
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});