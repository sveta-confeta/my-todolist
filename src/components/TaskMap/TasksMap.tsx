import React from 'react';
import s from "../../Todolist.module.css";

import {AppRootStateType} from "../../redux/redux-store";
import {Task} from "./Task";
import {useSelector} from "react-redux";
import {ItemType, TaskStatuses} from "../../api/ todolist-api";

type TasksMapPropsType = {
    // tasks:Array<TasksType> //будем делать через Redux
    // removeTask: (id: string, todolistID: string) => void
    // chengeCheckBoxStatus: (todolistID:string,id:string,value:boolean) => void
    filter:string
    todolistID: string//это то что нам нужно чтобы идентифицировать тодолист

    // apdateTask: (title: string, todolistID: string, taskID: string) => void
}

export const TasksMap = React.memo(({ todolistID,filter}: TasksMapPropsType) => {
    const tasks = useSelector<AppRootStateType, Array<ItemType>>(state => state.tasks[todolistID]); //filter возращает массив-а нам нужен 1 обьект в массиве
    let tasksFilter = tasks;

    if (filter === 'Active') {

        tasksFilter = tasks.filter(f => f.status===TaskStatuses.New); //в массив данных записывается профильтрованный массив данных и он уходит в тудулист по пропсам
    }
    if (filter === 'Completed') { //выполненные таски

        tasksFilter = tasks.filter(f => f.status===TaskStatuses.Completed); //true значит,выполненные
    }

    return (
        //MaterialUI использует под капотом React.memo -только нет useCallback/нужно оборачивать
        <ul className={s.todolist_tasks}>
            {tasksFilter.map ( el => <li key={el.id}>
                <Task taskID={el.id} todolistID={todolistID}/>
            </li>)}

        </ul>
    );
});

