import { DataTypes } from "sequelize";
import sequelize from "../db/dbconfig.js";

// Define the product model
const Product = sequelize.define("product", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    brand: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: true,
    }
});

// Sync the model with the database
sequelize.sync()
    .then(() => {
        console.log("Product table created....");
    })
    .catch((err) => {
        console.log("Something went wrong....");
        console.log(err);
    });

export default Product;