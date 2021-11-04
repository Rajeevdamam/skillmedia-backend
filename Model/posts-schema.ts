import mongoose from "mongoose";

//we dont store the file in datbse due to the size constraint so we either store the uploads in locl system folders or in cloud system
const PostsSchema = new mongoose.Schema(
	{
		description: {
			type: String,
		},
		image: {
			type: String,
		},
		users: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "users",
		},

		tags: [
			{
				type: String,
			}
		],
		comments: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "comments",
			},
		],
		likes: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "likes",
			},
		],
	},
	{ timestamps: true }
);

const PostsModel = mongoose.model("posts", PostsSchema);

export default PostsModel;
