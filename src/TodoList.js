import React from 'react';
import Task from './Task';

function TodoList({ tasks, toggleTask }) {
    return (
        tasks.map(todo => {                     /*loop; output array*/
            return <Task key={todo.id}          /*item component*/
            toggleTask={toggleTask} 
            todo={todo} />
        })
    );
}

export default TodoList;
