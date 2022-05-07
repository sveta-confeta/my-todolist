import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox} from "@mui/material";
import EditSpan from "../EditSpan/EditSpan";
import {ButtonForm} from "../Button";
import {useDispatch, useSelector} from "react-redux";
import {apdateTaskAC, chengeCheckBoxStatusAC, removeTaskAC} from "../../reducers/tasksReducer";
import {AppRootStateType} from "../../redux/redux-store";
import {AllTodolistsType} from "../../reducers/todolistsReducer";
import {ItemType, TaskStatuses} from "../../api/ todolist-api";
import s from './../../Todolist.module.css'

type TaskPropsType={
    // changeTaskStatus: (id: string,newIsDoneValue: boolean,todolistID:string) => void
    todolistID:string
    // apdateTaskTitle:(todolistsID:string,taskID:string,title:string)=>void
    // removeTask: (mID: string,todolistID:string) => void//функция удаления
    // task:TaskType //то что мапится приходит из тасок, cдесь один обьект из тасок.т есть одна таска
    taskID:string
}

export const Task = (props:TaskPropsType) => {
    // const todolist=useSelector<AppRootStateType,AllTodolistsType[]>(state=> state.todolists.filter(f=>f.id ==props.todolistID)[0])
    const todolist=useSelector<AppRootStateType,AllTodolistsType>(state=> state.todolists.filter(f=> f.id===props.todolistID)[0])
    const tasks=useSelector<AppRootStateType,ItemType>(state=> state.tasks[props.todolistID].filter(f=> f.id==props.taskID)[0])
    const dispatch = useDispatch();

    const callbackApdateTask = useCallback((elID: string, title: string) => {
        dispatch(apdateTaskAC(props.todolistID,elID, title))
    }, [dispatch, apdateTaskAC,props.todolistID])

    const removeTaskHandler = useCallback((tId: string) => {
        dispatch(removeTaskAC(props.todolistID,tId))
    }, [dispatch,removeTaskAC,props.todolistID])

const checkedHandler=(event:ChangeEvent<HTMLInputElement>)=>{    //!!!!!!!!!!!!!!
    let doneValue= event.currentTarget.checked; //в чекед сидит либо тру либо фолз
    onChangeCheckbox(tasks.id, doneValue ? TaskStatuses.Completed :TaskStatuses.New)
}
    const onChangeCheckbox = useCallback((elID: string, status:TaskStatuses) => {

        dispatch(chengeCheckBoxStatusAC(props.todolistID,elID, status))
    }, [dispatch,chengeCheckBoxStatusAC,props.todolistID])
    return (
        <div>
            <Checkbox color="success" checked={tasks.status===TaskStatuses.Completed}//было tasks.isDone
                      onChange={checkedHandler}/>
            {/*<span>{el.task}</span> так было */}
            <span className={tasks.status===TaskStatuses.Completed ? s.isDone : s.notDone}>
                <EditSpan title={tasks.title} apdateTask={(title: string) => callbackApdateTask(tasks.id, title)}/>
                {/*<button onClick={() => props.removeTask(el.id)}>x</button>*/}
                <ButtonForm name={'x'} callback={() => removeTaskHandler(tasks.id)}/>
                    </span>
        </div>
    );
};
