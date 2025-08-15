const fs=require("fs")

//1.asynchronous way
//a.read file
fs.readFile('file1.txt', 'utf-8', (err, data) => {
    if (err) {
        console.error('Some error happened:', err.message);
        return;
    }
    console.log(data);
})

//b.write file
fs.writeFile('example.txt', 'Hello world', 'utf8', (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('File has been written.');
});

//2.synchronous way
try {
    const data = fs.readFileSync('file1.txt', 'utf-8');
    console.log(data);
} catch (err) {
    console.error('Some error happened:', err.message);
}