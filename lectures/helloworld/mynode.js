var fs = require('fs')
const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

// Part 1
// fs.readFile("myfile.txt", "utf8", function (err, contents) {
//     if (err)
//         console.log(err);
//     else
//         console.log(contents);
// });

// fs.writeFile("node.txt", "test string", "utf8", function (err) {
//     if (err)
//         console.log(err);
//     else
//         console.log("Done");
// });

// Part 2
// rl.question("What is your name?", (name) => {
//     console.log(name);

//     rl.question("What is your favorite color?", (color) => {
//         console.log(color);
//         rl.close();
//     })
// });