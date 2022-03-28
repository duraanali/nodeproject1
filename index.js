const express = require('express');
const students = require('./model')

const server = express();

server.use(express.json())

// Get Endpoint - READ
server.get('/', (req, res) => {
    res.json("HELLO FROM EXPRESS")
})


// Get all students
server.get('/api/students', (req, res) => {
    students.findAll()
        .then(students => {
            res.json(students)
        })
        .catch(() => {
            req.status(500).json({ message: "could not find the students"})
        })
})

// Get one student

server.get('/api/students/:id', (req, res) => {
    let {id} = req.params // params = URL
   
    students.findById(id)
        .then(student => {
            console.log(student)
            if(student == null) {
                res.status(404).json({ message: `student ${id} not found!`})
            } else {
                res.json(student)
            }
        })
        .catch(() => {
            req.status(500).json({ message: "could not find the student"})
        })
})


// POST

server.post('/api/students', (req, res) => {
    let body = req.body
    console.log(body)
    if(!body.name) {
        res.status(500).json({ message: 'name is required'})
    } else {
        students.add_student(body)
            .then(student => {
                res.status(200).json(student)
            })
            .catch(() => {
                res.status(500).json({message: "could not create student!"})
            })

    }
})

// UPDATE - PUT

server.put('/api/students/:id', async (req, res) => {
    let { id } = req.params;
        
    try{
        
        let body = req.body;
        let newStudent = await students.update(id, body);
        console.log("update2", newStudent)
        if (newStudent === null) {
            res.status(404).json({ message: "student not found"})
            return
        } else {
            res.status(200).json(newStudent)
        }
    }
    catch {
        res.status(500).json({ message: "could not update student"})
    }
})


// DELETE

server.delete('/api/students/:id', (req, res) => {
    let {id } = req.params

    students.deleteStudent(id)
        .then(student => {
            res.status(200).json(student)
        })
        .catch(() => {
            console.log("COULD NOT DELETE STUDENT")
        })
})


const PORT = 4000;

server.listen(PORT, () => {
    console.log("SERVER STARTED")
})