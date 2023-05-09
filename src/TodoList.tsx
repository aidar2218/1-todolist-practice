import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import {FilterValuesType} from "./App";
import s from "./TodoList.module.css";

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
    changeTaskStatus: (id: string, isDone: boolean) => void
    filter: FilterValuesType
}

export const TodoList = (props: PropsType) => {
    const [title, setTitle] = useState("");
    const [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if(event.key === "Enter") {
            addTask();
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
                       className={error ? s.error : ""}
                />
                <button onClick={addTask}>+</button>
                {error && <div className={s.errorMessage}>{error}</div>}
            </div>
            <ul>
                { props.tasks.map((task) => {
                    const onClickHandler = () => props.removerTask(task.id);
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(task.id, newIsDoneValue);
                    }

                    return (
                        <li key={task.id} className={task.isDone ? s.isDone : ""}>
                            <input type="checkbox"
                                   checked={task.isDone}
                                   onChange={onChangeHandler}/>
                            <span>{ task.title }</span>
                            <button onClick={onClickHandler}>x</button>
                        </li>
                    )
                } ) }
            </ul>
            <div>
                <button className={props.filter === "all" ? s.activeFilter : ""}
                        onClick={onAllClickHandler}>All</button>
                <button className={props.filter === "active" ? s.activeFilter : ""}
                        onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === "completed" ? s.activeFilter : ""}
                        onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}