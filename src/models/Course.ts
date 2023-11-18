import {client} from "../database"
import {T_Course,T_CourseClass,T_CourseClassTeacher,T_CourseClassStudent} from "../utilities/types"
import {errorHandle} from "../utilities/globalmeth"

//#region Course Interface
export interface Course{
    //#region Course Methods
    create:(course:T_Course)=>Promise<T_Course>;

    index:()=>Promise<T_Course[]>;

    show:(id:number)=>Promise<T_Course|null>;

    edit:(id:number, course:T_Course)=>Promise<T_Course|null>;

    delete:(id:number)=>Promise<T_Course|null>;
    //#region 

    //#region CourseClasses Methods
    addCourseClass:(courseID:number,courseClass:T_CourseClass)=>Promise<T_CourseClass|null>;

    getCourseClasses:(courseId: number)=>Promise<T_CourseClass[]>;

    getSpecificCourseClass:(courseId:number,className:string)=>Promise<T_CourseClass|null>;

    editCourseClass:(courseId:number,className:string,coureClass:T_CourseClass)=>Promise<T_CourseClass|null>;

    deleteCourseClass:(courseId:number,className:string)=>Promise<T_CourseClass|null>;
    //#endregion
    
    //#region CourseClassTeachers Methods
    addCourseClassTeacher:(courseId:number,className:string,courseClassTeacher:T_CourseClassTeacher)=>Promise<T_CourseClassTeacher|null>;

    getCourseClassTeachers:(courseId: number,className:string)=>Promise<T_CourseClassTeacher[]>;

    getSpecificCourseClassTeacher:(courseId:number,className:string,teacherId:number)=>Promise<T_CourseClassTeacher|null>;

    editCourseClassTeacher:(courseId:number,className:string,teacherId:number,courseClassTeacher:T_CourseClassTeacher)=>Promise<T_CourseClassTeacher|null>;

    deleteCourseClassTeacher:(courseId:number,className:string,teacherId:number)=>Promise<T_CourseClassTeacher|null>;
    //#region 

    //#region CourseClassStudent Methods
    addCourseClassStudent:(courseId:number,className:string,courseClassStudent:T_CourseClassStudent)=>Promise<T_CourseClassStudent|null>;

    getCourseClassStudents:(courseId: number,className:string)=>Promise<T_CourseClassStudent[]>;

    getSpecificCourseClassStudent:(courseId:number,className:string,studentId:number)=>Promise<T_CourseClassStudent|null>;

    editCourseClassStudent:(courseId:number,className:string,studentId:number,courseClassStudent:T_CourseClassStudent)=>Promise<T_CourseClassStudent|null>;

    deleteCourseClassStudent:(courseId:number,className:string,studentId:number)=>Promise<T_CourseClassStudent|null>
    //#endregion
}
//#region 

//#region Course Class
export class cls_Course implements Course{
   
    //#region Course Methods
    async create({code,description,maxClasses}:T_Course):Promise<T_Course>{
        try{
            const connection = await client.connect();
            const sql = "INSERT INTO courses (code, description, max_classes) VALUES ($1, $2, $3) RETURNING *";
            const varialbes = [code,description,maxClasses];
            const query = await connection.query(sql,varialbes);
            connection.release();
            return query.rows[0];
        }
        catch(err){
            throw errorHandle(err,__filename,"create");
        }
    }

   async index():Promise<T_Course[]>{
    try{
        const connection = await client.connect();
        const sql = "SELECT id, code, description, max_classes FROM courses";
        const query = await connection.query(sql);
        connection.release();
        return query.rows;
    }
    catch(err){
        throw errorHandle(err,__filename,"index");
    }
   }

   async show(id:number):Promise<T_Course|null>{
    try{
        const connection = await client.connect();
        const sql = "SELECT id, code, description, max_classes FROM courses WHERE id = $1";
        const varialbes = [id]
        const query = await connection.query(sql,varialbes);
        connection.release();
        return query.rows.length ? query.rows[0]:null ;
    }
    catch(err){
        throw errorHandle(err,__filename,"show");
    }
   }

   async edit(id:number,{code,description,maxClasses}:T_Course):Promise<T_Course|null>{
    try{
        const connection = await client.connect();
        const sql = "UPDATE courses SET code = $2, description = $3, max_classes = $4 WHERE id = $1 RETURNING *";
        const varialbes = [id,code,description,maxClasses];
        const query = await connection.query(sql,varialbes);
        connection.release();
        return query.rows.length ? query.rows[0] : null ;
    }
    catch(err){
        throw errorHandle(err,__filename,"edit");
    }
   }

   async delete(id:number):Promise<T_Course|null>{
    try{
        const connection = await client.connect();
        const sql = "DELETE FROM courses WHERE id = $1 RETURNING *";
        const varialbes = [id];
        const query = await connection.query(sql,varialbes);
        connection.release();
        return query.rows.length ? query.rows[0] : null ;
    }
    catch(err){
        throw errorHandle(err,__filename,"delete");
    }
   }
   //#region 
   
   //#region CourseClasses methods
   async addCourseClass(courseId: number,{className,maxStudents}:T_CourseClass): Promise<T_CourseClass|null>{
    try{
        const connection = await client.connect();
        const sql = "INSERT INTO course_classes (course_id, short_name, max_students) VALUES ($1, $2, $3) RETURNING *";
        const variables = [courseId,className,maxStudents];
        const query = await connection.query(sql,variables);
        connection.release();
        return query.rowCount ? query.rows[0] : null;
    }
    catch(err){
        throw errorHandle(err,__filename,"addCourseClass");
    }
   }

   async getCourseClasses(courseId: number):Promise<T_CourseClass[]>{
    try{
        const connection = await client.connect();
        const sql = "SELECT course_id, short_name, max_students FROM course_classes";
        const variables = [courseId];
        const query = await connection.query(sql,variables);
        connection.release();
        return query.rows;
    }
    catch(err){
        throw errorHandle(err,__filename,"getCourseClasses");
    }
   }

   async getSpecificCourseClass(courseId: number,class_name:string):Promise<T_CourseClass|null>{
    try{
        const connection = await client.connect();
        const sql = "SELECT course_id, short_name, max_students FROM course_classes WHERE course_id = $1 AND short_name = $2";
        const variables = [courseId,class_name];
        const query = await connection.query(sql,variables);
        connection.release();
        return query.rowCount ? query.rows[0] : null;
    }
    catch(err){
        throw errorHandle(err,__filename,"getCourseClasses");
    }
   }

   async editCourseClass(courseId: number,className:string,{maxStudents}:T_CourseClass): Promise<T_CourseClass|null>{
    try{
        const connection = await client.connect();
        const sql = "UPDATE course_classes SET max_students = $3 WHERE course_id =$1 AND short_name = $2  RETURNING *";
        const variables = [courseId,className,maxStudents];
        const query = await connection.query(sql,variables);
        connection.release();
        return query.rowCount ? query.rows[0] : null;
    }
    catch(err){
        throw errorHandle(err,__filename,"editCourseClass");
    }
   }

   async deleteCourseClass(courseId: number,class_name:string):Promise<T_CourseClass|null>{
    try{
        const connection = await client.connect();
        const sql = "DELETE FROM course_students WHERE course_id = $1 AND short_name = $2 RETURNING *";
        const variables = [courseId,class_name];
        const query = await connection.query(sql,variables);
        connection.release();
        return query.rowCount ? query.rows[0] : null;
    }
    catch(err){
        throw errorHandle(err,__filename,"deleteCourseClass");
    }
   }
   //#region 

   //#region CourseClassTeacher Methods
   async addCourseClassTeacher(courseId: number,className:string,
    {T_eacherId,courseType,courseDt}:T_CourseClassTeacher): Promise<T_CourseClassTeacher|null>{
        try{
            const connection = await client.connect();
            const sql = "INSERT INTO course_class_teachers (course_id, class_name, teacher_id, course_type, course_dt) VALUES ($1, $2, $3, $4, $5) RETURNING *";
            const variables = [courseId,className,T_eacherId,courseType,courseDt];
            const query = await connection.query(sql,variables);
            connection.release();
            return query.rowCount ? query.rows[0] : null;
        }
        catch(err){
            throw errorHandle(err,__filename,"addCourseClassTeacher");
        }
    }

    async getCourseClassTeachers(courseId: number,className:string):Promise<T_CourseClassTeacher[]>{
        try{
            const connection = await client.connect();
            const sql = "SELECT course_id, class_name, teacher_id, course_type, course_dt FROM course_class_teachers WHERE course_id = $1 AND class_name = $2";
            const variables = [courseId,className]
            const query = await connection.query(sql,variables);
            connection.release();
            return query.rows;
        }
        catch(err){
            throw errorHandle(err,__filename,"getCourseClassTeachers");
        }
    }

    async getSpecificCourseClassTeacher(courseId:number,className:string,teacherId:number):Promise<T_CourseClassTeacher|null>{
        try{
            const connection = await client.connect();
            const sql = "SELECT course_id, class_name, teacher_id, course_type, course_dt FROM course_class_teachers WHERE course_id = $1 AND class_name = $2 AND teacher_id = $3 ";
            const variables = [courseId,className,teacherId];
            const query = await connection.query(sql,variables);
            connection.release();
            return query.rowCount ? query.rows[0] : null;
        }
        catch(err){
            throw errorHandle(err,__filename,"getSpecificCourseClassTeacher");
        }
    }

    async editCourseClassTeacher(courseId: number,className:string,teacherId:number,
        {courseType,courseDt}:T_CourseClassTeacher): Promise<T_CourseClassTeacher|null>{
            try{
                const connection = await client.connect();
                const sql = "UPDATE course_class_teachers SET course_type = $4, course_dt = $5 WHERE course_id = $1 AND class_name = $2 AND teacher_id = $3 RETURNING *";
                const variables = [courseId,className,teacherId,courseType,courseDt];
                const query = await connection.query(sql,variables);
                connection.release();
                return query.rowCount ? query.rows[0] : null;
            }
            catch(err){
                throw errorHandle(err,__filename,"addCourseClassTeacher");
            }
        }

    async deleteCourseClassTeacher(courseId:number,className:string,teacherId:number):Promise<T_CourseClassTeacher|null>{
        try{
            const connection = await client.connect();
            const sql = "DELETE FROM course_class_teachers WHERE course_id = $1 AND class_name = $2 AND teacher_id = $3 RETURNING *";
            const variables = [courseId,className,teacherId];
            const query = await connection.query(sql,variables);
            connection.release();
            return query.rowCount ? query.rows[0] : null;
        }
        catch(err){
            throw errorHandle(err,__filename,"deleteCourseClassTeacher");
        }
    }
    //#region 

    //#region CourseClassStudent Methods
    async addCourseClassStudent(courseId: number,className:string,
        {studentId,grades}:T_CourseClassStudent): Promise<T_CourseClassStudent|null>{
            try{
                const connection = await client.connect();
                const sql = "INSERT INTO course_class_students (course_id, class_name, student_id, tatal_grades) VALUES ($1, $2, $3, $4) RETURNING *";
                const variables = [courseId,className,studentId,grades];
                const query = await connection.query(sql,variables);
                connection.release();
                return query.rowCount ? query.rows[0] : null;
            }
            catch(err){
                throw errorHandle(err,__filename,"addCourseClassStudent");
            }
        }

    async getCourseClassStudents(courseId: number,className:string):Promise<T_CourseClassStudent[]>{
        try{
            const connection = await client.connect();
            const sql = "SELECT course_id, class_name, student_id, total_grades FROM course_class_students WHERE course_id = $1 AND class_name = $2";
            const variables = [courseId,className];
            const query = await connection.query(sql,variables);
            connection.release();
            return query.rows;
        }
        catch(err){
            throw errorHandle(err,__filename,"getCourseClassStudents");
        }
    }

    async getSpecificCourseClassStudent(courseId:number,className:string,studentId:number):Promise<T_CourseClassStudent|null>{
        try{
            const connection = await client.connect();
            const sql = "SELECT course_id, class_name, student_id, total_grades FROM course_class_students WHERE course_id = $1, class_name = $2, student_id = $3";
            const variables = [courseId,className,studentId];
            const query = await connection.query(sql,variables);
            connection.release();
            return query.rowCount ? query.rows[0] : null ;
        }
        catch(err){
            throw errorHandle(err,__filename,"getSpecificCourseClassStudent");
        }
    }

    async editCourseClassStudent(courseId: number,className:string,studentId:number,
        {grades}:T_CourseClassStudent): Promise<T_CourseClassStudent|null>{
            try{
                const connection = await client.connect();
                const sql = "UPDATE course_class_students SET total_grades = $4 WHERE course_id = $1 AND class_name = $2, student_id = $3 RETURNING *";
                const variables = [courseId,className,studentId,grades];
                const query = await connection.query(sql,variables);
                connection.release();
                return query.rowCount ? query.rows[0] : null;
            }
            catch(err){
                throw errorHandle(err,__filename,"editCourseClassStudent");
            }
        }

    async deleteCourseClassStudent(courseId:number,className:string,studentId:number):Promise<T_CourseClassStudent|null>{
        try{
            const connection = await client.connect();
            const sql = "DELETE FROM course_class_students WHERE course_id = $1, class_name = $2, student_id = $3 RETURNING *";
            const variables = [courseId,className,studentId];
            const query = await connection.query(sql,variables);
            connection.release();
            return query.rowCount ? query.rows[0] : null ;
        }
        catch(err){
            throw errorHandle(err,__filename,"deleteCourseClassStudent");
        }
    }
    //#region 
}
//#region 
const course:Course = new cls_Course();

export default course;
