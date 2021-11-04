import express from "express";
import {
	getUserLikedPosts,
	postLike,
	commentLikes,
	getUserLikedComments,
} from "../Controller/likes-controller";
import { isAuthorised } from "../Controller/users-controller";

const likeRouter = express.Router();

likeRouter
	.post("/toggle/:id", isAuthorised, postLike)
	.get("/user/post/:id", getUserLikedPosts)
	.post("/comments/:id", isAuthorised, commentLikes)
	.get("/user/comment/:id", getUserLikedComments);

export default likeRouter;
