const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is requried"],
        minlength: [2, "Username must be at least 2 characters"],
    },
    email: {
        type: String,
        required: [true, "Valid email address is requried"],
    },
    password: {
        type: String,
        required: [true, "Make it a strong password please!"],
        minlength: [8, "Password must be at least 8 characters"],
    },
    picture: {
        type: String,
        required: [true, "Please upload a profile picture (image URL)"],
    },
    experience: {
        type: Number,
        required: [true, "How long have you been trading stonks?"],
    },
    quote: {
        type: String,
        required: [true, "Please share something inspirational!"],
    },
}, { timestamps: true })

userSchema.virtual("confirmPassword")
    .get(() => this._confirmPassword)
    .set((value) => this._confirmPassword = value)

userSchema.pre("validate", function(next){
    console.log("in validation");
    if(this.password !== this.confirmPassword){
        this.invalidate("confirmPassword", "Password must match!");
        console.log("password does not match");
    }
    console.log(this.password, this.confirmPassword);
    next();
})

userSchema.pre("save", function(next){
    console.log("pre-save");
    bcrypt.hash(this.password, 10)
        .then((hashedPassword) => {
            console.log("in hash process");
            this.password = hashedPassword;
            next();
        })
})

const User = mongoose.model("User", userSchema);

module.exports = User;

