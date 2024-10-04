const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://stavya:shanu123@cluster0.g4jei.mongodb.net/") // enter the db name later

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,

});

const User = mongoose.model("User", userSchema);

module.exports = {
    User
}