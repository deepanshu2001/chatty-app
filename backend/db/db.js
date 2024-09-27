import mongoose from "mongoose";
const connectDB=async()=>{
    await mongoose.connect(process.env.MONGO_DB_URL).then(()=>{
    console.log('Connected to MONGODB');
}).catch((err)=>{
    console.log(err);
})
}
export default connectDB;