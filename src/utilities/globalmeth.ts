import { Response } from "express";
import  bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { T_Student, T_StudentPayload, T_Teacher, T_TeacherPayload } from "./types";
dotenv.config();

export const errorHandle = (err:unknown,owner:string,method?:string):Error=>{
    const error = err instanceof Error ? err : new Error('no error reference'); 
    const prefix = '-> '+ owner + method ?? '' + ':: '
    error.message = prefix + error.message; 
    console.log(error.message);
    return error;
}

export const responseHandle = (result:Object|null,res:Response,message?:string):void=>{
    if(! result ){
        res.status(400).send(message ?? "Bad User Request");
    }
    else if(result instanceof Error){
        res.status(500).send(message ?? "Internal Server Errror");
    }
    else{
        res.status(200).json(result);
    }
}

export const checkNumber = (...numArr:unknown[]):boolean =>{
    for(const item of numArr){
        if(typeof item !== 'number' || isNaN(item)) return false;
    }
    return true;
}

export const checkChar = (...stringArr:string[]):boolean =>{
    for(let item of stringArr){
        item = item.toLowerCase();
        if(item.length !== 1 || item.charCodeAt(0) < 97 || item.charCodeAt(0) > 122){
            return false;
        } 
    }
    return true;
}

export const encrypt = (password:string):string=>{
    let {PEPPER,SALTROUND}  = process.env;
    console.log(PEPPER,SALTROUND);
    SALTROUND = checkNumber(SALTROUND) ? SALTROUND : "10" ;
    const hashedPassword = bcrypt.hashSync(password+PEPPER ,Number(SALTROUND));
    return hashedPassword;
}

export const comparePassword = (password:string,hashPassword:string):boolean =>{
    const {PEPPER}  = process.env;
    console.log(PEPPER);
    return bcrypt.compareSync(password+PEPPER,hashPassword);
}

export const createToten = (user:T_Student|T_Teacher):string =>{
    const {id,fullName} = user; // can be customized to separate the payload of student or teacher
    const payload = {id,fullName};
    const {SECRET} = process.env;
    const signature = jwt.sign(payload,String(SECRET));
    return signature;
}

export const validateToken = (token:string):any|null =>{
    const {SECRET} = process.env;
    try{
        const payload = jwt.verify(token,String(SECRET));
        return  payload;
    }
    catch(e){
        return null;
    }
}

export const configureToken = (token:string,tokenOperation:number):string =>{

    return tokenOperation? `Bearer ${token}` : token.split(" ")[1] ;
}

export const sendToken = (user:T_StudentPayload|T_TeacherPayload):string =>{

    return configureToken(createToten(user),1);
}

export const receiveToken = (token:string):T_Student|T_Teacher|null =>{

    const tokenConfigure = configureToken(token,0);
    return validateToken(tokenConfigure) ;
}
