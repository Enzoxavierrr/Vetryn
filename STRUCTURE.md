# 📁 Estrutura do Projeto Vetryn

Estrutura moderna e escalável para projetos React + Vite + TypeScript.

## 📂 Organização de Diretórios

```
vetryn/
├─ public/                      # Arquivos estáticos públicos
├─ src/
│  ├─ app/                      # Composição raiz e rotas
│  │  ├─ main.tsx              # Entry point da aplicação
│  │  ├─ App.tsx               # Componente raiz
│  │  └─ routes/               # Rotas da aplicação
│  │     ├─ index.tsx          # Rota "/" (home)
│  │     └─ about.tsx          # Rota "/about"
│  │
│  ├─ components/              # Componentes UI reutilizáveis
│  │  └─ Button.tsx            # Exemplo: componente Button
│  │
│  ├─ features/                # Módulos de domínio/features
│  │                           # Ex.: features/tasks/, features/auth/
│  │
│  ├─ hooks/                   # Custom hooks
│  │  └─ useClickOutside.ts   # Exemplo: hook de click outside
│  │
│  ├─ services/                # API clients, storage, etc
│  │  └─ api.ts               # Cliente HTTP para APIs
│  │
│  ├─ lib/                     # Utils e helpers
│  │  └─ utils.ts             # Funções utilitárias
│  │
│  ├─ styles/                  # Estilos globais
│  │  └─ globals.css          # CSS global
│  │
│  ├─ types/                   # TypeScript types/interfaces
│  │  └─ index.ts             # Tipos compartilhados
│  │
│  ├─ tests/                   # Setup e utils de testes
│  │  └─ setup.ts             # Configuração do Vitest
│  │
│  └─ env.d.ts                # Tipos para import.meta.env
│
├─ .eslintrc.cjs              # Config do ESLint
├─ .prettierrc                # Config do Prettier
├─ index.html                 # HTML template
├─ tsconfig.json              # Config base do TypeScript
├─ tsconfig.app.json          # Config do TypeScript para app
├─ tsconfig.paths.json        # Aliases de paths (@/...)
├─ vite.config.ts             # Config do Vite
└─ package.json               # Dependências e scripts
```

## 🎯 Aliases de Import

O projeto está configurado com aliases para imports mais limpos:

```typescript
// ❌ Evite:
import { Button } from '../../../components/Button';

// ✅ Use:
import { Button } from '@/components/Button';
```

### Aliases disponíveis:

- `@/*` → `./src/*`
- `@/components/*` → `./src/components/*`
- `@/features/*` → `./src/features/*`
- `@/hooks/*` → `./src/hooks/*`
- `@/services/*` → `./src/services/*`
- `@/lib/*` → `./src/lib/*`
- `@/styles/*` → `./src/styles/*`
- `@/types/*` → `./src/types/*`
- `@/tests/*` → `./src/tests/*`

## 🚀 Scripts Disponíveis

```bash
# Desenvolvimento
npm start          # Inicia servidor de dev

# Build
npm run build      # Build de produção

# Testes
npm test           # Roda testes com Vitest

# Linting
npm run lint       # Verifica código com ESLint
```

## 📝 Convenções

### Components

- Use PascalCase para nomes de componentes
- Um componente por arquivo
- Exporte como default ou named export

### Hooks

- Prefixe com `use` (ex: `useClickOutside`)
- Coloque em `src/hooks/`

### Features

- Organize por domínio (ex: `features/auth/`, `features/tasks/`)
- Cada feature pode ter sua própria estrutura interna

### Tipos

- Defina interfaces/types em `src/types/`
- Use PascalCase para tipos e interfaces

## 🧪 Testes

Configurado com Vitest + React Testing Library:

```typescript
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/Button';

test('renders button', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});
```

## 🔧 Tecnologias

- ⚡️ **Vite** - Build tool ultra-rápido
- ⚛️ **React 18** - UI library
- 🔷 **TypeScript** - Type safety
- 🧪 **Vitest** - Testing framework
- 📐 **ESLint** - Linting
- 💅 **Prettier** - Code formatting

## 📚 Próximos Passos

1. Configure um roteador (ex: React Router)
2. Adicione gerenciamento de estado (ex: Zustand, Jotai)
3. Configure CI/CD
4. Adicione mais componentes UI
5. Implemente features de negócio em `src/features/`
