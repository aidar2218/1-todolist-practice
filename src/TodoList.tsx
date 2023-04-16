import React, {ChangeEvent, KeyboardEvent, useState} from 'react'

import {FilterValuesType} from "./App";

type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removerTask: (TaskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export const TodoList = (props: PropsType) => {
    let [title, setTitle] = useState("")

    const addTask = () => {
        props.addTask(title)
        setTitle("");
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.key === "Enter") {
            addTask()
        }
    }

    const onAllClickHandler = () => {
        props.changeFilter("all")
    }

    const onActiveClickHandler = () => {
        props.changeFilter("active")
    }

    const onCompletedClickHandler = () => {
        props.changeFilter("completed")
    }



    return (
        <div>
            <h3>{ props.title }</h3>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                { props.tasks.map((task) => {
                    const onClickHandler = () => props.removerTask(task.id)

                    return (
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone}/>
                            <span>{ task.title }</span>
                            <button onClick={onClickHandler}>x</button>
                        </li>
                    )
                } ) }
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}