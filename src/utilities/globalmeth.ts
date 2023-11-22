import { Response } from "express";

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

