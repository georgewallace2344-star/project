
import express from "express";

const app = express();

import path from "node:path";

import cors from "cors";

import { errorHandler } from "./middleware/errorHandler.js";

import { corsOptions } from "./config/corsOptions.js";

import { logger } from "./middleware/logEvents.js";

const PORT = process.env.PORT || 3500;

import { getDirName } from "./nativeModule.js";

const __dirname = getDirName(import.meta.url);

import root from "./routes/root.js";

import employeeRoute from "./routes/api/employees.js";

import registerRoute from "./routes/register.js";

import authRoute from "./routes/auth.js";

import refreshRoute from "./routes/refresh.js";

import logoutRoute from "./routes/logout.js";

import { verifyJWT } from "./middleware/verifyJWT.js";

import cookieParser from "cookie-parser";

import { credentials } from "./middleware/credentials.js";

import mongoose from "mongoose";

import dotenv from "dotenv";

import { connectDB } from "./config/dbConn.js";

dotenv.config();

connectDB();

app.use(credentials);

app.use(cors(corsOptions));

app.use(logger);

app.use(express.urlencoded({extended: false}));

app.use(express.json());

app.use(cookieParser());

app.use("/",express.static(path.join(__dirname,"public")));

app.use("/", root);

app.use("/register", registerRoute);

app.use("/auth", authRoute);

app.use("/refresh", refreshRoute);

app.use("/logout", logoutRoute);

app.use(verifyJWT);

app.use("/employees", employeeRoute);

app.use(errorHandler);

mongoose.connection.once("open",() => {

    console.log("Connected to MongoDB");

    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

});

