import express from "express";
import { isAuthorised } from "../Controller/users-controller";
import {
	addComment,
	getUserComments,
	deleteComment,
} from "../Controller/comments-controller";

const commentsRoute = express.Router();

commentsRoute
	.post("/", isAuthorised, addComment)
	.get("/user/:id", getUserComments)
	.delete("/:id", isAuthorised, deleteComment);

export default commentsRoute;
