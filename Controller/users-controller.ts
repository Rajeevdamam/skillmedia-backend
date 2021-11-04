import userModel from "../Model/users-schema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import PostsModel from "../Model/posts-schema";

const getAllusers = async (req: any, res: any) => {
	try {
		const data = await userModel.find();
		res.status(200).send(data);
	} catch (err: any) {
		res.status(404).json({
			status: false,
			message: "Could not find any any User",
		});
	}
};

const signup = async (req: any, res: any) => {
	try {
		let userPassword = req.body.password;
		let user = await userModel.findOne({ userName: req.body.userName });
		if (user) {
			res
				.status(400)
				.json({ status: false, message: "User name already exists" });
		} else {
			await bcrypt.hash(userPassword, 9, async (err: any, hash: any) => {
				if (err) {
					return res.status(400).json(err.message);
				}
				try {
					const newUser = await userModel.create({
						...req.body,
						password: hash,
					});
					res
						.status(201)
						.json({ status: true, message: "Regsitration successful" });
				} catch (err: any) {
					res.status(400).send(err.message);
				}
			});
		}
	} catch (err: any) {
		res.send("Error adding User" + err.message);
	}
};

const login = async (req: any, res: any) => {
	try {
		let { userName, password } = req.body;
		const user: any = await userModel.findOne({ userName });
		if (!user) {
			res.status(401).json({
				status: false,
				message: "Username doesnt exist",
			});
		} else {
			if (!(await bcrypt.compare(password, user.password))) {
				res.status(401).json({
					status: false,
					message: "Unauthorsied User ",
				});
			} else {
				res.status(200).json({
					status: true,
					message: "Login SuccessFull",
					token: jwt.sign({ userId: user._id }, `${process.env.SECRET_KEY}`, {
						expiresIn: "1h",
					}),
					user: user.userName,
					userId: user.id,
				});
			}
		}
	} catch (err: any) {
		res.status(404).send("Not found");
	}
};

const isAuthorised = async (req: any, res: any, next: Function) => {
	if (req.headers?.authorization) {
		const { authorization: token } = req.headers;
		try {
			const decode: any = jwt.verify(token, `${process.env.SECRET_KEY}`);

			const userId = decode.userId;
			const user = await userModel.findById(userId, "_id userName");
			if (!user) {
				return res.status(401).json({
					message: "Unauthorised User",
				});
			}
			req.user = user;
			next();
		} catch (err) {
			res.status(401).json({ message: "Invalid token" });
		}
	} else {
		res.status(401).json({ message: "Authorization header not present!" });
	}
};

const getCurrentUserProfilePosts = async (req: any, res: any) => {
	try {
		const userProfileDeatils = await PostsModel.find({
			users: req.params.userID,
		})
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
			})
			.sort({ createdAt: "desc" });
		res.status(200).send(userProfileDeatils);
	} catch (err) {
		res.status(404).send("User Not Found");
	}
};

const getCurrentUserProfile = async (req: any, res: any) => {
	try {
		const userProfileDeatils = await userModel.findById(
			req.params.userID,
			"_id userName email profileImage gender about"
		);
		res.status(200).send(userProfileDeatils);
	} catch (err) {
		res.status(404).send("User Not Found");
	}
};

const getUsersByName = async (req: any, res: any) => {
	let value = eval(`/${req.params.userName}/i`);
	try {
		const users = await userModel.find(
			{ userName: value },
			"_id userName email profileImage"
		);
		res.status(200).send(users);
	} catch (err) {
		res.status(404).send("User Not Found");
	}
};

export {
	getAllusers,
	signup,
	login,
	isAuthorised,
	getCurrentUserProfile,
	getCurrentUserProfilePosts,
	getUsersByName,
};
