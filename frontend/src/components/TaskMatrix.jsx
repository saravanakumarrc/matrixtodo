import React, { Component } from 'react';
import _ from 'lodash';
import TaskGroup from './TaskGroup';
import { getTasks } from "../services/TaskServices";
import { getTaskGroups } from "../services/TaskGroupServices";
import { getLabels } from "../services/LabelServices";

class TaskMatrix extends Component {
    state = {
        tasks: [],
        labels: [],
        taskGroups: [],
        draggingTask: {}
    };

    componentDidMount() {    
        this.setState({ tasks: getTasks(), labels: getLabels(), taskGroups: getTaskGroups() });
    }

    getTasks(taskGroup){
        return _.filter(this.state.tasks, (task) => task.taskGroup.id === taskGroup.id);
    }

    handleTaskCompleted = ({ taskId }) => {
        this.setState({ tasks: _.reject(this.state.tasks, { taskId })} ) ;
        //TODO: service call
    }

    handleTaskRemoved = ({ taskId }) => {
        this.setState({ tasks: _.reject(this.state.tasks, { taskId })} ) ;
        //TODO: service call
    }

    handleDragStarted = (ev, task) => {
        console.log('draggingTask', task);
        if(task){
            this.setState({ draggingTask: task });
        }        
        //TODO: service call
    }

    handleDragOver = (e, task) => {
        e.preventDefault();
    }

    handleDragEnter = (e, task) => {
        e.preventDefault();
    }

    handleDrop = (e, taskGroup) => {
        console.log('droppingTaskGroup', taskGroup);
    }

    handleDropOnTask = (e, droppedOnTask) => {
        console.log('droppedOnTask', droppedOnTask);
    }

    render() { 
        const {taskGroups, tasks, labels } = this.state;

        return (      
            <React.Fragment>
                {
                    taskGroups.map((taskGroup) => {
                        return <TaskGroup   key={taskGroup.id} 
                                            className={taskGroup.id} 
                                            taskGroup={taskGroup} 
                                            tasks={tasks} 
                                            labels={labels} 
                                            onTaskCompleted={this.handleTaskCompleted}
                                            onTaskRemoved={this.handleTaskRemoved}
                                            onDragStart={this.handleDragStarted}
                                            onDragOver={this.handleDragOver}
                                            onDrop={this.handleDrop}
                                            onDropTask={this.handleDropOnTask}
                                            onDragEnter={this.handleDragEnter}
                                            />
                    })
                }
            </React.Fragment>   
        );
    }
}
 
export default TaskMatrix;