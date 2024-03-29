const mongoose = require("mongoose");

const sauceSchema = mongoose.Schema({
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: false },
  heat: { type: Number, required: true },
  userId: { type: String, required: true },
  likes: { type: Number, required: false, default: "0" },
  dislikes: { type: Number, required: false, default: "0" },
  usersLiked: { type: ["String <userId>"], required: false },
  usersDisliked: { type: ["String <userId>"], required: false },
});

module.exports = mongoose.model("Sauce", sauceSchema);
