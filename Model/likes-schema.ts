import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "users",
	},
	post: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "posts",
	},
	comment: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "comments",
	},
});

const Likes = mongoose.model("likes", LikeSchema);

export default Likes;
