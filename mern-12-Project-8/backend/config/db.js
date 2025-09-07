const mongoose=require("mongoose")

const { DB_URL }=process.env

//connecting to DB and importing model
const connectDB = async () => mongoose.connect(DB_URL)
.then(()=>{
    console.log("connected to our DATABASE")
})
.catch((err)=>{
    console.log(err)
    //stop the server if error
    process.exit(1)
})

module.exports = {
    connectDB
} 