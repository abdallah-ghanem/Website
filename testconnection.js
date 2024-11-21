const mongoose = require('mongoose');

const uri = "mongodb+srv://abdallah:2rfKnqlwAEDB8XP9@cluster0.n0xvd.mongodb.net/Website?retryWrites=true&w=majority";

mongoose.connect(uri)
.then(() => console.log("Connected to MongoDB successfully"))
.catch(err => console.error("Connection failed:", err));
