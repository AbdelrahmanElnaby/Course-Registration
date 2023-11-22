import {client} from "../database"
import {errorHandle} from "../utilities/globalmeth"
import {T_Teacher} from "../utilities/types"

export interface Teacher{
    index:()=>Promise<T_Teacher[]>;

    show:(id:number)=>Promise<T_Teacher|null>;

    create:(student:T_Teacher)=>Promise<T_Teacher|null>;

    edit:(id:number, student:T_Teacher)=>Promise<T_Teacher|null>;

    delete:(id:number)=>Promise<T_Teacher|null>;
}

class Cls_Teacher implements Teacher{

    async index():Promise<T_Teacher[]>{
        try{
            const connection = await client.connect();
            const sql = "SELECT id, full_name, email, birth_dt, password, max_courses FROM teachers";
            const quey = await connection.query(sql);
            connection.release();
            return quey.rows;
        }
        catch(err){
            throw errorHandle(err,__filename,"index");
        }
    }

    async show(id:number):Promise<T_Teacher|null>{
        try{
            const connection = await client.connect();
            const sql = "SELECT id, full_name, email, birth_dt, password, max_courses FROM teachers WHERE id = $1";
            const variables = [id];
            const quey = await connection.query(sql,variables);
            connection.release();
            return quey.rowCount ? quey.rows[0]: null;
        }
        catch(err){
            throw errorHandle(err,__filename,"show");
        }
    }

    async create({fullName,email,birthDt,password,maxCourses}:T_Teacher):Promise<T_Teacher|null>{
        try{
            const connection = await client.connect();
            const sql = "INSERT INTO teachers (full_name, email, birth_dt, password, max_courses) VALUES ($1,$2,$3,$4,$5) RETURNING *";
            const variables = [fullName,email,birthDt,password,maxCourses];
            const quey = await connection.query(sql,variables);
            connection.release();
            return quey.rowCount ? quey.rows[0]: null;
        }
        catch(err){
            throw errorHandle(err,__filename,"create");
        }
    }

    async edit(id:number,{fullName,email,birthDt,password,maxCourses}:T_Teacher):Promise<T_Teacher|null>{
        try{
            const connection = await client.connect();
            const sql = "UPDATE teachers SET full_name = $2, email = $3, birth_dt = $4, password = $5, max_courses = $6 WHERE id = $1 RETURNING *";
            const variables = [id,fullName,email,birthDt,password,maxCourses];
            const quey = await connection.query(sql,variables);
            connection.release();
            return quey.rowCount ? quey.rows[0]: null;
        }
        catch(err){
            throw errorHandle(err,__filename,"edit");
        }
    }

    async delete(id:number):Promise<T_Teacher|null>{
        try{
            const connection = await client.connect();
            const sql = "Delete FROM teachers WHERE id = $1 RETURNING *";
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

const student:Teacher = new Cls_Teacher();

export default student;