/**
 * Creativando B2B Single Page Application Core
 * Router, View Renderers, Workstation Configurator, Lead Capture, LGPD, and Modals
 */

// Simple State Store
const AppState = {
  currentRoute: "/",
  activeProductCategory: "all",
  searchQuery: "",
  selectedProductForModal: null,
  isQuoteModalOpen: false,
  isQuickViewModalOpen: false,
  isMobileMenuOpen: false,
  toastMessage: null,
  workstationConfig: {
    cpu: "AMD Ryzen 9 7950X (16-Core, 32-Threads, 5.7GHz)",
    gpu: "NVIDIA GeForce RTX 4080 Super 16GB GDDR6X",
    ram: "64GB DDR5 5600MHz Kingston Fury Beast",
    storage: "2TB SSD NVMe Gen4 M.2 (7400MB/s) + 4TB HDD",
    cooling: "Liquid Cooler 360mm Silencioso ARGB",
    os: "Windows 11 Pro 64-bit Original",
    usage: "Renderização 3D, V-Ray, Blender, Lumion e Unreal Engine"
  }
};

// Router Table
const routes = {
  "/": renderHome,
  "/solucoes": renderSolucoesOverview,
  "/solucoes/infraestrutura": () => renderSolutionDetail("infraestrutura"),
  "/solucoes/hardware": () => renderSolutionDetail("hardware"),
  "/solucoes/software": () => renderSolutionDetail("software"),
  "/solucoes/suporte": () => renderSolutionDetail("suporte"),
  "/solucoes/locacao": () => renderSolutionDetail("locacao"),
  "/solucoes/treinamentos": () => renderSolutionDetail("treinamentos"),
  "/produtos": renderProdutosCatalog,
  "/marcas": renderMarcasPage,
  "/educacional": renderEducacionalPage,
  "/sobre": renderSobrePage,
  "/cases": renderCasesPage,
  "/blog": renderBlogPage,
  "/contato": renderContatoPage,
  "/orcamento": renderOrcamentoPage,
  "/politica-de-privacidade": renderPoliticaPrivacidade,
  "/politica-de-cookies": renderPoliticaCookies,
  "/etica-compliance": renderEticaCompliance,
  "/leads-admin": renderLeadsAdmin
};

// Navigation Helper
function navigateTo(path) {
  window.location.hash = path;
}

// Router Event Listener
function handleRouteChange() {
  const rawHash = window.location.hash.slice(1) || "/";
  const cleanPath = rawHash.split("?")[0] || "/";
  AppState.currentRoute = cleanPath;
  AppState.isMobileMenuOpen = false;

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" });

  const renderer = routes[cleanPath] || renderNotFound;
  const appContainer = document.getElementById("app-root");
  
  if (appContainer) {
    appContainer.innerHTML = renderer();
    postRenderSetup();
  }

  // Update active navigation styling
  updateNavLinks();

  // Track page view event
  if (window.LeadService) {
    LeadService.trackEvent("view_page", { path: cleanPath, title: document.title });
  }
}

// Helper: Show Toast
function showToast(message, type = "success") {
  AppState.toastMessage = { message, type };
  const toastContainer = document.getElementById("toast-container");
  if (!toastContainer) return;

  toastContainer.innerHTML = `
    <div class="toast-slide-in flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl ${
      type === "success" ? "bg-slate-900 text-white border border-emerald-500/30" : "bg-red-900 text-white"
    }">
      <i data-lucide="${type === "success" ? "check-circle-2" : "alert-circle"}" class="w-5 h-5 text-emerald-400"></i>
      <span class="text-sm font-medium">${message}</span>
      <button onclick="dismissToast()" class="ml-4 text-slate-400 hover:text-white">
        <i data-lucide="x" class="w-4 h-4"></i>
      </button>
    </div>
  `;
  if (window.lucide) lucide.createIcons();

  setTimeout(() => {
    dismissToast();
  }, 4500);
}

function dismissToast() {
  const toastContainer = document.getElementById("toast-container");
  if (toastContainer) toastContainer.innerHTML = "";
}

// Global Modal Handlers
function openQuoteModal(productName = null, solutionType = null) {
  AppState.selectedProductForModal = productName;
  const modal = document.getElementById("quote-modal-container");
  if (!modal) return;

  modal.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div class="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-6 md:p-8 relative border border-slate-100 max-h-[90vh] overflow-y-auto">
        <button onclick="closeQuoteModal()" class="absolute top-5 right-5 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>

        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
            <i data-lucide="file-text" class="w-5 h-5"></i>
          </div>
          <div>
            <span class="text-xs font-bold uppercase tracking-wider text-red-600">Atendimento Comercial B2B</span>
            <h3 class="text-xl font-extrabold text-slate-900">Solicitar Orçamento Personalizado</h3>
          </div>
        </div>

        ${productName ? `
          <div class="mb-5 p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-sm">
            <span class="text-slate-600">Item Selecionado:</span>
            <span class="font-bold text-slate-900">${productName}</span>
          </div>
        ` : ""}

        <form id="modal-quote-form" onsubmit="handleQuoteSubmit(event)" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Nome Completo *</label>
              <input type="text" name="name" required placeholder="Seu nome" class="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none text-sm" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Empresa / Razão Social *</label>
              <input type="text" name="company" required placeholder="Nome da empresa" class="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none text-sm" />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">E-mail Corporativo *</label>
              <input type="email" name="email" required placeholder="voce@empresa.com.br" class="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none text-sm" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Telefone / WhatsApp *</label>
              <input type="tel" name="phone" required placeholder="(11) 99999-9999" class="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none text-sm" />
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Solução Desejada</label>
            <select name="solutionType" class="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none text-sm bg-white">
              <option value="Software e Licenciamento" ${solutionType === 'software' ? 'selected' : ''}>Softwares Originais (Microsoft, Adobe, Google, Kaspersky)</option>
              <option value="Infraestrutura de TI" ${solutionType === 'infraestrutura' ? 'selected' : ''}>Infraestrutura de TI e Conectividade</option>
              <option value="Suporte Técnico" ${solutionType === 'suporte' ? 'selected' : ''}>Suporte Especializado e NOC</option>
              <option value="Locação de Equipamentos" ${solutionType === 'locacao' ? 'selected' : ''}>Locação e Outsourcing</option>
              <option value="Solução Educacional" ${solutionType === 'educacional' ? 'selected' : ''}>Tecnologia Educacional e Escolas</option>
              <option value="Treinamentos Corporativos" ${solutionType === 'treinamentos' ? 'selected' : ''}>Treinamentos Corporativos</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Detalhes do Projeto ou Quantidade</label>
            <textarea name="message" rows="3" placeholder="Ex.: Preciso de 5 estações para edição 4K e renovação de 10 licenças Adobe CC..." class="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none text-sm"></textarea>
          </div>

          <div class="flex items-center gap-2 pt-2">
            <input type="checkbox" id="modal-lgpd" required class="rounded border-slate-300 text-red-600 focus:ring-red-500" checked />
            <label for="modal-lgpd" class="text-xs text-slate-600">
              Concordo com o tratamento de dados para fins de proposta comercial conforme a <a href="#/politica-de-privacidade" class="text-red-600 underline">Política de Privacidade</a>.
            </label>
          </div>

          <button type="submit" class="w-full py-3.5 px-6 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition shadow-lg shadow-red-600/25 flex items-center justify-center gap-2">
            <span>Enviar Solicitação de Orçamento</span>
            <i data-lucide="arrow-right" class="w-4 h-4"></i>
          </button>
        </form>
      </div>
    </div>
  `;
  if (window.lucide) lucide.createIcons();
}

function closeQuoteModal() {
  const modal = document.getElementById("quote-modal-container");
  if (modal) modal.innerHTML = "";
}

function handleQuoteSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);

  const leadData = {
    name: formData.get("name"),
    company: formData.get("company"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    solutionType: formData.get("solutionType"),
    product: AppState.selectedProductForModal,
    message: formData.get("message")
  };

  LeadService.captureLead(leadData);
  closeQuoteModal();
  showToast("Solicitação enviada com sucesso! Um especialista comercial entrará em contato em breve.", "success");
}

// -------------------------------------------------------------
// POST RENDER SETUP
// -------------------------------------------------------------
function postRenderSetup() {
  if (window.lucide) lucide.createIcons();

  // Highlight current nav item
  updateNavLinks();

  // Check cookie consent
  initCookieBanner();
}

function updateNavLinks() {
  const links = document.querySelectorAll("[data-route-link]");
  links.forEach(l => {
    const route = l.getAttribute("data-route-link");
    if (route === AppState.currentRoute) {
      l.classList.add("text-red-600", "font-bold");
      l.classList.remove("text-slate-600");
    } else {
      l.classList.remove("text-red-600", "font-bold");
      l.classList.add("text-slate-600");
    }
  });
}

// -------------------------------------------------------------
// VIEWS & TEMPLATES
// -------------------------------------------------------------

// 1. HOME VIEW
function renderHome() {
  const data = CMS_DATA;
  return `
    <div class="space-y-24">
      
      <!-- HERO SECTION -->
      <section class="relative pt-16 pb-20 md:py-28 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 border-b border-slate-200/60">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-extrabold uppercase tracking-wider shadow-sm">
            <span class="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
            ${data.brand.slogan}
          </div>

          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            ${data.brand.tagline.replace("desafios em resultados.", "<span class='text-gradient-brand'>desafios em resultados.</span>")}
          </h1>

          <p class="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            ${data.brand.subtagline}
          </p>

          <!-- CTA Actions -->
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button onclick="openQuoteModal()" class="w-full sm:w-auto px-9 py-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-base transition shadow-xl shadow-red-600/25 flex items-center justify-center gap-3">
              <span>Solicitar Orçamento</span>
              <i data-lucide="arrow-right" class="w-5 h-5"></i>
            </button>
            <a href="#/solucoes" class="w-full sm:w-auto px-8 py-4 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-base transition border border-slate-200 shadow-sm flex items-center justify-center gap-2">
              <span>Conhecer Soluções</span>
              <i data-lucide="chevron-right" class="w-5 h-5 text-slate-400"></i>
            </a>
          </div>

          <!-- Trust Pillars -->
          <div class="pt-8 border-t border-slate-200/80 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs font-semibold text-slate-500">
            <div class="flex items-center gap-1.5"><i data-lucide="check" class="w-4 h-4 text-emerald-600"></i> Hardware Homologado</div>
            <span class="text-slate-300">•</span>
            <div class="flex items-center gap-1.5"><i data-lucide="check" class="w-4 h-4 text-emerald-600"></i> Software 100% Oficial</div>
            <span class="text-slate-300">•</span>
            <div class="flex items-center gap-1.5"><i data-lucide="check" class="w-4 h-4 text-emerald-600"></i> Infraestrutura Crítica</div>
            <span class="text-slate-300">•</span>
            <div class="flex items-center gap-1.5"><i data-lucide="check" class="w-4 h-4 text-emerald-600"></i> Suporte Especializado</div>
          </div>

        </div>
      </section>

      <!-- 9. SEÇÃO DE CONFIANÇA & PARCEIROS HOMOLOGADOS -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-12">
          <span class="text-xs font-extrabold uppercase tracking-wider text-red-600">Alianças Estratégicas</span>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Parceiros e tecnologias que fazem parte das nossas soluções
          </h2>
          <p class="text-slate-600 text-sm sm:text-base mt-2">
            Trabalhamos exclusivamente com fabricantes líderes mundiais para entregar produtos autênticos com suporte e garantia integral.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${data.partners.map(p => `
            <div class="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between card-hover-effect">
              <div>
                <div class="relative overflow-hidden rounded-xl mb-5 aspect-[4/3] bg-slate-950 flex items-center justify-center">
                  <img src="${p.logo}" alt="${p.name}" class="w-full h-full object-cover" />
                  <div class="absolute top-3 left-3 bg-white/95 backdrop-blur px-2.5 py-1 rounded-md text-[11px] font-bold text-slate-900 shadow">
                    ${p.badge}
                  </div>
                </div>

                <h3 class="text-lg font-bold text-slate-900 mb-2">${p.headline}</h3>
                <p class="text-sm text-slate-600 mb-4 leading-relaxed">${p.description}</p>
                
                <ul class="space-y-2 mb-6">
                  ${p.highlights.map(h => `
                    <li class="flex items-start gap-2 text-xs text-slate-700">
                      <i data-lucide="check-circle" class="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5"></i>
                      <span>${h}</span>
                    </li>
                  `).join("")}
                </ul>
              </div>

              <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span class="text-xs font-mono text-slate-500">Contato: ${p.contact}</span>
                <button onclick="openQuoteModal('${p.name}', 'software')" class="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1">
                  <span>Pedir Proposta</span>
                  <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
                </button>
              </div>
            </div>
          `).join("")}
        </div>
      </section>

      <!-- 10. SEÇÃO SOLUÇÕES -->
      <section class="bg-slate-100/70 py-20 border-y border-slate-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span class="text-xs font-extrabold uppercase tracking-wider text-red-600">Portfólio Integrado</span>
              <h2 class="text-3xl font-extrabold text-slate-900 mt-1">Tudo o que sua empresa precisa em tecnologia</h2>
              <p class="text-slate-600 mt-2 max-w-xl">Do Servidor ao Click: projetos pensados para otimizar fluxos de trabalho e potencializar resultados corporativos.</p>
            </div>
            <a href="#/solucoes" class="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-bold text-red-600 hover:text-red-700">
              <span>Ver todas as soluções detalhadas</span>
              <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </a>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${data.solutions.map(s => `
              <div class="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-sm card-hover-effect flex flex-col justify-between">
                <div>
                  <div class="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-6 font-bold">
                    <i data-lucide="${s.icon}" class="w-6 h-6"></i>
                  </div>
                  <h3 class="text-xl font-bold text-slate-900 mb-2">${s.title}</h3>
                  <p class="text-sm text-slate-600 mb-6 leading-relaxed">${s.shortDesc}</p>
                </div>
                <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <a href="#${s.slug}" class="text-sm font-bold text-slate-900 hover:text-red-600 flex items-center gap-1.5 transition">
                    <span>Explorar Solução</span>
                    <i data-lucide="arrow-right" class="w-4 h-4"></i>
                  </a>
                  <button onclick="openQuoteModal('${s.title}', '${s.id}')" class="text-xs font-semibold text-slate-500 hover:text-red-600">
                    Cotar
                  </button>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </section>

      <!-- 11. SEÇÃO "ENCONTRE SUA SOLUÇÃO" (DIRECIONADOR COMERCIAL) -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
          <!-- Background geometric flare -->
          <div class="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-red-600/20 blur-3xl"></div>
          
          <div class="relative z-10 max-w-3xl mb-10">
            <span class="text-xs font-bold uppercase tracking-wider text-red-400">Guia Rápido Comercial</span>
            <h2 class="text-3xl sm:text-4xl font-extrabold text-white mt-1">O que você precisa resolver hoje?</h2>
            <p class="text-slate-300 mt-2">Selecione o seu principal desafio tecnológico para ser direcionado instantaneamente para a solução ideal.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10">
            ${data.decisionWizard.map(item => `
              <div class="bg-slate-800/80 hover:bg-slate-800 rounded-2xl p-6 border border-slate-700/80 transition flex flex-col justify-between">
                <div>
                  <div class="w-10 h-10 rounded-lg bg-slate-700 text-red-400 flex items-center justify-center mb-4">
                    <i data-lucide="${item.icon}" class="w-5 h-5"></i>
                  </div>
                  <h3 class="text-base font-bold text-white mb-2">${item.question}</h3>
                  <p class="text-xs text-slate-300 mb-6 leading-relaxed">${item.description}</p>
                </div>
                <a href="#${item.targetRoute}" class="w-full py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition text-center flex items-center justify-center gap-2">
                  <span>${item.cta}</span>
                  <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                </a>
              </div>
            `).join("")}
          </div>
        </div>
      </section>



      <!-- 14. SEÇÃO SOBRE A CREATIVANDO & 15. DIFERENCIAIS -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div class="lg:col-span-6 space-y-6">
            <span class="text-xs font-extrabold uppercase tracking-wider text-red-600">Institucional & Experiência</span>
            <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Tecnologia com experiência, estratégia e suporte.
            </h2>
            
            <p class="text-slate-600 leading-relaxed text-sm sm:text-base">
              A Creativando nasceu com a missão de transformar o relacionamento das empresas com a tecnologia. Não somos apenas um fornecedor: atuamos como braço estratégico de TI para escritórios, produtoras, instituições de ensino e departamentos de tecnologia em todo o país.
            </p>
            
            <div class="grid grid-cols-2 gap-4 py-2">
              <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div class="text-2xl font-extrabold text-slate-900">${data.brand.experienceYears}</div>
                <div class="text-xs text-slate-500 font-semibold mt-1">Anos de Mercado B2B</div>
              </div>
              <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div class="text-2xl font-extrabold text-red-600">100%</div>
                <div class="text-xs text-slate-500 font-semibold mt-1">Softwares Originais</div>
              </div>
            </div>

            <div class="space-y-3 pt-2">
              ${data.diferenciais.slice(0, 3).map(d => `
                <div class="flex items-start gap-3">
                  <div class="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0 mt-1">
                    <i data-lucide="${d.icon}" class="w-4 h-4"></i>
                  </div>
                  <div>
                    <h3 class="text-sm font-bold text-slate-900">${d.title}</h3>
                    <p class="text-xs text-slate-600 leading-relaxed">${d.description}</p>
                  </div>
                </div>
              `).join("")}
            </div>

            <div class="pt-4">
              <a href="#/sobre" class="inline-flex items-center gap-2 text-sm font-bold text-red-600 hover:text-red-700">
                <span>Conhecer a história e valores da Creativando</span>
                <i data-lucide="arrow-right" class="w-4 h-4"></i>
              </a>
            </div>
          </div>

          <div class="lg:col-span-6 space-y-4">
            <div class="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg">
              <span class="text-xs font-bold uppercase tracking-wider text-red-600">Mais do que tecnologia</span>
              <h3 class="text-2xl font-bold text-slate-900 mt-1 mb-4">Uma parceria para o seu negócio</h3>
              <p class="text-sm text-slate-600 mb-6 leading-relaxed">
                Entendemos que uma escolha errada de hardware ou licenciamento pode gerar meses de retrabalho e prejuízo. Por isso, nosso processo é 100% focado no seu resultado prático.
              </p>

              <div class="space-y-4">
                ${data.diferenciais.slice(3).map(d => `
                  <div class="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                    <div class="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center flex-shrink-0">
                      <i data-lucide="${d.icon}" class="w-4 h-4"></i>
                    </div>
                    <div>
                      <h4 class="text-sm font-bold text-slate-900">${d.title}</h4>
                      <p class="text-xs text-slate-600 mt-0.5">${d.description}</p>
                    </div>
                  </div>
                `).join("")}
              </div>
            </div>
          </div>

        </div>
      </section>

      <!-- 16. CASES DE SUCESSO & 17. DEPOIMENTOS -->
      <section class="bg-slate-100/70 py-20 border-y border-slate-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <!-- Cases Section -->
          <div>
            <div class="text-center max-w-3xl mx-auto mb-12">
              <span class="text-xs font-extrabold uppercase tracking-wider text-red-600">Resultados Comprovados</span>
              <h2 class="text-3xl font-extrabold text-slate-900 mt-1">Tecnologia aplicada a resultados reais</h2>
              <p class="text-slate-600 text-sm sm:text-base mt-2">Confira como nossas soluções transformaram os fluxos operacionais dos nossos clientes.</p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
              ${data.cases.map(c => `
                <div class="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm card-hover-effect flex flex-col justify-between">
                  <div class="space-y-4">
                    <span class="px-2.5 py-1 rounded bg-red-50 text-red-700 text-xs font-bold inline-block">${c.segment}</span>
                    <h3 class="text-lg font-bold text-slate-900">${c.client}</h3>
                    
                    <div class="space-y-3 pt-2 text-xs">
                      <div>
                        <span class="font-bold text-slate-800 uppercase tracking-wider text-[10px]">Problema:</span>
                        <p class="text-slate-600 mt-0.5">${c.problem}</p>
                      </div>
                      <div>
                        <span class="font-bold text-slate-800 uppercase tracking-wider text-[10px]">Solução:</span>
                        <p class="text-slate-600 mt-0.5">${c.solution}</p>
                      </div>
                      <div class="bg-emerald-50 p-3 rounded-xl border border-emerald-200/80">
                        <span class="font-bold text-emerald-800 uppercase tracking-wider text-[10px]">Resultado Alcançado:</span>
                        <p class="text-emerald-900 font-semibold mt-0.5">${c.result}</p>
                      </div>
                    </div>
                  </div>

                  <div class="pt-6 border-t border-slate-100 mt-6">
                    <a href="#/cases" class="text-xs font-bold text-red-600 hover:text-red-700 flex items-center justify-between">
                      <span>Ver Case Completo</span>
                      <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                    </a>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>

          <!-- Depoimentos Reais -->
          <div class="pt-10 border-t border-slate-200">
            <div class="text-center max-w-2xl mx-auto mb-10">
              <span class="text-xs font-extrabold uppercase tracking-wider text-red-600">Reconhecimento</span>
              <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Quem confia na Creativando</h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              ${data.testimonials.map(t => `
                <div class="bg-white rounded-2xl p-6 border border-slate-200 flex flex-col justify-between shadow-sm">
                  <div>
                    <div class="flex items-center gap-1 text-amber-400 mb-4">
                      <i data-lucide="star" class="w-4 h-4 fill-amber-400"></i>
                      <i data-lucide="star" class="w-4 h-4 fill-amber-400"></i>
                      <i data-lucide="star" class="w-4 h-4 fill-amber-400"></i>
                      <i data-lucide="star" class="w-4 h-4 fill-amber-400"></i>
                      <i data-lucide="star" class="w-4 h-4 fill-amber-400"></i>
                    </div>
                    <p class="text-sm text-slate-700 italic leading-relaxed mb-6">"${t.quote}"</p>
                  </div>
                  <div class="pt-4 border-t border-slate-100 flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-slate-900 text-white font-bold text-sm flex items-center justify-center">
                      ${t.author.charAt(0)}
                    </div>
                    <div>
                      <div class="text-sm font-bold text-slate-900">${t.author}</div>
                      <div class="text-xs text-slate-500">${t.role} • ${t.company}</div>
                    </div>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>

        </div>
      </section>

      <!-- 18. SEÇÃO EDUCACIONAL -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div class="lg:col-span-6 space-y-6">
              <span class="text-xs font-extrabold uppercase tracking-wider text-red-600">Setor Educacional</span>
              <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900">
                ${data.educacional.headline}
              </h2>
              <p class="text-slate-600 text-sm sm:text-base leading-relaxed">
                ${data.educacional.subheadline}
              </p>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                ${data.educacional.offerings.map(off => `
                  <div class="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                    <h3 class="text-sm font-bold text-slate-900 mb-1">${off.title}</h3>
                    <p class="text-xs text-slate-600 leading-relaxed">${off.description}</p>
                  </div>
                `).join("")}
              </div>

              <div class="pt-4">
                <a href="#/educacional" class="px-7 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition inline-flex items-center gap-2 shadow-lg shadow-red-600/25">
                  <span>Criar Solução Educacional</span>
                  <i data-lucide="arrow-right" class="w-4 h-4"></i>
                </a>
              </div>
            </div>

            <div class="lg:col-span-6">
              <div class="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 aspect-video lg:aspect-[4/3]">
                <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1000&q=80" alt="Soluções Educacionais Creativando" class="w-full h-full object-cover" />
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- 19. BLOG CORPORATIVO -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span class="text-xs font-extrabold uppercase tracking-wider text-red-600">Conhecimento Técnico</span>
            <h2 class="text-3xl font-extrabold text-slate-900 mt-1">Conteúdo para quem vive tecnologia</h2>
            <p class="text-slate-600 mt-2 max-w-xl">Artigos, comparativos e guias técnicos preparados pelos nossos especialistas em TI.</p>
          </div>
          <a href="#/blog" class="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-bold text-red-600 hover:text-red-700">
            <span>Ver todos os artigos</span>
            <i data-lucide="arrow-right" class="w-4 h-4"></i>
          </a>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          ${data.blog.map(b => `
            <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden card-hover-effect flex flex-col justify-between">
              <div>
                <div class="relative h-40 bg-slate-100 overflow-hidden">
                  <img src="${b.image}" alt="${b.title}" class="w-full h-full object-cover" />
                  <span class="absolute top-3 left-3 px-2 py-0.5 rounded bg-slate-900/90 text-white text-[10px] font-bold">
                    ${b.category}
                  </span>
                </div>
                <div class="p-5">
                  <span class="text-[11px] text-slate-400 font-medium">${b.date} • ${b.readTime}</span>
                  <h3 class="text-sm font-bold text-slate-900 mt-1.5 mb-2 line-clamp-2">${b.title}</h3>
                  <p class="text-xs text-slate-600 line-clamp-3 leading-relaxed">${b.summary}</p>
                </div>
              </div>
              <div class="p-5 pt-0">
                <a href="#/blog" class="text-xs font-bold text-red-600 hover:text-red-700 inline-flex items-center gap-1">
                  <span>Ler artigo</span>
                  <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
                </a>
              </div>
            </div>
          `).join("")}
        </div>
      </section>

      <!-- 20. CTA FINAL DE ALTA CONVERSÃO -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-gradient-to-r from-red-600 via-red-700 to-slate-900 rounded-3xl p-8 sm:p-14 text-white shadow-2xl relative overflow-hidden text-center">
          <div class="max-w-3xl mx-auto space-y-6 relative z-10">
            <span class="text-xs font-extrabold uppercase tracking-widest text-red-200">Próximo Passo</span>
            <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Vamos encontrar a tecnologia certa para o seu negócio?
            </h2>
            <p class="text-base sm:text-lg text-red-100 max-w-2xl mx-auto leading-relaxed">
              Conte o que sua empresa precisa. Nossa equipe técnica e comercial ajuda você a desenhar a solução ideal com máxima eficiência de custos.
            </p>

            <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button onclick="openQuoteModal()" class="w-full sm:w-auto px-8 py-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-base transition shadow-xl flex items-center justify-center gap-2">
                <i data-lucide="file-text" class="w-5 h-5 text-red-600"></i>
                <span>Solicitar Orçamento</span>
              </button>
              
              <a href="https://wa.me/${data.brand.contacts.whatsappNumber}?text=${encodeURIComponent(data.brand.contacts.whatsappDefaultText)}" target="_blank" class="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base transition shadow-xl flex items-center justify-center gap-2">
                <i data-lucide="message-circle" class="w-5 h-5"></i>
                <span>Falar no WhatsApp</span>
              </a>
            </div>

            <div class="pt-6 text-xs text-red-100/80 font-medium">
              Atendimento ágil para todo o Brasil • Resposta comercial em até 2 horas úteis
            </div>
          </div>
        </div>
      </section>

    </div>
  `;
}

// -------------------------------------------------------------
// 2. SOLUÇÕES HUB & SUBPAGES
// -------------------------------------------------------------
function renderSolucoesOverview() {
  const data = CMS_DATA;
  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      <!-- Page Header -->
      <div class="text-center max-w-3xl mx-auto space-y-4">
        <span class="text-xs font-extrabold uppercase tracking-wider text-red-600">Ecossistema B2B</span>
        <h1 class="text-4xl sm:text-5xl font-extrabold text-slate-900">Soluções Corporativas Creativando</h1>
        <p class="text-slate-600 text-base leading-relaxed">
          Do planejamento de infraestrutura à entrega do último clique: fornecemos hardware homologado, softwares oficiais, conectividade e suporte contínuo.
        </p>
      </div>

      <!-- Solutions Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        ${data.solutions.map(s => `
          <div class="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm card-hover-effect flex flex-col justify-between">
            <div>
              <div class="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mb-6 font-bold">
                <i data-lucide="${s.icon}" class="w-7 h-7"></i>
              </div>
              <h2 class="text-2xl font-bold text-slate-900 mb-3">${s.title}</h2>
              <p class="text-sm text-slate-600 mb-6 leading-relaxed">${s.fullDesc}</p>

              <div class="space-y-2 mb-6">
                <div class="text-xs font-bold text-slate-800 uppercase tracking-wider">Principais Entregáveis:</div>
                ${s.features.slice(0, 3).map(f => `
                  <div class="text-xs text-slate-600 flex items-center gap-2">
                    <i data-lucide="check" class="w-3.5 h-3.5 text-red-600 flex-shrink-0"></i>
                    <span>${f}</span>
                  </div>
                `).join("")}
              </div>
            </div>

            <div class="pt-6 border-t border-slate-100 flex items-center justify-between">
              <a href="#${s.slug}" class="text-sm font-bold text-slate-900 hover:text-red-600 flex items-center gap-1.5 transition">
                <span>Ver Detalhes</span>
                <i data-lucide="arrow-right" class="w-4 h-4"></i>
              </a>
              <button onclick="openQuoteModal('${s.title}', '${s.id}')" class="px-3.5 py-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 text-xs font-bold transition">
                Pedir Cotação
              </button>
            </div>
          </div>
        `).join("")}
      </div>

      <!-- Call to Action Banner -->
      <div class="bg-slate-900 rounded-2xl p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 class="text-xl font-bold">Precisa de um projeto integrado multissoluções?</h3>
          <p class="text-sm text-slate-300 mt-1">Converse com nossos arquitetos de soluções para dimensionar o projeto completo da sua empresa.</p>
        </div>
        <button onclick="openQuoteModal('Projeto Integrado de TI', 'geral')" class="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition flex-shrink-0">
          Solicitar Consultoria Gratuita
        </button>
      </div>

    </div>
  `;
}

function renderSolutionDetail(solutionId) {
  const data = CMS_DATA;
  const sol = data.solutions.find(s => s.id === solutionId) || data.solutions[0];

  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      <!-- Breadcrumb -->
      <div class="flex items-center gap-2 text-xs text-slate-500">
        <a href="#/" class="hover:text-red-600">Início</a>
        <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
        <a href="#/solucoes" class="hover:text-red-600">Soluções</a>
        <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
        <span class="text-slate-900 font-bold">${sol.title}</span>
      </div>

      <!-- Hero of Solution -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div class="lg:col-span-7 space-y-6">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 text-red-700 text-xs font-bold uppercase tracking-wider">
            <i data-lucide="${sol.icon}" class="w-4 h-4"></i>
            Solução Especializada
          </div>
          <h1 class="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">${sol.title}</h1>
          <p class="text-lg text-slate-600 leading-relaxed">${sol.fullDesc}</p>
          
          <div class="flex flex-wrap gap-4 pt-2">
            <button onclick="openQuoteModal('${sol.title}', '${sol.id}')" class="px-8 py-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition shadow-lg shadow-red-600/25 flex items-center gap-2">
              <span>Solicitar Orçamento para ${sol.title}</span>
              <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </button>
            <a href="https://wa.me/${data.brand.contacts.whatsappNumber}?text=${encodeURIComponent('Olá! Gostaria de detalhes sobre ' + sol.title)}" target="_blank" class="px-6 py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm transition border border-slate-200 shadow-sm flex items-center gap-2">
              <i data-lucide="message-circle" class="w-4 h-4 text-emerald-600"></i>
              <span>Falar no WhatsApp</span>
            </a>
          </div>
        </div>

        <div class="lg:col-span-5">
          <div class="bg-slate-900 rounded-3xl p-8 text-white border border-slate-800 shadow-2xl">
            <h3 class="text-lg font-bold mb-4 flex items-center gap-2 text-red-400">
              <i data-lucide="award" class="w-5 h-5"></i>
              Benefícios Estratégicos
            </h3>
            <ul class="space-y-3">
              ${sol.benefits.map(b => `
                <li class="flex items-start gap-2.5 text-sm text-slate-200">
                  <i data-lucide="check-circle" class="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5"></i>
                  <span>${b}</span>
                </li>
              `).join("")}
            </ul>
          </div>
        </div>
      </div>

      <!-- Features & Deliverables -->
      <div class="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-lg space-y-8">
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-red-600">Escopo de Atendimento</span>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">O que contemplamos nesta solução</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${sol.features.map(f => `
            <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
              <div class="w-7 h-7 rounded-lg bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <i data-lucide="check" class="w-4 h-4"></i>
              </div>
              <span class="text-sm font-semibold text-slate-800 leading-snug">${f}</span>
            </div>
          `).join("")}
        </div>
      </div>

    </div>
  `;
}

// -------------------------------------------------------------
// 3. PRODUTOS & CATÁLOGO
// -------------------------------------------------------------
function renderProdutosCatalog() {
  const data = CMS_DATA;
  const filteredProducts = AppState.activeProductCategory === "all" 
    ? data.products 
    : data.products.filter(p => p.category === AppState.activeProductCategory);

  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      <!-- Catalog Header -->
      <div class="text-center max-w-3xl mx-auto space-y-4">
        <span class="text-xs font-extrabold uppercase tracking-wider text-red-600">Catálogo Corporativo B2B</span>
        <h1 class="text-4xl font-extrabold text-slate-900">Softwares & Soluções Oficiais</h1>
        <p class="text-slate-600 text-base">
          Licenciamento corporativo 100% autêntico e homologado de Microsoft, Adobe, Google e Kaspersky para empresas de todos os portes.
        </p>
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        ${filteredProducts.map(p => `
          <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden card-hover-effect flex flex-col justify-between shadow-sm">
            <div>
              <div class="relative h-60 bg-slate-950 overflow-hidden flex items-center justify-center">
                <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover" />
                <span class="absolute top-4 left-4 px-3 py-1 rounded bg-slate-900/90 backdrop-blur text-white text-xs font-bold shadow">
                  ${p.badge}
                </span>
                <span class="absolute bottom-4 right-4 px-3 py-1 rounded bg-white/95 backdrop-blur text-slate-900 text-xs font-bold shadow">
                  ${p.categoryName}
                </span>
              </div>

              <div class="p-6 sm:p-8">
                <h2 class="text-xl font-bold text-slate-900 mb-2">${p.name}</h2>
                <p class="text-sm text-slate-600 mb-6 leading-relaxed">${p.shortDesc}</p>

                <div class="space-y-2 mb-6 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                  <div class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Recursos & Benefícios:</div>
                  ${p.specs.map(s => `
                    <div class="text-xs text-slate-700 flex items-start gap-2">
                      <i data-lucide="check-circle-2" class="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5"></i>
                      <span class="leading-relaxed">${s}</span>
                    </div>
                  `).join("")}
                </div>

                <div class="text-xs text-slate-500">
                  <span class="font-bold text-slate-700">Público / Aplicação:</span> ${p.targetAudience}
                </div>
              </div>
            </div>

            <div class="p-6 sm:p-8 pt-0 flex gap-3">
              <button onclick="openQuoteModal('${p.name}', 'software')" class="w-full py-3.5 px-6 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition shadow-md shadow-red-600/20 flex items-center justify-center gap-2">
                <i data-lucide="file-text" class="w-4 h-4"></i>
                <span>Solicitar Proposta Comercial</span>
              </button>
            </div>
          </div>
        `).join("")}
      </div>

    </div>
  `;
}

function setProductCategory(cat) {
  AppState.activeProductCategory = cat;
  const appContainer = document.getElementById("app-root");
  if (appContainer) {
    appContainer.innerHTML = renderProdutosCatalog();
    postRenderSetup();
  }
}

// -------------------------------------------------------------
// 5. MARCAS / PARCEIROS PAGE
// -------------------------------------------------------------
function renderMarcasPage() {
  const data = CMS_DATA;
  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <div class="text-center max-w-3xl mx-auto space-y-4">
        <span class="text-xs font-extrabold uppercase tracking-wider text-red-600">Alianças & Homologações</span>
        <h1 class="text-4xl font-extrabold text-slate-900">Marcas e Parceiros Oficiais</h1>
        <p class="text-slate-600 text-base">
          A Creativando mantém canais diretos e parcerias credenciadas com os maiores fabricantes do mundo, assegurando licenças legítimas e equipamentos originais.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        ${data.partners.map(p => `
          <div class="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-lg p-8 space-y-6 flex flex-col justify-between">
            <div class="space-y-6">
              <div class="rounded-2xl overflow-hidden aspect-video bg-slate-950 flex items-center justify-center">
                <img src="${p.logo}" alt="${p.name}" class="w-full h-full object-cover" />
              </div>
              
              <div>
                <span class="px-3 py-1 rounded-md bg-red-50 text-red-700 text-xs font-bold">${p.badge}</span>
                <h2 class="text-2xl font-bold text-slate-900 mt-2">${p.name} — ${p.headline}</h2>
                <p class="text-sm text-slate-600 mt-2 leading-relaxed">${p.description}</p>
              </div>

              <div class="space-y-2">
                <div class="text-xs font-bold text-slate-800 uppercase tracking-wider">Garantias e Benefícios:</div>
                ${p.highlights.map(h => `
                  <div class="flex items-center gap-2 text-xs text-slate-700">
                    <i data-lucide="check-circle" class="w-4 h-4 text-red-600 flex-shrink-0"></i>
                    <span>${h}</span>
                  </div>
                `).join("")}
              </div>
            </div>

            <div class="pt-6 border-t border-slate-100 flex items-center justify-between">
              <span class="text-xs font-mono text-slate-500">Linha Direta: ${p.contact}</span>
              <button onclick="openQuoteModal('Licenciamento/Produtos ${p.name}', 'software')" class="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition">
                Solicitar Cotação ${p.name}
              </button>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// 6. EDUCACIONAL PAGE
// -------------------------------------------------------------
function renderEducacionalPage() {
  const data = CMS_DATA;
  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <div class="text-center max-w-3xl mx-auto space-y-4">
        <span class="text-xs font-extrabold uppercase tracking-wider text-red-600">Educação e Formação</span>
        <h1 class="text-4xl sm:text-5xl font-extrabold text-slate-900">Tecnologia para Transformar a Educação</h1>
        <p class="text-slate-600 text-base leading-relaxed">
          Projetos especializados para escolas, colégios, universidades, faculdades de arquitetura/design e centros de formação técnica.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        ${data.educacional.offerings.map(off => `
          <div class="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm card-hover-effect flex flex-col justify-between">
            <div>
              <div class="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-6 font-bold">
                <i data-lucide="${off.icon}" class="w-6 h-6"></i>
              </div>
              <h3 class="text-lg font-bold text-slate-900 mb-2">${off.title}</h3>
              <p class="text-xs text-slate-600 leading-relaxed">${off.description}</p>
            </div>
            <div class="pt-6 mt-6 border-t border-slate-100">
              <button onclick="openQuoteModal('Solução Educacional: ${off.title}', 'educacional')" class="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1">
                <span>Cotar para Minha Instituição</span>
                <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
              </button>
            </div>
          </div>
        `).join("")}
      </div>

      <div class="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-8">
        <div class="max-w-2xl space-y-2">
          <h2 class="text-2xl sm:text-3xl font-extrabold">Condições Especiais para CNPJs Educacionais</h2>
          <p class="text-sm text-slate-300">Descontos acadêmicos oficiais em licenças Microsoft, Adobe e Google for Education, com parcelamento e faturamento direto.</p>
        </div>
        <button onclick="openQuoteModal('Proposta Educacional Completa', 'educacional')" class="px-8 py-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition flex-shrink-0">
          Falar com Consultor Educacional
        </button>
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// 7. SOBRE PAGE
// -------------------------------------------------------------
function renderSobrePage() {
  const data = CMS_DATA;
  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      <div class="text-center max-w-3xl mx-auto space-y-4">
        <span class="text-xs font-extrabold uppercase tracking-wider text-red-600">Nossa Essência</span>
        <h1 class="text-4xl sm:text-5xl font-extrabold text-slate-900">Sobre a Creativando</h1>
        <p class="text-slate-600 text-base leading-relaxed">
          ${data.brand.slogan} — ${data.brand.tagline}
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div class="lg:col-span-6 space-y-6">
          <h2 class="text-3xl font-bold text-slate-900">Nossa Trajetória</h2>
          <p class="text-slate-600 text-sm leading-relaxed">
            Localizada no coração da Vila Madalena em São Paulo, a Creativando consolidou-se como referência nacional no fornecimento consultivo de soluções de tecnologia da informação para empresas.
          </p>
          <p class="text-slate-600 text-sm leading-relaxed">
            Acreditamos que a tecnologia só cumpre seu papel quando aliada a uma profunda compreensão das metas de negócio de cada cliente. Não entregamos apenas caixas ou códigos: entregamos estabilidade, produtividade e atendimento humano de excelência.
          </p>

          <div class="grid grid-cols-2 gap-4 pt-2">
            <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div class="text-xs text-slate-500 font-bold uppercase">Sede Física</div>
              <div class="text-sm font-bold text-slate-900 mt-1">${data.brand.address.neighborhood}, ${data.brand.address.city} - ${data.brand.address.state}</div>
            </div>
            <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div class="text-xs text-slate-500 font-bold uppercase">Atendimento</div>
              <div class="text-sm font-bold text-slate-900 mt-1">Nacional com Logística Segura</div>
            </div>
          </div>
        </div>

        <div class="lg:col-span-6">
          <div class="bg-slate-900 rounded-3xl p-8 text-white border border-slate-800 shadow-2xl space-y-6">
            <h3 class="text-xl font-bold text-red-400">Nossos Pilares Institucionais</h3>
            
            <div class="space-y-4 text-sm">
              <div class="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
                <div class="font-bold text-white mb-1">1. Ética e Legalidade Total</div>
                <div class="text-slate-300 text-xs">Licenciamentos 100% autênticos e conformidade estrita com a LGPD e normas de compliance.</div>
              </div>
              <div class="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
                <div class="font-bold text-white mb-1">2. Atendimento Consultivo</div>
                <div class="text-slate-300 text-xs">Diagnóstico das necessidades reais antes de propor qualquer investimento em hardware ou software.</div>
              </div>
              <div class="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
                <div class="font-bold text-white mb-1">3. Agilidade e Respeito aos Prazos</div>
                <div class="text-slate-300 text-xs">Respostas rápidas, entrega segura e suporte proativo em caso de qualquer incidente.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  `;
}

// -------------------------------------------------------------
// 8. CASES PAGE
// -------------------------------------------------------------
function renderCasesPage() {
  const data = CMS_DATA;
  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <div class="text-center max-w-3xl mx-auto space-y-4">
        <span class="text-xs font-extrabold uppercase tracking-wider text-red-600">Projetos Executados</span>
        <h1 class="text-4xl sm:text-5xl font-extrabold text-slate-900">Cases de Sucesso</h1>
        <p class="text-slate-600 text-base">
          Veja na prática como ajudamos empresas de diferentes portes a superar gargalos de performance e segurança.
        </p>
      </div>

      <div class="space-y-8">
        ${data.cases.map((c, idx) => `
          <div class="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-md">
            <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
              <div>
                <span class="px-3 py-1 rounded bg-red-50 text-red-700 text-xs font-bold">${c.segment}</span>
                <h2 class="text-2xl font-bold text-slate-900 mt-2">${c.client}</h2>
              </div>
              <button onclick="openQuoteModal('Projeto similar ao Case: ${c.client}', 'geral')" class="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-red-600 text-white font-bold text-xs transition flex items-center gap-2">
                <span>Quero um projeto similar</span>
                <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
              </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 text-sm">
              <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span class="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Desafio / Problema</span>
                <p class="text-slate-800 leading-relaxed">${c.problem}</p>
              </div>
              <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span class="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Solução Implementada</span>
                <p class="text-slate-800 leading-relaxed">${c.solution}</p>
              </div>
              <div class="p-5 rounded-2xl bg-emerald-50 border border-emerald-200">
                <span class="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">Resultado Mensurável</span>
                <p class="text-emerald-950 font-bold leading-relaxed">${c.result}</p>
              </div>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// 9. BLOG PAGE
// -------------------------------------------------------------
function renderBlogPage() {
  const data = CMS_DATA;
  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <div class="text-center max-w-3xl mx-auto space-y-4">
        <span class="text-xs font-extrabold uppercase tracking-wider text-red-600">Blog & Artigos</span>
        <h1 class="text-4xl font-extrabold text-slate-900">Conteúdo para quem vive tecnologia</h1>
        <p class="text-slate-600 text-base">
          Guias práticos, análises de infraestrutura e novidades em hardware e softwares corporativos.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        ${data.blog.map(b => `
          <div class="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm card-hover-effect flex flex-col justify-between">
            <div>
              <div class="relative h-60 bg-slate-900 overflow-hidden">
                <img src="${b.image}" alt="${b.title}" class="w-full h-full object-cover" />
                <span class="absolute top-4 left-4 px-3 py-1 rounded bg-slate-950/90 text-white text-xs font-bold">
                  ${b.category}
                </span>
              </div>
              <div class="p-8">
                <div class="text-xs text-slate-400 font-medium mb-2">${b.date} • ${b.readTime}</div>
                <h2 class="text-xl font-bold text-slate-900 mb-3">${b.title}</h2>
                <p class="text-sm text-slate-600 leading-relaxed">${b.summary}</p>
              </div>
            </div>
            <div class="p-8 pt-0">
              <button onclick="showToast('Artigo completo em carregamento...', 'success')" class="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1.5">
                <span>Continuar lendo artigo</span>
                <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
              </button>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// 10. CONTATO PAGE
// -------------------------------------------------------------
function renderContatoPage() {
  const data = CMS_DATA;
  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      <div class="text-center max-w-3xl mx-auto space-y-4">
        <span class="text-xs font-extrabold uppercase tracking-wider text-red-600">Canais Oficiais</span>
        <h1 class="text-4xl sm:text-5xl font-extrabold text-slate-900">Fale com um Especialista</h1>
        <p class="text-slate-600 text-base">
          Estamos prontos para atender sua solicitação comercial, esclarecer dúvidas técnicas e montar a proposta ideal para sua empresa.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        <!-- Contact Information Column -->
        <div class="lg:col-span-5 space-y-8">
          <div class="bg-slate-900 rounded-3xl p-8 text-white border border-slate-800 shadow-2xl space-y-6">
            <h2 class="text-2xl font-bold text-white">Central de Atendimento</h2>
            
            <div class="space-y-4 text-sm">
              <div class="flex items-start gap-3">
                <div class="w-9 h-9 rounded-xl bg-red-600/20 text-red-400 flex items-center justify-center flex-shrink-0">
                  <i data-lucide="map-pin" class="w-5 h-5"></i>
                </div>
                <div>
                  <div class="text-xs text-slate-400">Endereço</div>
                  <div class="font-bold text-slate-100">${data.brand.address.full}</div>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <div class="w-9 h-9 rounded-xl bg-red-600/20 text-red-400 flex items-center justify-center flex-shrink-0">
                  <i data-lucide="phone" class="w-5 h-5"></i>
                </div>
                <div>
                  <div class="text-xs text-slate-400">Telefone Comercial / PABX</div>
                  <div class="font-bold text-slate-100">${data.brand.contacts.commercialPhone}</div>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <div class="w-9 h-9 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <i data-lucide="message-circle" class="w-5 h-5"></i>
                </div>
                <div>
                  <div class="text-xs text-slate-400">WhatsApp Comercial</div>
                  <div class="font-bold text-slate-100">${data.brand.contacts.mobilePhones.join(" • ")}</div>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <div class="w-9 h-9 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center flex-shrink-0">
                  <i data-lucide="mail" class="w-5 h-5"></i>
                </div>
                <div>
                  <div class="text-xs text-slate-400">E-mail Corporativo</div>
                  <div class="font-bold text-slate-100">${data.brand.contacts.email}</div>
                </div>
              </div>
            </div>

            <div class="pt-4 border-t border-slate-800 text-xs text-slate-400">
              Horário de Atendimento: ${data.brand.businessHours}
            </div>
          </div>
        </div>

        <!-- Contact Form Column -->
        <div class="lg:col-span-7">
          <div class="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl">
            <h2 class="text-2xl font-bold text-slate-900 mb-6">Envie sua Mensagem</h2>

            <form onsubmit="handleQuoteSubmit(event)" class="space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-semibold text-slate-700 mb-1">Nome Completo *</label>
                  <input type="text" name="name" required placeholder="Seu nome" class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-red-600 outline-none text-sm" />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-slate-700 mb-1">Empresa / Razão Social *</label>
                  <input type="text" name="company" required placeholder="Nome da sua empresa" class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-red-600 outline-none text-sm" />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-semibold text-slate-700 mb-1">E-mail Corporativo *</label>
                  <input type="email" name="email" required placeholder="seuemail@empresa.com.br" class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-red-600 outline-none text-sm" />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-slate-700 mb-1">Telefone / WhatsApp *</label>
                  <input type="tel" name="phone" required placeholder="(11) 99999-9999" class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-red-600 outline-none text-sm" />
                </div>
              </div>

              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Tipo de Solução de Interesse</label>
                <select name="solutionType" class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-red-600 outline-none text-sm bg-white">
                  <option value="Software e Licenciamento">Software e Licenciamento (Microsoft, Adobe, Kaspersky, Google)</option>
                  <option value="Infraestrutura de TI">Infraestrutura de TI e Conectividade</option>
                  <option value="Suporte Técnico">Suporte Técnico Especializado & NOC</option>
                  <option value="Locação de Equipamentos">Locação e Outsourcing de TI</option>
                  <option value="Treinamentos Corporativos">Treinamentos Corporativos</option>
                  <option value="Educacional">Soluções Educacionais para Escolas/Universidades</option>
                  <option value="Outros">Outros Assuntos</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Mensagem ou Detalhes da Necessidade</label>
                <textarea name="message" rows="4" placeholder="Descreva sua demanda técnica ou quantidades desejadas..." class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-red-600 outline-none text-sm"></textarea>
              </div>

              <div class="flex items-center gap-2 pt-2">
                <input type="checkbox" id="contato-lgpd" required class="rounded border-slate-300 text-red-600 focus:ring-red-500" checked />
                <label for="contato-lgpd" class="text-xs text-slate-600">
                  Declaro estar ciente e de acordo com o tratamento dos dados informados para fins de contato comercial conforme a LGPD.
                </label>
              </div>

              <button type="submit" class="w-full py-4 px-6 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition shadow-lg shadow-red-600/30 flex items-center justify-center gap-2">
                <span>Enviar Solicitação de Contato</span>
                <i data-lucide="send" class="w-4 h-4"></i>
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// 11. ORÇAMENTO DEDICADO PAGE
// -------------------------------------------------------------
function renderOrcamentoPage() {
  return `
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div class="text-center space-y-4">
        <span class="text-xs font-extrabold uppercase tracking-wider text-red-600">Proposta Comercial B2B</span>
        <h1 class="text-4xl font-extrabold text-slate-900">Solicite seu Orçamento Rápido</h1>
        <p class="text-slate-600 text-base max-w-xl mx-auto">
          Preencha os dados da sua empresa para receber uma cotação formal em até 2 horas úteis com condições de faturamento PJ.
        </p>
      </div>

      <div class="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl">
        <form onsubmit="handleQuoteSubmit(event)" class="space-y-6">
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Nome do Solicitante *</label>
              <input type="text" name="name" required placeholder="Ex.: Mariana Silva" class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-red-600 outline-none text-sm" />
            </div>
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Razão Social / Nome Fantasia *</label>
              <input type="text" name="company" required placeholder="Ex.: Studio Arquitetura Ltda" class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-red-600 outline-none text-sm" />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">E-mail Corporativo *</label>
              <input type="email" name="email" required placeholder="contato@empresa.com.br" class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-red-600 outline-none text-sm" />
            </div>
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Telefone / WhatsApp com DDD *</label>
              <input type="tel" name="phone" required placeholder="(11) 99999-9999" class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-red-600 outline-none text-sm" />
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Área de Interesse Principal</label>
            <select name="solutionType" class="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-red-600 outline-none text-sm bg-white font-medium">
              <option value="Licenciamento Microsoft 365">Licenciamento Microsoft 365 e Azure</option>
              <option value="Licenciamento Adobe Creative Cloud">Licenciamento Adobe Creative Cloud for Teams</option>
              <option value="Licenciamento Google Workspace">Licenciamento Google Workspace</option>
              <option value="Cibersegurança Kaspersky">Cibersegurança e Antivírus Kaspersky Endpoint</option>
              <option value="Infraestrutura e Redes">Infraestrutura de TI e Conectividade</option>
              <option value="Suporte Especializado">Suporte Técnico Especializado e NOC</option>
              <option value="Locação de Equipamentos">Locação e Outsourcing</option>
              <option value="Solução Educacional">Soluções Educacionais</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Quantidades e Requisitos Técnicos</label>
            <textarea name="message" rows="4" placeholder="Ex.: Precisamos de cotação para 8 licenças Microsoft 365 Business Premium e 3 Workstations com RTX 4080 para render..." class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-red-600 outline-none text-sm"></textarea>
          </div>

          <button type="submit" class="w-full py-4 px-6 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-base transition shadow-xl shadow-red-600/30 flex items-center justify-center gap-2">
            <span>Enviar Pedido de Cotação</span>
            <i data-lucide="check" class="w-5 h-5"></i>
          </button>
        </form>
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// 12. LGPD & INSTITUCIONAIS
// -------------------------------------------------------------
function renderPoliticaPrivacidade() {
  return `
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <h1 class="text-3xl font-extrabold text-slate-900">Política de Privacidade</h1>
      <p class="text-xs text-slate-400">Última atualização: 24 de Fevereiro de 2026 — Em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD).</p>
      
      <div class="prose prose-slate text-sm leading-relaxed space-y-4 text-slate-700">
        <p>A <strong>Creativando</strong> está comprometida com a proteção e a privacidade dos dados pessoais de seus clientes, parceiros e visitantes. Esta política detalha como coletamos, tratamos e protegemos as informações fornecidas em nossa plataforma digital.</p>
        
        <h2 class="text-lg font-bold text-slate-900 mt-6">1. Coleta e Finalidade dos Dados</h2>
        <p>Os dados solicitados em nossos formulários comerciais (Nome, E-mail Corporativo, Empresa, Telefone e Mensagem) são coletados exclusivamente para fins de atendimento comercial, elaboração de orçamentos, emissão de faturamento corporativo e suporte técnico solicitado pelo titular.</p>

        <h2 class="text-lg font-bold text-slate-900 mt-6">2. Compartilhamento de Informações</h2>
        <p>A Creativando não comercializa dados pessoais com terceiros. As informações poderão ser compartilhadas estritamente com os fabricantes oficiais (Microsoft, Adobe, Google, BenQ, Kaspersky) quando estritamente necessário para o provisionamento e registro legal de licenças de software e garantias de hardware em nome da empresa adquirente.</p>

        <h2 class="text-lg font-bold text-slate-900 mt-6">3. Direitos do Titular</h2>
        <p>Em conformidade com o Artigo 18 da LGPD, o titular poderá a qualquer momento solicitar a confirmação da existência de tratamento, o acesso, a retificação ou a exclusão dos dados através do e-mail <strong>atendimento@creativando.com.br</strong>.</p>
      </div>
    </div>
  `;
}

function renderPoliticaCookies() {
  return `
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <h1 class="text-3xl font-extrabold text-slate-900">Política de Cookies</h1>
      <div class="prose prose-slate text-sm leading-relaxed space-y-4 text-slate-700">
        <p>Utilizamos cookies estritamente necessários para o funcionamento correto do site, bem como cookies de desempenho analítico (Google Analytics) para compreender a navegação e aprimorar a experiência do usuário.</p>
        <p>Você pode a qualquer momento revisar e alterar suas preferências de consentimento através do nosso gerenciador de cookies disponível no rodapé do site.</p>
      </div>
    </div>
  `;
}

function renderEticaCompliance() {
  return `
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <h1 class="text-3xl font-extrabold text-slate-900">Ética & Compliance</h1>
      <div class="prose prose-slate text-sm leading-relaxed space-y-4 text-slate-700">
        <p>A Creativando pauta todas as suas relações comerciais e institucionais na transparência, legalidade e combate irrestrito à pirataria de software e comércio não homologado.</p>
        <p>Todos os produtos e licenças fornecidos contam com notas fiscais oficiais, garantindo total segurança jurídica e conformidade fiscal para os nossos clientes e parceiros.</p>
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// 13. ADMIN LEADS VIEWER & EXPORT
// -------------------------------------------------------------
function renderLeadsAdmin() {
  const leads = LeadService.getLeads();
  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-red-600">Painel Administrativo</span>
          <h1 class="text-3xl font-extrabold text-slate-900">Gestão de Leads B2B & Oportunidades</h1>
          <p class="text-slate-600 text-sm">Leads capturados via site prontos para exportação ou sincronização com CRM.</p>
        </div>
        <button onclick="LeadService.exportLeadsCSV()" class="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center gap-2">
          <i data-lucide="download" class="w-4 h-4"></i>
          <span>Exportar Leads (CSV)</span>
        </button>
      </div>

      <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs text-slate-700">
            <thead class="bg-slate-50 border-b border-slate-200 text-slate-800 uppercase font-bold text-[10px] tracking-wider">
              <tr>
                <th class="p-4">Data/Hora</th>
                <th class="p-4">Nome</th>
                <th class="p-4">Empresa</th>
                <th class="p-4">Contato</th>
                <th class="p-4">Solução</th>
                <th class="p-4">Produto/Msg</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${leads.length === 0 ? `
                <tr><td colspan="6" class="p-8 text-center text-slate-400">Nenhum lead capturado ainda. Envie um orçamento para testar o fluxo.</td></tr>
              ` : leads.map(l => `
                <tr class="hover:bg-slate-50">
                  <td class="p-4 whitespace-nowrap text-slate-500">${new Date(l.createdAt).toLocaleString("pt-BR")}</td>
                  <td class="p-4 font-bold text-slate-900">${l.name}</td>
                  <td class="p-4 font-medium">${l.company}</td>
                  <td class="p-4"><div>${l.email}</div><div class="text-slate-500">${l.phone}</div></td>
                  <td class="p-4"><span class="px-2 py-0.5 rounded bg-red-50 text-red-700 font-semibold">${l.solutionType}</span></td>
                  <td class="p-4 max-w-xs truncate">${l.product ? `[${l.product}] ` : ""}${l.message || "-"}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function renderNotFound() {
  return `
    <div class="max-w-2xl mx-auto px-4 py-24 text-center space-y-6">
      <div class="text-6xl font-extrabold text-red-600">404</div>
      <h1 class="text-3xl font-bold text-slate-900">Página não encontrada</h1>
      <p class="text-slate-600 text-sm">A página que você está buscando não existe ou foi realocada.</p>
      <a href="#/" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white font-bold text-sm">
        <i data-lucide="home" class="w-4 h-4"></i>
        <span>Voltar para o Início</span>
      </a>
    </div>
  `;
}

// -------------------------------------------------------------
// COOKIE BANNER LGPD
// -------------------------------------------------------------
function initCookieBanner() {
  if (LeadService.getCookieConsent()) return;
  const bannerContainer = document.getElementById("cookie-banner-container");
  if (!bannerContainer) return;

  bannerContainer.innerHTML = `
    <div class="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 bg-slate-950/95 backdrop-blur text-white p-5 rounded-2xl shadow-2xl border border-slate-800 text-xs animate-fadeIn">
      <div class="flex items-start gap-3 mb-3">
        <i data-lucide="shield" class="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5"></i>
        <div>
          <h4 class="font-bold text-white mb-1">Privacidade & Cookies</h4>
          <p class="text-slate-300 leading-relaxed">
            Utilizamos cookies para otimizar sua navegação e analisar o tráfego em conformidade com a LGPD.
          </p>
        </div>
      </div>
      <div class="flex items-center gap-2 pt-2">
        <button onclick="acceptAllCookies()" class="flex-1 py-2 px-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold transition">
          Aceitar Todos
        </button>
        <button onclick="acceptEssentialCookies()" class="flex-1 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold transition border border-slate-700">
          Apenas Essenciais
        </button>
      </div>
    </div>
  `;
  if (window.lucide) lucide.createIcons();
}

function acceptAllCookies() {
  LeadService.saveCookieConsent({ essential: true, analytics: true, marketing: true });
  const b = document.getElementById("cookie-banner-container");
  if (b) b.innerHTML = "";
  showToast("Preferências de privacidade salvas.", "success");
}

function acceptEssentialCookies() {
  LeadService.saveCookieConsent({ essential: true, analytics: false, marketing: false });
  const b = document.getElementById("cookie-banner-container");
  if (b) b.innerHTML = "";
  showToast("Cookies essenciais habilitados.", "success");
}

// Mobile Menu Toggle
function toggleMobileMenu() {
  AppState.isMobileMenuOpen = !AppState.isMobileMenuOpen;
  const menu = document.getElementById("mobile-menu-drawer");
  if (menu) {
    if (AppState.isMobileMenuOpen) {
      menu.classList.remove("hidden");
    } else {
      menu.classList.add("hidden");
    }
  }
}

// Global Initialization on DOM Load
window.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("hashchange", handleRouteChange);
  handleRouteChange();
});
