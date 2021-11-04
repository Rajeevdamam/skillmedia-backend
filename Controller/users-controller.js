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
exports.getUsersByName = exports.getCurrentUserProfilePosts = exports.getCurrentUserProfile = exports.isAuthorised = exports.login = exports.signup = exports.getAllusers = void 0;
var users_schema_1 = __importDefault(require("../Model/users-schema"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var posts_schema_1 = __importDefault(require("../Model/posts-schema"));
var getAllusers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, users_schema_1.default.find()];
            case 1:
                data = _a.sent();
                res.status(200).send(data);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.status(404).json({
                    status: false,
                    message: "Could not find any any User",
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllusers = getAllusers;
var signup = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userPassword, user, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                userPassword = req.body.password;
                return [4 /*yield*/, users_schema_1.default.findOne({ userName: req.body.userName })];
            case 1:
                user = _a.sent();
                if (!user) return [3 /*break*/, 2];
                res
                    .status(400)
                    .json({ status: false, message: "User name already exists" });
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, bcryptjs_1.default.hash(userPassword, 9, function (err, hash) { return __awaiter(void 0, void 0, void 0, function () {
                    var newUser, err_3;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (err) {
                                    return [2 /*return*/, res.status(400).json(err.message)];
                                }
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 3, , 4]);
                                return [4 /*yield*/, users_schema_1.default.create(__assign(__assign({}, req.body), { password: hash }))];
                            case 2:
                                newUser = _a.sent();
                                res
                                    .status(201)
                                    .json({ status: true, message: "Regsitration successful" });
                                return [3 /*break*/, 4];
                            case 3:
                                err_3 = _a.sent();
                                res.status(400).send(err_3.message);
                                return [3 /*break*/, 4];
                            case 4: return [2 /*return*/];
                        }
                    });
                }); })];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                err_2 = _a.sent();
                res.send("Error adding User" + err_2.message);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.signup = signup;
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userName, password, user, err_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                _a = req.body, userName = _a.userName, password = _a.password;
                return [4 /*yield*/, users_schema_1.default.findOne({ userName: userName })];
            case 1:
                user = _b.sent();
                if (!!user) return [3 /*break*/, 2];
                res.status(401).json({
                    status: false,
                    message: "Username doesnt exist",
                });
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, bcryptjs_1.default.compare(password, user.password)];
            case 3:
                if (!(_b.sent())) {
                    res.status(401).json({
                        status: false,
                        message: "Unauthorsied User ",
                    });
                }
                else {
                    res.status(200).json({
                        status: true,
                        message: "Login SuccessFull",
                        token: jsonwebtoken_1.default.sign({ userId: user._id }, "" + process.env.SECRET_KEY, {
                            expiresIn: "1h",
                        }),
                        user: user.userName,
                        userId: user.id,
                    });
                }
                _b.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                err_4 = _b.sent();
                res.status(404).send("Not found");
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
var isAuthorised = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var token, decode, userId, user, err_5;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!((_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization)) return [3 /*break*/, 5];
                token = req.headers.authorization;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                decode = jsonwebtoken_1.default.verify(token, "" + process.env.SECRET_KEY);
                userId = decode.userId;
                return [4 /*yield*/, users_schema_1.default.findById(userId, "_id userName")];
            case 2:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, res.status(401).json({
                            message: "Unauthorised User",
                        })];
                }
                req.user = user;
                next();
                return [3 /*break*/, 4];
            case 3:
                err_5 = _b.sent();
                res.status(401).json({ message: "Invalid token" });
                return [3 /*break*/, 4];
            case 4: return [3 /*break*/, 6];
            case 5:
                res.status(401).json({ message: "Authorization header not present!" });
                _b.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.isAuthorised = isAuthorised;
var getCurrentUserProfilePosts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userProfileDeatils, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, posts_schema_1.default.find({
                        users: req.params.userID,
                    })
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
                    })
                        .sort({ createdAt: "desc" })];
            case 1:
                userProfileDeatils = _a.sent();
                res.status(200).send(userProfileDeatils);
                return [3 /*break*/, 3];
            case 2:
                err_6 = _a.sent();
                res.status(404).send("User Not Found");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getCurrentUserProfilePosts = getCurrentUserProfilePosts;
var getCurrentUserProfile = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userProfileDeatils, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, users_schema_1.default.findById(req.params.userID, "_id userName email profileImage gender about")];
            case 1:
                userProfileDeatils = _a.sent();
                res.status(200).send(userProfileDeatils);
                return [3 /*break*/, 3];
            case 2:
                err_7 = _a.sent();
                res.status(404).send("User Not Found");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getCurrentUserProfile = getCurrentUserProfile;
var getUsersByName = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var value, users, err_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                value = eval("/" + req.params.userName + "/i");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, users_schema_1.default.find({ userName: value }, "_id userName email profileImage")];
            case 2:
                users = _a.sent();
                res.status(200).send(users);
                return [3 /*break*/, 4];
            case 3:
                err_8 = _a.sent();
                res.status(404).send("User Not Found");
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getUsersByName = getUsersByName;
