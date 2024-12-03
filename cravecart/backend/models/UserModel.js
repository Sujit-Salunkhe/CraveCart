import mongoose from 'mongoose'


const UserModel = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    number:{
        type:Number,
        require:true,
        unique:true
    },
    admin:{
        type:Boolean,
        require:true,
        default:false,
    }
},{
    timestamps:true
})

const Users = mongoose.model("Users",UserModel)

export default Users