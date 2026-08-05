import { students } from "../data/students.js";
import { calculateAverage } from "./calculateAverage.js";

export function filterPassed() {
  console.log("Passed Students:");

  students.forEach(student => {
    const average = calculateAverage(student.grades);

    if (average >= 60) {
      console.log(`${student.name} - ${average}`);
    }
  });
}