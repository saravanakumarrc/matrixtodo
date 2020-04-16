import React, { Component } from 'react';
import _ from 'lodash';
import TaskGroup from './TaskGroup';
import { getTasks, saveTask, deleteTask } from "../services/TaskServices";
import { getTaskGroups } from "../services/TaskGroupServices";
import { getLabels } from "../services/LabelServices";
import { getSettings } from '../services/settingsService';

class TaskMatrix extends Component {
    state = {
        tasks: [],
        labels: [],
        taskGroups: [],
        draggingTask: {}
    };
    settings = getSettings();

    async componentDidMount() {    
        const { data: tasks } = await getTasks();
        this.setState({ tasks: tasks, labels: getLabels(), taskGroups: getTaskGroups() });
    }

    getTasksByTaskGroup(taskGroupId){
        return _.filter(this.state.tasks, (task) => task.taskGroup === taskGroupId && task.status !== 'completed');
    }

    getTasksByTaskGroupOrdered(taskGroupId){
        const filterdTasks = this.getTasksByTaskGroup(taskGroupId);
        return _.orderBy(filterdTasks, (task) => task.order);
    }

    getMaxTaskOrder(taskGroupId){
        const filterdTasks = this.getTasksByTaskGroup(taskGroupId);
        if(filterdTasks.length===0){
            return { order: 0};
        }
        return _.maxBy(filterdTasks, (task) => task.order);
    }

    findIndexById(task, tasks = this.state.tasks){
       return _.findIndex(tasks, (t) => t.id === task.id);
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
            const { order: maxOrder } = this.getMaxTaskOrder(task.taskGroup);
            task.order = maxOrder + 1;
            task.status = this.settings.defaultStatus;
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
            //this.updateState(draggingTask);
            //this.saveTask(draggingTask);

            var tasks = this.getTasksByTaskGroup(taskGroup.id);
            if(tasks.length){

            }
        }
    }

    handleDropOnTask = (e, droppedOnTask) => {
        console.log('droppedOnTask', droppedOnTask);
        let draggingTask = this.state.draggingTask;
        if(draggingTask.taskGroup === droppedOnTask.taskGroup){
            let rearrangedTasks = [];
            var tasks = this.getTasksByTaskGroupOrdered(droppedOnTask.taskGroup);
            if(draggingTask.order < droppedOnTask.order){
                const droppedTaskOrder = droppedOnTask.order;
                let startIndex = this.findIndexById(droppedOnTask, tasks);
                let endIndex = this.findIndexById(draggingTask, tasks);
                while(startIndex > endIndex){
                    tasks[startIndex].order = tasks[startIndex - 1].order;
                    rearrangedTasks.push(tasks[startIndex]);
                    startIndex--;
                }
                draggingTask.order = droppedTaskOrder;
                rearrangedTasks.push(draggingTask);
            } else if(draggingTask.order > droppedOnTask.order){
                const droppedTaskOrder = droppedOnTask.order;
                let startIndex = this.findIndexById(droppedOnTask, tasks);
                let endIndex = this.findIndexById(draggingTask, tasks);
                while(startIndex < endIndex){
                    tasks[startIndex].order = tasks[startIndex + 1].order;
                    rearrangedTasks.push(tasks[startIndex]);
                    startIndex++;
                }
                draggingTask.order = droppedTaskOrder;
                rearrangedTasks.push(draggingTask);
            }
            this.setState({ tasks: this.state.tasks });
            //this.updateStateOfRearranged(rearrangedTasks);
        }
    }

    updateStateOfRearranged(rearrangedTasks) {
        const tasks = this.state.tasks;
        rearrangedTasks.forEach(task => {
            const taskIndex = this.findIndexById(task);        
            tasks[taskIndex] = task;
        });
        this.setState({ tasks: tasks });
    }

    updateState(task) {
        const taskIndex = this.findIndexById(task);
        const tasks = this.state.tasks;
        tasks[taskIndex] = task;
        this.setState({ tasks: tasks });
    }

    render() { 
        const { taskGroups, labels } = this.state;

        return (      
            <React.Fragment>
                {
                    taskGroups.map((taskGroup) => {
                        return <TaskGroup   key={taskGroup.id} 
                                            className={taskGroup.id} 
                                            taskGroup={taskGroup} 
                                            tasks={this.getTasksByTaskGroupOrdered(taskGroup.id)} 
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