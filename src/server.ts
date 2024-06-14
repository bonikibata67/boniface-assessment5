
import express,{json} from 'express'
import ProductRouter from './Routes/ProductRouter'

const app = express()

app.use(json())

app.use("/products", ProductRouter)



app.listen(4000, ()=>{ console.log("Server Running..")})