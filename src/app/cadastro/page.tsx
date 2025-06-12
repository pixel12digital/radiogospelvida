'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function CadastroPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCadastro = async (e: any) => {
    e.preventDefault();
    setErro('');
    setSucesso('');
    if (senha !== confirmar) {
      setErro('As senhas não coincidem.');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password: senha });
    setLoading(false);
    if (error) {
      setErro(error.message || 'Erro ao cadastrar.');
    } else {
      setSucesso('Cadastro realizado! Verifique seu e-mail para confirmar a conta.');
      setTimeout(() => router.push('/login'), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fff3e6] to-[#a85b1a]/30">
      <form onSubmit={handleCadastro} className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-[#a85b1a] mb-2 text-center">Cadastro de Usuário</h1>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="px-3 py-2 rounded border border-[#a85b1a]"
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          className="px-3 py-2 rounded border border-[#a85b1a]"
          required
        />
        <input
          type="password"
          placeholder="Confirmar senha"
          value={confirmar}
          onChange={e => setConfirmar(e.target.value)}
          className="px-3 py-2 rounded border border-[#a85b1a]"
          required
        />
        {erro && <div className="text-red-600 text-sm text-center">{erro}</div>}
        {sucesso && <div className="text-green-700 text-sm text-center">{sucesso}</div>}
        <button
          type="submit"
          className="bg-[#a85b1a] text-white px-4 py-2 rounded font-semibold hover:bg-[#c96a2b] disabled:opacity-60"
          disabled={loading}
        >
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
        <div className="text-center text-sm mt-2">
          Já tem conta? <a href="/login" className="text-[#a85b1a] underline">Entrar</a>
        </div>
      </form>
    </div>
  );
} 