# Configuração do Backend - Envio de Emails

Este guia explica como configurar o backend para receber mensagens do formulário de contato e enviá-las por email.

## 📋 Pré-requisitos

- Node.js 18 ou superior (já instalado)
- Conta Gmail para envio de emails

## 🚀 Passo a Passo

### 1. Instalar Dependências do Backend

```bash
npm install
```

### 2. Configurar Gmail App Password

Para usar o Gmail para enviar emails, você precisa criar uma "Senha de App" (App Password):

1. Acesse sua conta Google: https://myaccount.google.com/
2. Vá em **Segurança**
3. Ative a **Verificação em duas etapas** (se ainda não estiver ativada)
4. Role até **Senhas de app** e clique
5. Selecione **Email** e **Outro (personalizado)**
6. Digite "Vetryn Labs" como nome
7. Clique em **Gerar**
8. **Copie a senha gerada** (16 caracteres sem espaços)

### 3. Criar Arquivo .env

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
# Configurações do Servidor
PORT=3001

# Configurações do Email (Gmail)
EMAIL_USER=seu-email@gmail.com
EMAIL_PASS=sua-app-password-do-gmail

# Email que receberá as mensagens (pode ser o mesmo do EMAIL_USER)
RECEIVER_EMAIL=vetrynlabs@gmail.com

# Enviar email de confirmação para o cliente? (true/false)
SEND_CONFIRMATION=true
```

**Importante:** Substitua:
- `seu-email@gmail.com` pelo seu email Gmail
- `sua-app-password-do-gmail` pela senha de app gerada no passo 2
- `vetrynlabs@gmail.com` pelo email que deve receber as mensagens

### 4. Executar o Servidor

Você tem duas opções:

#### Opção 1: Executar apenas o backend
```bash
npm run server
```

#### Opção 2: Executar frontend e backend juntos
```bash
npm run dev:all
```

O servidor estará rodando em `http://localhost:3001`

### 5. Testar o Backend

Você pode testar se o servidor está funcionando acessando:
```
http://localhost:3001/api/health
```

Deve retornar: `{"status":"ok","message":"Servidor funcionando!"}`

## 📧 Como Funciona

1. **Usuário preenche o formulário** no site
2. **Frontend envia dados** para `http://localhost:3001/api/contact`
3. **Backend valida os dados** e envia email usando Nodemailer
4. **Email é enviado** para o endereço configurado em `RECEIVER_EMAIL`
5. **Opcionalmente**, um email de confirmação é enviado para o cliente

## 🔧 Configuração para Produção

Para produção, você precisará:

1. **Configurar variáveis de ambiente** no seu servidor/hospedagem
2. **Atualizar a URL da API** no componente `Contact.jsx`:
   ```javascript
   const response = await fetch('https://seu-dominio.com/api/contact', {
   ```
3. **Considerar usar um serviço de email profissional** como:
   - SendGrid
   - Mailgun
   - AWS SES
   - Resend

## 🐛 Solução de Problemas

### Erro: "Invalid login"
- Verifique se a senha de app está correta
- Certifique-se de que a verificação em duas etapas está ativada

### Erro: "Connection timeout"
- Verifique sua conexão com a internet
- Certifique-se de que a porta 3001 não está bloqueada pelo firewall

### Email não está sendo recebido
- Verifique a pasta de spam
- Confirme que `RECEIVER_EMAIL` está correto
- Verifique os logs do servidor para erros

## 📝 Estrutura do Projeto

```
Vetryn/
├── server/
│   └── index.js          # Servidor Express
├── src/
│   └── components/
│       └── Contact.jsx   # Componente do formulário
├── .env                   # Variáveis de ambiente (não commitado)
└── package.json           # Dependências
```

## 🔒 Segurança

- **NUNCA** commite o arquivo `.env` no Git
- Use variáveis de ambiente em produção
- Considere adicionar rate limiting para evitar spam
- Valide e sanitize todos os inputs do formulário

