"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Register() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const router = useRouter();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setSucesso("");
    const { error } = await supabase.auth.signUp({
      email,
      password: senha,
    });
    if (error) {
      setErro(error.message);
    } else {
      setSucesso("Cadastro realizado! Faça login.");
      setTimeout(() => router.push("/login"), 1500);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#fff8f0]">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#a85b1a]">Cadastro</h2>
        <input
          type="email"
          placeholder="E-mail"
          className="w-full mb-4 px-3 py-2 border rounded"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          className="w-full mb-4 px-3 py-2 border rounded"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          required
        />
        {erro && <div className="text-red-500 mb-2">{erro}</div>}
        {sucesso && <div className="text-green-600 mb-2">{sucesso}</div>}
        <button type="submit" className="w-full bg-[#a85b1a] text-white py-2 rounded hover:bg-[#c96a2b]">Cadastrar</button>
      </form>
    </div>
  );
} 