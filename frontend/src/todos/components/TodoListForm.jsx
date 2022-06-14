import React, { useEffect, useState } from 'react'
import { TextField, Card, CardContent, CardActions, Button, Typography, Checkbox } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const TodoListForm = ({ todoList, saveTodoList }) => {
  const [todos, setTodos] = useState(todoList.todos)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
   saveUpdatedList()
  }, [todos])

  const handleSubmit = (event) => {
    event.preventDefault()
    saveUpdatedList()
  }

  const saveUpdatedList = () => {
    sleep(1000).then(() => {
      saveTodoList(todoList.id, todos)
      setIsSaving(false)
    })
  }

  return (
    <Card sx={{ margin: '0 1rem' }}>
      <CardContent>
        <Typography component='h2'>{todoList.title}</Typography>
        <form
          onSubmit={(event) => {
            setIsSaving(true)
            handleSubmit(event)
          }}
          style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
        >
          {todos.map((todo, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ margin: '8px' }} variant='h6'>
                {index + 1}
              <Checkbox
                color='success'
                checked={todo.completed}
                title='Is task finished?'
                onChange={() => {
                  setIsSaving(true)
                  setTodos([ // immutable update
                    ...todos.slice(0, index),
                    { task: todo.task, completed: !todo.completed, dueDate: todo.dueDate },
                    ...todos.slice(index + 1)
                  ])
                  
                }}
              />          
              </Typography> 
              <TextField
                sx={{ 
                  flexGrow: 1, 
                  marginTop: '1rem', 
                  textDecoration: todo.completed && 'line-through #5C985C', 
                  background: todo.completed && '#5C985C15',
                  transition: 'background 0.3s'
                }}
                disabled={todo.completed}
                label='What to do?'
                value={todo.task}
                onChange={(event) => {
                  setIsSaving(true)
                  setTodos([
                    // immutable update
                    ...todos.slice(0, index),
                    { task: event.target.value, completed: todo.completed, dueDate: todo.dueDate },
                    ...todos.slice(index + 1),
                  ])
                }}
              />
              <Button
                sx={{ margin: '8px' }}
                size='small'
                color='secondary'
                onClick={() => {
                  setIsSaving(true)
                  setTodos([
                    // immutable delete
                    ...todos.slice(0, index),
                    ...todos.slice(index + 1),
                  ])
                }}
              >
                <DeleteIcon />
              </Button>
            </div>
          ))}
          <CardActions>
            <Button
              type='button'
              color='primary'
              onClick={() => {
                setTodos([...todos, { task: '', completed: false, dueDate: '' }])
              }}
            >
              Add Todo <AddIcon />
            </Button>
            <Button type='submit' variant='contained' color='primary' disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save'}
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}
