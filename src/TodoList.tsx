import React from "react";
import {FilterValuesType} from "./App";

type TaskType = {
    id:number,
    title: string,
    isDone: boolean
}

type PropsType = {
    title: string,
    tasks: Array<TaskType>,
    removerTask: (TaskId: number) => void,
    changeFilter: (value: FilterValuesType) => void
}

export const TodoList = (props: PropsType) => {
    return (
        <div>
            <h3>{ props.title }</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                { props.tasks.map((task: TaskType) => {
                    return (
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone}/>
                            <span>{ task.title }</span>
                            <button onClick={() => {
                                props.removerTask(task.id);
                            }}>x</button>
                        </li>
                    )
                } ) }
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}