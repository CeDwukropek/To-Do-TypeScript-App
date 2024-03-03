import { useState } from "react"
import { ITask } from "../Components/Task";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, where } from "firebase/firestore";
import { db } from "../Config/firebase";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

export interface CreateFormData {
    description: string
}

export const useTasks = () => {
    const auth = getAuth()
    const [user] = useAuthState(auth);
    const [tasksList, setTasksList] = useState<ITask[] | null>(null)
    const tasksRef = collection(db, "todos");
  
    const addTask = async (data: CreateFormData) => {
        await addDoc(tasksRef, {
            ...data,
            completed: false,
            userId: user?.uid,
        })
  
        let form = document.getElementsByTagName("form")[0]
        form.reset()
        getTasks()
    }
    
    const getTasks = async () => {
        if(user) {
            const q = query(tasksRef, where("userId", "==", user.uid))
            const data = await getDocs(q)
            setTasksList(
            data.docs.map((doc) => ({...doc.data(), id: doc.id})) as ITask[]
            )
        }
        //console.log("refreshed data")
    }
  
    const removeTask = async (item: ITask) => {
      await deleteDoc(doc(db, "todos", item.id));
      getTasks()
    }
  
    const completeTask = async (item: ITask) => {
      await updateDoc(doc(db, "todos", item.id),{
          completed: !item.completed
        })
        getTasks()
    }


    return {
        tasksList,
        addTask,
        removeTask,
        completeTask,
        getTasks
    };
}
