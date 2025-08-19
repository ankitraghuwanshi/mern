// Copying from one location to another

const fs = require("fs")
const path = require("path")

//Define the source & destination
const sourcePath = path.join("parent", "child", "grandchild.txt")
const destination = path.join("new.txt")

// Create a readable stream (data) from the source file
const readStream = fs.createReadStream(sourcePath)

// Create a writeable stream where I can write to
const writeStream = fs.createWriteStream(destination)

// Pipe the data from read stream to write stream
readStream.pipe(writeStream)

readStream.on("error", (err) => {
    console.error(err)
})

writeStream.on("error", (err) => {
    console.error(err)
})

writeStream.on("finish", (data) => {
    console.log("File is copied")
})