// Intereacting with folders using fs module
const fs = require("fs")

//1. fs.mkdir()
fs.mkdir("newdir", null, (err, data) => {
    if(err) {
        console.error(err)
    }
})

//2. fs.rmdir()
fs.rmdir("newdir", { recursive: true }, (err, data) => { 
    if(err) {
        console.error(err)
    }
})
//{ recursive: false } for not deleting folder inside folder
//or null

//3. fs.stat()
//it will give you metadata about data
fs.stat("example.txt", (err, data) => {
    console.log("data", data)
})