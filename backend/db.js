const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://stavya:shanu123@cluster0.g4jei.mongodb.net/paytm") // enter the db name later

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,

});


const User = mongoose.model("User", userSchema);

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // creating a reference to User model, kinda like foreign key, so only if a user exists you can have an account and if they dont then they don't have an account
        ref: User,
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
});

const Account = mongoose.model('Account', accountSchema);

module.exports = {
    User,
    Account,
}