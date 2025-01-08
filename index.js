import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
	res.send("Server Started");
});

const startServer = async () => {
	try {
		await connectDB();
		app.listen(port, () => console.log(`Server Started On Port ${port}`));
	} catch (error) {
		console.error("Server failed to start:", error);
		process.exit(1);
	}
};

startServer();
