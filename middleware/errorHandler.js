
import { logEvents } from "./logEvents.js";

const errorHandler = (err,req,res,next) => {

    logEvents(`${err.name}: ${err.message}`,"errLog.txt");

    console.error(err.stack);

    res.send(err.message);

    next();

}

export { errorHandler };