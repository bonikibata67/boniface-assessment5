import { Router } from "express";
import{addProduct, searchProduct, getProducts, getPaginatedProducts, filterProducts} from "../Controllers/ProductController"

const ProductRouter = Router()

ProductRouter.post("/add",addProduct)
ProductRouter.get("/Id",searchProduct)
ProductRouter.get("/",getProducts)
ProductRouter.get("/paginatedproducts",getPaginatedProducts)
ProductRouter.get("/filter",filterProducts)


export default ProductRouter