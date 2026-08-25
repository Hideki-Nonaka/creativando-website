# Creativando — Novo Portal Institucional & Comercial B2B

> **Conceito Central:** "Do Servidor ao Click"  
> **Posicionamento:** "Tecnologia que transforma desafios em resultados."  
> **Stack:** Single Page Application (SPA), HTML5 Semântico, Tailwind CSS, Lucide Icons, Vanilla JavaScript / ES Modules, LocalStorage Lead Capture & CRM Ready.

---

## 🌟 Visão Geral do Projeto

Este projeto consiste na reformulação completa da presença digital da **Creativando**, empresa brasileira de tecnologia B2B com sede na Vila Madalena, São Paulo - SP. O site foi projetado com padrão visual corporativo de alto nível (inspirado na sofisticação de empresas globais como Microsoft, Dell, NVIDIA e Apple), priorizando **autoridade técnica, geração de leads, conversão comercial e conformidade legal (LGPD)**.

---

## 📁 Estrutura de Arquivos

```
creativando-website/
├── index.html                   # Página principal com SEO, Schema.org, Header fixo e Footer
├── README.md                    # Documentação técnica e operacional do projeto
├── public/
│   └── images/                  # Imagens oficiais da marca e parceiros
│       ├── logo.png             # Logo oficial Creativando (vermelho e preto)
│       ├── partner-microsoft.jpg # Banner e credenciais Microsoft Originais
│       ├── partner-adobe.jpg     # Banner e credenciais Adobe Creative Cloud
│       ├── partner-google.jpg    # Banner e credenciais Google Workspace
│       ├── partner-benq.jpg      # Banner e credenciais BenQ Monitores & Projetores
│       └── partner-kaspersky.jpg # Banner e credenciais Kaspersky Cibersegurança
└── src/
    ├── app.js                   # Roteador SPA com 21 rotas, configurador e modais
    ├── styles.css               # Estilizações customizadas, animações e glassmorphism
    ├── data/
    │   └── cms-data.js          # Camada desacoplada de dados (CMS) com produtos, parceiros e cases
    └── services/
        └── leadService.js       # Gestão de leads, eventos analíticos (GA4/GTM) e consentimento LGPD
```

---

## 🗺️ Mapa Completo de Rotas (21 Páginas)

| Rota | Descrição |
|---|---|
| `#/` | **Home**: Hero com "Do Servidor ao Click", Seção de Confiança, Soluções, Direcionador Comercial, Workstations, Sobre, Cases, Depoimentos, Educacional, Blog e CTA |
| `#/solucoes` | **Hub de Soluções**: Visão geral de todos os 6 pilares de atendimento |
| `#/solucoes/infraestrutura` | Redes estruturadas Cat6/Fibra, Servidores Rack/Tower, Firewalls e Storages |
| `#/solucoes/hardware` | Workstations de alta performance, desktops corporativos e periféricos |
| `#/solucoes/software` | Licenciamento oficial Microsoft 365, Adobe CC, Google Workspace e Kaspersky |
| `#/solucoes/suporte` | NOC, Helpdesk N1/N2/N3, manutenção preventiva e consultoria de TI |
| `#/solucoes/locacao` | Outsourcing e locação de curto/longo prazo de equipamentos |
| `#/solucoes/treinamentos` | Capacitação corporativa em ferramentas criativas e produtividade |
| `#/produtos` | **Catálogo de Produtos**: Filtros por categoria, especificações e modal de orçamento rápido |
| `#/produtos/workstations` | **Configurador Interativo de Workstations**: Escolha de CPU, GPU, RAM e Storage |
| `#/produtos/monitores` | Monitores profissionais BenQ DesignVue 4K e PhotoVue calibrados |
| `#/produtos/projetores` | Projetores corporativos e educacionais a laser |
| `#/produtos/servidores` | Servidores corporativos Dell PowerEdge e storages de dados |
| `#/marcas` | Vitrine de fabricantes e parceiros oficiais homologados |
| `#/educacional` | Soluções dedicadas para escolas, universidades e laboratórios |
| `#/sobre` | História da Creativando, equipe, diferenciais e endereço oficial na Vila Madalena/SP |
| `#/cases` | Estudos de caso reais estruturados (Cliente / Problema / Solução / Resultado) |
| `#/blog` | Artigos técnicos com dicas de hardware, software, cibersegurança e produtividade |
| `#/contato` | Informações de contato direto, telefones oficiais, mapa e formulário completo |
| `#/orcamento` | Formulário dedicado de cotação corporativa em etapas |
| `#/politica-de-privacidade` | Documento de conformidade com a LGPD (Lei 13.709/2018) |
| `#/politica-de-cookies` | Política e controle granular de cookies |
| `#/etica-compliance` | Diretrizes de compliance, ética e garantia de autenticidade |
| `#/leads-admin` | Painel administrativo local com visualização e **exportação de leads para CSV** |

---

## 🚀 Como Executar o Site

1. **Execução Direta:**
   Abra o arquivo `index.html` em qualquer navegador moderno (Chrome, Edge, Firefox, Safari).

2. **Execução via Servidor Local (Recomendado):**
   ```bash
   # Utilizando qualquer servidor web estático (ex.: Live Server, npx serve, python http.server)
   python -m http.server 8000
   # Acesse: http://localhost:8000
   ```

---

## 🛡️ Dados Reais e Canais Oficiais Integrados

- **Endereço:** Rua Miguel Rodrigues, 50 - Vila Madalena, São Paulo - SP
- **Telefone Comercial (PABX):** (11) 2626-6170
- **WhatsApp / Celulares:** (11) 95198-4723 / (11) 99787-1714 / (11) 96064-6326
- **E-mail:** atendimento@creativando.com.br
- **Parceiros:** Microsoft, Adobe, Google, BenQ, Kaspersky
