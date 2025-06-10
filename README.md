# 🎙️ Rádio Web - Sistema Completo

Uma aplicação web completa para rádio online com painel de gerenciamento para DJs, desenvolvida com Next.js, TypeScript e Supabase.

## 🚀 Funcionalidades

### Para Ouvintes:
- ✅ Reprodução de streams de áudio
- ✅ Controle de play/pause e volume
- ✅ Informações em tempo real (DJ, programa, status)
- ✅ Interface responsiva e moderna
- ✅ Compatível com mobile

### Para DJs (Painel de Administração):
- ✅ Controle de transmissão ao vivo
- ✅ Gerenciamento de músicas e playlists
- ✅ Informações do DJ e programa
- ✅ Status em tempo real
- ✅ Interface intuitiva

## 🛠️ Configuração Rápida

### 1. Configurar Supabase (Backend)

1. **Criar conta no Supabase**: [supabase.com](https://supabase.com)
2. **Criar novo projeto**
3. **Executar script SQL**: Copie o conteúdo de `database-setup.sql` e execute no SQL Editor do Supabase
4. **Obter credenciais**: Vá em Settings > API e copie:
   - Project URL
   - anon/public key

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```bash
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
```

### 3. Instalar Dependências

```bash
npm install
```

### 4. Executar em Desenvolvimento

```bash
npm run dev
```

Acesse:
- **Página principal**: [http://localhost:3000](http://localhost:3000)
- **Painel do DJ**: [http://localhost:3000/admin](http://localhost:3000/admin)

## 📻 Como Usar

### Para DJs:

1. **Acesse o painel**: `/admin`
2. **Configure suas informações**:
   - Nome do DJ
   - Nome do programa
3. **Gerencie músicas**:
   - Adicione músicas via Supabase
   - Organize em playlists
4. **Inicie a transmissão**:
   - Clique em "Iniciar Transmissão"
   - Selecione músicas ou playlists
   - Os ouvintes verão as informações em tempo real

### Para Ouvintes:

1. **Acesse a página principal**
2. **Clique em play** para ouvir
3. **Ajuste o volume** conforme necessário
4. **Veja informações** do DJ e programa atual

## 🎵 Adicionando Músicas

### Via Supabase Dashboard:

1. Acesse seu projeto no Supabase
2. Vá em Table Editor > musics
3. Clique em "Insert row"
4. Preencha:
   - `title`: Nome da música
   - `artist`: Artista
   - `album`: Álbum (opcional)
   - `duration`: Duração em segundos
   - `file_url`: URL do arquivo de áudio

### Exemplo de inserção:

```sql
INSERT INTO musics (title, artist, album, duration, file_url) VALUES
('Nome da Música', 'Nome do Artista', 'Nome do Álbum', 180, 'https://exemplo.com/musica.mp3');
```

## 📱 Páginas Disponíveis

- **`/`** - Página principal com player para ouvintes
- **`/admin`** - Painel de gerenciamento para DJs

## 🎨 Personalização

### Cores e Tema:
- Edite `tailwind.config.ts` para alterar cores
- Modifique `src/app/globals.css` para estilos globais

### Nome da Rádio:
- Altere `stationName` em `src/app/page.tsx`

### Stream de Áudio:
- Modifique `streamUrl` em `src/app/page.tsx`

## 🚀 Deploy na Vercel

1. **Faça push para o GitHub**
2. **Conecte na Vercel**:
   - Importe o repositório
   - Configure as variáveis de ambiente
3. **Deploy automático** será realizado

### Variáveis de Ambiente na Vercel:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 📊 Estrutura do Banco de Dados

### Tabelas Principais:

- **`musics`** - Músicas disponíveis
- **`playlists`** - Playlists criadas
- **`playlist_musics`** - Relação entre playlists e músicas
- **`radio_status`** - Status atual da rádio

## 🔧 Tecnologias Utilizadas

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **Deploy**: Vercel
- **Streaming**: Radiojar ou similar

## 🎯 Próximos Passos

### Melhorias Sugeridas:
- [ ] Upload de arquivos de áudio
- [ ] Sistema de chat em tempo real
- [ ] Histórico de músicas tocadas
- [ ] Sistema de notificações
- [ ] Analytics e métricas
- [ ] Integração com redes sociais

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique se o Supabase está configurado corretamente
2. Confirme se as variáveis de ambiente estão definidas
3. Verifique os logs no console do navegador

## 🎉 Pronto!

Sua rádio web está funcionando! Agora você pode:
- Gerenciar músicas e playlists
- Fazer transmissões ao vivo
- Compartilhar com seus ouvintes
- Personalizar conforme necessário 