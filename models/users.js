var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var usersSchema = new Schema({
  name: String,
  dob: Date,
  birthcountry: String,
  language: String,
  phone: String,
});

module.exports = mongoose.model("users", usersSchema);
