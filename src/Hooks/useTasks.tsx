import { useState } from "react"
import { Task } from "../Components/Task";
import { yupResolver } from "@hookform/resolvers/yup";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { db } from "../Config/firebase";
import * as yup from "yup";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

export interface CreateFormData {
    description: string
}

export const useTasks = () => {
    const auth = getAuth()
    const [user] = useAuthState(auth);
    const [tasksList, setTasksList] = useState<Task[] | null>(null)
    const tasksRef = collection(db, "todos");
  
    const addTask = async (data: CreateFormData) => {
        await addDoc(tasksRef, {
            ...data,
            completed: false,
            userId: user?.uid,
        })
  
        let form = document.getElementsByTagName("form")[0]
        form.reset()
    }
    
    const getTasks = async () => {
        const data = await getDocs(tasksRef)
        setTasksList(
            data.docs.map((doc) => ({...doc.data(), id: doc.id})) as Task[]
        )
    }
  
    const removeTask = async (item: Task) => {
      await deleteDoc(doc(db, "todos", item.id));
    }
  
    const completeTask = async (item: Task) => {
      await updateDoc(doc(db, "todos", item.id),{
          completed: !item.completed
        })
    }


    return {
        tasksList,
        addTask,
        removeTask,
        completeTask,
        getTasks
    };
}
