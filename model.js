const {nanoid} = require('nanoid')

function getId() {
    return nanoid().slice(0, 5)
}

let students = [
    {id: getId(), name: "Mohamed Ali", school: "UofM", grade: 'A', age: 20},
    {id: getId(), name: "Abdirahman Yusuf", school: "Oxford", grade: 'B', age: 25},
    {id: getId(), name: "Ahmed Yusuf", school: "Oxford", grade: 'A', age: 27}
]

module.exports = {

// Get - Show all students
async findAll() {
    // SELECT * FROM students
    return students
},

// GET - One Student
async findById(id) {
    const student = students.find(oneStudent => oneStudent.id === id)
    return student
},

async add_student({ name, school, grade, age}) {
    const newStudent = { id: getId(), name, school,grade, age }

    students.push(newStudent)

    return newStudent
},

async update(id, changes) {
    console.log("UPDATE MODAL")
    console.log(id, changes)
    const student = students.find(student => student.id === id)
    console.log("STUDENT", student)
    const updatedStudent = {...changes, id} 

    students = students.map(student => (student.id ===id ) ? updatedStudent : student)

    return updatedStudent
},

async deleteStudent(id) {
    const student = students.find(student => student.id === id)

    students = students.filter(student => student.id !== id)

    return student
}

}