import {Router} from "express"
import {index, show, create, update, deleteItem,
    addCourseClass, getCourseClasses, getSpecificCourseClass, editCourseClass,
    deleteCourseClass, addCourseClassTeacher, getCourseClassTeachers,
    getSpecificCourseClassTeacher, editCourseClassTeacher, deleteCourseClassTeacher,
    addCourseClassStudent, getCourseClassStudents, getSpecificCourseClassStudent, 
    editCourseClassStudent, deleteCourseClassStudent} from "../../handlers/course"
import authorization from "../../middlewares/authorization";
import cookieParser from "cookie-parser";

const routes = Router();

//#region course routes
routes.post("/",create);
routes.get("/",index);
routes.get("/:id",show);
routes.put("/:id",update);
routes.delete("/:id",deleteItem);
//#endregion

//#region courseClass routes
routes.post("/:courseId/class",addCourseClass);
routes.get("/:courseId/class",getCourseClasses);
routes.get("/:courseId/class/:className",getSpecificCourseClass);
routes.put("/:courseId/class/:className",editCourseClass);
routes.delete("/:courseId/class/:className",deleteCourseClass);
//#endregion

//#region courseClassTeacher routes
routes.post("/:courseId/class/:className/teacher", cookieParser(), authorization, addCourseClassTeacher);
routes.get("/:courseId/class/:className/teacher",getCourseClassTeachers);
routes.get("/:courseId/classes/:className/teacher/:teacherId", cookieParser(), authorization,getSpecificCourseClassTeacher);
routes.put("/:courseId/classes/:className/teacher/:teacherId", cookieParser(),authorization, editCourseClassTeacher);
routes.delete("/:courseId/classes/:className/teacher/:teacherId", cookieParser(),authorization, deleteCourseClassTeacher);
//#endregion

//#region courseClassStudent routes
routes.post("/:courseId/class/:className/student", cookieParser(),authorization, addCourseClassStudent);
routes.get("/:courseId/class/:className/student",getCourseClassStudents);
routes.get("/:courseId/classes/:className/student/:studentId", cookieParser(), authorization,getSpecificCourseClassStudent);
routes.put("/:courseId/classes/:className/student/:studentId", cookieParser(), authorization, editCourseClassStudent);
routes.delete("/:courseId/classes/:className/student/:studentId", cookieParser(),authorization, deleteCourseClassStudent);
//#endregion

export default routes;