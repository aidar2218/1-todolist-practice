import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"

function App() {
    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ]);

    let addTask = (title: string) => {
        let task = {id: v1(), title: title, isDone: false};
        let newTasks = [task, ...tasks];
        setTasks(newTasks);
    }

    function removerTask(id: string) {
        // @ts-ignore
        let filteredTasks = tasks.filter(task => task.id !== id)
        setTasks(filteredTasks);
    }

    let [filter, setFilter] = useState<FilterValuesType>("all");

    let tasksForTodoList = tasks;

    if (filter === "active") {
        tasksForTodoList = tasks.filter(task => task.isDone === false)
    }
    if (filter === "completed") {
        tasksForTodoList = tasks.filter(task => task.isDone === true)
    }

    function changeFilter (value: FilterValuesType) {
        setFilter(value);
    }

    return (
        <div className="App">
            <TodoList title = "What to learn"
                      tasks = {tasksForTodoList}
                      removerTask = {removerTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
            />
        </div>
    );
}

export default App;
