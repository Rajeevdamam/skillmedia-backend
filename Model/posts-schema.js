"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
//we dont store the file in datbse due to the size constraint so we either store the uploads in locl system folders or in cloud system
var PostsSchema = new mongoose_1.default.Schema({
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    users: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "users",
    },
    tags: [
        {
            type: String,
        }
    ],
    comments: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "comments",
        },
    ],
    likes: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "likes",
        },
    ],
}, { timestamps: true });
var PostsModel = mongoose_1.default.model("posts", PostsSchema);
exports.default = PostsModel;
