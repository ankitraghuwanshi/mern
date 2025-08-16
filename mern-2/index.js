const express = require("express")

const app = express()

//middleware
//this is in-built middleware
app.use(express.json())

const PORT=3000

let USERS_ARRAY = [{
    userId: 1,
    name: "Bruce",
    address: "Gotham"
}, {
    userId: 2,
    name: "Riddler",
    address: "Gotham"
}]

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

const authenticateMiddleware=(req,res,next)=>{
    console.log("middleware 1 is called")
    
    if(req.headers.password ==="test"){
        //allow user to proceed
        next()
    }else{
        res.status(500).send("you are not authenticated")
    }
}
//dummy middleware
const testMiddleware=(req,res,next)=>{
    console.log("middleware 2 is called")
    next()
}

app.get('/users',[authenticateMiddleware, testMiddleware] ,(req,res)=>{

    //automatically set the content header
    res.json(USERS_ARRAY)
})

//how to get particular user with id
app.get('/users/:userId',(req,res)=>{
    console.log(req.params)

    const user=USERS_ARRAY.find((user)=>
        user.userId === parseInt(req.params.userId, 10)
    )

    //automatically set the content header
    res.json(user)
})

app.post('/add-user',(req,res)=>{
    const formData=req.body
    //console.log(formData)

    USERS_ARRAY.push(
        {
            userId: formData.userId,
            name: formData.name,
            address: formData.address
        }
    )

    res.json({
        success:true
    })
})

app.delete('/delete-user',(req,res)=>{
    const formData=req.body
    
    USERS_ARRAY=USERS_ARRAY.filter((user)=>{
        return user.userId !== formData.userId
    })

    res.json({success:true})
})

//for invalid url
//In build middleware that runs for any route not specified above
//catch-all route to indicate 404 error
app.use((req,res)=>{
    res.status(404).send("PAGE NOT FOUND")
})

app.listen(PORT ,()=>{
    console.log("application is started")
})