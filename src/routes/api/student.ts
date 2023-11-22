import {Router} from "express"
import {index, show, create, update, deleteItem} from "../../handlers/student"

const routes = Router();

//#region student routes
routes.post("/",create);
routes.get("/",index);
routes.get("/:id",show);
routes.put("/:id",update);
routes.delete("/:id",deleteItem);
//#endregion

export default routes;