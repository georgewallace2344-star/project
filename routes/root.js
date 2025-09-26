
import express from "express";

const router = express.Router();

import path from "node:path";

import { getDirName } from "../nativeModule.js";

const __dirname = getDirName(import.meta.url);

router.get(/^\/$|^\/index(?:\.html)?$/,(req,res) => {

    res.sendFile(path.join(__dirname,"..","views","index.html"));

});

export default router;