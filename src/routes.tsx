import React from 'react'
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Tasks from './pages/tasks';
import TasksDetail from './pages/tasks/Detail';
import TasksForm from './pages/tasks/Form';
export default function Routes() {
  return (
      <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/tarefas" exact component={Tasks}/>
          <Route path="/tarefas_cadastro" exact component={TasksForm}/>
          <Route path="/tarefas_cadastro/:id" exact component={TasksForm}/>
          <Route path="/tarefas/:id" exact component={TasksDetail}/>
      </Switch>
  )
}
