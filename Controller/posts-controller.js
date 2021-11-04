"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.getCommentsForPost = exports.deletePost = exports.uploadPost = exports.getPostsByUser = exports.getUserPosts = exports.getAllpostsByCategory = exports.addPost = exports.getAllposts = void 0;
var posts_schema_1 = __importDefault(require("../Model/posts-schema"));
var users_schema_1 = __importDefault(require("../Model/users-schema"));
var comment_schema_1 = __importDefault(require("../Model/comment-schema"));
var multer_1 = __importDefault(require("multer"));
var path_1 = __importDefault(require("path"));
var POSTS_PATH = path_1.default.join("/uploads/users/posts");
var storage = multer_1.default.diskStorage({
    //destination defines where the uploads must be stored
    destination: function (req, file, cb) {
        //dirname(model folder) will be the current folder we are in so we need to go to parent directory (..)second argument to go to the uploads folder
        //error first callback
        cb(null, path_1.default.join(__dirname, "..", POSTS_PATH));
    },
    //filename defines the name of the file that has to be saved with
    filename: function (req, file, cb) {
        //file.fieldname is to image field in our schema
        var extention = file.mimetype.split("/")[1];
        cb(null, file.fieldname + "-" + Date.now() + ("." + extention));
    },
});
//is defined as statics so that the methods or properties can be accesible without creating an instance
//single function to just take the one file as input
var uploadPost = (0, multer_1.default)({ storage: storage }).single("image");
exports.uploadPost = uploadPost;
// PostsSchema.statics.postPath = POSTS_PATH;
var getAllposts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var posts, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, posts_schema_1.default.find()
                        .populate({ path: "users", select: "_id userName" })
                        .sort({ createdAt: "desc" })
                        .populate({
                        path: "likes",
                        populate: {
                            path: "user",
                            select: "_id userName",
                        },
                    })];
            case 1:
                posts = _a.sent();
                res.status(200).send(posts);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.status(404).json({
                    status: false,
                    message: "Could not find any any post",
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllposts = getAllposts;
var getAllpostsByCategory = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var posts, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, posts_schema_1.default.find({ category: req.params.category })
                        .populate({ path: "users", select: "_id userName" })
                        .populate({
                        path: "comments",
                        options: { sort: { createdAt: "desc" } },
                        populate: {
                            path: "user",
                            select: "_id userName",
                        },
                    })
                        .sort({ createdAt: "desc" })];
            case 1:
                posts = _a.sent();
                res.status(200).send(posts);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.status(404).json({
                    status: false,
                    message: "Could not find any any post",
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllpostsByCategory = getAllpostsByCategory;
var addPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var filename, data, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                filename = "";
                if (req.file != undefined) {
                    filename = POSTS_PATH + "/" + req.file.filename;
                }
                return [4 /*yield*/, posts_schema_1.default.create(__assign(__assign({}, req.body), { image: filename, users: req.user._id }))];
            case 1:
                data = _a.sent();
                res.status(200).send(data);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                res.status(400).json({
                    status: false,
                    message: "Could not add the post",
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.addPost = addPost;
// const upload = async (req: any, res: any) => {
// 	(PostsModel as any).uploadPost();
// };
var getUserPosts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var posts, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, posts_schema_1.default.find({ users: req.params.id }).populate({
                        path: "users",
                        select: "_id userName",
                    })];
            case 1:
                posts = _a.sent();
                res.status(200).send({ posts: posts });
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                res.status(404).json({
                    status: false,
                    message: "Could not find any any User",
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUserPosts = getUserPosts;
var getPostsByUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var value, user, posts, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                value = eval("/" + req.params.user_name + "/i");
                return [4 /*yield*/, users_schema_1.default.findOne({
                        userName: value,
                    })];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, posts_schema_1.default.find({ users: user._id })
                        .populate({
                        path: "users",
                        select: "_id userName",
                    })
                        .populate({
                        path: "likes",
                        populate: {
                            path: "user",
                            select: "_id userName",
                        },
                    })];
            case 2:
                posts = _a.sent();
                res.send(posts);
                return [3 /*break*/, 4];
            case 3:
                err_5 = _a.sent();
                res.status(404).json({
                    message: "Not Found!",
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getPostsByUser = getPostsByUser;
var deletePost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var post, deletedComment, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, posts_schema_1.default.findOne({ _id: req.params.id })];
            case 1:
                post = _a.sent();
                if (!(req.user.id == post.users)) return [3 /*break*/, 3];
                post.remove();
                return [4 /*yield*/, comment_schema_1.default.deleteMany({ post: req.params.id })];
            case 2:
                deletedComment = _a.sent();
                res.status(200).send(deletedComment);
                return [3 /*break*/, 4];
            case 3:
                res.status(401).json({
                    status: false,
                    message: "You are unauthorized to delete the post",
                });
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                err_6 = _a.sent();
                res.status(404).json({
                    message: "Not Found!",
                });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.deletePost = deletePost;
var getCommentsForPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var postComments, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, posts_schema_1.default.findById(req.params.id)
                        .populate({ path: "users", select: "_id userName" })
                        .populate({
                        path: "comments",
                        options: { sort: { createdAt: "desc" } },
                        populate: {
                            path: "user",
                            select: "_id userName",
                        },
                    })
                        .populate({
                        path: "comments",
                        populate: {
                            path: "likes",
                        },
                    })];
            case 1:
                postComments = _a.sent();
                res.status(200).send(postComments);
                return [3 /*break*/, 3];
            case 2:
                err_7 = _a.sent();
                res.status(404).send("Not found any comments");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getCommentsForPost = getCommentsForPost;
