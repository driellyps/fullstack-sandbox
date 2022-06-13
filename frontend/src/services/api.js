import axios from 'axios'

const server = axios.create({
  baseURL: 'http://localhost:3001'
})

export const api = {}

api.getTodos = () => {
  return server.get('/lists').then((res) => res.data)
}

api.updateTodoList = (listId, todos) => {
  return server.put(`/lists/${listId}`, todos)
}