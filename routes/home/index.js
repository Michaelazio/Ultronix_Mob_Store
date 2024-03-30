import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import express from 'express'; 

const __dirname = dirname(fileURLToPath(import.meta.url));

const clientRouter = express.Router(); 

clientRouter.get("*", async (req, res) => {
    res.sendFile(join(__dirname, "../../client", "index.html"));
});

export default clientRouter;