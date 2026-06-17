# Hands-on SCANSOURCE — E2E Automation

Suite de testes end-to-end para os fluxos de **cadastro de usuários** e **compra de produtos** da [Automation Test Store](https://automationteststore.com), desenvolvida com Playwright + Cucumber + TypeScript.

## Stack

| | |
|---|---|
| Linguagem | TypeScript |
| Runner | Cucumber.js 11 |
| Browser | Playwright (Chromium) |
| Relatório | Allure Report + Cucumber HTML |
| CI/CD | GitHub Actions + GitHub Pages |

## Decisões técnicas

- **BDD com Gherkin**: cenários escritos em linguagem de negócio, legíveis para qualquer membro do time, desacoplados da implementação técnica
- **Page Object Model**: seletores e ações isolados por página; steps não conhecem o DOM
- **Data-driven com JSON**: massa de teste em `data/cadastro-massa.json`; nenhum dado fixo nos steps ou nas páginas
- **Isolamento por cenário**: browser criado e destruído a cada cenário via `Before`/`After`, eliminando dependência entre testes
- **Evidências visuais**: screenshot `fullPage` capturado no último `Then` de cada cenário e anexado diretamente ao passo no Allure
- **Multi-ambiente**: `baseURL` controlada por `NODE_ENV`; estrutura pronta para QA e DEV sem alterar código de teste

## Cobertura

| Feature | Cenário | Clientes | Tag |
|---|---|---|---|
| `cadastro.feature` | Registrar novo usuário e validar tela de confirmação | 3 (data-driven) | `@smoke` |
| `compra.feature` | Cadastro → adicionar 3 produtos → carrinho → checkout | 3 (data-driven) | `@smoke` |

6 cenários no total. Cada um executa com dados independentes para garantir paralelizabilidade futura.

## Estrutura

```
├── features/               # Cenários Gherkin
│   ├── cadastro.feature
│   └── compra.feature
├── step-definitions/       # Implementação dos steps em TypeScript
├── pages/                  # Page Objects (BasePage, HomePage, CadastroPage, CompraPage)
├── support/
│   ├── world.ts            # PlaywrightWorld — browser, context, page e POs por cenário
│   └── hooks.ts            # Before/After, setup do Allure e environment.properties
├── data/
│   └── cadastro-massa.json # Massa de teste com 3 clientes
├── config/                 # baseUrl por ambiente (qa | dev)
└── cucumber.js             # Perfis e formatters (Allure, HTML, JSON)
```

## Instalação

**Node.js ≥ 18** necessário.

```bash
npm install
npx playwright install chromium
cp .env.example .env
```

## Execução

```bash
npm test                  # suíte completa (QA)
npm run test:smoke        # apenas @smoke
npm run test:headed       # browser visível
npm run test:debug        # Playwright Inspector
npm run test:dev          # ambiente DEV
```

## Relatórios

Após executar os testes:

```bash
npm run allure:generate   # compila o HTML com histórico e trend
npm run allure:open       # abre no navegador
```

O relatório Cucumber HTML é gerado automaticamente em `cucumber-report/index.html` a cada execução.

> Os screenshots capturados no último passo de cada cenário ficam visíveis diretamente na timeline do teste no Allure.

## Pipeline CI

Workflow em `.github/workflows/ci.yml`:

| Gatilho | Comportamento |
|---|---|
| `push` em `main` | Executa QA, gera Allure e publica no GitHub Pages |
| `pull_request` para `main` | Executa QA e salva artifacts (sem deploy) |
| `workflow_dispatch` | Manual — permite escolher ambiente e tag de filtro |

O histórico do Allure é preservado entre execuções via cache, gerando trend de estabilidade ao longo do tempo.
