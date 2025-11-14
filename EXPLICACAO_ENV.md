# 📖 Explicação do Arquivo .env

Este arquivo contém as **configurações secretas** do seu servidor. É como uma "chave" que permite ao servidor acessar sua conta de email.

## 🔐 Por que o arquivo .env é importante?

- Contém informações **sensíveis** (senhas, credenciais)
- **NÃO deve** ser compartilhado ou enviado para outras pessoas
- Permite que o servidor **envie emails** em nome da sua conta

---

## 📝 Variáveis do .env - Explicação Detalhada

### 1. `PORT=3001`

**O que é:** Porta onde o servidor backend vai rodar

**Para que serve:** 
- É como o "número da porta" onde o servidor fica "escutando"
- O frontend (site) vai se comunicar com o backend nesta porta
- `3001` é um número padrão, mas você pode mudar se quiser

**Exemplo:**
```
PORT=3001
```

**Precisa mudar?** ❌ Não, pode deixar como está

---

### 2. `EMAIL_USER=seu-email@gmail.com`

**O que é:** Seu endereço de email Gmail

**Para que serve:**
- É o email que vai **enviar** as mensagens
- Quando alguém preenche o formulário no site, o servidor usa ESTE email para enviar
- Precisa ser um email Gmail real que você tenha acesso

**Exemplo ERRADO:**
```
EMAIL_USER=seu-email@gmail.com  ❌ (valor de exemplo, não funciona)
```

**Exemplo CORRETO:**
```
EMAIL_USER=joao.silva@gmail.com  ✅ (seu email real)
```

**Precisa mudar?** ✅ SIM! Coloque seu email Gmail real

---

### 3. `EMAIL_PASS=abcdefghijklmnop`

**O que é:** Senha de App do Gmail (NÃO é sua senha normal!)

**Para que serve:**
- É a "chave" que permite ao servidor acessar sua conta Gmail
- Sem isso, o servidor não consegue enviar emails
- Precisa ser uma **Senha de App** (não sua senha normal do Gmail)

**Como obter:**
1. Acesse: https://myaccount.google.com/apppasswords
2. Gere uma senha de app para "Email"
3. Copie os 16 caracteres (sem espaços)

**Exemplo ERRADO:**
```
EMAIL_PASS=sua-app-password-do-gmail  ❌ (valor de exemplo)
EMAIL_PASS=minhasenha123  ❌ (senha normal não funciona!)
```

**Exemplo CORRETO:**
```
EMAIL_PASS=abcd1234efgh5678  ✅ (senha de app de 16 caracteres)
```

**Precisa mudar?** ✅ SIM! Coloque a senha de app que você gerou

---

### 4. `RECEIVER_EMAIL=vetrynlabs@gmail.com`

**O que é:** Email que vai **receber** as mensagens do formulário

**Para que serve:**
- Quando alguém preenche o formulário no site, a mensagem é enviada para ESTE email
- É o email da empresa/equipe que vai receber os contatos dos clientes
- Pode ser o mesmo do `EMAIL_USER` ou outro email

**Exemplo:**
```
RECEIVER_EMAIL=vetrynlabs@gmail.com  ✅ (email que recebe as mensagens)
```

**Precisa mudar?** 
- Se você quer receber em `vetrynlabs@gmail.com`, pode deixar como está ✅
- Se quiser receber em outro email, mude para o email desejado

---

### 5. `SEND_CONFIRMATION=true`

**O que é:** Se deve ou não enviar email de confirmação para quem preencheu o formulário

**Para que serve:**
- Se `true`: Quando alguém envia o formulário, ela recebe um email automático dizendo "Recebemos sua mensagem!"
- Se `false`: Apenas você recebe o email, o cliente não recebe confirmação

**Exemplo:**
```
SEND_CONFIRMATION=true   ✅ (envia confirmação para o cliente)
SEND_CONFIRMATION=false  (não envia confirmação)
```

**Precisa mudar?** ❌ Não, pode deixar `true` (é melhor para o cliente)

---

## 🎯 Resumo Rápido

| Variável | O que é | Precisa mudar? | Exemplo |
|----------|---------|----------------|---------|
| `PORT` | Porta do servidor | ❌ Não | `3001` |
| `EMAIL_USER` | Seu email Gmail | ✅ SIM | `joao@gmail.com` |
| `EMAIL_PASS` | Senha de app Gmail | ✅ SIM | `abcd1234efgh5678` |
| `RECEIVER_EMAIL` | Email que recebe mensagens | ⚠️ Talvez | `vetrynlabs@gmail.com` |
| `SEND_CONFIRMATION` | Enviar confirmação? | ❌ Não | `true` |

---

## 📋 Exemplo Completo de .env Configurado

```env
# Porta do servidor (não precisa mudar)
PORT=3001

# Seu email Gmail REAL (mude isso!)
EMAIL_USER=joao.silva@gmail.com

# Senha de App do Gmail REAL (mude isso!)
EMAIL_PASS=abcd1234efgh5678

# Email que receberá as mensagens (pode deixar como está)
RECEIVER_EMAIL=vetrynlabs@gmail.com

# Enviar confirmação para o cliente? (pode deixar como está)
SEND_CONFIRMATION=true
```

---

## 🔄 Como Funciona o Fluxo

1. **Cliente preenche formulário** no site
2. **Frontend envia dados** para o servidor (porta 3001)
3. **Servidor usa `EMAIL_USER` e `EMAIL_PASS`** para autenticar no Gmail
4. **Servidor envia email** para `RECEIVER_EMAIL` com a mensagem do cliente
5. **Se `SEND_CONFIRMATION=true`**, também envia confirmação para o cliente

---

## ⚠️ Importante

- **NUNCA** compartilhe o arquivo `.env` com outras pessoas
- **NUNCA** faça commit do `.env` no Git (já está no .gitignore)
- Se alguém tiver acesso ao `.env`, ela pode enviar emails da sua conta!

---

## ❓ Dúvidas Comuns

**P: Posso usar outro email que não seja Gmail?**
R: Sim, mas precisa ajustar a configuração do Nodemailer. Gmail é mais fácil.

**P: Preciso mudar a PORT?**
R: Não, a menos que a porta 3001 já esteja sendo usada por outro programa.

**P: O RECEIVER_EMAIL pode ser diferente do EMAIL_USER?**
R: Sim! Você pode enviar de um email e receber em outro.

**P: E se eu esquecer a senha de app?**
R: Gere uma nova em https://myaccount.google.com/apppasswords

