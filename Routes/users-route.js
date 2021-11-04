"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var users_controller_1 = require("../Controller/users-controller");
var userRouter = express_1.default.Router();
//Route for getting all the users
userRouter
    .get("/", users_controller_1.getAllusers)
    .post("/", users_controller_1.signup)
    .post("/login", users_controller_1.login)
    .get("/profile/:userID", users_controller_1.getCurrentUserProfile)
    .get("/posts/:userID", users_controller_1.getCurrentUserProfilePosts)
    .get("/byname/:userName", users_controller_1.getUsersByName);
exports.default = userRouter;
