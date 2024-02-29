import React, { useEffect, useState } from "react";
import { useTasks } from "../Hooks/useTasks";
import { Task } from "./Task";
import {v4 as uuid} from 'uuid'
import {useNavigate} from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from "firebase/auth";
import { Navbar } from '../Components/Nav';
import { CollectionReference, DocumentData, addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../Config/firebase";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";

interface CreateFormData {
  description: string
}

export const Main = () => {
  const navigate = useNavigate()
  const auth = getAuth()
  const [user] = useAuthState(auth);

  if(!user) {
    console.log("not logged")
    navigate('/')
  }
  const [tasksList, setTasksList] = useState<Task[] | null>(null)
  const tasksRef = collection(db, "todos");
  const schema = yup.object().shape({
      description: yup.string().min(1).required("You must add a description")
  });

  const {register, handleSubmit, formState: {errors}} = useForm<CreateFormData>({
      resolver: yupResolver(schema),
  })

  const onCreateTask = async (data: CreateFormData) => {
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

  useEffect(() => {
      getTasks()
  }, [tasksList])


  return(
    <>
    <Navbar/> 
    <div className="shadow"></div>
    <div className="bodyContainer">
      <form className="taskForm" onSubmit={handleSubmit(onCreateTask)}>
        <input type='text' {...register("description")} />
        <button type="submit" className="button">Create</button>
      </form>
      <div className="tasksContainer">
        {tasksList?.map((item) => (
            <Task
              id={item.id}
              description={item.description}
              completed={item.completed}
              delete={() => removeTask(item)}
              complete={() => completeTask(item)}
            />
          ))}
      </div>
    </div>
    </>
  )
}

