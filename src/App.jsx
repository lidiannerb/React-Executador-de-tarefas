import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Header from "./components/Header";
import TaskDetails from "./components/TaskDetails";
import "./App.css";


const App = () => {
  const [ tasks, setTasks ] = useState([
    {
      id: "1",
      title: "Estudar programação",
      completed: false,
    },
    {
      id: "2",
      title: "Ler livros",
      completed: true,
    }, 
  ]);

  // este useEfect executa sua função sempre que uma variável muda
  useEffect(() => {
    const fetchTasks = async () => {
      const { data } = await axios.get("https://jsonplaceholder.cypress.io/todos?_limit=10"
      );
       setTasks(data);
    };

    fetchTasks();

  }, []); //sempre que essa tasks mudar, ele vai executar o código do seu escopo

  const handleTaskClick = (taskId) => {
    const newTasks = tasks.map(task => {
      if(task.id === taskId) return {...task, completed: !task.completed}

      return task;
    });

    setTasks(newTasks)
  };
  
  /* a const abaixo vai adicionar as tasks no useState acima, quando passarmos ele para o AddTask lá embaixo*/

  const handleTaskAddition = (taskTitle) => {    
    const newTasks = [ 
      ...tasks, 
      {
        title: taskTitle,
        id: uuidv4(),
        completed: false,
      },
    ];

    setTasks(newTasks);
  };

  const handleTaskDeletion = (taskId) => {
    const newTasks = tasks.filter(task => task.id !== taskId)
    setTasks(newTasks);
  };

  return (
    <Router>
      <div className="container">
        <Header />
        <Switch>
          <Route path="/" exact render={() => (
            <>
              <AddTask handleTaskAddition={handleTaskAddition} />
              <Tasks 
                tasks={tasks} 
                handleTaskClick={handleTaskClick} 
                handleTaskDeletion={handleTaskDeletion}
              />
            </>
          )}
          />  
          <Route path="/:taskTitle" exact component={TaskDetails} />
        </Switch>
      </div> 
    </Router>
  );    
};

export default App;