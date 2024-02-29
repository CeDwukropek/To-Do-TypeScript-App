import { useState } from "react"
import { Task } from "../Components/Task";

export const useTasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    const addTask = (task:Task) => {
        setTasks([...tasks, task])
    }

    const removeTask = (task: Task) => {
        setTasks(tasks.filter((item) => item.id !== task.id));
    }

    const completeTask = (task: Task) => {
        let index = tasks.indexOf(task)
        tasks[index].completed = !task.completed
        setTasks([...tasks])
    }


    return {
        tasks,
        addTask,
        removeTask,
        completeTask,
        setTasks
    };
}
