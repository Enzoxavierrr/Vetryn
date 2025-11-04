import '@/styles/globals.css';
import Index from './routes/index';

function App() {
  // Aqui você pode adicionar um roteador como React Router no futuro
  // Por enquanto, vamos renderizar a rota index
  const currentPath = window.location.pathname;

  return (
    <div className="min-h-screen">
      {currentPath === '/about' ? (
        <div>
          <h1>Sobre</h1>
          <p>Página em construção</p>
          <a href="/">Voltar</a>
        </div>
      ) : (
        <Index />
      )}
    </div>
  );
}

export default App;
