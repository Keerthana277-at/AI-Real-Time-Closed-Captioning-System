
require("dotenv").config();
const app = require("./src/app");
const port = process.env.PORT || 5000;
const connect = require("./src/config/db");

connect.connectDB()
 .then(()=>{
    app.listen(port,()=>{
    console.log(`Server is running on the port ${port}`);
})
 })
 .catch((error)=>{
    console.log(error)
 })
