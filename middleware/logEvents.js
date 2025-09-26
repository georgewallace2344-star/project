
import { format } from "date-fns";

import { v4 as uuid } from "uuid";

import fs from "node:fs";

import fsPromises from "node:fs/promises";

import path from "node:path";

import { getDirName } from "../nativeModule.js";

const __dirname = getDirName(import.meta.url);

const logEvents = async(message, logName) => { 

    const dateTime = `${format(new Date(),"yyyyMMdd\tHH:mm:ss")}`;

    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    console.log(logItem);

    try {

        if(!fs.existsSync(path.join(__dirname,"..","logs"))) {

            await fsPromises.mkdir(path.join(__dirname,"..","logs"));

        }

        await fsPromises.appendFile(path.join(__dirname,"..","logs",logName), logItem);

    } catch(err) {

        console.error(err);

    }

}

const logger = (req,res,next) => {

    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`,"reqLog.txt");

    console.log(`${req.method} ${req.path}`);

    next();

}

export { logger, logEvents };

