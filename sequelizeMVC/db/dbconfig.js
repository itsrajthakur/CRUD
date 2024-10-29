import { Sequelize } from "sequelize";

// Initialize Sequelize with database connection details
const sequelize = new Sequelize(
    "sequelize_crud", // Database name
    "root", // Username 
    "Raj@882714", // Password 
    {
        host: "localhost",
        dialect: "mysql", // Database type
        timezone: "+05:30", // Set timezone
    }
);

// Authenticate the database connection
sequelize.authenticate()
    .then(() => {
        console.log("Database connected....");
    })
    .catch((err) => {
        console.log("Database connection failed...");
        console.log(err);
    });

// Export the sequelize instance
export default sequelize;