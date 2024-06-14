import { Request } from "express";

export interface ProductRequest extends Request{
body:{
        Name:string,
        Price:string
    }
}

export interface Product{
    Id:string,
    Name:string,
    Price:string
}