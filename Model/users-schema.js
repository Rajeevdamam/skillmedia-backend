"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var UsersSchema = new mongoose_1.default.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
    },
    about: {
        type: String
    },
    gender: {
        type: String,
    },
    profileImage: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
});
var userModel = mongoose_1.default.model("users", UsersSchema);
exports.default = userModel;
