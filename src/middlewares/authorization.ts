import { Request, Response } from "express";
import { receiveToken } from "../utilities/globalmeth";

const authorization = (req:Request,res:Response,next:Function):void =>{
    const token = req.cookies?.authorization;
    if(token){
        const payload = receiveToken(token);
        const userId = payload?.id;

        if(!payload) res.status(401).send("dont have permission");
        else if("id" in req.params) req.params.id = String(userId);
        else if("teacherId" in req.params) req.params.teacherId = String(userId);
        else if("studentId" in req.params) req.params.studentId = String(userId);
        else if("teacherId" in req.body) req.body.teacherId = String(userId);
        else if("studentId" in req.body) req.body.studentId = String(userId);

        next();
        return;
    }
    res.status(405).send("you should login first");
}

export default authorization;