// Path module -> path module lets us work with relative and absolute path

const path = require("path")

//1.relative path
const fullPath = path.join("parent", "child", "grandchild.txt")
console.log(fullPath)
// Joining multiple path
// parent/child/grandchild.txt    -->macbook
// parent\child\grandchild.txt    -->window


//2.absolute path
// Given a relative path,then
// it will return the absolute path
const resolvedPath = path.resolve("parent", "child", "grandchild.txt")
console.log(resolvedPath)


//3.type of file
const extension = path.extname(fullPath)
console.log(extension)

//4.normalized path
// Whenever there are segments like ../. this will resolve them and give us the clean path
const normalizedPath = path.normalize("./path/to/../file.txt")
console.log(normalizedPath)
//it print /path/file.txt
