const readGrades = require("./read.grades");
const saveGrades = require("./save.grades");

function deleteGrade(id) {
    const grades = readGrades();

    const newGrades = grades.filter(function(grade) {
        return grade.id !== id;
    });

    saveGrades(newGrades);

    console.log("Grade deleted successfully");
}

module.exports = deleteGrade;