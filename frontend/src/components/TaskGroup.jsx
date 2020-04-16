import React, { Component } from 'react';
import _ from 'lodash';
import './TaskGroup.scss';

import TaskGroupHeader from './TaskGroupHeader';
import Task from './Task';
import TaskEditor from './TaskEditor';
import TaskGroupFooter from './TaskGroupFooter';
import { convertToHours } from '../utilities/TimeUtility';
import EditingTask from '../models/EditingTask';

class TaskGroup extends Component {
    render() { 
        const { tasks, taskGroup, onTaskCompleted, onTaskSaved, onTaskRemoved, onDragStart, onDragOver, onDrop, onDropTask, onDragEnter } = this.props;
        const numberOfTasks = tasks.length;
        const totalEstimate = _.sumBy(tasks, (task) => task.estimate);
        const hoursRequired = convertToHours(totalEstimate);
        const editingTask = new EditingTask(taskGroup.id);
        return ( 
            <article className="task-group droppable" onDragEnter={(e)=> onDragOver(e)} onDragOver={(e)=> onDragOver(e)} onDrop={(e)=>{ onDrop(e, taskGroup)}}>
                <TaskGroupHeader name={this.props.taskGroup.name} id={this.props.taskGroup.id} />
                { 
                    tasks.map((task) => {
                        return <Task   key={task.id} 
                                task={task} 
                                onTaskCompleted={onTaskCompleted}
                                onTaskRemoved={onTaskRemoved}
                                onDragStart={onDragStart}
                                onDropTask={onDropTask}
                                onDragOver={onDragOver}
                                onDragEnter={onDragEnter} />
                    })
                }
                <TaskEditor task={editingTask} onTaskSaved={onTaskSaved} />
                <TaskGroupFooter numberOfTasks={numberOfTasks} hoursRequired={hoursRequired} />
            </article>
        );
    }
}
 
export default TaskGroup;