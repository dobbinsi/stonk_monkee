const mongoose = require("mongoose");

const dbName = "stonks";

mongoose.connect("mongodb://localhost/" + dbName, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Connected to database:" + dbName)
    })
    .catch((err) => {
        console.log("There was an error connecting to the database.")
        console.log(err);
    })


