"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [userRole, setUserRole] = useState<string | null>(null);
  const router = useRouter();

  // Verifica se o usuário logado é admin
  useEffect(() => {
    async function checkAdmin() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.replace("/login");
        return;
      }
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();
      if (!profile || profile.role !== "admin") {
        router.replace("/");
        return;
      }
      setUserRole(profile.role);
    }
    checkAdmin();
  }, [router]);

  // Busca todos os usuários
  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("id, email, role, created_at")
        .order("created_at", { ascending: true });
      if (error) setErro(error.message);
      else setUsers(data || []);
      setLoading(false);
    }
    if (userRole === "admin") fetchUsers();
  }, [userRole]);

  async function handlePromote(id: string, role: string) {
    const newRole = role === "admin" ? "user" : "admin";
    const { error } = await supabase
      .from("profiles")
      .update({ role: newRole })
      .eq("id", id);
    if (error) setErro(error.message);
    else setUsers(users => users.map(u => u.id === id ? { ...u, role: newRole } : u));
  }

  if (loading) return <div className="p-8 text-center">Carregando...</div>;
  if (erro) return <div className="p-8 text-center text-red-500">{erro}</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-[#a85b1a] text-center">Gerenciar Usuários</h2>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2">E-mail</th>
            <th className="py-2">Função</th>
            <th className="py-2">Ação</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id} className="border-b">
              <td className="py-2">{u.email}</td>
              <td className="py-2 capitalize">{u.role}</td>
              <td className="py-2">
                <button
                  className={`px-3 py-1 rounded text-white ${u.role === "admin" ? "bg-gray-500 hover:bg-gray-700" : "bg-[#a85b1a] hover:bg-[#c96a2b]"}`}
                  onClick={() => handlePromote(u.id, u.role)}
                  disabled={u.email === "admin@admin.com" && u.role === "admin"}
                  title={u.role === "admin" ? "Rebaixar para usuário" : "Promover para admin"}
                >
                  {u.role === "admin" ? "Rebaixar" : "Promover"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 