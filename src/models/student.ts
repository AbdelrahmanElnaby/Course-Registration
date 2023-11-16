import {client} from "../database"
import {errorHandle} from "../utilities/globalmeth"
import {T_Student} from "../utilities/types"

export interface Student{
    index:()=>Promise<T_Student[]>;

    show:(id:number)=>Promise<T_Student|null>;

    create:(student:T_Student)=>Promise<T_Student|null>;

    edit:(id:number, student:T_Student)=>Promise<T_Student|null>;

    delete:(id:number)=>Promise<T_Student|null>;
}

class Cls_Student implements Student{

    async index():Promise<T_Student[]>{
        try{
            const connection = await client.connect();
            const sql = "SELECT id, full_name, email, birth_dt, password, max_courses FROM students";
            const quey = await connection.query(sql);
            connection.release();
            return quey.rows;
        }
        catch(err){
            throw errorHandle(err,__filename,"index");
        }
    }

    async show(id:number):Promise<T_Student|null>{
        try{
            const connection = await client.connect();
            const sql = "SELECT id, full_name, email, birth_dt, password, max_courses FROM students WHERE id = $1";
            const variables = [id];
            const quey = await connection.query(sql,variables);
            connection.release();
            return quey.rowCount ? quey.rows[0]: null;
        }
        catch(err){
            throw errorHandle(err,__filename,"show");
        }
    }

    async create({fullName,email,birthDt,password,maxCourses}:T_Student):Promise<T_Student|null>{
        try{
            const connection = await client.connect();
            const sql = "INSERT INTO students (full_name, email, birth_dt, password, max_courses) VALUES ($1,$2,$3,$4,$5) RETURNING *";
            const variables = [fullName,email,birthDt,password,maxCourses];
            const quey = await connection.query(sql,variables);
            connection.release();
            return quey.rowCount ? quey.rows[0]: null;
        }
        catch(err){
            throw errorHandle(err,__filename,"create");
        }
    }

    async edit(id:number,{fullName,email,birthDt,password,maxCourses}:T_Student):Promise<T_Student|null>{
        try{
            const connection = await client.connect();
            const sql = "UPDATE students SET full_name = $2, email = $3, birth_dt = $4, password = $5, max_courses = $6 WHERE id = $1 RETURNING *";
            const variables = [id,fullName,email,birthDt,password,maxCourses];
            const quey = await connection.query(sql,variables);
            connection.release();
            return quey.rowCount ? quey.rows[0]: null;
        }
        catch(err){
            throw errorHandle(err,__filename,"edit");
        }
    }

    async delete(id:number):Promise<T_Student|null>{
        try{
            const connection = await client.connect();
            const sql = "Delete FROM students WHERE id = $1";
            const variables = [id];
            const quey = await connection.query(sql,variables);
            connection.release();
            return quey.rowCount ? quey.rows[0]: null;
        }
        catch(err){
            throw errorHandle(err,__filename,"delete");
        }
    }
}

const student:Student = new Cls_Student();

export default student;

