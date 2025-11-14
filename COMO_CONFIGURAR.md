# 🔧 COMO CONFIGURAR O EMAIL - Passo a Passo Visual

## ⚠️ PROBLEMA ATUAL

Seu arquivo `.env` ainda tem valores de **EXEMPLO**. Você precisa substituir por valores **REAIS**.

## 📝 PASSO 1: Abrir o arquivo .env

O arquivo `.env` está na **raiz do projeto** (mesma pasta onde está o `package.json`).

Abra ele no editor de texto.

## 📝 PASSO 2: Ver como está agora (ERRADO)

Seu arquivo `.env` provavelmente está assim (❌ ERRADO):

```env
EMAIL_USER=seu-email@gmail.com
EMAIL_PASS=sua-app-password-do-gmail
RECEIVER_EMAIL=vetrynlabs@gmail.com
```

## 📝 PASSO 3: Obter Senha de App do Gmail

### 3.1. Acesse este link:
👉 **https://myaccount.google.com/apppasswords**

### 3.2. Se não aparecer a opção "Senhas de app":
- Você precisa ativar a **Verificação em duas etapas** primeiro
- Acesse: https://myaccount.google.com/security
- Ative a verificação em duas etapas
- Depois volte para o link das senhas de app

### 3.3. Criar a senha de app:
1. Clique em **"Selecionar app"** → Escolha **"Email"**
2. Clique em **"Selecionar dispositivo"** → Escolha **"Outro (personalizado)"**
3. Digite: **"Vetryn Labs"**
4. Clique em **"Gerar"**
5. **COPIE A SENHA** que aparece (16 caracteres, tipo: `abcd efgh ijkl mnop`)

⚠️ **IMPORTANTE:** Copie SEM os espaços! Se aparecer `abcd efgh ijkl mnop`, use `abcdefghijklmnop`

## 📝 PASSO 4: Editar o arquivo .env (CORRETO)

Substitua o conteúdo do `.env` por:

```env
PORT=3001
EMAIL_USER=seu-email-real@gmail.com
EMAIL_PASS=abcdefghijklmnop
RECEIVER_EMAIL=vetrynlabs@gmail.com
SEND_CONFIRMATION=true
```

**Onde:**
- `EMAIL_USER` = Seu email Gmail REAL (ex: `joao@gmail.com`)
- `EMAIL_PASS` = A senha de 16 caracteres que você copiou (SEM espaços)
- `RECEIVER_EMAIL` = Email que receberá as mensagens (pode ser o mesmo ou outro)

### Exemplo REAL:

```env
PORT=3001
EMAIL_USER=joao.silva@gmail.com
EMAIL_PASS=abcd1234efgh5678
RECEIVER_EMAIL=vetrynlabs@gmail.com
SEND_CONFIRMATION=true
```

## 📝 PASSO 5: Salvar e Reiniciar

1. **Salve** o arquivo `.env`
2. **Pare o servidor** (Ctrl+C no terminal)
3. **Inicie novamente:**
   ```bash
   npm run server
   ```

## ✅ PASSO 6: Verificar se funcionou

Quando iniciar o servidor, você deve ver:

```
🚀 Servidor rodando na porta 3001

✅ Email configurado: seu-email@gmail.com
📬 Receberá mensagens em: vetrynlabs@gmail.com
```

Se aparecer ⚠️ (aviso), significa que ainda não está configurado corretamente.

## 🧪 PASSO 7: Testar

Execute:
```bash
node test-server.js
```

Deve aparecer:
```
✅ Teste passou! Email enviado com sucesso.
```

## ❌ Problemas Comuns

### "Invalid login" ou "EAUTH"
- Você está usando a senha **normal** do Gmail em vez da **senha de app**
- Solução: Use a senha de app de 16 caracteres

### "Servidor de email não configurado"
- O arquivo `.env` ainda tem valores de exemplo
- Solução: Substitua `seu-email@gmail.com` pelo seu email real

### Senha de app não funciona
- Certifique-se de copiar SEM espaços
- Certifique-se de que a verificação em duas etapas está ativada
- Gere uma nova senha de app se necessário

## 💡 Dica Final

Se ainda não funcionar, abra o console do navegador (F12) quando enviar o formulário e veja a mensagem de erro específica.

