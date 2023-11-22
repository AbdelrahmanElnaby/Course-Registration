import { Router, Request, Response} from "express";
import courseRoutes from "./api/course"
import studentRoutes from "./api/student";
import teacherRoutes from "./api/teacher"

const routes = Router();

//#region main routes
routes.get("/",(_req:Request,res:Response)=>{
    res.status(200).send("Course_Registration main page");
});
routes.use("/course",courseRoutes);
routes.use("/teacher",teacherRoutes);
routes.use("/student",studentRoutes);
//#endregion

export default routes;
