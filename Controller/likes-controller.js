"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserLikedComments = exports.commentLikes = exports.getUserLikedPosts = exports.postLike = void 0;
var likes_schema_1 = __importDefault(require("../Model/likes-schema"));
var posts_schema_1 = __importDefault(require("../Model/posts-schema"));
var comment_schema_1 = __importDefault(require("../Model/comment-schema"));
var postLike = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var deleted, post, liked, like, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                deleted = false;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 7, , 8]);
                return [4 /*yield*/, posts_schema_1.default.findById(req.params.id).populate("likes")];
            case 2:
                post = _a.sent();
                return [4 /*yield*/, likes_schema_1.default.findOne({
                        post: req.params.id,
                        user: req.user._id,
                    })];
            case 3:
                liked = _a.sent();
                if (!liked) return [3 /*break*/, 4];
                post.likes.pull(liked._id);
                post.save();
                liked.remove();
                deleted = true;
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, likes_schema_1.default.create({
                    post: req.params.id,
                    user: req.user._id,
                })];
            case 5:
                like = _a.sent();
                post.likes.push(like._id);
                post.save();
                _a.label = 6;
            case 6:
                res.status(201).json({
                    deleted: deleted,
                    count: post.likes.length,
                });
                return [3 /*break*/, 8];
            case 7:
                err_1 = _a.sent();
                res.status(404).send("Unauthorised to like");
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.postLike = postLike;
var getUserLikedPosts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var posts, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, likes_schema_1.default.find({
                        user: req.params.id,
                        post: { $exists: true },
                    })
                        .select("post")
                        .populate({
                        path: "post",
                        populate: {
                            path: "users",
                            select: "_id userName",
                        },
                    })];
            case 1:
                posts = _a.sent();
                res.status(200).send({ posts: posts });
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.status(404).json({
                    status: false,
                    message: "Could not find any results",
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUserLikedPosts = getUserLikedPosts;
var commentLikes = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var comment, liked, like, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                return [4 /*yield*/, comment_schema_1.default
                        .findById(req.params.id)
                        .populate("likes")];
            case 1:
                comment = _a.sent();
                return [4 /*yield*/, likes_schema_1.default.findOne({
                        comment: req.params.id,
                        user: req.user._id,
                    })];
            case 2:
                liked = _a.sent();
                if (!liked) return [3 /*break*/, 3];
                comment.likes.pull(liked._id);
                comment.save();
                liked.remove();
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, likes_schema_1.default.create({
                    comment: req.params.id,
                    user: req.user._id,
                })];
            case 4:
                like = _a.sent();
                comment.likes.push(like._id);
                comment.save();
                _a.label = 5;
            case 5:
                res.status(201).json({
                    count: comment.likes.length,
                    like: liked,
                });
                return [3 /*break*/, 7];
            case 6:
                err_3 = _a.sent();
                res.status(404).send("Unauthorised to like");
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.commentLikes = commentLikes;
var getUserLikedComments = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var comment, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, likes_schema_1.default.find({
                        user: req.params.id,
                        comment: { $exists: true },
                    })
                        .select("comment")
                        .populate({
                        path: "comment",
                        populate: {
                            path: "user",
                            select: "_id userName",
                        },
                    })];
            case 1:
                comment = _a.sent();
                res.status(200).send({ comment: comment });
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                res.status(404).json({
                    status: false,
                    message: "Could not find any results",
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUserLikedComments = getUserLikedComments;
