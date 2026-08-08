const addGrade = require("./modules/add.grades");
const deleteGrade = require("./modules/delete.grades");
const readGrades = require("./modules/read.grades");
const updateGrade = require("./modules/update.grades");

addGrade("Sondos", "JavaScript", 90);
addGrade("Ahmed", "Node.js", 85);

console.log(readGrades());

updateGrade(1, 95);

console.log(readGrades());

deleteGrade(2);

console.log(readGrades());