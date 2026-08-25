/**
 * Creativando B2B CMS Data Layer
 * Centralized, decoupled content model for all products, solutions, partners, cases, testimonials, and articles.
 */

const CMS_DATA = {
  brand: {
    name: "Creativando",
    legalName: "Creativando Tecnologia e Soluções B2B",
    slogan: "Do Servidor ao Click",
    tagline: "Tecnologia que transforma desafios em resultados.",
    subtagline: "Da infraestrutura ao software, entregamos soluções completas para empresas que precisam de mais produtividade, segurança e performance.",
    experienceYears: "15+",
    logo: "public/images/logo.png",
    address: {
      street: "Rua Miguel Rodrigues, 50",
      neighborhood: "Vila Madalena",
      city: "São Paulo",
      state: "SP",
      country: "Brasil",
      full: "Rua Miguel Rodrigues, 50 - Vila Madalena, São Paulo - SP"
    },
    contacts: {
      email: "atendimento@creativando.com.br",
      commercialPhone: "(11) 2626-6170",
      mobilePhones: [
        "(11) 95198-4723",
        "(11) 99787-1714",
        "(11) 96064-6326"
      ],
      whatsappNumber: "551126266170",
      whatsappDefaultText: "Olá! Gostaria de falar com um especialista da Creativando sobre uma solução de tecnologia."
    },
    businessHours: "Segunda a Sexta, das 08h30 às 18h00",
    badges: ["Hardware", "Software", "Infraestrutura", "Suporte Especializado"]
  },

  partners: [
    {
      id: "microsoft",
      name: "Microsoft",
      logo: "public/images/partner-microsoft.jpg",
      badge: "Parceiro Oficial de Soluções",
      headline: "Soluções Microsoft Originais & Suporte Especializado",
      description: "A Creativando é sua parceira confiável para garantir que sua empresa obtenha licenciamento original, implantação segura e suporte técnico de alta performance no ecossistema Microsoft.",
      highlights: [
        "Licenças 100% originais Microsoft 365, Azure e Windows Server",
        "Suporte técnico ágil e eficiente para ambientes corporativos",
        "Confiança e experiência com implantação consultiva"
      ],
      categories: ["Software", "Nuvem", "Sistemas Operacionais"],
      contact: "11 2626-6170"
    },
    {
      id: "adobe",
      name: "Adobe",
      logo: "public/images/partner-adobe.jpg",
      badge: "Revendedor Autorizado Adobe Creative Cloud",
      headline: "Dê asas à sua criatividade com a Adobe",
      description: "Na Creativando, oferecemos os produtos e planos corporativos originais Adobe que sua equipe precisa para criar, renderizar e dar vida às suas ideias com máxima produtividade.",
      highlights: [
        "Adobe Creative Cloud for Teams e Enterprise",
        "Gerenciamento simplificado de licenças no portal corporativo",
        "Aceleração de fluxos em vídeo, 3D, design e pós-produção"
      ],
      categories: ["Design", "Audiovisual", "Software Criativo"],
      contact: "11 2626-6170"
    },
    {
      id: "google",
      name: "Google",
      logo: "public/images/partner-google.jpg",
      badge: "Especialista em Soluções Google Workspace",
      headline: "Quer elevar sua presença online e produtividade?",
      description: "Estamos prontos para guiar sua empresa pelas soluções Google que atendem com perfeição às suas necessidades corporativas e colaborativas.",
      highlights: [
        "Estratégias personalizadas para migração para o Google Workspace",
        "Mais visibilidade, colaboração e produtividade para o seu negócio",
        "Soluções Google confiáveis, seguras e com SLA corporativo"
      ],
      categories: ["Produtividade Cloud", "Email Corporativo", "Colaboração"],
      contact: "11 2626-6170"
    },
    {
      id: "benq",
      name: "BenQ",
      logo: "public/images/partner-benq.jpg",
      badge: "Distribuidor Especialista BenQ Profissional",
      headline: "Sua experiência visual e precisão de cor importam",
      description: "Com a Creativando e os monitores e projetores BenQ, sua empresa desfruta de calibração profissional, resolução 4K HDR e confiabilidade para projetos críticos.",
      highlights: [
        "Monitores profissionais para Design (PD Series) e Fotografia/Vídeo (SW Series)",
        "Projetores corporativos e educacionais de alto brilho e tecnologia laser",
        "Garantia e suporte com atendimento técnico especializado"
      ],
      categories: ["Monitores 4K", "Projetores", "Painéis Interativos"],
      contact: "11 2626-6170"
    },
    {
      id: "kaspersky",
      name: "Kaspersky",
      logo: "public/images/partner-kaspersky.jpg",
      badge: "Líder em Cibersegurança Corporativa",
      headline: "Proteger o digital é essencial para o seu negócio",
      description: "Com a Kaspersky e a Creativando, a segurança cibernética dos seus servidores, computadores e dados estratégicos está em mãos verdadeiramente confiáveis.",
      highlights: [
        "Proteção avançada contra ransomware, phishing e ameaças zero-day",
        "Navegação segura, criptografia de dados e privacidade total",
        "Tecnologia líder mundial em testes independentes de cibersegurança"
      ],
      categories: ["Cibersegurança", "Proteção de Endpoints", "Segurança de Servidores"],
      contact: "11 2626-6170"
    }
  ],

  solutions: [
    {
      id: "infraestrutura",
      title: "Infraestrutura de TI",
      shortDesc: "Projetos, equipamentos e implantação de ambientes tecnológicos seguros e escaláveis.",
      fullDesc: "Planejamento e estruturação completa do ambiente tecnológico da sua empresa, desde servidores e data centers até redes cabeadas e wireless de alta performance.",
      icon: "Network",
      slug: "/solucoes/infraestrutura",
      features: [
        "Projetos de Redes Estruturadas Cat6/Cat6A e Fibra Óptica",
        "Implantação e Configuração de Servidores Rack e Tower",
        "Roteamento Corporativo, Firewalls UTM e VPNs Seguras",
        "Sistemas de Armazenamento NAS/SAN e Backup Automatizado",
        "Nobreaks Senoidais de Dupla Conversão e Climatização de Racks",
        "Auditoria e Reestruturação de Cabeamento e Data Centers"
      ],
      benefits: [
        "Disponibilidade contínua e redução de paradas não programadas",
        "Escalabilidade para suportar o crescimento da sua empresa",
        "Segurança de dados e conformidade com boas práticas de TI"
      ]
    },
    {
      id: "hardware",
      title: "Hardware & Equipamentos",
      shortDesc: "Equipamentos profissionais para produtividade e alta performance em aplicações exigentes.",
      fullDesc: "Fornecimento consultivo de estações de trabalho sob medida, computadores corporativos, notebooks robustos, monitores de alta fidelidade e projetores.",
      icon: "Cpu",
      slug: "/solucoes/hardware",
      features: [
        "Workstations de Alta Performance para 3D, CAD, Vídeo e IA",
        "Desktops e Notebooks Corporativos com garantia empresarial on-site",
        "Monitores Profissionais Calibrados de Fábrica (BenQ / Dell)",
        "Projetores e Telas Interativas para Salas de Reunião e Auditórios",
        "Servidores dedicados e Storages de Alta Confiabilidade",
        "Periféricos e Acessórios Profissionais Homologados"
      ],
      benefits: [
        "Aumento expressivo na velocidade de renderização e processamento",
        "Equipamentos dimensionados exatamente para o fluxo de trabalho da sua equipe",
        "Garantia estendida e suporte direto com os principais fabricantes"
      ]
    },
    {
      id: "software",
      title: "Software & Licenciamento",
      shortDesc: "Licenciamento oficial e soluções integradas para produtividade e colaboração.",
      fullDesc: "Aquisição transparente, legalizada e otimizada de softwares essenciais. Consultoria em modelos de licenciamento CSP, Enterprise e Open.",
      icon: "Layers",
      slug: "/solucoes/software",
      features: [
        "Microsoft 365 (Business Basic, Standard, Premium e Enterprise E3/E5)",
        "Adobe Creative Cloud for Teams (Suíte completa ou aplicativos individuais)",
        "Google Workspace (Business Starter, Standard, Plus e Enterprise)",
        "Kaspersky Endpoint Security Cloud e proteção para servidores",
        "Sistemas Operacionais Windows Server e Windows 11 Pro",
        "Consultoria para regularização de licenças e conformidade de software"
      ],
      benefits: [
        "Segurança jurídica com 100% de conformidade de licenciamento",
        "Centralização e fácil gestão de renovações anuais ou mensais",
        "Suporte para ativação, migração de contas e atribuição de usuários"
      ]
    },
    {
      id: "suporte",
      title: "Suporte Especializado",
      shortDesc: "Atendimento técnico especializado, monitoramento proativo e acompanhamento contínuo.",
      fullDesc: "Mais do que resolver incidentes: cuidamos preventivamente da sua infraestrutura como se fosse nossa, garantindo tranquilidade para o seu negócio operar.",
      icon: "Headphones",
      slug: "/solucoes/suporte",
      features: [
        "Helpdesk e Service Desk Níveis 1, 2 e 3",
        "Monitoramento Proativo de Servidores e Links (NOC)",
        "Manutenção Preventiva e Corretiva de Equipamentos",
        "Gestão de Backups e Planos de Recuperação de Desastres (DRP)",
        "Consultoria e Planejamento Estratégico de TI (vCIO)",
        "SLA com atendimento rápido presencial e remoto em São Paulo e região"
      ],
      benefits: [
        "Redução de custos operacionais com equipe de TI interna",
        "Atendimento humanizado e focado na resolução rápida de problemas",
        "Prevenção ativa contra falhas e paradas inesperadas"
      ]
    },
    {
      id: "treinamentos",
      title: "Treinamentos Corporativos",
      shortDesc: "Capacitação prática para equipes e profissionais maximizarem o uso das ferramentas.",
      fullDesc: "Treinamentos sob medida para equipes corporativas dominarem softwares de criação, ferramentas de colaboração e boas práticas de segurança digital.",
      icon: "GraduationCap",
      slug: "/solucoes/treinamentos",
      features: [
        "Capacitação em Ferramentas Adobe (Photoshop, Illustrator, Premiere, After Effects)",
        "Treinamento de Produtividade em Microsoft 365 e Teams",
        "Workshops de Conscientização em Cibersegurança Corporativa",
        "Boas Práticas de Trabalho Colaborativo em Nuvem Google",
        "Aulas práticas presenciais ou online ao vivo",
        "Material de apoio e certificado de participação"
      ],
      benefits: [
        "Aumento imediato da produtividade das equipes",
        "Redução de erros operacionais e retrabalho",
        "Melhor aproveitamento dos investimentos em software"
      ]
    },
    {
      id: "locacao",
      title: "Locação de Equipamentos",
      shortDesc: "Equipamentos de alta performance para projetos temporários, expansões e eventos.",
      fullDesc: "Flexibilidade total para sua empresa: aluguel de curto e longo prazo de computadores, workstations, notebooks e projetores com manutenção inclusa.",
      icon: "Clock",
      slug: "/solucoes/locacao",
      features: [
        "Locação de Workstations de Alta Performance para Projetos Especiais",
        "Aluguel de Lotes de Notebooks e Desktops para Expansão Temporária",
        "Equipamentos para Eventos, Feiras, Congressos e Treinamentos",
        "Projetores e Telas para Apresentações Executivas",
        "Substituição imediata em caso de falha técnica (Backup Machine)",
        "Vantagens fiscais de OPEX com dedução tributária para empresas"
      ],
      benefits: [
        "Preservação do capital de giro sem necessidade de compra imediata",
        "Equipamentos sempre atualizados e prontos para uso",
        "Suporte técnico e manutenção total durante o contrato"
      ]
    }
  ],

  products: [
    {
      id: "soft-m365-premium",
      name: "Microsoft 365 Business Premium (Licença Oficial)",
      category: "software",
      categoryName: "Software & Cloud",
      badge: "Licença Oficial PJ",
      image: "public/images/partner-microsoft.jpg",
      shortDesc: "A solução corporativa completa: aplicativos Office, segurança avançada Defender e gerenciamento de dispositivos Intune.",
      specs: [
        "Aplicativos: Word, Excel, PowerPoint, Outlook, Teams, OneDrive (1TB)",
        "Segurança: Microsoft Defender for Business contra Ransomware e Phishing",
        "Gerenciamento: Microsoft Intune para controle de PCs e Celulares",
        "Proteção de Dados: Prevenção contra Perda de Dados (DLP) e Criptografia",
        "Faturamento: Mensal ou Anual faturado para PJ com nota fiscal oficial",
        "Suporte: Ativação assistida pela equipe técnica da Creativando"
      ],
      targetAudience: "Empresas de 5 a 300 colaboradores que buscam produtividade e blindagem contra ataques cibernéticos"
    },
    {
      id: "soft-adobe-cct",
      name: "Adobe Creative Cloud for Teams (Todas as Aplicações)",
      category: "software",
      categoryName: "Design & Criatividade",
      badge: "Original & Autorizado",
      image: "public/images/partner-adobe.jpg",
      shortDesc: "Acesso a mais de 20 aplicativos de criação líderes mundiais com painel administrativo e suporte corporativo.",
      specs: [
        "Apps Inclusos: Photoshop, Illustrator, Premiere Pro, After Effects, InDesign, Acrobat Pro, etc.",
        "Armazenamento Cloud: 1TB por licença com controle de versionamento",
        "Recursos de IA: Créditos generativos Adobe Firefly inclusos",
        "Console de Administração: Fácil reatribuição de licenças entre colaboradores",
        "Garantia de conformidade para empresas e órgãos públicos",
        "Atendimento e suporte direto com especialista Creativando"
      ],
      targetAudience: "Departamentos de Marketing, Agências, Estúdios Criativos e Produtoras"
    },
    {
      id: "soft-google-workspace",
      name: "Google Workspace Enterprise & Business",
      category: "software",
      categoryName: "Colaboração & Nuvem",
      badge: "Especialista Google",
      image: "public/images/partner-google.jpg",
      shortDesc: "Email corporativo seguro com @suaempresa, Google Meet com gravação, Drive compartilhado e segurança avançada.",
      specs: [
        "Gmail Corporativo com proteção avançada antispam e antiphishing",
        "Google Drive com armazenamento em nuvem ilimitado/escalável por usuário",
        "Google Meet para até 500 participantes com cancelamento de ruído e gravação",
        "Controles de segurança, auditoria e conformidade LGPD centralizados",
        "Migração assistida de contas e caixas de email sem interrupção de serviço",
        "Faturamento em Reais para PJ com suporte técnico dedicado"
      ],
      targetAudience: "Empresas que priorizam colaboração em tempo real, mobilidade e comunicação ágil"
    },
    {
      id: "soft-kaspersky-endpoint",
      name: "Kaspersky Endpoint Security Cloud Plus",
      category: "software",
      categoryName: "Cibersegurança",
      badge: "Líder em Segurança",
      image: "public/images/partner-kaspersky.jpg",
      shortDesc: "Proteção em nuvem de última geração para computadores, servidores de arquivos e dispositivos móveis.",
      specs: [
        "Antivírus de Próxima Geração com Inteligência Artificial baseada em comportamento",
        "Proteção contra Ransomware e reversão automática de arquivos atacados",
        "Controle Web, Bloqueio de Dispositivos USB e Gerenciamento de Patches de Segurança",
        "Console 100% em Nuvem: Sem necessidade de servidor dedicado na empresa",
        "Proteção para Microsoft 365 (Emails, OneDrive, SharePoint e Teams)",
        "Relatórios executivos e alertas em tempo real"
      ],
      targetAudience: "Empresas que exigem proteção rigorosa de dados corporativos e conformidade com a LGPD"
    }
  ],

  decisionWizard: [
    {
      id: "infra",
      question: "Quero melhorar minha infraestrutura",
      description: "Redes, servidores, data center, cabeamento estruturado e conectividade.",
      cta: "Encontrar Solução de Infra",
      targetRoute: "/solucoes/infraestrutura",
      icon: "Server"
    },
    {
      id: "cloud",
      question: "Preciso de produtividade e nuvem",
      description: "Microsoft 365, Google Workspace e colaboração digital para equipes corporativas.",
      cta: "Ver Soluções em Nuvem",
      targetRoute: "/produtos",
      icon: "Cloud"
    },
    {
      id: "software",
      question: "Preciso de software e licenças oficiais",
      description: "Adobe Creative Cloud, Kaspersky Cibersegurança e regularização de softwares PJ.",
      cta: "Ver Softwares Originais",
      targetRoute: "/produtos",
      icon: "ShieldCheck"
    },
    {
      id: "suporte",
      question: "Preciso de suporte técnico e NOC",
      description: "Atendimento especializado, gestão proativa e redução de chamados.",
      cta: "Conhecer Suporte Especializado",
      targetRoute: "/solucoes/suporte",
      icon: "Headphones"
    },
    {
      id: "locacao",
      question: "Preciso de locação e outsourcing",
      description: "Outsourcing e locação de soluções tecnológicas para projetos temporários.",
      cta: "Conhecer Locação & Outsourcing",
      targetRoute: "/solucoes/locacao",
      icon: "Calendar"
    },
    {
      id: "duvida",
      question: "Não sei exatamente o que preciso",
      description: "Converse diretamente com nosso consultor sênior para diagnóstico gratuito.",
      cta: "Falar com Especialista",
      targetRoute: "/contato",
      icon: "MessageSquare"
    }
  ],

  diferenciais: [
    {
      title: "Atendimento Consultivo",
      description: "Entendemos a fundo sua necessidade de negócio antes de recomendar qualquer ferramenta ou equipamento.",
      icon: "UserCheck"
    },
    {
      title: "Soluções Completas de Ponta a Ponta",
      description: "Do servidor ao click: integramos hardware, software oficial, infraestrutura e suporte contínuo em um só parceiro.",
      icon: "Workflow"
    },
    {
      title: "Parcerias Estratégicas Homologadas",
      description: "Alianças oficiais com Microsoft, Adobe, Google, BenQ e Kaspersky garantem autenticidade e suporte de primeiro nível.",
      icon: "Award"
    },
    {
      title: "Suporte Especializado e Humanizado",
      description: "Acompanhamento próximo antes, durante e após a implantação, com técnicos certificados e SLA transparente.",
      icon: "ShieldAlert"
    },
    {
      title: "Projetos Sob Medida para o seu Budget",
      description: "Dimensionamento exato de equipamentos e licenças, evitando gastos desnecessários e maximizando o retorno sobre o investimento.",
      icon: "TrendingUp"
    }
  ],

  cases: [
    {
      id: "case-arquitetura",
      client: "Escritório de Arquitetura & Engenharia de Grande Porte",
      segment: "Arquitetura e Projetos BIM",
      problem: "Lentidão crítica na renderização de modelos Revit e Lumion, estações travando durante entregas e perda de prazos de projetos.",
      solution: "Implantação de 15 Workstations Creativando Pro com placas RTX 4080 e processadores de alta frequência, aliadas a servidor de armazenamento NAS 10GbE centralizado.",
      result: "Redução de 65% no tempo de renderização, zero paradas nas semanas de entrega e ganho imediato de 4 horas produtivas por arquiteto/semana.",
      cta: "Ver Case Completo"
    },
    {
      id: "case-produtora",
      client: "Produtora Audiovisual & Pós-Produção",
      segment: "Audiovisual & Conteúdo 4K",
      problem: "Inconsistência de cores entre as ilhas de edição, monitores não calibrados gerando retrabalho na entrega de filmes para clientes.",
      solution: "Padronização com monitores BenQ DesignVue 4K e PhotoVue calibrados com espectrofotômetro, mais licenciamento Adobe Creative Cloud for Teams gerenciado.",
      result: "Fidelidade absoluta de cor em 100% dos materiais entregues, eliminação de refações por desvio cromático e centralização de licenças.",
      cta: "Ver Case Completo"
    },
    {
      id: "case-educacional",
      client: "Colégio e Centro Universitário",
      segment: "Instituição de Ensino",
      problem: "Laboratórios de informática com máquinas defasadas e lentas para cursos de design, robótica e tecnologia, além de falta de controle de segurança.",
      solution: "Renovação completa de 3 laboratórios com equipamentos Creativando, projetores BenQ laser e implementação de Kaspersky Cloud com políticas educacionais.",
      result: "Laboratórios modernos capazes de rodar softwares atuais com fluidez, ambiente 100% protegido contra malware e aprovação unânime dos alunos e professores.",
      cta: "Ver Case Completo"
    }
  ],

  testimonials: [
    {
      quote: "A Creativando entendeu exatamente a urgência e a exigência do nosso setor. A entrega das workstations foi impecável e o suporte pós-venda é um diferencial raro no mercado de TI.",
      author: "Marcelo R.",
      role: "Gerente Comercial",
      company: "Indústria & Soluções Corporativas"
    },
    {
      quote: "Padronizamos todo o nosso parque visual com monitores BenQ e licenças Adobe através da Creativando. O atendimento foi ágil, transparente e 100% consultivo.",
      author: "Rodrigo M.",
      role: "Diretor de Comunicação",
      company: "Agência & Produção Criativa"
    },
    {
      quote: "Conseguimos reduzir custos de infraestrutura e ter previsão financeira exata trabalhando com o licenciamento e suporte corporativo da Creativando. Uma parceria sólida de longo prazo.",
      author: "J. Santos",
      role: "Gerente Financeiro",
      company: "Grupo de Serviços B2B"
    }
  ],

  educacional: {
    headline: "Tecnologia para transformar a educação",
    subheadline: "Soluções completas para colégios, universidades, escolas técnicas, laboratórios maker e salas de aula modernas.",
    offerings: [
      {
        title: "Laboratórios de Computação e Design",
        description: "Computadores e workstations dimensionados para cursos técnicos, robótica, modelagem 3D, programação e criação multimídia.",
        icon: "Monitor"
      },
      {
        title: "Projetores e Telas Interativas",
        description: "Tecnologia BenQ de projeção laser e painéis interativos com recursos antirreflexo e proteção para a visão de alunos e professores.",
        icon: "Projector"
      },
      {
        title: "Licenciamento Acadêmico Oficial",
        description: "Planos especiais com condições diferenciadas de Microsoft 365 Education, Adobe Education e Google Workspace for Education.",
        icon: "BookOpen"
      },
      {
        title: "Infraestrutura de Rede e Wi-Fi de Alta Densidade",
        description: "Conectividade robusta para suportar centenas de alunos conectados simultaneamente com segurança e controle de navegação.",
        icon: "Wifi"
      }
    ]
  },

  blog: [
    {
      id: "post-1",
      slug: "guia-workstation-render-3d-2026",
      title: "Como escolher a Workstation ideal para 3D, Render e Arquitetura em 2026",
      summary: "Entenda a real diferença entre processadores de alto clock, GPUs profissionais RTX e memória ECC na prática dos projetos complexos.",
      category: "Hardware",
      date: "24 de Fevereiro de 2026",
      readTime: "6 min de leitura",
      image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "post-2",
      slug: "microsoft-365-ou-google-workspace",
      title: "Microsoft 365 ou Google Workspace: Qual a melhor suíte para a sua empresa?",
      summary: "Comparativo técnico e de custos entre as duas maiores plataformas corporativas de produtividade, segurança e colaboração em nuvem.",
      category: "Software",
      date: "18 de Fevereiro de 2026",
      readTime: "8 min de leitura",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "post-3",
      slug: "ciberseguranca-kaspersky-protegendo-pj",
      title: "Cibersegurança Corporativa: Como proteger sua rede contra ataques de Ransomware",
      summary: "As melhores práticas com Kaspersky Endpoint Security para blindar servidores, dados financeiros e estações de trabalho de colaboradores.",
      category: "Segurança",
      date: "10 de Fevereiro de 2026",
      readTime: "5 min de leitura",
      image: "public/images/partner-kaspersky.jpg"
    },
    {
      id: "post-4",
      slug: "importancia-calibracao-monitores-benq",
      title: "Por que a calibração de fábrica em monitores BenQ é essencial para agências e produtoras",
      summary: "Evite retrabalhos com clientes por desvio de cores: entenda as normas sRGB, DCI-P3, Delta E e a certificação Pantone Validated.",
      category: "Hardware",
      date: "02 de Fevereiro de 2026",
      readTime: "7 min de leitura",
      image: "public/images/partner-benq.jpg"
    }
  ],

  faqs: [
    {
      question: "A Creativando atende empresas em todo o Brasil?",
      answer: "Sim! Entregamos equipamentos com seguro total para todo o território nacional e fornecemos licenciamento de software com ativação digital imediata em qualquer localidade."
    },
    {
      question: "Como funciona a emissão de notas fiscais e faturamento B2B?",
      answer: "Trabalhamos com faturamento direto para Pessoa Jurídica (PJ), com emissão de nota fiscal eletrônica, opções de boleto bancário parcelado para empresas aprovadas em análise de crédito e cartão corporativo."
    },
    {
      question: "Os softwares fornecidos pela Creativando são 100% originais?",
      answer: "Absolutamente sim. Somos parceiros oficiais e revendedores autorizados de Microsoft, Adobe, Google e Kaspersky. Todas as licenças são emitidas diretamente nos portais oficiais dos fabricantes no nome da sua empresa."
    },
    {
      question: "Posso personalizar a configuração da minha Workstation?",
      answer: "Sim, esse é um dos nossos grandes diferenciais. Nossos consultores dimensionam processador, placa de vídeo, quantidade de RAM e armazenamento de acordo com os softwares que sua equipe utiliza diariamente."
    },
    {
      question: "Qual o prazo médio para recebimento de um orçamento?",
      answer: "Nossa equipe comercial responde solicitações de orçamento em até 2 horas úteis, com proposta técnica detalhada e opções de configuração."
    }
  ]
};

// Export to global scope for browser usage
if (typeof window !== "undefined") {
  window.CMS_DATA = CMS_DATA;
}
