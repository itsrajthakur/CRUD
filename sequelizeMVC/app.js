import bodyParser from 'body-parser';
import express from 'express';
import ProductRouter from './route/product.route.js';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/product", ProductRouter);

app.listen(3000, () => {
    console.log('Server started at port 3000');
})