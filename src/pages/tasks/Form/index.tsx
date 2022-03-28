import React, { ChangeEvent, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import '../index.css'
import api from '../../../service/api'
import { useHistory, useParams } from 'react-router-dom'
interface ITask {
  title:string,
  description:string,
  isDone:boolean
}
export default function TasksForm () : JSX.Element {
    const [model, setModel] = useState<ITask>({
        title:'',
        description:'',
        isDone:false
    })
    const { id } = useParams<{id: string}>()
    useEffect(()=>{
        if(id!==undefined){
            findTask(id)
        }
    },[id])
    const history = useHistory()
    function updateRow (e: ChangeEvent<HTMLInputElement>) :void {
        setModel({
            ...model,
            [e.target.name]: e.target.value
        })
    }
    async function findTask (id:string) : Promise<void>{
      const {data} = await api.get(`/tasks/${id}`)
        setModel({
            title:data.title,
            description:data.description,
            isDone:data.isDone
        })
    }
    async function onSubmit (e: ChangeEvent<HTMLFormElement>) : Promise<void> {
        e.preventDefault();
        if(id){
            await api.put(`/tasks/${id}`, model)
        } else {
            await api.post('/tasks', model) 
        }
        back()   
    }
    function back (){
        history.goBack()
    }
    return(
    <div className="container">
        <br/>
            <div className="task-header">
            <h1>Tasks Page</h1>
            <Button variant="dark" size="sm" onClick={back}>Voltar</Button>
            </div>
        <br/>
        <div className="container">
        <Form onSubmit={onSubmit}>
            <Form.Group>
                <Form.Label>Título</Form.Label>
                <Form.Control type="text" name="title" value={model.title} onChange={(e: ChangeEvent<HTMLInputElement>) => updateRow(e)}/>
            </Form.Group>

            <Form.Group>
                <Form.Label>Descrição</Form.Label>
                <Form.Control as="textarea" rows={3} name="description" value={model.description} onChange={(e: ChangeEvent<HTMLInputElement>) => updateRow(e)}/>
            </Form.Group>
            <Button variant="dark" type="submit">
                Salvar
            </Button>
        </Form>
        </div>
    </div>
    )
}