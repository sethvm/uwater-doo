import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import uuidv4 from 'uuid/v4';                                               /*uuidv4() generates a random id*/

import './App.css';

const LOCAL_STORAGE_KEY = 'uWater.doo'

function App() {
    const [todos, setTasks] = useState([])                                  /*destructured array, todos is an item in array; setTasks is function called to modify array*/
    const taskNameRef = useRef()

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))     /*convert stored array back into string*/
        if (storedTasks) setTasks(storedTasks)
    }, [])

    useEffect(() => {                                                       /*saces task list to local storage*/
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))      /*store array as a string*/
    }, [todos])

    function toggleTask(id) {
        const newTasks = [...todos]                                         /*NEVER DIRECTLY MODIFY STATE VARIABLE; CREATE COPY FIRST*/
        const todo = newTasks.find(todo => todo.id === id)
        todo.complete = !todo.complete
        setTasks(newTasks)                                                  /*update list*/
    }

    function addTask(event) {                                                   /*called when Add Task button is clicked*/
        const name = taskNameRef.current.value                              /*text currently in field*/
        if (name === '') return                                             /*return if text field was empty*/
        setTasks(prevTasks => {
            return [...prevTasks, {id: uuidv4(), name: name, complete: false}]
        })
        taskNameRef.current.value = null                                    /*clear name after Add Task button is pressed*/
    }

    function enterPressed(event) {                                          /*calls addTask when Enter Key is pressed*/
        var code = event.keyCode || event.which
        if (code === 13) addTask(event)
        return
    }

    function handleClearTasks(event) {                                      /*called when Remove Complete button is clicked*/
        const newTasks = todos.filter (todo => !todo.complete)              /*create new array consisting of incomplete items*/
        setTasks(newTasks)                                                  /*update list*/
    }

    return (
        <div className='container'>
            <>
            <div className='title'><strong>uWater-doo</strong></div>
            <div className='list'>
                <TodoList tasks={todos} toggleTask={toggleTask}/>
            </div>               
            <input className='input_field' ref={taskNameRef} type='text' onKeyPress={enterPressed} />
            <button className='button blue' onClick={addTask}>
                Add Task
            </button>
            <button className='button red' onClick={handleClearTasks}>
                Remove Selected
            </button>
            <div><strong>{todos.filter(todo => !todo.complete).length}</strong> tasks left to do</div>
            </>
        </div>
    );
}

export default App;
