"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var commentSchema = new mongoose_1.default.Schema({
    comment: {
        type: String,
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "users",
    },
    post: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "posts",
    },
    likes: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "likes",
        },
    ],
}, { timestamps: true });
var comments = mongoose_1.default.model("comments", commentSchema);
exports.default = comments;
