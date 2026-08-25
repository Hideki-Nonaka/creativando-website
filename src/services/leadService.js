/**
 * Creativando Lead Management & Analytics Service
 * Handles B2B lead capture, localStorage persistence, CRM integration dispatch, and event tracking.
 */

const LeadService = {
  STORAGE_KEY: "creativando_leads_v1",
  COOKIE_CONSENT_KEY: "creativando_cookie_consent_v1",

  // Track analytics event
  trackEvent: function(eventName, eventParams = {}) {
    const timestamp = new Date().toISOString();
    const eventPayload = {
      event: eventName,
      timestamp,
      ...eventParams
    };

    console.info(`[Creativando Analytics Event] ${eventName}:`, eventPayload);

    // Push to Google Tag Manager dataLayer if available
    if (window.dataLayer && Array.isArray(window.dataLayer)) {
      window.dataLayer.push(eventPayload);
    }

    // Google Analytics 4 gtag support
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, eventParams);
    }
  },

  // Save new Lead
  captureLead: function(data) {
    const leads = this.getLeads();
    const newLead = {
      id: "lead_" + Date.now() + "_" + Math.random().toString(36).substr(2, 6),
      name: data.name || "",
      company: data.company || "",
      email: data.email || "",
      phone: data.phone || "",
      role: data.role || "Não informado",
      solutionType: data.solutionType || "Geral",
      product: data.product || null,
      message: data.message || "",
      sourcePage: window.location.hash || window.location.pathname || "/",
      createdAt: new Date().toISOString(),
      status: "Novo / Aprovado para Triagem Comercial"
    };

    leads.unshift(newLead);
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(leads));
    } catch (e) {
      console.warn("Could not save lead to localStorage", e);
    }

    // Fire conversion event
    this.trackEvent("submit_orcamento", {
      lead_id: newLead.id,
      company: newLead.company,
      solution_type: newLead.solutionType,
      product: newLead.product
    });

    return newLead;
  },

  getLeads: function() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  exportLeadsCSV: function() {
    const leads = this.getLeads();
    if (leads.length === 0) {
      alert("Nenhum lead registrado até o momento.");
      return;
    }

    const headers = ["ID", "Data", "Nome", "Empresa", "E-mail", "Telefone", "Cargo", "Tipo de Solução", "Produto", "Página de Origem", "Mensagem"];
    const rows = leads.map(l => [
      l.id,
      new Date(l.createdAt).toLocaleString("pt-BR"),
      `"${(l.name || "").replace(/"/g, '""')}"`,
      `"${(l.company || "").replace(/"/g, '""')}"`,
      `"${(l.email || "").replace(/"/g, '""')}"`,
      `"${(l.phone || "").replace(/"/g, '""')}"`,
      `"${(l.role || "").replace(/"/g, '""')}"`,
      `"${(l.solutionType || "").replace(/"/g, '""')}"`,
      `"${(l.product || "").replace(/"/g, '""')}"`,
      `"${(l.sourcePage || "").replace(/"/g, '""')}"`,
      `"${(l.message || "").replace(/"/g, '""')}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `creativando_leads_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  // LGPD Cookie Preferences
  getCookieConsent: function() {
    try {
      const saved = localStorage.getItem(this.COOKIE_CONSENT_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  },

  saveCookieConsent: function(preferences) {
    try {
      localStorage.setItem(this.COOKIE_CONSENT_KEY, JSON.stringify({
        ...preferences,
        savedAt: new Date().toISOString()
      }));
    } catch (e) {
      console.warn("Could not save cookie consent", e);
    }
    this.trackEvent("cookie_consent_updated", preferences);
  }
};

if (typeof window !== "undefined") {
  window.LeadService = LeadService;
}
