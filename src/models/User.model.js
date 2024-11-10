import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['user', 'admin'],
        required:true,
        default:"user"
    }
})

const UserModel = mongoose.model("User", UserSchema);
export default UserModel