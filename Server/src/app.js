const express = require("express");
const app = express();
app.use(express.json());
const userRoutes = require("./routes/userRoutes");

app.use("/api/users",userRoutes);

console.log("App loaded successfully");

app.get("/",(req,res)=>{
    res.send("Hare Krishna , server is running!");
})
module.exports = app;