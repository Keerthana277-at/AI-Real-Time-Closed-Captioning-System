const express = require("express");
const app = express();
app.use(express.json());
const userRoutes = require("./routes/userRoutes");
const captionRoutes = require("./routes/captionRoutes");
app.use("/api/users",userRoutes);
app.use("/api/captions",captionRoutes);
console.log("App loaded successfully");

app.get("/",(req,res)=>{
    res.send("Hare Krishna , server is running!");
})
module.exports = app;