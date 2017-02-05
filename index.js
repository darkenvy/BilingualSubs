var fs = require('fs');
var parser = require('ass-parser');
// var file = fs.readFileSync(__dirname + '/ja.ass', 'utf8');
// var file = fs.readFileSync(__dirname + '/eng.ssa', 'utf8');
var subA = parser(fs.readFileSync(__dirname + '/eng.ssa', 'utf8'), {comments: true});
var subB = parser(fs.readFileSync(__dirname + '/ja.ass', 'utf8'), {comments: true});

// console.log(file);
console.log(subA[2].body[1]);
console.log(subB[2].body[13]);