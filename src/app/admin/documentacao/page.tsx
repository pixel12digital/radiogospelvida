"use client";

export default function DocumentacaoPage() {
  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold text-[#a85b1a] mb-6 text-center">Documentação do Painel Admin</h1>
      <ol className="list-decimal pl-6 space-y-4 text-[#1a0d0a]">
        <li>
          <b>Dashboard:</b> Visão geral rápida das principais informações da rádio.
        </li>
        <li>
          <b>Músicas:</b> Gerencie músicas cadastradas. Adicione, edite ou exclua músicas.
        </li>
        <li>
          <b>Playlists:</b> Crie e organize playlists. Adicione músicas às playlists.
        </li>
        <li>
          <b>Programação:</b> Agende qual playlist irá tocar, informe o nome do programa, data, horário de início e término.
        </li>
        <li>
          <b>Pedidos:</b> Veja e marque como atendidos os pedidos de músicas enviados pelos ouvintes.
        </li>
        <li>
          <b>Recados:</b> Veja e marque como lidos os recados enviados pelos ouvintes.
        </li>
        <li>
          <b>Usuários:</b> Promova ou rebaixe usuários para admin, visualize todos os cadastrados.
        </li>
        <li>
          <b>Alterar Senha:</b> Altere sua senha de acesso ao painel.
        </li>
        <li>
          <b>Chat:</b> Veja as mensagens enviadas pelo chat do site.
        </li>
      </ol>
      <div className="mt-8 text-[#c96a2b] text-sm text-center">
        Em caso de dúvida, consulte esta página ou entre em contato com o suporte técnico.
      </div>
    </div>
  );
} 