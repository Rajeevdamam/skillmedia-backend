import Likes from "../Model/likes-schema";
import PostsModel from "../Model/posts-schema";
import comments from "../Model/comment-schema";

const postLike = async (req: any, res: any) => {
	let deleted=false;
	try {
		const post: any = await PostsModel.findById(req.params.id).populate(
			"likes"
		);
		const liked: any = await Likes.findOne({
			post: req.params.id,
			user: req.user._id,
		});

		if (liked) {
			post.likes.pull(liked._id);
			post.save();
			liked.remove();
			deleted=true;
		} else {
			const like: any = await Likes.create({
				post: req.params.id,
				user: req.user._id,
			});
			post.likes.push(like._id);
			post.save();
		}
		res.status(201).json({
			deleted:deleted,
			count:post.likes.length,
		});
	} catch (err) {
		res.status(404).send("Unauthorised to like");
	}
};

const getUserLikedPosts = async (req: any, res: any) => {
	try {

		const posts = await Likes.find({
			user: req.params.id,
			post: { $exists: true },
		})
			.select("post")
			.populate({
				path: "post",
				populate: {
					path: "users",
					select: "_id userName",
				},
			});
		res.status(200).send({ posts: posts });
	} catch (err: any) {
		res.status(404).json({
			status: false,
			message: "Could not find any results",
		});
	}
};

const commentLikes = async (req: any, res: any) => {

	try {
		const comment: any = await comments
			.findById(req.params.id)
			.populate("likes");
		const liked: any = await Likes.findOne({
			comment: req.params.id,
			user: req.user._id,
		});

		if (liked) {
			comment.likes.pull(liked._id);
			comment.save();
			liked.remove();
		} else {
			const like: any = await Likes.create({
				comment: req.params.id,
				user: req.user._id,
			});
			comment.likes.push(like._id);
			comment.save();
		}
		res.status(201).json({
			count:comment.likes.length,
			like: liked,
		});
	} catch (err) {
		res.status(404).send("Unauthorised to like");
	}
};

const getUserLikedComments = async (req: any, res: any) => {
	try {

		const comment = await Likes.find({
			user: req.params.id,
			comment: { $exists: true },
		})
			.select("comment")
			.populate({
				path: "comment",
				populate: {
					path: "user",
					select: "_id userName",
				},
			});

		res.status(200).send({ comment: comment });
	} catch (err: any) {
		res.status(404).json({
			status: false,
			message: "Could not find any results",
		});
	}
};

export { postLike, getUserLikedPosts, commentLikes, getUserLikedComments };
