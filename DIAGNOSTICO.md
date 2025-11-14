# 🔍 Diagnóstico - Por que não está enviando?

## ✅ Checklist Rápido

Execute este comando para verificar a configuração:

```bash
node test-server.js
```

## Problemas Comuns e Soluções

### 1. ❌ "Servidor de email não configurado"

**Causa:** O arquivo `.env` não existe ou as credenciais não estão configuradas.

**Solução:**
1. Crie/edite o arquivo `.env` na raiz do projeto
2. Configure com suas credenciais reais do Gmail:

```env
EMAIL_USER=seu-email-real@gmail.com
EMAIL_PASS=sua-senha-de-app-16-caracteres
RECEIVER_EMAIL=vetrynlabs@gmail.com
```

### 2. ❌ "Erro de autenticação" (EAUTH)

**Causa:** 
- Senha de app incorreta
- Usando senha normal do Gmail em vez de senha de app
- Verificação em duas etapas não ativada

**Solução:**
1. Acesse: https://myaccount.google.com/apppasswords
2. Gere uma nova senha de app
3. Cole no `.env` (sem espaços)
4. Reinicie o servidor

### 3. ❌ "Não foi possível conectar ao servidor"

**Causa:** O servidor backend não está rodando.

**Solução:**
```bash
npm run server
```

Ou em outro terminal:
```bash
npm run dev:all
```

### 4. ❌ Erro de conexão (ECONNECTION)

**Causa:** Problema de internet ou firewall bloqueando.

**Solução:**
- Verifique sua conexão com a internet
- Verifique se a porta 3001 não está bloqueada

## 🧪 Como Testar

### Teste 1: Verificar se o servidor está rodando
```bash
# Deve retornar: {"status":"ok","message":"Servidor funcionando!"}
wget -qO- http://localhost:3001/api/health
```

### Teste 2: Testar envio de email
```bash
node test-server.js
```

### Teste 3: Verificar logs do servidor
Quando você enviar um formulário, o servidor deve mostrar:
```
📧 Recebida requisição de contato: { name: '...', email: '...', subject: '...' }
📤 Enviando email para: vetrynlabs@gmail.com
✅ Email enviado com sucesso!
```

Se aparecer erro, veja a mensagem específica.

## 📝 Verificar Configuração Atual

Execute:
```bash
node -e "import('dotenv').then(d => { d.default.config(); console.log('EMAIL_USER:', process.env.EMAIL_USER); console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'Configurado' : 'NÃO configurado'); console.log('RECEIVER_EMAIL:', process.env.RECEIVER_EMAIL); })"
```

## 🔧 Próximos Passos

1. **Verifique o arquivo `.env`** - Está na raiz do projeto?
2. **As credenciais estão corretas?** - Use senha de app, não senha normal
3. **Servidor está rodando?** - Execute `npm run server`
4. **Teste novamente** - Use `node test-server.js`
5. **Veja os logs** - O servidor mostra mensagens de erro específicas

## 💡 Dica

Se ainda não funcionar, abra o console do navegador (F12) quando enviar o formulário e veja a mensagem de erro específica que aparece.

