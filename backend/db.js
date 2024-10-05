const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://stavya:shanu123@cluster0.g4jei.mongodb.net/paytm") // enter the db name later

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,

});




const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // creating a reference to User model, kinda like foreign key
        ref: User,
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
});

const Account = mongoose.model('Account', accountSchema);
const User = mongoose.model("User", userSchema);
module.exports = {
    User,
    Account,
}