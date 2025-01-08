import mongoose from "mongoose";

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log("Database connected successfuly");
	} catch (error) {
		console.error("Database connection failed: ", error);
	}
};

export default connectDB;
