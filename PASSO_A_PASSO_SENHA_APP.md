# 🔑 Como Gerar Senha de App do Gmail - Passo a Passo

## ⚠️ IMPORTANTE

Você **NÃO pode usar** a senha normal (`Vetryn2005`) diretamente no código!

O Gmail exige uma **Senha de App** (App Password) para aplicativos. É uma senha especial de 16 caracteres.

---

## 📝 Passo a Passo Completo

### PASSO 1: Acessar o Gmail
1. Abra o navegador
2. Acesse: **https://myaccount.google.com/apppasswords**
3. Faça login com:
   - Email: `vetrynlabs@gmail.com`
   - Senha: `Vetryn2005`

### PASSO 2: Ativar Verificação em Duas Etapas (se necessário)

**Se você não ver a opção "Senhas de app":**

1. Acesse: **https://myaccount.google.com/security**
2. Procure por **"Verificação em duas etapas"**
3. Clique em **"Ativar"** ou **"Começar"**
4. Siga as instruções para configurar (pode usar seu celular)
5. Depois volte para: **https://myaccount.google.com/apppasswords**

### PASSO 3: Gerar a Senha de App

1. Na página de Senhas de app, você verá:
   - **"Selecionar app"** → Clique e escolha **"Email"**
   - **"Selecionar dispositivo"** → Clique e escolha **"Outro (personalizado)"**
   - Digite: **"Vetryn Labs Site"** (ou qualquer nome)
   - Clique em **"Gerar"**

2. Uma senha de 16 caracteres aparecerá, tipo:
   ```
   abcd efgh ijkl mnop
   ```

3. **COPIE ESSA SENHA** (os 16 caracteres)

### PASSO 4: Colocar no arquivo .env

1. Abra o arquivo `.env` na raiz do projeto
2. Encontre a linha:
   ```
   EMAIL_PASS=SUA_SENHA_DE_APP_AQUI
   ```
3. Substitua `SUA_SENHA_DE_APP_AQUI` pela senha que você copiou
4. **IMPORTANTE:** Remova os espaços! Se aparecer `abcd efgh ijkl mnop`, use `abcdefghijklmnop`

**Exemplo:**
```env
EMAIL_PASS=abcdefghijklmnop
```

### PASSO 5: Salvar e Reiniciar

1. **Salve** o arquivo `.env`
2. **Pare o servidor** (Ctrl+C no terminal onde está rodando)
3. **Inicie novamente:**
   ```bash
   npm run server
   ```

### PASSO 6: Verificar se Funcionou

Quando iniciar o servidor, você deve ver:

```
🚀 Servidor rodando na porta 3001

✅ Email configurado: vetrynlabs@gmail.com
📬 Receberá mensagens em: vetrynlabs@gmail.com
```

Se aparecer ⚠️ (aviso), significa que ainda não está configurado.

---

## 🧪 Testar

Execute:
```bash
node test-server.js
```

Deve aparecer:
```
✅ Teste passou! Email enviado com sucesso.
```

---

## ❓ Problemas Comuns

### "Não consigo ver a opção Senhas de app"
- **Solução:** Ative a Verificação em duas etapas primeiro
- Acesse: https://myaccount.google.com/security

### "Erro de autenticação" (EAUTH)
- Você está usando a senha normal em vez da senha de app
- **Solução:** Use a senha de app de 16 caracteres

### "Senha não funciona"
- Certifique-se de copiar SEM espaços
- Certifique-se de que copiou todos os 16 caracteres
- Gere uma nova senha de app se necessário

---

## 📋 Resumo Rápido

1. ✅ Acesse: https://myaccount.google.com/apppasswords
2. ✅ Gere senha de app para "Email"
3. ✅ Copie os 16 caracteres (sem espaços)
4. ✅ Cole no `.env` como `EMAIL_PASS`
5. ✅ Reinicie o servidor
6. ✅ Teste!

---

## 💡 Dica

A senha de app é diferente da senha normal. Ela é específica para aplicativos e mais segura. Você pode ter várias senhas de app para diferentes aplicativos.

