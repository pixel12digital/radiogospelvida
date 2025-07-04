# 🎙️ Rádio Web

Uma aplicação web para rádio online, desenvolvida com Next.js, TypeScript e Tailwind CSS.

## 🚀 Funcionalidades

### Para Ouvintes:
- ✅ Reprodução de streams de áudio
- ✅ Controle de play/pause e volume
- ✅ Interface responsiva e moderna
- ✅ Compatível com mobile

## 🛠️ Configuração Rápida

### 1. Instalar Dependências

```bash
npm install
```

### 2. Executar em Desenvolvimento

```bash
npm run dev
```

Acesse:
- **Página principal**: [http://localhost:3000](http://localhost:3000)

## 📻 Como Usar

1. **Acesse a página principal**
2. **Clique em play** para ouvir
3. **Ajuste o volume** conforme necessário

## 📱 Páginas Disponíveis

- **`/`** - Página principal com player para ouvintes

## 🎨 Personalização

### Cores e Tema:
- Edite `tailwind.config.ts` para alterar cores
- Modifique `src/app/globals.css` para estilos globais

### Nome da Rádio:
- Altere o nome em `src/app/page.tsx`

### Stream de Áudio:
- Modifique a URL do streaming em `src/app/page.tsx`

## 🚀 Deploy na Vercel

1. **Faça push para o GitHub**
2. **Conecte na Vercel**:
   - Importe o repositório
3. **Deploy automático** será realizado

## 🔧 Tecnologias Utilizadas

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Streaming**: Player de áudio HTML5 ou iframe
- **Deploy**: Vercel

## 🎉 Pronto!

Sua rádio web está funcionando! Agora você pode compartilhar com seus ouvintes.

# Rádio Gospel Vida - Aplicativo

> **IMPORTANTE:** Sempre que abrir este projeto, consulte esta documentação para orientações rápidas sobre deploy, testes e publicação do app/site da rádio.

## 🚀 Como publicar o app/site da rádio

### 1. **Domínio temporário (para testes rápidos)**
Você pode publicar o site/app em um domínio temporário GRATUITO para testar imediatamente. Exemplos:
- `radiogospelvida.surge.sh`
- `gospelvida-teste.surge.sh`
- `radiogospelvida.netlify.app`
- `gospelvida-app.vercel.app`

**Como fazer:**
- **Surge.sh:**
  ```bash
  surge out radiogospelvida-teste.surge.sh
  ```
- **Netlify:**
  1. Acesse [netlify.com](https://netlify.com)
  2. Faça upload da pasta `out/`
  3. Use o domínio sugerido (ex: `radiogospelvida.netlify.app`)
- **Vercel:**
  1. Acesse [vercel.com](https://vercel.com)
  2. Conecte o repositório ou faça upload
  3. Use o domínio sugerido (ex: `radiogospelvida.vercel.app`)

### 2. **Domínio próprio (produção)**
Quando quiser usar um domínio próprio (ex: `radiogospelvida.com.br`):
- Registre o domínio em um provedor (GoDaddy, Registro.br, etc)
- No painel do Surge, Netlify ou Vercel, adicione o domínio próprio
- Siga as instruções para apontar o DNS
- O site/app ficará disponível no seu domínio personalizado

### 3. **Troca de domínio**
Você pode começar com um domínio temporário e migrar para o domínio próprio a qualquer momento, sem perder nada do site/app.

### 4. **Sugestões de nomes para testes**
- `radiogospelvida-teste.surge.sh`
- `gospelvida-app.surge.sh`
- `radiogospelvida-teste.netlify.app`
- `gospelvida-app.vercel.app`

Se o nome já estiver em uso, tente outro com sufixo `-teste`, `-dev`, `-app` etc.

---

## 📋 Checklist rápido
- [ ] Consulte esta documentação ao abrir o projeto
- [ ] Escolha um domínio temporário para testes
- [ ] Faça o deploy seguindo as instruções acima
- [ ] Quando quiser, troque para domínio próprio

---

**Dúvidas?** Sempre peça para o assistente ler esta documentação e te orientar sobre o melhor caminho para publicar ou testar o app/site da rádio.

---

# Rádio Gospel Vida - Aplicativo

Este projeto oferece **duas formas práticas e rápidas** de disponibilizar um aplicativo para a Rádio Gospel Vida:

## 🚀 Opção 1: PWA (Progressive Web App) - MAIS RÁPIDA

### O que é?
Transforma o site em um "app" que pode ser instalado no celular. Os usuários podem adicionar o site à tela inicial.

### Vantagens:
- ✅ **Mais rápido** de implementar
- ✅ **Não precisa** de lojas de app
- ✅ **Funciona** em qualquer dispositivo
- ✅ **Atualizações automáticas**

### Como usar:
1. **Desenvolver:**
   ```bash
   npm run dev
   ```

2. **Fazer deploy:**
   - Vercel (recomendado): `vercel --prod`
   - Netlify: Conecte o repositório
   - Qualquer servidor que suporte Next.js

3. **Usuários instalam:**
   - Android: "Adicionar à tela inicial" no Chrome
   - iOS: "Adicionar à tela inicial" no Safari

## 📱 Opção 2: App React Native/Expo - MAIS COMPLETA

### O que é?
App nativo que pode ser publicado nas lojas (Google Play e App Store).

### Vantagens:
- ✅ **Experiência nativa** completa
- ✅ **Funciona offline** (cache)
- ✅ **Notificações push**
- ✅ **Melhor performance**

### Como usar:

#### 1. Instalar dependências:
```bash
cd radio-gospel-vida-app
npm install
```

#### 2. Testar localmente:
```bash
npm start
# Escaneie o QR code com Expo Go no celular
```

#### 3. Fazer build para produção:

**Android (APK):**
```bash
npm run build:android
```

**iOS (requer Mac):**
```bash
npm run build:ios
```

#### 4. Publicar nas lojas:
- **Google Play:** Upload do APK/AAB
- **App Store:** Upload via Xcode

## 🎯 Recomendação

### Para começar AGORA:
**Use o PWA** - É a forma mais rápida e prática. Em 5 minutos você tem um "app" funcional.

### Para longo prazo:
**Use o React Native** - Oferece melhor experiência e pode ser monetizado.

## 📋 Checklist de Deploy

### PWA:
- [ ] Configurar domínio HTTPS
- [ ] Testar em diferentes dispositivos
- [ ] Verificar se o "Adicionar à tela inicial" aparece
- [ ] Testar funcionalidade offline

### App React Native:
- [ ] Criar conta nas lojas (Google Play/App Store)
- [ ] Gerar chaves de assinatura
- [ ] Configurar ícones e splash screen
- [ ] Testar em dispositivos reais
- [ ] Submeter para aprovação

## 🔧 Configurações Importantes

### PWA (já configurado):
- ✅ Manifest.json
- ✅ Service Worker
- ✅ Meta tags para iOS/Android
- ✅ Ícones responsivos

### App React Native (já configurado):
- ✅ Player de áudio
- ✅ Interface nativa
- ✅ Navegação
- ✅ Permissões necessárias

## 📞 Suporte

Para dúvidas ou problemas:
- WhatsApp: (11) 99999-9999
- Email: contato@radiogospelvida.com.br

---

**Rádio Gospel Vida** - Louvor, adoração e palavra 24h no ar! ♥ 