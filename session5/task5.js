class Person {
  #email;
  #id;

  constructor(name, email, id) {
    this.name = name;
    this.email = email;
    this.id = id;
  }

  get email() {
    return this.#email;
  }

  set email(value) {
    if (value.includes("@")) {
      this.#email = value;
    } else {
      console.log("Invalid Email");
    }
  }

  get id() {
    return this.#id;
  }

  set id(value) {
    if (value > 0) {
      this.#id = value;
    } else {
      console.log("Invalid ID");
    }
  }

  describeRole() {
    console.log("School Member");
  }
}

class Principal extends Person {
  constructor(name, email, id) {
    super(name, email, id);
    this.members = [];
  }

  addMember(member) {
    this.members.push(member);
    console.log(`${member.name} added successfully.`);
  }

  removeMember(id) {
    this.members = this.members.filter(member => member.id !== id);
    console.log(`Member with ID ${id} removed.`);
  }

  listMembers() {
    console.log("School Members:");
    this.members.forEach(member => {
      console.log(`${member.name} - ${member.constructor.name}`);
    });
  }

  describeRole() {
    console.log(`${this.name} is the Principal.`);
  }
}

class Teacher extends Person {
  constructor(name, email, id, subject) {
    super(name, email, id);
    this.subject = subject;
    this.grades = [];
  }

  gradeStudent(studentName, grade) {
    this.grades.push({ studentName, grade });
    console.log(`${studentName} received grade ${grade}`);
  }

  listGrades() {
    console.log("Students Grades:");
    this.grades.forEach(student => {
      console.log(`${student.studentName}: ${student.grade}`);
    });
  }

  describeRole() {
    console.log(`${this.name} teaches ${this.subject}.`);
  }
}

class Student extends Person {
  constructor(name, email, id) {
    super(name, email, id);
    this.subjects = [];
  }

  enroll(subject) {
    this.subjects.push(subject);
    console.log(`${this.name} enrolled in ${subject}`);
  }

  viewSubjects() {
    console.log(`${this.name}'s Subjects:`);
    this.subjects.forEach(subject => {
      console.log(subject);
    });
  }

  describeRole() {
    console.log(`${this.name} is a Student.`);
  }
}

const principal = new Principal("Ahmed", "ahmed@school.com", 1);
const teacher = new Teacher("Sara", "sara@school.com", 2, "Mathematics");
const student = new Student("Ali", "ali@student.com", 3);

principal.addMember(teacher);
principal.addMember(student);
principal.listMembers();

teacher.gradeStudent("Ali", 95);
teacher.gradeStudent("Omar", 88);
teacher.listGrades();

student.enroll("Mathematics");
student.enroll("Physics");
student.viewSubjects();

const schoolMembers = [principal, teacher, student];

schoolMembers.forEach(member => {
  member.describeRole();
});