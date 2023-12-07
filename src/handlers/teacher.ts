import teacher from "../models/teacher"
import { Request, Response } from "express"
import {responseHandle, errorHandle, encrypt} from "../utilities/globalmeth"
import {T_Teacher} from "../utilities/types"


export const index = async (_req:Request,res:Response):Promise<void> =>{
    try{
        const result = await teacher.index();
        responseHandle(result,res);
    }
    catch(err){
        const error = errorHandle(err, __filename, "index");
        responseHandle(error,res);
    }
}

export const show = async (req:Request,res:Response):Promise<void> =>{
    try{
        const pId  = Number(req.params.id);
        const result = await teacher.show(pId) ;
        responseHandle(result,res);
    }
    catch(err){
        const error = errorHandle(err, __filename, "show");
        responseHandle(error,res);
    }
}

export const create = async (req:Request,res:Response):Promise<void> =>{
    try{
        const body:T_Teacher = req.body;
        body.password = encrypt(String(body.password));
        console.log(body.password);
        const result = await teacher.create(body);
        responseHandle(result,res);
    }
    catch(err){
        const error = errorHandle(err, __filename, "create");
        responseHandle(error,res);
    }
}

export const update = async (req:Request,res:Response):Promise<void> =>{
    try{
        const pId = Number(req.params.id);
        const body:T_Teacher = req.body;
        const result = await teacher.edit(pId,body);
        responseHandle(result,res);
    }
    catch(err){
        const error = errorHandle(err, __filename, "update");
        responseHandle(error,res);
    }
}

export const deleteItem = async (req:Request,res:Response):Promise<void> =>{
    try{
        const pId  = Number(req.params.id);
        const result = await teacher.delete(pId) ;
        responseHandle(result,res);
    }
    catch(err){
        const error = errorHandle(err, __filename, "deleteItem");
        responseHandle(error,res);
    }
}


