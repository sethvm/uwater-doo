import React from 'react';

function Task({ todo, toggleTask }) {

    function handleTaskClick() {                        /*calls toggleTask from App.js*/
        toggleTask(todo.id)
    }

    return (
        <div>
            <label>
                <input type='checkbox' 
                checked={todo.complete} 
                onChange={handleTaskClick}/>
                {todo.name}
            </label>
        </div>
    );
}

export default Task;
