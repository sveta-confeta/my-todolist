import {v1} from "uuid";
import {
    AllTodolistsType, disabledStatusTodolistAC,
    filteredTaskAC, titleTodolistThunkCreator, todolistAddThunkCreator, todolistDeleteThunkCreator,
    TodolistReducer, todolistsThunk
} from "./todolistsReducer";
import {RequestStatusType} from "./appReducer";

let  todolistID_1: string; //вынесем переменные глобально.чтоб их видели тесты
let  todolistID_2: string;
let startState: Array<AllTodolistsType>;
///////// вынесем наши стартовые данные  наверх.они одинаковые для каждого теста
beforeEach(() => {
    todolistID_1 = v1();
    todolistID_2= v1();
    startState = [
        {id:  todolistID_1, title: "What to learn", filter: "All",addedDate:'',order:1, disabledStatus:'failed'},
        {id:  todolistID_2, title: "What to buy", filter: "All",addedDate:'',order:2,disabledStatus:'failed'}
    ]
});

test('FILTERED-TASK', ()=>{

    let newFilter='Completed';

    const endState=TodolistReducer(startState,filteredTaskAC({todolistID:todolistID_1,value:newFilter}));

    expect(endState[0].filter).toBe(newFilter);
    expect(endState[1].filter).toBe( 'All');
})

test('REMOVE-TODOLIST', ()=>{

    const endState=TodolistReducer(startState,todolistDeleteThunkCreator.fulfilled({todolistID:todolistID_1}, '',todolistID_1 ));

    expect(endState.length).toBe(1);
})

test('TITLE-TODOLIST', ()=>{

    let newTitle='What to watch TV';

    const endState=TodolistReducer(startState,titleTodolistThunkCreator.fulfilled({todolistID:todolistID_1,title:newTitle},'',{todolistID:todolistID_1,title:newTitle},));

    expect(endState[0].title).toBe(newTitle);
    expect(endState[1].title).toBe(   "What to buy");
})

test('ADD-TODOLIST', ()=>{


    let item= {
        "id": '3',
        "title": 'REACT',
        "addedDate": '',
        "order": 4,
    }


    const endState=TodolistReducer(startState,(todolistAddThunkCreator.fulfilled({item},'',item.title)));

     expect(endState[0].title).toBe('REACT');
    expect(endState.length).toBe(  3);

})
test('GET-TODOLIST', ()=>{ //добавление тодолистов из api
//но когда мы создаем тодолисты -мы должны создать место для тасок в новосозданных тудулистах
    let todolists={todolists:startState};//тодолисты возьмем из startState как будто мы из получили из сервера


    const endState=TodolistReducer(startState,todolistsThunk.fulfilled(todolists,''));//ecли параметров нет то нету и второго todolists в конце

    expect(endState[0].order).toBe(1);
    expect(endState.length).toBe(  2);

})
test('disabled status', ()=>{ //дисэйблим кнопки во время запроса
//но когда мы создаем тодолисты -мы должны создать место для тасок в новосозданных тудулистах
    let newStatus:RequestStatusType='loading';


    const endState=TodolistReducer(startState, disabledStatusTodolistAC({todolistID: todolistID_1,disabledStatus:newStatus}));

    expect(endState[0].disabledStatus).toBe('loading');
    expect(endState[1].disabledStatus).toBe('failed');

})