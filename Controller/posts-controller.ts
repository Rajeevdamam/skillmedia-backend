import PostsModel from "../Model/posts-schema";
import userModel from "../Model/users-schema";
import comments from "../Model/comment-schema";

import multer from "multer";
import path from "path";

const POSTS_PATH = path.join("/uploads/users/posts");

let storage = multer.diskStorage({
	//destination defines where the uploads must be stored
	destination: function (req, file, cb) {
		//dirname(model folder) will be the current folder we are in so we need to go to parent directory (..)second argument to go to the uploads folder
		//error first callback
		cb(null, path.join(__dirname, "..", POSTS_PATH));
	},
	//filename defines the name of the file that has to be saved with
	filename: function (req, file, cb) {
		//file.fieldname is to image field in our schema
		const extention = file.mimetype.split("/")[1];
		cb(null, file.fieldname + "-" + Date.now() + `.${extention}`);
	},
});

//is defined as statics so that the methods or properties can be accesible without creating an instance
//single function to just take the one file as input
const uploadPost = multer({ storage: storage }).single("image");
// PostsSchema.statics.postPath = POSTS_PATH;

const getAllposts = async (req: any, res: any) => {
	try {
		const posts = await PostsModel.find()
			.populate({ path: "users", select: "_id userName" })
			.sort({ createdAt: "desc" })
			.populate({
				path: "likes",
				populate: {
					path: "user",
					select: "_id userName",
				},
			});

		res.status(200).send(posts);
	} catch (err: any) {
		res.status(404).json({
			status: false,
			message: "Could not find any any post",
		});
	}
};

const getAllpostsByCategory = async (req: any, res: any) => {
	try {
		const posts = await PostsModel.find({ category: req.params.category })
			.populate({ path: "users", select: "_id userName" })
			.populate({
				path: "comments",
				options: { sort: { createdAt: "desc" } },
				populate: {
					path: "user",
					select: "_id userName",
				},
			})
			.sort({ createdAt: "desc" });
		res.status(200).send(posts);
	} catch (err: any) {
		res.status(404).json({
			status: false,
			message: "Could not find any any post",
		});
	}
};

const addPost = async (req: any, res: any) => {
	try {
		let filename = "";
		if (req.file != undefined) {
			filename = POSTS_PATH + "/" + req.file.filename;
		}
		const data = await PostsModel.create({
			...req.body,
			image: filename,
			users: req.user._id,
		});

		res.status(200).send(data);
	} catch (err: any) {
		res.status(400).json({
			status: false,
			message: "Could not add the post",
		});
	}
};

// const upload = async (req: any, res: any) => {
// 	(PostsModel as any).uploadPost();
// };

const getUserPosts = async (req: any, res: any) => {
	try {
		const posts = await PostsModel.find({ users: req.params.id }).populate({
			path: "users",
			select: "_id userName",
		});
		res.status(200).send({ posts: posts });
	} catch (err: any) {
		res.status(404).json({
			status: false,
			message: "Could not find any any User",
		});
	}
};

const getPostsByUser = async (req: any, res: any) => {
	try {
		let value = eval(`/${req.params.user_name}/i`);
		const user: any = await userModel.findOne({
			userName: value,
		});
		const posts = await PostsModel.find({ users: user._id })
			.populate({
				path: "users",
				select: "_id userName",
			})
			.populate({
				path: "likes",
				populate: {
					path: "user",
					select: "_id userName",
				},
			});
		res.send(posts);
	} catch (err) {
		res.status(404).json({
			message: "Not Found!",
		});
	}
};

const deletePost = async (req: any, res: any) => {
	try {
		const post: any = await PostsModel.findOne({ _id: req.params.id });

		if (req.user.id == post.users) {
			post.remove();
			const deletedComment = await comments.deleteMany({ post: req.params.id });
			res.status(200).send(deletedComment);
		} else {
			res.status(401).json({
				status: false,
				message: "You are unauthorized to delete the post",
			});
		}
	} catch (err) {
		res.status(404).json({
			message: "Not Found!",
		});
	}
};

const getCommentsForPost = async (req: any, res: any) => {
	try {
		const postComments = await PostsModel.findById(req.params.id)
			.populate({ path: "users", select: "_id userName" })
			.populate({
				path: "comments",
				options: { sort: { createdAt: "desc" } },
				populate: {
					path: "user",
					select: "_id userName",
				},
			})
			.populate({
				path: "comments",
				populate: {
					path: "likes",
				},
			});
		res.status(200).send(postComments);
	} catch (err) {
		res.status(404).send("Not found any comments");
	}
};

export {
	getAllposts,
	addPost,
	getAllpostsByCategory,
	getUserPosts,
	getPostsByUser,
	uploadPost,
	deletePost,
	getCommentsForPost,
};
