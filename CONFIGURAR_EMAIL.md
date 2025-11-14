# ⚠️ IMPORTANTE: Configurar Email para Funcionar

O servidor backend está rodando, mas **você precisa configurar as credenciais do Gmail** para que os emails sejam enviados.

## 🔧 Passo a Passo Rápido

### 1. Criar Senha de App do Gmail

1. Acesse: **https://myaccount.google.com/apppasswords**
   - Se não aparecer, ative a **Verificação em duas etapas** primeiro em: https://myaccount.google.com/security

2. Selecione:
   - **App**: Email
   - **Dispositivo**: Outro (personalizado)
   - **Nome**: Vetryn Labs

3. Clique em **Gerar**

4. **Copie a senha de 16 caracteres** (sem espaços)

### 2. Editar o arquivo `.env`

Abra o arquivo `.env` na raiz do projeto e substitua:

```env
EMAIL_USER=seu-email@gmail.com          # ← Seu email Gmail
EMAIL_PASS=sua-app-password-do-gmail     # ← A senha de 16 caracteres gerada
RECEIVER_EMAIL=vetrynlabs@gmail.com      # ← Email que receberá as mensagens
```

**Exemplo:**
```env
EMAIL_USER=joao@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop
RECEIVER_EMAIL=vetrynlabs@gmail.com
```

**⚠️ IMPORTANTE:** 
- Use a **senha de app** (16 caracteres), NÃO a senha normal do Gmail
- Não coloque espaços na senha de app

### 3. Reiniciar o Servidor

Após editar o `.env`, reinicie o servidor:

```bash
# Parar o servidor atual (Ctrl+C)
# Depois iniciar novamente:
npm run server
```

Ou se estiver rodando frontend + backend:
```bash
npm run dev:all
```

### 4. Testar

1. Acesse o site: `http://localhost:5173`
2. Vá até a seção de contato
3. Preencha e envie o formulário
4. Verifique o email `vetrynlabs@gmail.com` (ou o que você configurou)

## ✅ Verificar se está funcionando

O servidor mostra avisos se as credenciais não estiverem configuradas:
- ✅ Se configurado: `📧 Email configurado: seu-email@gmail.com`
- ⚠️ Se não configurado: `⚠️ AVISO: EMAIL_USER ou EMAIL_PASS não configurados`

## 🐛 Problemas Comuns

**Erro: "Invalid login"**
- Verifique se está usando a **senha de app** (não a senha normal)
- Certifique-se de que a verificação em duas etapas está ativada

**Erro: "Servidor de email não configurado"**
- Verifique se o arquivo `.env` existe na raiz do projeto
- Verifique se as variáveis `EMAIL_USER` e `EMAIL_PASS` estão preenchidas
- Reinicie o servidor após editar o `.env`

**Email não chega**
- Verifique a pasta de spam
- Confirme que `RECEIVER_EMAIL` está correto
- Veja os logs do servidor para erros

