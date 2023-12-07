import {Router, Request, Response} from "express"
import teacher from "./models/teacher"
import student from "./models/student";
import { comparePassword, sendToken, responseHandle, errorHandle} from "../utilities/globalmeth"

const routes = Router();

const teacherHandler = async (req:Request,res:Response):Promise<void> =>{
    try{
    const teacherInfo = await teacher.login(req.body);
    if(teacherInfo){
        if(comparePassword(req.body.password,String(teacherInfo.password))){
            const  {id,fullName} = teacherInfo;
            const token = sendToken({id,fullName});
            res.cookie("authorization",token,{httpOnly:true}).redirect("http://localhost:3003/courseRegistration");
            //res.cookie("authorization",token,{httpOnly:true}).json({url:"courseRegistration"});
            return;
        }
    }
    responseHandle(null,res,"Failed Login");
    return;
    }
    catch(err){
        const error = errorHandle(err, __filename, "teacherLogin");
        responseHandle(error,res,"Failed Login");
    }

}

const studentrHandler = async (req:Request,res:Response):Promise<void> =>{
    try{
    const studentInfo = await student.login(req.body);
    if(studentInfo){
        if(comparePassword(req.body.password,String(studentInfo.password))){
            const  {id,fullName} = studentInfo;
            const token = sendToken({id,fullName});
            res.cookie("authorization",token,{httpOnly:true}).redirect("http://localhost:3003/courseRegistration");
           // res.cookie("authorization",token,{httpOnly:true}).json({url:"courseRegistration"});
            return;
        }
        
    }
    responseHandle(null,res,"Failed Login");
    return;
    }
    catch(err){
        const error = errorHandle(err, __filename, "studentLogin");
        responseHandle(error,res,"Failed Login");
    }

}

routes.post("/teacher",teacherHandler);
routes.post("/student",studentrHandler);

export default routes;