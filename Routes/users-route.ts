import express from "express";
import {
	getAllusers,
	signup,
	login,
	getCurrentUserProfile,
	getCurrentUserProfilePosts,
	getUsersByName
} from "../Controller/users-controller";
const userRouter = express.Router();

//Route for getting all the users
userRouter
	.get("/", getAllusers)
	.post("/", signup)
	.post("/login", login)
	.get("/profile/:userID", getCurrentUserProfile)
	.get("/posts/:userID", getCurrentUserProfilePosts)
	.get("/byname/:userName",getUsersByName)

export default userRouter;
