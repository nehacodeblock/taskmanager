"use client";
import React, { ReactHTMLElement, useState } from "react";
import { BACKEND_URL } from "../lib/config";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${BACKEND_URL}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      setError("invalid email or password");
      return;
    }
    router.push("/tasks");
  };
  return (
    <div className="flex h-screen items-center justify-center">
      <form
        onSubmit={login}
        className="w-80 space-y-4 rounded border-2 border-blue-500 p-6"
      >
        <h1 className=" text-xl font-bold">Login</h1>
        {error && <p>{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className=" w-full border p-2 border-blue-500"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className=" w-full border p-2 border-blue-500"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-blue-500 text-white p-2">login</button>
      </form>
    </div>
  );
};

export default LoginPage;
