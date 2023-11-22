import course from "../models/course"
import { Request, Response } from "express"
import {responseHandle, errorHandle} from "../utilities/globalmeth"
import {T_Course,T_CourseClass,T_CourseClassStudent,T_CourseClassTeacher} from "../utilities/types"

//#region Course Handlers
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
//#region
 
//#region CourseClasses Hnadlers
export const addCourseClass = async (req:Request,res:Response):Promise<void> =>{
    try{
        const courseId  = Number(req.params.courseId);
        const body:T_CourseClass = req.body;
        const result = await course.addCourseClass(courseId,body) ;
        responseHandle(result,res);
    }
    catch(err){
        const error = errorHandle(err, __filename, "addCourseClass");
        responseHandle(error,res);
    }
}

export const getCourseClasses = async (req:Request,res:Response):Promise<void> =>{
    try{
        const courseId  = Number(req.params.courseId);
        const result = await course.getCourseClasses(courseId) ;
        responseHandle(result,res);
    }
    catch(err){
        const error = errorHandle(err, __filename, "getCourseClasses");
        responseHandle(error,res);
    }
}

export const getSpecificCourseClass = async (req:Request,res:Response):Promise<void> =>{
    try{
        const courseId  = Number(req.params.courseId);
        const className  = req.params.className;
        const result = await course.getSpecificCourseClass(courseId,className) ;
        responseHandle(result,res);
    }
    catch(err){
        const error = errorHandle(err, __filename, "getSpecificCourseClass");
        responseHandle(error,res);
    }
}

export const editCourseClass = async (req:Request,res:Response):Promise<void> =>{
    try{
        const courseId  = Number(req.params.courseId);
        const className  = req.params.className;
        const body:T_CourseClass = req.body;
        const result = await course.editCourseClass(courseId,className,body) ;
        responseHandle(result,res);
    }
    catch(err){
        const error = errorHandle(err, __filename, "editCourseClass");
        responseHandle(error,res);
    }
}

export const deleteCourseClass = async (req:Request,res:Response):Promise<void> =>{
    try{
        const courseId  = Number(req.params.courseId);
        const className  = req.params.className;
        const result = await course.deleteCourseClass(courseId,className) ;
        responseHandle(result,res);
    }
    catch(err){
        const error = errorHandle(err, __filename, "deleteCourseClass");
        responseHandle(error,res);
    }
}
//#region 

//#region CourseClassTeachers handlers
export const addCourseClassTeacher = async (req:Request,res:Response):Promise<void> =>{
    try{
        const courseId  = Number(req.params.courseId);
        const className = req.params.className;
        const body:T_CourseClassTeacher = req.body;
        const result = await course.addCourseClassTeacher(courseId,className,body) ;
        responseHandle(result,res);
    }
    catch(err){
        const error = errorHandle(err, __filename, "addCourseClassTeacher");
        responseHandle(error,res);
    }
}

export const getCourseClassTeachers = async (req:Request,res:Response):Promise<void> =>{
    try{
        const courseId  = Number(req.params.courseId);
        const className = req.params.className;
        const result = await course.getCourseClassTeachers(courseId,className) ;
        responseHandle(result,res);
    }
    catch(err){
        const error = errorHandle(err, __filename, "getCourseClassTeachers");
        responseHandle(error,res);
    }
}

export const getSpecificCourseClassTeacher = async (req:Request,res:Response):Promise<void> =>{
    try{
        const courseId  = Number(req.params.courseId);
        const className = req.params.className;
        const teacherId  = Number(req.params.teacherId);
        const result = await course.getSpecificCourseClassTeacher(courseId,className,teacherId) ;
        responseHandle(result,res);
    }
    catch(err){
        const error = errorHandle(err, __filename, "getSpecificCourseClassTeacher");
        responseHandle(error,res);
    }
}

export const editCourseClassTeacher = async (req:Request,res:Response):Promise<void> =>{
    try{
        const courseId  = Number(req.params.courseId);
        const className = req.params.className;
        const teacherId  = Number(req.params.teacherId);
        const body:T_CourseClassTeacher = req.body;
        const result = await course.editCourseClassTeacher(courseId,className,teacherId,body) ;
        responseHandle(result,res);
    }
    catch(err){
        const error = errorHandle(err, __filename, "editCourseClassTeacher");
        responseHandle(error,res);
    }
}

export const deleteCourseClassTeacher = async (req:Request,res:Response):Promise<void> =>{
    try{
        const courseId  = Number(req.params.courseId);
        const className = req.params.className;
        const teacherId  = Number(req.params.teacherId);
        const result = await course.deleteCourseClassTeacher(courseId,className,teacherId) ;
        responseHandle(result,res);
    }
    catch(err){
        const error = errorHandle(err, __filename, "deleteCourseClassTeacher");
        responseHandle(error,res);
    }
}
//#region 

//#region CourseClassStudents handlers
export const addCourseClassStudent = async (req:Request,res:Response):Promise<void> =>{
    try{
        const courseId  = Number(req.params.courseId);
        const className = req.params.className;
        const body:T_CourseClassStudent = req.body;
        const result = await course.addCourseClassStudent(courseId,className,body) ;
        responseHandle(result,res);
    }
    catch(err){
        const error = errorHandle(err, __filename, "addCourseClassStudent");
        responseHandle(error,res);
    }
}

export const getCourseClassStudents= async (req:Request,res:Response):Promise<void> =>{
    try{
        const courseId  = Number(req.params.courseId);
        const className = req.params.className;
        const result = await course.getCourseClassStudents(courseId,className) ;
        responseHandle(result,res);
    }
    catch(err){
        const error = errorHandle(err, __filename, "getCourseClassStudents");
        responseHandle(error,res);
    }
}

export const getSpecificCourseClassStudent= async (req:Request,res:Response):Promise<void> =>{
    try{
        const courseId  = Number(req.params.courseId);
        const className = req.params.className;
        const studentId  = Number(req.params.studentId);
        const result = await course.getSpecificCourseClassStudent(courseId,className,studentId) ;
        responseHandle(result,res);
    }
    catch(err){
        const error = errorHandle(err, __filename, "getSpecificCourseClassStudent");
        responseHandle(error,res);
    }
}

export const editCourseClassStudent = async (req:Request,res:Response):Promise<void> =>{
    try{
        const courseId  = Number(req.params.courseId);
        const className = req.params.className;
        const studentId  = Number(req.params.studentId);
        const body:T_CourseClassStudent = req.body;
        const result = await course.editCourseClassStudent(courseId,className,studentId,body) ;
        responseHandle(result,res);
    }
    catch(err){
        const error = errorHandle(err, __filename, "editCourseClassStudent");
        responseHandle(error,res);
    }
}

export const deleteCourseClassStudent= async (req:Request,res:Response):Promise<void> =>{
    try{
        const courseId  = Number(req.params.courseId);
        const className = req.params.className;
        const studentId  = Number(req.params.studentId);
        const result = await course.deleteCourseClassStudent(courseId,className,studentId) ;
        responseHandle(result,res);
    }
    catch(err){
        const error = errorHandle(err, __filename, "deleteCourseClassStudent");
        responseHandle(error,res);
    }
}
//#region 
