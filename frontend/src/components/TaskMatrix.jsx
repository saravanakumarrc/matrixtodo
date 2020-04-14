import React, { Component } from 'react';
import _ from 'lodash';
import TaskGroup from './TaskGroup';
import { getTasks, saveTask, deleteTask } from "../services/TaskServices";
import { getTaskGroups } from "../services/TaskGroupServices";
import { getLabels } from "../services/LabelServices";

class TaskMatrix extends Component {
    state = {
        tasks: [],
        labels: [],
        taskGroups: [],
        draggingTask: {}
    };

    async componentDidMount() {    
        const { data: tasks } = await getTasks();
        this.setState({ tasks: tasks, labels: getLabels(), taskGroups: getTaskGroups() });
    }

    getTasksByTaskGroup(taskGroup){
        return _.filter(this.state.tasks, (task) => task.taskGroup === taskGroup && task.status !== 'completed');
    }

    getMaxTaskOrder(){
        return _.maxBy(this.state.tasks, (task) => task.order);
    }

    findIndexById(task){
       return _.findIndex(this.state.tasks, (t) => t.id === task.id);
    }

    saveTask(task){
        return saveTask(task).then((response) => {
            console.log('savedTask', response.data);
            let tasks = this.state.tasks;
            tasks.push(response.data);
            this.setState({ tasks: tasks });
        });
    }

    handleTaskCompleted = (task) => {
        task.status = 'completed';
        this.updateState(task);
        this.saveTask(task);
    }

    handleTaskSaved = (task) => {
        if(!task.id){
            const { order: maxOrder } = this.getMaxTaskOrder();
            task.order = maxOrder + 1;
        }
        return this.saveTask(task);
    }

    handleTaskRemoved = (task) => {
        this.setState({ tasks: _.reject(this.state.tasks, (t) => t.id === task.id)} ) ;
        deleteTask(task);
    }

    handleDragStarted = (ev, task) => {
        console.log('draggingTask', task);
        if(task){
            this.setState({ draggingTask: task });
        }
    }

    handleDragOver = (e, task) => {
        e.preventDefault();
    }

    handleDragEnter = (e, task) => {
        e.preventDefault();
    }

    handleDrop = (e, taskGroup) => {
        console.log('droppingTaskGroup', taskGroup);
        let draggingTask = this.state.draggingTask;
        if(draggingTask.taskGroup !== taskGroup.id){
            draggingTask.taskGroup = taskGroup.id;
            this.updateState(draggingTask);
            this.saveTask(draggingTask);

            var tasks = this.getTasksByTaskGroup(taskGroup);
            if(tasks.length){

            }
        }
    }

    handleDropOnTask = (e, droppedOnTask) => {
        console.log('droppedOnTask', droppedOnTask);
    }

    updateState(task) {
        const taskIndex = this.findIndexById(task);
        const tasks = this.state.tasks;
        tasks[taskIndex] = task;
        this.setState({ tasks: tasks });
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
                                            onTaskSaved={this.handleTaskSaved}
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