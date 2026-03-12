# ⚡ AlarmZap

Alarmes com toque real + envio automático de WhatsApp via **Evolution API**.

---

## 🗂 Estrutura do projeto

```
alarmzap/
├── public/
│   ├── index.html       ← App frontend (PWA)
│   └── manifest.json    ← Manifesto PWA (instalável no celular)
├── api/
│   └── send.js          ← Serverless function (Vercel)
├── netlify/
│   └── functions/
│       └── send.js      ← Serverless function (Netlify)
├── vercel.json          ← Config Vercel
├── netlify.toml         ← Config Netlify
└── package.json
```

---

## 🚀 Deploy no Vercel (recomendado — mais rápido)

### Passo 1 — Criar conta gratuita
1. Acesse [vercel.com](https://vercel.com) e crie conta com GitHub

### Passo 2 — Subir os arquivos no GitHub
1. Crie um repositório novo em [github.com/new](https://github.com/new)
2. Faça upload de toda a pasta `alarmzap/`
   - Ou instale o Git e rode:
     ```bash
     git init
     git add .
     git commit -m "AlarmZap v1"
     git remote add origin https://github.com/SEU_USUARIO/alarmzap.git
     git push -u origin main
     ```

### Passo 3 — Conectar ao Vercel
1. No painel Vercel → **"Add New Project"**
2. Importe o repositório `alarmzap`
3. Clique em **Deploy** — pronto! ✅
4. Você receberá uma URL tipo `https://alarmzap-xxx.vercel.app`

---

## 🌐 Deploy no Netlify (alternativa)

1. Acesse [app.netlify.com](https://app.netlify.com) → **"Add new site" → "Import from Git"**
2. Conecte ao GitHub e selecione o repositório
3. Configure:
   - **Build command:** _(deixe vazio)_
   - **Publish directory:** `public`
   - **Functions directory:** `netlify/functions`
4. Clique em **Deploy site**

---

## 📱 Instalar como app no celular

Após o deploy, acesse a URL no celular:
- **Android (Chrome):** Menu → "Adicionar à tela inicial"
- **iPhone (Safari):** Compartilhar → "Adicionar à Tela de Início"

O app ficará igual a um aplicativo nativo, com tela cheia.

---

## ⚙️ Configurar a Evolution API

### Opção A — Railway (gratuito, mais fácil)
1. Acesse [railway.app](https://railway.app) com sua conta GitHub
2. Clique em **"New Project" → "Deploy from Template"**
3. Pesquise **"Evolution API"** e clique em Deploy
4. Aguarde o deploy → copie a URL gerada (ex: `https://evolution-api-xxx.railway.app`)
5. A API Key padrão é definida nas variáveis de ambiente (`AUTHENTICATION_API_KEY`)

### Opção B — VPS própria (Docker)
```bash
docker run -d \
  --name evolution-api \
  -p 8080:8080 \
  -e AUTHENTICATION_TYPE=apikey \
  -e AUTHENTICATION_API_KEY=minha-chave-secreta \
  atendai/evolution-api:latest
```

### Conectar o WhatsApp na instância
1. Acesse `https://SUA_EVOLUTION_URL/instance/create` via POST com:
   ```json
   { "instanceName": "minha-instancia", "token": "", "qrcode": true }
   ```
2. Ou use o **Evolution Manager** (painel web incluso) em `https://SUA_URL/manager`
3. Escaneie o QR Code com o WhatsApp do celular que vai enviar as mensagens

### Configurar no AlarmZap
No app, clique na pílula **"Configurar Evolution API"** e preencha:
- **URL:** `https://sua-api.railway.app`
- **API Key:** a chave que você definiu
- **Nome da instância:** o nome que você criou (ex: `minha-instancia`)

---

## 💬 Variáveis na mensagem

Na mensagem pré-programada, você pode usar:

| Variável   | Substituído por              |
|------------|------------------------------|
| `{nome}`   | Nome do contato              |
| `{titulo}` | Título do alarme             |
| `{hora}`   | Horário do alarme (HH:MM)    |

**Exemplo:**
```
Oi {nome}! 👋 Lembrete: {titulo} hoje às {hora}. Te vejo em breve!
```

---

## ⚠️ Importante: manter o app aberto

Os alarmes funcionam via JavaScript no navegador. Para que disparem corretamente:
- **No celular:** instale como PWA e mantenha o app em segundo plano (não feche)
- **No computador:** mantenha a aba aberta
- Para alarmes 100% autônomos (sem precisar manter o app aberto), seria necessário um backend com agendamento (Node.js + cron) — posso criar isso se precisar!

---

## 🛠 Suporte

Dúvidas? Consulte a documentação oficial:
- Evolution API: [doc.evolution-api.com](https://doc.evolution-api.com)
- Vercel: [vercel.com/docs](https://vercel.com/docs)
- Railway: [docs.railway.app](https://docs.railway.app)
