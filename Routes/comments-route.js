"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var users_controller_1 = require("../Controller/users-controller");
var comments_controller_1 = require("../Controller/comments-controller");
var commentsRoute = express_1.default.Router();
commentsRoute
    .post("/", users_controller_1.isAuthorised, comments_controller_1.addComment)
    .get("/user/:id", comments_controller_1.getUserComments)
    .delete("/:id", users_controller_1.isAuthorised, comments_controller_1.deleteComment);
exports.default = commentsRoute;
