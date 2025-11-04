import { useState } from 'react';

export default function Index() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Bem-vindo ao Vetryn</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Contador: {count}
        </button>
        <p>
          Edite <code>src/app/routes/index.tsx</code> para começar
        </p>
      </div>
    </div>
  );
}
