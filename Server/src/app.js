const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
app.use(express.static(path.join(__dirname,"..")));
app.use(cors());
app.use(express.json());

const speechRoutes = require("./routes/speechRoutes");
const userRoutes = require("./routes/userRoutes");
const captionRoutes = require("./routes/captionRoutes");
app.use("/api/users",userRoutes);
app.use("/api/captions",captionRoutes);
app.use("/api/speech",speechRoutes);
console.log("App loaded successfully");

app.get("/",(req,res)=>{
    res.send("Hare Krishna , server is running!");
})
module.exports = app;