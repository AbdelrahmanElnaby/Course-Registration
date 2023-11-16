import {client} from "../database"
import {T_Course,T_CourseClass,T_CourseClassTeacher,T_CourseClassStudent} from "../utilities/types"
import {errorHandle} from "../utilities/globalmeth"
export interface Course{
    index:()=>Promise<T_Course[]>;

    show:(id:number)=>Promise<T_Course|null>;

    create:(course:T_Course)=>Promise<T_Course>;

    edit:(id:number, course:T_Course)=>Promise<T_Course|null>;

    delete:(id:number)=>Promise<T_Course|null>;

    addCourseClass:(courseID:number,courseClass:T_CourseClass)=>Promise<T_CourseClass|null>;

    addCourseClassTeacher:(courseId:number,className:string,courseClassTeacher:T_CourseClassTeacher)=>Promise<T_CourseClassTeacher|null>;

    addCourseClassStudent:(courseId:number,className:string,courseClassStudent:T_CourseClassStudent)=>Promise<T_CourseClassStudent|null>;
}

export class cls_Course implements Course{
   
   


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

   async addCourseClass(courseId: number,{className,maxStudents}:T_CourseClass): Promise<T_CourseClass|null>{
    try{
        const connection = await client.connect();
        const sql = "INSERT INTO course_classes (courseId, short_name, max_students) VALUES ($1, $2, $3) RETURNING *";
        const variables = [courseId,className,maxStudents];
        const query = await connection.query(sql,variables);
        connection.release();
        return query.rowCount ? query.rows[0] : null;
    }
    catch(err){
        throw errorHandle(err,__filename,"addCourseClass");
    }
   }

   async addCourseClassTeacher(courseId: number,className:string,
    {T_eacherId,courseType,courseDt}:T_CourseClassTeacher): Promise<T_CourseClassTeacher|null>{
        try{
            const connection = await client.connect();
            const sql = "INSERT INTO course_class_teachers (courseId, class_name, teacher_id, course_type, course_dt) VALUES ($1, $2, $3, $4, $5) RETURNING *";
            const variables = [courseId,className,T_eacherId,courseType,courseDt];
            const query = await connection.query(sql,variables);
            connection.release();
            return query.rowCount ? query.rows[0] : null;
        }
        catch(err){
            throw errorHandle(err,__filename,"addCourseClassTeacher");
        }
    }

    async addCourseClassStudent(courseId: number,className:string,
        {studentId,grades}:T_CourseClassStudent): Promise<T_CourseClassStudent|null>{
            try{
                const connection = await client.connect();
                const sql = "INSERT INTO course_class_students (courseId, class_name, student_id, tatal_grades) VALUES ($1, $2, $3, $4) RETURNING *";
                const variables = [courseId,className,studentId,grades];
                const query = await connection.query(sql,variables);
                connection.release();
                return query.rowCount ? query.rows[0] : null;
            }
            catch(err){
                throw errorHandle(err,__filename,"addCourseClassStudent");
            }
        }
}

const course:Course = new cls_Course();

export default course;
