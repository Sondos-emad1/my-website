let studentName = "";
let attendance = 0;
let midtermScore = 0;
let finalExamScore = 0;
let assignmentScore = 0;
let tuitionStatus = "";

function checkResult() {

    studentName = document.getElementById("studentName").value;
    attendance = Number(document.getElementById("attendance").value);
    midtermScore = Number(document.getElementById("midterm").value);
    finalExamScore = Number(document.getElementById("finalExam").value);
    assignmentScore = Number(document.getElementById("assignment").value);
    tuitionStatus = document.getElementById("tuition").value;

    let result = document.getElementById("result");

    if (tuitionStatus === "no") {
        result.innerHTML = "You cannot view your result because tuition is not paid.";
        console.log("Tuition not paid.");
        return;
    }

    if (attendance < 75) {
        result.innerHTML = "Student Failed attendance";
        console.log("Failed - Attendance");
        return;
    }

    let totalScore = midtermScore + finalExamScore + assignmentScore;
    let grade = "";
    let status = "";

    if (totalScore >= 90) {
        grade = "A";
    } else if (totalScore >= 80) {
        grade = "B";
    } else if (totalScore >= 70) {
        grade = "C";
    } else if (totalScore >= 60) {
        grade = "D";
    } else {
        grade = "F";
    }

    if (grade === "F") {
        status = "Failed";
    } else {
        status = "Passed";
    }

    result.innerHTML =
        "Student: " + studentName + "<br>" +
        "Total Score: " + totalScore + "<br>" +
        "Grade: " + grade + "<br>" +
        "Status: " + status;

    if (grade === "A") {
        result.innerHTML += "<br>Congratulations! You are eligible for a scholarship.";
    }

    console.log("Student:", studentName);
    console.log("Total Score:", totalScore);
    console.log("Grade:", grade);
    console.log("Status:", status);

}