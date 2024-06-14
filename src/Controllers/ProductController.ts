import {Request,Response,RequestHandler} from 'express'
import {v4 as uid}from 'uuid'
import { sqlConfig } from '../config'
import { Product, ProductRequest } from '../Models/ProductModels'
import mssql from 'mssql'

//create a post endpoint

export const addProduct=async(req:ProductRequest, res:Response)=>{
    try {
        
    
        const id =uid();

        const {Name,Price}= req.body
        if (!Name || !Price) {
            return res.status(400).json({ message: "Name and Price are required" });
        }
        
        const pool= await mssql.connect(sqlConfig)
       
        await pool.request()
        .input("Id",id)

        .input("Name",Name)

        .input("Price",Price)
        .execute('addProduct')

        res.status(201).json({message:"Product Added"})

    } catch (error) {
        
        res.status(500).json(error)
    }
}

export const getProducts:RequestHandler= async(req,res)=>{
try {
    const pool= await mssql.connect(sqlConfig)
  
    const products=(await pool.request().execute('getProducts')).recordset as Product[]
    res.status(200).json(products)
} catch (error) {
    res.status(500).json(error)
}
}

// create endpoint that can search a product

export const searchProduct= async(req:Request<{id:string}>,res:Response)=>{
    try {
        const pool= await mssql.connect(sqlConfig)
       
        const product=(await pool.request()
        .input("Id",req.params.id)
        .execute('searchProduct')).recordset[0] as Product

        if(product && product.Id){
            return res.status(200).json(product)
        }

        return res.status(404).json({message:"Product Not Found"})

    } catch (error) {
        res.status(500).json(error)
    }
    }

    // Create an endpoint that returns a paginated list of products 
    export const getPaginatedProducts: RequestHandler = async (req, res) => {
        try {
            const pageNumber = parseInt(req.query.page as string) || 1;
            const rowsPerPage = parseInt(req.query.limit as string) || 10;
    
            const pool = await mssql.connect(sqlConfig);
    
            const products = (await pool.request()
                .input("PageNumber", pageNumber)
                .input("RowsPerPage", rowsPerPage)
                .execute('getPaginatedProducts')).recordset as Product[];
    
            res.status(200).json(products);
    
        } catch (error) {
            console.error('Error in getPaginatedProducts:', error);
            res.status(500).json({ error: 'error.message' });
        }
    };

    // Create one endpoint that can filter student based on Price Ranges     
  
    export const filterProducts = async (req: Request, res: Response) => {
        try {
            const { minPrice, maxPrice, name } = req.query;
    
          
            const min = parseFloat(minPrice as string);
            const max = parseFloat(maxPrice as string);
            const productName = name ? (name as string) : null;
    
            const pool = await mssql.connect(sqlConfig);
    
            const products = await pool.request()
                .input('MinPrice', mssql.Decimal(10, 2), min)
                .input('MaxPrice', mssql.Decimal(10, 2), max)
                .input('Name', mssql.VarChar(255), productName)
                .execute('filterProducts');
    
            res.status(200).json(products.recordset as Product[]);
        } catch (error) {
            res.status(500).json({ error: 'error.message' });
        }
    };
    