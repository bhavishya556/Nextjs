import mongoose from "mongoose";



export async function connect() {

    try{
        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;

        connection.on("connected", ()=>{
            console.log("db is successfully connected");
        })

    }catch(error){
        console.log("somthing goes wrong in db connect");
        console.error("somthing goes wrong in db connect");
        process.exit();

    }
    
}