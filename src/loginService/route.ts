import {Router, Request, Response} from "express"
import teacher from "./models/teacher"
import student from "./models/student";
import { encrypt, sendToken, responseHandle, errorHandle} from "../utilities/globalmeth"

const routes = Router();

const teacherHandler = async (req:Request,res:Response):Promise<void> =>{
    try{
    req.body.password = encrypt(String(req.body.password));
    const teacherInfo = await teacher.login(req.body);
    if(teacherInfo){
        const token = sendToken(teacherInfo);
        //res.cookie("authorization",token,{httpOnly:true}).redirect("courseRegistration");
        res.cookie("authorization",token,{httpOnly:true}).json({url:"courseRegistration"});
    }
    responseHandle(teacherInfo,res,"Failed Login");
    }
    catch(err){
        const error = errorHandle(err, __filename, "teacherLogin");
        responseHandle(error,res,"Failed Login");
    }

}

const studentrHandler = async (req:Request,res:Response):Promise<void> =>{
    try{
    req.body.password = encrypt(String(req.body.password));
    const studentInfo = await student.login(req.body);
    if(studentInfo){
        const token = sendToken(studentInfo);
        //res.cookie("authorization",token,{httpOnly:true}).redirect("/courseRegistration");
        res.cookie("authorization",token,{httpOnly:true}).json({url:"courseRegistration"});
    }
    responseHandle(studentInfo,res,"Failed Login");
    }
    catch(err){
        const error = errorHandle(err, __filename, "studentLogin");
        responseHandle(error,res,"Failed Login");
    }

}

routes.post("/teacher",teacherHandler);
routes.post("/student",studentrHandler);

export default routes;