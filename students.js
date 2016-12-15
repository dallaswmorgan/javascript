
function Student(fName, lName) {
  this.fName = fName;
  this.lName = lName;
  this.courses = [];
}

Student.prototype.name = function() {
  return `${this.fName} ${this.lName}`;
};

Student.prototype.courses = function() {
  return this.courses;
};

Student.prototype.enroll = function(course) {
  if (this.hasConflict(course)) {
    throw "This course conflicts with your courses.";
  }
  else if (!this.courses.includes(course)) {
    this.courses.push(course);
    course.students.push(this);
  }
};

Student.prototype.courseLoad = function() {
  let courseLoad = {};
  this.courses.forEach(course => {
    if (courseLoad[course.dept] === undefined) {
      courseLoad[course.dept] = course.numCredits;
    }
    else {
      courseLoad[course.dept] += course.numCredits;
    }
  });
  return courseLoad;
};

Student.prototype.hasConflict = function(newCourse) {
  return this.courses.some(course => course.conflictsWith(newCourse));
};

function Course (name, dept, numCredits, days, block) {
  this.name = name;
  this.dept = dept;
  this.numCredits = numCredits;
  this.students = [];
  this.days = days;
  this.block = block;
}

Course.prototype.students = function() {
  return this.students;
};

Course.prototype.addStudent = function(student) {
  student.enroll(this);
  // this.students.push(student);
};

Course.prototype.conflictsWith = function(course2) {
  return (course2.days.some(day => this.days.includes(day)) && course2.block === this.block);
};

let joe = new Student("joe","thomas");
let dallas = new Student("dallas","morgan");

let aa = new Course("app academy", "coding", 5000, ['mon', 'tues'], 1);
let hack = new Course("hack reactor", "coding", 50, ['mon', 'tues'], 2);

aa.addStudent(joe);
hack.addStudent(joe);
// console.log(joe.courses);
console.log(aa.students);
