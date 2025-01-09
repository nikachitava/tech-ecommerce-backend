import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";

import CategoryRoutes from "./routes/categories.route.js";
import ProductRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Credentials", true);
	next();
});
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
	res.send("Server Started");
});

app.use("/category", CategoryRoutes);
app.use("/products", ProductRoutes);

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
