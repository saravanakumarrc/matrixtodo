import React, { Component } from 'react';
import './Task.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'


class Task extends Component {
    render() { 
        const { task, onTaskCompleted, onTaskRemoved, onDragStart, onDragOver, onDropTask, onDragEnter} = this.props;
        return ( 
            <div className="task task-content draggable droppable" 
                onDragEnter={(e)=> onDragEnter(e, task)} 
                draggable onDragStart={(e)=> onDragStart(e, task)} 
                droppable="true" onDragOver={(e)=> onDragOver(e, task)} 
                onDrop={(e)=>{ onDropTask(e, task)}}>
                <input type="checkbox" value="completed" onChange={ () => onTaskCompleted(task) }></input>
                <label className="task-description">{ task.description }</label>
                <FontAwesomeIcon className="task-delete" icon={faTrashAlt} onClick={() => onTaskRemoved(task)} />
            </div>
         );
    }
}
 
export default Task;