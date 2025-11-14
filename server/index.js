import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

// Carregar variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Verificar se as variáveis de ambiente estão configuradas
const isEmailConfigured = process.env.EMAIL_USER && 
  process.env.EMAIL_PASS &&
  process.env.EMAIL_USER !== 'seu-email@gmail.com' &&
  process.env.EMAIL_PASS !== 'sua-app-password-do-gmail' &&
  !process.env.EMAIL_USER.includes('@example.com') &&
  process.env.EMAIL_PASS.length >= 10; // Senha de app tem 16 caracteres

if (!isEmailConfigured) {
  console.warn('⚠️  AVISO: EMAIL_USER ou EMAIL_PASS não configurados corretamente no .env');
  console.warn('⚠️  O servidor iniciará, mas não poderá enviar emails.');
  console.warn('⚠️  Configure o arquivo .env com suas credenciais REAIS do Gmail.');
  console.warn('⚠️  Veja o arquivo CONFIGURAR_EMAIL.md para instruções detalhadas.');
}

// Configurar transporter do Nodemailer
let transporter = null;
if (isEmailConfigured) {
  try {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Use App Password do Gmail
      },
    });
    console.log('✅ Transporter configurado com sucesso');
  } catch (error) {
    console.error('❌ Erro ao configurar transporter:', error.message);
  }
} else {
  console.warn('⚠️  Transporter não configurado - emails não serão enviados');
}

// Rota de teste
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Servidor funcionando!' });
});

// Rota para enviar email
app.post('/api/contact', async (req, res) => {
  console.log('📧 Recebida requisição de contato:', {
    name: req.body.name,
    email: req.body.email,
    subject: req.body.subject,
  });

  try {
    // Verificar se o transporter está configurado
    if (!transporter) {
      console.error('❌ Transporter não configurado!');
      return res.status(500).json({
        success: false,
        message: 'Servidor de email não configurado. Por favor, configure o arquivo .env com suas credenciais do Gmail.',
      });
    }

    const { name, email, subject, message } = req.body;

    // Validação básica
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Por favor, preencha todos os campos.',
      });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Por favor, insira um email válido.',
      });
    }

    // Configurar email para enviar
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECEIVER_EMAIL || process.env.EMAIL_USER, // Email que receberá as mensagens
      replyTo: email, // Para poder responder diretamente ao cliente
      subject: `[Vetryn Labs] ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #059669; margin-top: 0;">Nova Mensagem do Site Vetryn Labs</h2>
            
            <div style="margin-top: 20px;">
              <p style="margin: 10px 0;"><strong style="color: #374151;">Nome:</strong> ${name}</p>
              <p style="margin: 10px 0;"><strong style="color: #374151;">Email:</strong> <a href="mailto:${email}" style="color: #059669;">${email}</a></p>
              <p style="margin: 10px 0;"><strong style="color: #374151;">Assunto:</strong> ${subject}</p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e5e7eb;">
              <h3 style="color: #374151; margin-top: 0;">Mensagem:</h3>
              <p style="color: #4b5563; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e5e7eb; text-align: center;">
              <p style="color: #6b7280; font-size: 12px; margin: 0;">
                Esta mensagem foi enviada através do formulário de contato do site Vetryn Labs.
              </p>
            </div>
          </div>
        </div>
      `,
      text: `
Nova Mensagem do Site Vetryn Labs

Nome: ${name}
Email: ${email}
Assunto: ${subject}

Mensagem:
${message}
      `,
    };

    // Enviar email
    console.log('📤 Enviando email para:', process.env.RECEIVER_EMAIL);
    await transporter.sendMail(mailOptions);
    console.log('✅ Email enviado com sucesso!');

    // Opcional: Enviar confirmação para o cliente
    if (process.env.SEND_CONFIRMATION === 'true') {
      const confirmationMail = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Recebemos sua mensagem! - Vetryn Labs',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #059669;">Olá, ${name}!</h2>
            <p>Recebemos sua mensagem e entraremos em contato em breve.</p>
            <p><strong>Assunto:</strong> ${subject}</p>
            <p style="margin-top: 30px; color: #6b7280; font-size: 14px;">
              Atenciosamente,<br>
              Equipe Vetryn Labs
            </p>
          </div>
        `,
      };

      await transporter.sendMail(confirmationMail);
    }

    res.json({
      success: true,
      message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.',
    });
  } catch (error) {
    console.error('❌ Erro ao enviar email:', error);
    console.error('Detalhes do erro:', {
      message: error.message,
      code: error.code,
      command: error.command,
    });
    
    let errorMessage = 'Erro ao enviar mensagem. Por favor, tente novamente mais tarde.';
    
    // Mensagens de erro mais específicas
    if (error.code === 'EAUTH') {
      errorMessage = 'Erro de autenticação. Verifique se o EMAIL_USER e EMAIL_PASS estão corretos no arquivo .env';
    } else if (error.code === 'ECONNECTION') {
      errorMessage = 'Erro de conexão com o servidor de email. Verifique sua conexão com a internet.';
    } else if (error.message) {
      errorMessage = `Erro: ${error.message}`;
    }
    
    res.status(500).json({
      success: false,
      message: errorMessage,
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log('');
  
  if (isEmailConfigured) {
    console.log(`✅ Email configurado: ${process.env.EMAIL_USER}`);
    console.log(`📬 Receberá mensagens em: ${process.env.RECEIVER_EMAIL || process.env.EMAIL_USER}`);
  } else {
    console.log('⚠️  ATENÇÃO: Credenciais de email não configuradas!');
    console.log('⚠️  Configure o arquivo .env com suas credenciais do Gmail.');
    console.log('⚠️  Veja o arquivo CONFIGURAR_EMAIL.md para instruções.');
  }
  console.log('');
});

