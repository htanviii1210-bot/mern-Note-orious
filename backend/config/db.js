import mongoose from "mongoose"

export const connectDB = async () =>{
    try{

       await  mongoose.connect("mongodb+srv://devtanviii:Gunesh11$@cluster0.ut1pkpj.mongodb.net/notes_db?appName=Cluster0")
       console.log("MONGODB CONNECTED SUCCESSFULLY");
    
    } catch (error) {

        console.error("ERROR CONNECTING TO MONGODB",error);
        process.exit(1);
    }

}