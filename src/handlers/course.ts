import course from "../models/Course"
import { Request, Response } from "express"
import {responseHandle, errorHandle} from "../utilities/globalmeth"
import {T_Course,T_CourseClass,T_CourseClassStudent,T_CourseClassTeacher} from "../utilities/types"

export const index = async (_req:Request,res:Response):Promise<void> =>{
    try{
        const result = await course.index();
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
        const result = await course.show(pId) ;
        responseHandle(result,res);
    }
    catch(err){
        const error = errorHandle(err, __filename, "show");
        responseHandle(error,res);
    }
}

export const create = async (req:Request,res:Response):Promise<void> =>{
    try{
        const body:T_Course = req.body;
        const result = await course.create(body);
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
        const body:T_Course = req.body;
        const result = await course.edit(pId,body);
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
        const result = await course.delete(pId) ;
        responseHandle(result,res);
    }
    catch(err){
        const error = errorHandle(err, __filename, "deleteItem");
        responseHandle(error,res);
    }
}

export const addCourseClass = async (req:Request,res:Response):Promise<void> =>{
    try{
        const pId  = Number(req.params.id);
        const body:T_CourseClass = req.body;
        const result = await course.addCourseClass(pId,body) ;
        responseHandle(result,res);
    }
    catch(err){
        const error = errorHandle(err, __filename, "addCourseClass");
        responseHandle(error,res);
    }
}

export const addCourseClassTeacher = async (req:Request,res:Response):Promise<void> =>{
    try{
        const pId  = Number(req.params.id);
        const className = req.params.name;
        const body:T_CourseClass = req.body;
        const result = await course.addCourseClassTeacher(pId,className,body) ;
        responseHandle(result,res);
    }
    catch(err){
        const error = errorHandle(err, __filename, "addCourseClassTeacher");
        responseHandle(error,res);
    }
}

export const addCourseClassStudent = async (req:Request,res:Response):Promise<void> =>{
    try{
        const pId  = Number(req.params.id);
        const className = req.params.name;
        const body:T_CourseClass = req.body;
        const result = await course.addCourseClassStudent(pId,className,body) ;
        responseHandle(result,res);
    }
    catch(err){
        const error = errorHandle(err, __filename, "addCourseClassStudent");
        responseHandle(error,res);
    }
}
