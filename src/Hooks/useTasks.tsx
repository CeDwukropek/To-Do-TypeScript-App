import { useEffect, useState } from "react"
import { ITask } from "../Components/Task";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, where, onSnapshot, QuerySnapshot } from "firebase/firestore";
import { auth, db } from "../Config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export interface CreateFormData {
    description: string
}

export const useTasks = () => {
    const [user, loading] = useAuthState(auth);
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
        if(loading) {
            return
        }
        const q = query(tasksRef, where("userId", "==", user?.uid))
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let tasksArr:ITask[] = []
            querySnapshot.forEach( el => {
                console.log(el)
                tasksArr.push({
                    description: el.data().description,
                    id: el.id,
                    completed: el.data().completed
                })
            })
            setTasksList(tasksArr)
        })
        return () => unsubscribe()
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
