"use client";
import React, { ReactHTMLElement, useState } from "react";
import { BACKEND_URL } from "../lib/config";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const register = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${BACKEND_URL}/user/register`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      if (Array.isArray(data.message)) {
        setError(data.message.join("."));
      }

      return;
    }
    setSuccess("registration successfully");
    setTimeout(() => router.push("/login"), 1000);
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        onSubmit={register}
        className="w-80 space-y-4 rounded border-2 border-blue-500 p-6"
      >
        <h1 className=" text-xl font-bold">Register</h1>
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

        <button className="w-full bg-blue-500 text-white p-2">Register</button>
        <p className="text-sm">
          Already have a account
          <a className="text-blue-600" href="/login">
            {" "}
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
