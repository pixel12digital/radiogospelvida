"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ChangePassword() {
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  async function handleChange(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setSucesso("");
    const { error } = await supabase.auth.updateUser({ password: senha });
    if (error) {
      setErro(error.message);
    } else {
      setSucesso("Senha alterada com sucesso!");
      setSenha("");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#fff8f0]">
      <form onSubmit={handleChange} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#a85b1a]">Alterar Senha</h2>
        <input
          type="password"
          placeholder="Nova senha"
          className="w-full mb-4 px-3 py-2 border rounded"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          required
        />
        {erro && <div className="text-red-500 mb-2">{erro}</div>}
        {sucesso && <div className="text-green-600 mb-2">{sucesso}</div>}
        <button type="submit" className="w-full bg-[#a85b1a] text-white py-2 rounded hover:bg-[#c96a2b]">Alterar Senha</button>
      </form>
    </div>
  );
} 