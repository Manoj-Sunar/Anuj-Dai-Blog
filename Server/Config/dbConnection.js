import mongoose from "mongoose";

const Connection=()=>{
    try {
        mongoose.connect(process.env.DATABASE_URI)
        console.log("MongoDb database connection successfully")
    } catch (error) {
        console.log(error);
    }
}

export default Connection;