import TaskLabel from './TaskLabel';
import TaskGroups from './TaskGroups';

const [ q1, q2, q3, q4 ] = TaskGroups;

let tasks = [
    {
        taskId: 1,
        description: "Building the todo app",
        estimate: 30,
        label: TaskLabel.continousLearning,
        order: 1,
        taskGroup: q1,
        createdOn: new Date()
    },
    {
        taskId: 2,
        description: "Prepare the cover letter",
        estimate: 40,
        label: "React & Node",
        order: 2,
        taskGroup: q1,
        createdOn: new Date()
    },
    {
        taskId: 3,
        description: "Improve the resume",
        estimate: 50,
        label: "React & Node",
        order: 3,
        taskGroup: q1,
        createdOn: new Date()
    },
    {
        taskId: 4,
        description: "Pay the current bill",
        estimate: 35,
        label: "React & Node",
        order: 4,
        taskGroup: q1,
        createdOn: new Date()
    },
    {
        taskId: 5,
        description: "Meet the dietician",
        estimate: 30,
        label: "React & Node",
        order: 5,
        taskGroup: q1,
        createdOn: new Date()
    },
    {
        taskId: 6,
        description: "Do a mini project on Sass",
        estimate: 38,
        label: "React & Node",
        order: 6,
        taskGroup: q1,
        createdOn: new Date()
    },
    {
        taskId: 7,
        description: "Read the back",
        estimate: 30,
        label: "React & Node",
        order: 1,
        taskGroup: q2,
        createdOn: new Date()
    },
    {
        taskId: 8,
        description: "Read the English converstaion practise book",
        estimate: 30,
        label: "React & Node",
        order: 2,
        taskGroup: q2,
        createdOn: new Date()
    },
    {
        taskId: 9,
        description: "Read those 5 books mini version",
        estimate: 30,
        label: "React & Node",
        order: 3,
        taskGroup: q2,
        createdOn: new Date()
    },
    {
        taskId: 10,
        description: "Organize the youtube subscription",
        estimate: 30,
        label: "React & Node",
        order: 4,
        taskGroup: q2,
        createdOn: new Date()
    },
    {
        taskId: 11,
        description: "Review the life lessons",
        estimate: 30,
        label: "React & Node",
        order: 4,
        taskGroup: q1,
        createdOn: new Date()
    },
    {
        taskId: 11,
        description: "Plan for the affirmations",
        estimate: 30,
        label: "React & Node",
        order: 5,
        taskGroup: q2,
        createdOn: new Date()
    },
    {
        taskId: 12,
        description: "Apply for the ration card",
        estimate: 30,
        label: "React & Node",
        order: 1,
        taskGroup: q3,
        createdOn: new Date()
    },
    {
        taskId: 13,
        description: "Check the status of the mutual funds",
        estimate: 30,
        label: "React & Node",
        order: 2,
        taskGroup: q3,
        createdOn: new Date()
    },
    {
        taskId: 14,
        description: "Timesheet submission",
        estimate: 30,
        label: "React & Node",
        order: 3,
        taskGroup: q3,
        createdOn: new Date()
    },
    {
        taskId: 15,
        description: "AWS payment",
        estimate: 30,
        label: "React & Node",
        order: 4,
        taskGroup: q3,
        createdOn: new Date()
    },
    {
        taskId: 16,
        description: "Disk defragmentation",
        estimate: 30,
        label: "React & Node",
        order: 5,
        taskGroup: q4,
        createdOn: new Date()
    },
    {
        taskId: 17,
        description: "Finance analysis",
        estimate: 30,
        label: "React & Node",
        order: 6,
        taskGroup: q4,
        createdOn: new Date()
    },
    {
        taskId:182,
        description: "Plot search in 99acres.com",
        estimate: 30,
        label: "React & Node",
        order: 7,
        taskGroup: q4,
        createdOn: new Date()
    },
    {
        taskId: 19,
        description: "Bike insurance",
        estimate: 30,
        label: "React & Node",
        order: 8,
        taskGroup: q4,
        createdOn: new Date()
    },
    {
        taskId: 20,
        description: "Create your blog",
        estimate: 30,
        label: "React & Node",
        order: 5,
        taskGroup: q2,
        createdOn: new Date()
    },
];

export default tasks;