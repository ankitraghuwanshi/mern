const {UserModel} = require("../models/users")

const addUserHandler = async (req,res)=>{
    try {
        const userDetails=req.body
        const user=await UserModel.create(userDetails)

        res.status(200).json({
            status: "success",
            message:"user created successfully",
            user
        })
    } catch (error) {
        res.status(500).json({
            status: "failure",
            message: error.message
        })
    }
}

const getUsersHandler=async (req,res)=>{
    try {
        const users=await UserModel.find()

        if(users.length === 0){
            res.status(404).json({
                status: "failure",
                message: "NO USERS FOUND"
            })
        }

        res.status(200).json({
            status: "success",
            message:"all users find successfully",
            users
        })
    } catch (error) {
        res.status(500).json({
            status: "failure",
            message: error.message
        })
    }
}

const getUserByIdHandler=async(req,res)=>{
    try {
        const user=await UserModel.findById(req.params._id)

        if(!user){
            res.status(404).json({
                status: "failure",
                message: "NO USER FOUND"
            })
        }

        res.status(200).json({
            status: "success",
            message:"particular user findById successfully",
            user
        })
    } catch (error) {
        res.status(500).json({
            status: "failure",
            message: error.message
        })
    }
}

const deleteUsersHandler = async ()=>{}

module.exports={
    addUserHandler,
    getUsersHandler,
    getUserByIdHandler,
    deleteUsersHandler
}