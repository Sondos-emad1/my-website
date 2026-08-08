const readGrades = require("./read.grades");
const saveGrades = require("./save.grades");

function updateGrade(id, newGrade) {
    const grades = readGrades();

    const student = grades.find(function(grade) {
        return grade.id === id;
    });

    if (student) {
        student.grade = newGrade;

        saveGrades(grades);

        console.log("Grade updated successfully");
    } else {
        console.log("Student not found");
    }
}

module.exports = updateGrade;