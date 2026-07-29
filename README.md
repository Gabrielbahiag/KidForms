# RX da Minha Rotina de Estudos

Versão digital do teste de rotina de estudos da Orientação Educacional do CEF 15
de Taguatinga. O aluno responde 16 afirmações em 4 categorias e recebe um
resultado ilustrado com mascotes-animais animados (Lottie), um gráfico radar do
seu perfil de estudos e a opção de baixar tudo em PDF.

React + TypeScript + Vite + Tailwind CSS, 100% client-side (nenhum dado é salvo
em servidor).

## Rodando localmente

Este projeto usa uma versão portátil do Node (pasta `node/` na raiz), já que a
máquina não tem acesso admin para instalar o Node globalmente.

1. Abra um terminal na raiz do projeto.
2. Adicione a pasta `node/` ao PATH da sessão:
   - **PowerShell**: `$env:PATH = "$PWD\node;$env:PATH"`
   - **Git Bash**: `export PATH="$PWD/node:$PATH"`
3. Instale as dependências (só precisa na primeira vez, ou quando o `package.json` mudar):
   ```
   npm.cmd install
   ```
4. Suba o servidor de desenvolvimento:
   ```
   npm.cmd run dev
   ```
5. Abra o endereço mostrado no terminal (normalmente `http://localhost:5173`) no navegador.

> **PowerShell + "npm.ps1 não pode ser carregado" / política de execução desabilitada:**
> use `npm.cmd` em vez de `npm` nos comandos acima (como já está feito aqui). O
> PowerShell tenta rodar `npm.ps1` por padrão, que é bloqueado pela política de
> scripts do Windows — `npm.cmd` faz a mesma coisa sem esbarrar nessa política, e
> não exige acesso admin nem mudar nenhuma configuração do sistema.

Outros comandos úteis:
- `npm.cmd run build` — gera a versão de produção em `dist/`
- `npm.cmd run preview` — serve a build de produção localmente para conferir

## Estrutura

- `src/data/quizData.ts` — perguntas e categorias do teste (texto do formulário original)
- `src/data/animalContent.ts` — mensagens e mascotes por faixa de pontuação
- `src/lib/scoring.ts` — cálculo da pontuação
- `src/lib/pdfExport.ts` — geração do relatório em PDF
- `src/components/` — telas e componentes de UI
- `src/assets/lottie/` — animações dos mascotes (Lottie Simple License, via LottieFiles)
