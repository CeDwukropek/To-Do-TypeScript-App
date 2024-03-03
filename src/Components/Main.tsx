import React, { useEffect, useState } from "react";
import { CreateFormData, useTasks } from "../Hooks/useTasks";
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

export const Main = () => {
  const navigate = useNavigate()
  const auth = getAuth()
  const [user] = useAuthState(auth);
  const schema = yup.object().shape({
    description: yup.string().min(1).required("You must add a description")
  });

  const {register, handleSubmit, formState: {errors}} = useForm<CreateFormData>({
    resolver: yupResolver(schema),
  })

  const {tasksList, addTask, removeTask, completeTask, getTasks} = useTasks()

  if(!user) {
    console.log("not logged")
    navigate('/')
  }

  console.log(user?.uid)

  useEffect(() => {
      getTasks()
  }, [getTasks])


  return(
    <>
    <Navbar/> 
    <div className="shadow"></div>
    <div className="bodyContainer">
      <form className="taskForm" onSubmit={handleSubmit(addTask)}>
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

