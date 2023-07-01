import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const TodoList = (props: TodoListPropsType) => {

    let [taskTitle, setTaskTitle] = useState("");

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value);
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter") {
            props.addTask(taskTitle);
            setTaskTitle("");
        }
    };

    const onAllClickHandler = () => {
        props.changeFilter("all");
    };
    const onActiveClickHandler = () => {
        props.changeFilter("active");
    };
    const onCompletedClickHandler = () => {
        props.changeFilter("completed");
    };

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={taskTitle}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                />
                <button onClick={() => {
                    if (taskTitle.trim() !== "") {
                        props.addTask(taskTitle);
                        setTaskTitle("");
                    }
                }}>+
                </button>
            </div>
            <ul>
                {props.tasks.map((task, index) => {

                    const removeTaskHandler = () => {
                        props.removeTask(task.id);
                    }

                    return (
                        <li key={index}>
                            <input type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span>
                            <button onClick={removeTaskHandler}>X
                            </button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
}