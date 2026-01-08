"use client";
import React, { ReactHTMLElement, useEffect, useState } from "react";
import { BACKEND_URL } from "../lib/config";
import { useRouter } from "next/navigation";

type Task = {
  id: number;
  title: string;
};

const TaskPage = () => {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState("");
  const router = useRouter();

  const fetchTasks = async () => {
    const res = await fetch(`${BACKEND_URL}/task`, {
      credentials: "include",
    });
    setTasks(await res.json());
  };

  const addTasks = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${BACKEND_URL}/task`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ title }),
    });

    if (!res.ok) {
      setError("invalid email or password");
      return;
    }
    setTitle("");
    fetchTasks();
  };

  const editTask = async (task: any) => {
    const updatedTitle = prompt("edit task title", task.title);
    if (!updatedTitle) return;

    await fetch(`${BACKEND_URL}/task/${task.id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ title: updatedTitle }),
    });

    fetchTasks();
  };

  const deleteTask = async (id: number) => {
    await fetch(`${BACKEND_URL}/task/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    fetchTasks();
  };

  const logout = async () => {
    console.log("logout");
    const res = await fetch(`${BACKEND_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    const data = await res.json();
    console.log("logout", data);
    router.push("/login");
  };

  useEffect(() => {
    fetchTasks();
  }, []);
  return (
    <div className="border-blue-100 border h-screen mx-auto max-w-md p-6 m-2">
      <div className="flex items-center justify-between mb-4">
        <h1 className=" text-xl font-bold">My Task</h1>
        <button className=" bg-blue-500 text-white p-1" onClick={logout}>
          logout
        </button>
      </div>
      <div className=" flex gap-2 mb-4">
        <input
          type="text"
          placeholder="New Task"
          className=" w-full border p-2 border-blue-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button className=" bg-blue-500 text-white px-4" onClick={addTasks}>
          Add
        </button>
      </div>

      <ul className="space-y-4">
        {tasks &&
          tasks.map((task) => (
            <li
              key={task.id}
              className="border p-2 bg-blue-100   border-blue-500 font-bold flex items-center justify-between"
            >
              {task.title}
              <div className="flex gap-2">
                <button
                  className="bg-red-400 p-1"
                  onClick={() => editTask(task)}
                >
                  edit
                </button>

                <button
                  className="bg-red-400 p-1"
                  onClick={() => deleteTask(task.id)}
                >
                  delete
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TaskPage;
