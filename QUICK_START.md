# 🚀 Guia Rápido - Backend de Email

## Configuração Rápida (5 minutos)

### 1. Criar Senha de App do Gmail
1. Acesse: https://myaccount.google.com/apppasswords
2. Selecione "Email" e "Outro (personalizado)"
3. Digite "Vetryn Labs" e clique em "Gerar"
4. **Copie a senha de 16 caracteres**

### 2. Criar arquivo `.env` na raiz do projeto:

```env
PORT=3001
EMAIL_USER=seu-email@gmail.com
EMAIL_PASS=senha-de-app-gerada
RECEIVER_EMAIL=vetrynlabs@gmail.com
SEND_CONFIRMATION=true
```

### 3. Instalar dependências (já feito ✅)

```bash
npm install
```

### 4. Iniciar servidor

**Opção A - Apenas backend:**
```bash
npm run server
```

**Opção B - Frontend + Backend juntos:**
```bash
npm run dev:all
```

### 5. Testar

1. Acesse o site em `http://localhost:5173`
2. Vá até a seção de contato
3. Preencha o formulário
4. Envie a mensagem
5. Verifique seu email (vetrynlabs@gmail.com)!

## ✅ Pronto!

Agora todas as mensagens do formulário serão enviadas para o email configurado em `RECEIVER_EMAIL`.

Para mais detalhes, consulte `BACKEND_SETUP.md`

