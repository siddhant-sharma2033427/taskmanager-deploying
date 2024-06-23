// const connstring = "mongodb+srv://user:User@major-project.8kkxvv2.mongodb.net/RawData"
import mongoose from 'mongoose';
// const String= "mongodb+srv://user:User@major-project.8kkxvv2.mongodb.net/RawData"
const String= "mongodb+srv://user:User@cluster0.2v0jwlv.mongodb.net/TaskManager?retryWrites=true&w=majority&appName=Cluster0"
const Connection = async ()=>{
    try{
        console.log("wating db to be connected");
        await mongoose.connect(String)
        console.log("DB_connected");
    }catch(error){
        console.log("some error occured while connecting",error); 
    }
}

export default Connection