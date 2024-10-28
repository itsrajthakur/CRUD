import express from 'express';
import bodyParser from 'body-parser';
import mysql from "mysql2";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const pool = mysql.createPool({
    user: 'root',
    password: 'Raj@882714',
    host: 'localhost',
    database: 'crud'

});

app.post('/add', (req, res) => {
    const name = req.body.name;
    const brand = req.body.brand;
    const category = req.body.category;
    const price = req.body.price;
    const active = req.body.active;


    pool.getConnection((error, connection) => {
        if (error) {
            res.json({ "Message": "Internal server error.......", "error": error });
        } else {
            connection.query(`insert into product(productName, brand, price, isactive, category) values('${name}', '${brand}', '${price}', '${active}', '${category}');`, (error, result) => {
                if (error) {
                    res.json({ "Message": "Data insertin Fail", "error": error });
                } else {
                    res.json({ "Message": "Data inserted successfully" });
                }
            });
        }
    });
});

app.get('/get', (req, res) => {
    pool.getConnection((error, connection) => {
        if (error) {
            res.json({ "Message": "Internal server error.......", "error": error });
        } else {
            connection.query(`select * from product`, (error, result) => {
                if (error) {
                    res.json({ "Message": "Data Not Found", "error": error });
                } else {
                    res.json({ "Data": result });
                }
            });
        }
    });
});

app.delete('/delete', (req, res) => {
    pool.getConnection((error, connection) => {
        if (error) {
            res.json({ "Message": "Internal server error.......", "error": error });
        } else {
            connection.query(`delete from product where id = ${req.query.id}`, (error, result) => {
                if (error) {
                    res.json({ "error": error });
                } else {
                    res.json({ "Message": "Data Deleted Successfully" });
                }
            });
        }
    });
});

app.put('/update', (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const brand = req.body.brand;
    const category = req.body.category;
    const price = req.body.price;
    const active = req.body.active;


    pool.getConnection((error, connection) => {
        if (error) {
            res.json({ "Message": "Internal server error.......", "error": error });
        } else {
            connection.query(`update product set productName = '${name}', brand = '${brand}', price = '${price}', isactive = '${active}', category = '${category}' where id = ${id}`, (error, result) => {
                if (error) {
                    res.json({ "Message": "Data Updateion Fail", "error": error });
                } else {
                    res.json({ "Message": "Data Updated successfully" });
                }
            });
        }
    });
});

app.listen(3000, () => {
    console.log("Server Started.......")
});
