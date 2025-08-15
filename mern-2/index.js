const express = require("express")

const app = express()

//middleware
//this is in-built middleware
app.use(express.json())

const PORT=3000

let USERS_ARRAY=[
    {
        name:"bruce",
        id:5,
        address:"gotham"
    },
    {
        name:"batman",
        id:6,
        address:"gotham"
    }
]

//Registering the Routes separately 
app.get('/',(req,res)=>{
    const json={
        message:"hello",
        isRoot:true
    }

    //automatically set the content header
    res.json(json)
})

app.get('/hello',(req,res)=>{
    const json={
        message:"hello message",
        timestamp:Date.now()
    }

    //automatically set the content header
    res.json(json)
})

app.get('/users',(req,res)=>{
    
    res.json(USERS_ARRAY)
})

app.post('/add-user',(req,res)=>{
    const formData=req.body
    console.log(formData)
    USERS_ARRAY.push({
        name: formData.name,
        id: formData.id,
        address: formData.address
    })

    res.json({
        success:true
    })
})

app.delete('/delete-user',(req,res)=>{
    const formData=req.body
    
    USERS_ARRAY=USERS_ARRAY.filter((user)=>{
        return user.id !== formData.id
    })

    res.json({success:true})
})

app.listen(PORT ,()=>{
    console.log("application is started")
})