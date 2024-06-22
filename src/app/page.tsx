"use client"
import { AddTodo } from "@/components/AddTodo";
import { ShowTodos } from "@/components/ShowTodos";
import { useEffect, useState } from "react";

export default function Home() {
  const [isClient, setIsClient] = useState(false)
  
  
  useEffect(()=>{
    setIsClient(true)
  },[])

  if(!isClient) return null;
  return (
    <main>


      
      <AddTodo />
      <ShowTodos />

    </main>
  );
}
