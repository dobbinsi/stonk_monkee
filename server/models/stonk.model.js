const mongoose = require("mongoose");

const stonkSchema = new mongoose.Schema({
    stonkName: {
        type: String,
        required: [true, "You must give this stonk a name!"],
        minlength: [3, "Stonk name must be at least 3 characters"],
    },
    ticker: {
        type: String,
        required:[true, "All stonks must have a ticker symbol"],
        minlength: [2, "Ticker symbol must be at least 2 characters"],
    },
    price: {
        type: String,
        required:[true, "What is the current price?"],
    },
    mktcap: {
        type: String,
        required:[true, "What is the current market cap?"],
    },
    logo: {
        type: String,
        required:[true, "What does the logo look like?"],
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
}, {timestamps: true})

const Stonk = mongoose.model("Stonk", stonkSchema);

module.exports = Stonk;
