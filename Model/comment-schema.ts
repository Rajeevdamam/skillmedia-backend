import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
	{
		comment: {
			type: String,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "users",
		},
		post: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "posts",
		},
		likes: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "likes",
			},
		],
	},
	{ timestamps: true }
);

const comments = mongoose.model("comments", commentSchema);

export default comments;
