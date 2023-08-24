import {Router, Request, Response } from 'express'

export interface dataUser{
    name:string,
    email:string,
    phone:string,
    password:string,
    confirmPassword:string,
}

export class UserController{

    public router:Router;

    public constructor(callback:(data:dataUser,query:string,res:Response)=>void){
        this.router = Router();
        this.User(callback);
        this.getUser(callback);
    }

    public User(callback: (data:dataUser,query:string,res:Response)=>void){
        this.router.post('/',(req:Request,res:Response)=>{
            callback(req.body,'',res);
        })
    }

    public getUser(callback: (data:dataUser,query:string,res:Response)=>void){
        this.router.get('/',(req:Request,res:Response)=>{
        res.json({
            message: "GET request successful",
            responseData: ""
        });
        })
    }
}