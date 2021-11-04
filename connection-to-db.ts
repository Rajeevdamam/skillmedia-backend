import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectionToDB = () =>
	mongoose.connect(
		`mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_CLUSTER}/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: true,
			useCreateIndex: true,
		}
	);

export default connectionToDB;
