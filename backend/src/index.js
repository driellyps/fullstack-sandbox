const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

const PORT = 3001

let todoList = {
  '0000000001': {
    id: '0000000001',
    title: 'First List',
    todos: [{
      task: 'First todo of first list!',
      completed: true,
      dueDate: '2022-06-02'
    }],
  },
  '0000000002': {
    id: '0000000002',
    title: 'Second List',
    todos: [{
      task: 'First todo of second list!',
      completed: false,
      dueDate: '2022-06-24'
    }],
  },
}

app.get('/lists', (req, res) => res.send(todoList))

app.put('/lists/:id', (req, res) => {
  const listIdToBeUpdated = req.params.id
  const updatedTasks = req.body

  if(!listIdToBeUpdated || !updatedTasks) {
    res.sendStatus(400)
  } else {
    todoList[listIdToBeUpdated].todos = updatedTasks
    console.log('updatedList', todoList[listIdToBeUpdated])
    res.sendStatus(200)
  }
})

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(PORT, () => console.log(`Todo lists app is running on ${PORT}!`))
