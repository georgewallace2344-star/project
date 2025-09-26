
import path from "node:path";

import { fileURLToPath } from "url";

const getDirName= (url) => {
    
    const __filename = fileURLToPath(url);

    const __dirname = path.dirname(__filename);

    return __dirname;

}

export { getDirName };
