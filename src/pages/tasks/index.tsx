import React, { useEffect, useState } from 'react'
import { Badge, Button, Table } from 'react-bootstrap'
import './index.css'
import api from '../../service/api'
import { useHistory } from 'react-router-dom'
interface Task {
  id:number,
  title:string,
  description:string,
  isDone:boolean
}
export default function Tasks() : JSX.Element {
  const [tasks, setTasks] = useState<Array<Task>>([])
  const history = useHistory()
  useEffect(()=>{
    loadTasks()
  },[])
  async function loadTasks() : Promise<void> {
    const {data} = await api.get('/tasks')
    console.log(data)
    setTasks(data)
  }
  function newTask () : void {
    history.push('/tarefas_cadastro')
  }
  function editTask (id:number) {
    history.push(`/tarefas_cadastro/${id}`)
  }
  function viewTask (id:number) {
    history.push(`/tarefas/${id}`)
  }
  
  async function finishTask(id:number, task:Task) : Promise<void> {
    await api.put(`/tasks/${id}`, {
      id,
      title:task.title,
      description:task.description,
      isDone:true
    })  
    loadTasks()
  }
  async function deleteTask(id:number) : Promise<void> {
    await api.delete(`/tasks/${id}`)  
    loadTasks()
  }
  return (
    <div className="container">
      <br/>
      <div className="task-header">
      <h1>Tasks Page</h1>
      <Button variant="dark" size="sm" onClick={newTask}>Nova Tarefa</Button>
      </div>
      <br/>
      <Table striped bordered hover className="text-center">
      <thead>
        <tr>
          <th>Id</th>
          <th>Título</th>
          <th>Data de Atualização</th>
          <th>Status</th>
          <th>Açôes</th>
        </tr>
      </thead>
      <tbody>
        {
          tasks.map((task, i) => (
          <tr key={i}>
            <td>{task.id}</td>
            <td>{task.title}</td>
            <td>{task.description}</td>
            <td>{task.isDone ? (<Badge bg="success">Feito</Badge>) : (<Badge bg="danger">Pendente</Badge>)}</td>
            <td>
            <Button variant="primary" size="sm" onClick={() => editTask(task.id)} disabled={task.isDone} >Editar</Button>{' '}
            <Button variant="success" size="sm" onClick={() => finishTask(task.id, task)}>Finalizar</Button>{' '}
            <Button variant="info" size="sm" onClick={() => viewTask(task.id)}>Visualizar</Button>{' '}
            <Button variant="danger" size="sm" onClick={() => deleteTask(task.id)}>Remover</Button>{' '}
            </td>      
            </tr>
          ))
        }
      </tbody>
      </Table>
    </div>
  )
}
