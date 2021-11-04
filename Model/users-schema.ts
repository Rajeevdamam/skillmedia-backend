import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
	userName: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		unique: true,
	},
	about:{
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

const userModel = mongoose.model("users", UsersSchema);

export default userModel;
