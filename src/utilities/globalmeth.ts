

export const errorHandle = (err:unknown,owner:string,method?:string):Error=>{
    const error = err instanceof Error ? (err as Error) : new Error('no error reference'); 
    const prefix = '-> '+ owner + method ?? '' + ':: '
    error.message = prefix + error.message; 
    return error;
}