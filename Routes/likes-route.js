"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var likes_controller_1 = require("../Controller/likes-controller");
var users_controller_1 = require("../Controller/users-controller");
var likeRouter = express_1.default.Router();
likeRouter
    .post("/toggle/:id", users_controller_1.isAuthorised, likes_controller_1.postLike)
    .get("/user/post/:id", likes_controller_1.getUserLikedPosts)
    .post("/comments/:id", users_controller_1.isAuthorised, likes_controller_1.commentLikes)
    .get("/user/comment/:id", likes_controller_1.getUserLikedComments);
exports.default = likeRouter;
