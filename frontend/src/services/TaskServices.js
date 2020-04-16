//import Tasks from '../data/Tasks';
import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/tasks";

function taskUrl(id) {
    return `${apiEndpoint}/${id}`;
}

export function getTasks() {
    return http.get(apiEndpoint);
}

export function saveTask(task) {   
    if (task.id) {
      return http.put(taskUrl(task.id), task);
    }  
    return http.post(apiEndpoint, task);
}

export function deleteTask(task) {
    return http.delete(taskUrl(task.id));
}

export function updateTasks(tasks) {   
    return http.put(apiEndpoint, tasks);
}