import {Router} from "express"
import {index, show, create, update, deleteItem,
    addCourseClass, getCourseClasses, getSpecificCourseClass, editCourseClass,
    deleteCourseClass, addCourseClassTeacher, getCourseClassTeachers,
    getSpecificCourseClassTeacher, editCourseClassTeacher, deleteCourseClassTeacher,
    addCourseClassStudent, getCourseClassStudents, getSpecificCourseClassStudent, 
    editCourseClassStudent, deleteCourseClassStudent} from "../../handlers/course"

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
routes.post("/:courseId/class/:className/teacher",addCourseClassTeacher);
routes.get("/:courseId/class/:className/teacher",getCourseClassTeachers);
routes.get("/:courseId/classes/:className/teacher/:teacherId",getSpecificCourseClassTeacher);
routes.put("/:courseId/classes/:className/teacher/:teacherId",editCourseClassTeacher);
routes.delete("/:courseId/classes/:className/teacher/:teacherId",deleteCourseClassTeacher);
//#endregion

//#region courseClassStudent routes
routes.post("/:courseId/class/:className/student",addCourseClassStudent);
routes.get("/:courseId/class/:className/student",getCourseClassStudents);
routes.get("/:courseId/classes/:className/student/:studentId",getSpecificCourseClassStudent);
routes.put("/:courseId/classes/:className/student/:studentId",editCourseClassStudent);
routes.delete("/:courseId/classes/:className/student/:studentId",deleteCourseClassStudent);
//#endregion

export default routes;