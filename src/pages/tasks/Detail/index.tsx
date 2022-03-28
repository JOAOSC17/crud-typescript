import React, { useEffect, useState } from 'react'
import { Badge, Button, Card } from 'react-bootstrap'
import { useHistory, useParams } from 'react-router-dom'
import api from '../../../service/api'
interface ITask {
    title:string,
    description:string,
    isDone:boolean
  }
export default function TasksDetail() {
    const [task, setTask] = useState<ITask>()
    const { id } = useParams<{id: string}>()
    const history = useHistory()
    
    useEffect(()=>{
        if(id){
            findTask(id)
        }
    },[id])
    async function findTask (id:string) : Promise<void>{
        const { data } = await api.get<ITask>(`/tasks/${id}`)
        setTask(data)
      }
    function back (){
        history.goBack()
    }
  return (
      <div className="container">
          <br/>
          <div className="task-header">
              <h1>Task Detail</h1>
            <Button variant="dark" size="sm" onClick={back}>Voltar</Button>
          </div>
          <br/>
          <Card>
            <Card.Body>
                <Card.Title>{task?.title}</Card.Title>
                <br/>
                <Card.Text>{task?.description}</Card.Text>
                <br/>
                {task?.isDone ? (<Badge bg="success">Feito</Badge>) : (<Badge bg="danger">Pendente</Badge>)}
            </Card.Body>
        </Card>
      </div>
  )
}
