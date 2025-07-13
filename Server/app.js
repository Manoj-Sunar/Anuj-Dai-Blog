import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Connection from "./Config/dbConnection.js";
import { AuthRouter } from "./Routes/UserRoute.js";
import { BlogRoutes } from "./Routes/BlogsRoute.js";
import { AdminRoute } from "./Routes/AdminRoute.js";

dotenv.config();

const port=process.env.PORT;

const app=express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:false}));


app.use("/user-route",AuthRouter);
app.use("/blog",BlogRoutes);
app.use("/admin-route",AdminRoute);

Connection();

const start=()=>{
    app.listen(port,()=>{
          console.log(`http://localhost:${port}`);
    })
}

start();

