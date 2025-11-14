// Script para testar o servidor de email
import dotenv from 'dotenv';
dotenv.config();

const testData = {
  name: 'Teste',
  email: 'teste@example.com',
  subject: 'Teste de envio',
  message: 'Esta é uma mensagem de teste do servidor'
};

console.log('🧪 Testando servidor de email...\n');
console.log('Configurações:');
console.log('  EMAIL_USER:', process.env.EMAIL_USER || '❌ NÃO CONFIGURADO');
console.log('  EMAIL_PASS:', process.env.EMAIL_PASS ? '✅ Configurado' : '❌ NÃO CONFIGURADO');
console.log('  RECEIVER_EMAIL:', process.env.RECEIVER_EMAIL || '❌ NÃO CONFIGURADO');
console.log('');

try {
  const response = await fetch('http://localhost:3001/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(testData),
  });

  const data = await response.json();
  
  console.log('Status:', response.status);
  console.log('Resposta:', JSON.stringify(data, null, 2));
  
  if (response.ok && data.success) {
    console.log('\n✅ Teste passou! Email enviado com sucesso.');
  } else {
    console.log('\n❌ Teste falhou:', data.message);
  }
} catch (error) {
  console.error('\n❌ Erro ao testar:', error.message);
  console.error('Certifique-se de que o servidor está rodando: npm run server');
}

