export default function EditingTask(taskGroup, id = null, description = '', estimate = 0, label='', order=0, status = '') {
    this.id = id;
    this.description = description;
    this.estimate = estimate;
    this.label = label;
    this.order = order;
    this.taskGroup = taskGroup;
    this.status = status;
}