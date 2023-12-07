import student from "../models/student"
import { Request, Response } from "express"
import {responseHandle, errorHandle, encrypt} from "../utilities/globalmeth"
import {T_Student} from "../utilities/types"

export const index = async (_req:Request,res:Response):Promise<void> =>{
    try{
        const result = await student.index();
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
        const result = await student.show(pId) ;
        responseHandle(result,res);
    }
    catch(err){
        const error = errorHandle(err, __filename, "show");
        responseHandle(error,res);
    }
}

export const create = async (req:Request,res:Response):Promise<void> =>{
    try{
        const body:T_Student = req.body;
        body.password = encrypt(String(body.password));
        const result = await student.create(body);
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
        const body:T_Student = req.body;
        const result = await student.edit(pId,body);
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
        const result = await student.delete(pId) ;
        responseHandle(result,res);
    }
    catch(err){
        const error = errorHandle(err, __filename, "deleteItem");
        responseHandle(error,res);
    }
}