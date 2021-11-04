import comments from "../Model/comment-schema";
import PostsModel from "../Model/posts-schema";

const addComment = async (req: any, res: any) => {
	try {
		const posts: any = await PostsModel.findById(req.body.post);
		if (posts) {
			const comment = await comments.create({
				comment: req.body.comment,
				post: req.body.post,
				user: req.user._id,
			});
			if (comment) {
				posts.comments.push(comment); //one
				posts.save();
				res.status(201).json(posts);
			}
		}
	} catch (err: any) {
		res.status(401).send(err.message);
	}
};

const deleteComment = async (req: any, res: any) => {
	try {
		const comment: any = await comments.findOne({ _id: req.params.id });

		if (comment.user == req.user.id) {
			const postId = comment.post;
			comment.remove();
			const post: any = await PostsModel.findOneAndUpdate(
				{ _id: postId },
				{ $pull: { comments: req.params.id } },
				{new:true}
			);
			res.status(200).json(post);
		} else {
			res.status(404).send("Not found");
		}
	} catch (err) {
		res.status(404).send("Comment Not found");
	}
};

const getUserComments = async (req: any, res: any) => {
	try {
		const userComments = await comments
			.find({ user: req.params.id })
			.populate({ path: "user", select: "_id userName" });
		res.status(200).send({ comments: userComments });
	} catch (err: any) {
		res.status(404).json({
			status: false,
			message: "Could not find any any User",
		});
	}
};

export { addComment, getUserComments, deleteComment };
