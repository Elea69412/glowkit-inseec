// Glow Kit — éléments communs (bandeau démo, en-tête, pied de page)
const LOGO_SVG = `<svg viewBox="0 0 40 40" aria-hidden="true"><defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e8a4a0"/><stop offset="1" stop-color="#5a2d55"/></linearGradient></defs><circle cx="20" cy="20" r="19" fill="url(#lg)"/><path d="M20 8c1.4 6.2 5.8 10.6 12 12-6.2 1.4-10.6 5.8-12 12-1.4-6.2-5.8-10.6-12-12 6.2-1.4 10.6-5.8 12-12z" fill="#fffaf6"/></svg>`;

const PAGES = [
  { href: "index.html", label: "Boutique", key: "vente" },
  { href: "crm.html", label: "CRM", key: "crm" },
  { href: "strategie.html", label: "Stratégie", key: "strategie" },
  { href: "communication.html", label: "Communication", key: "communication" },
];

(function () {
  const current = document.body.dataset.page || "vente";
  const banner = `<div class="demo-banner" role="note">🎓 <strong>Projet étudiant INSEEC, démo sans vente réelle</strong> · aucun paiement, aucune donnée réelle</div>`;
  const nav = PAGES.map(p => `<a href="${p.href}" class="${p.key === current ? "active" : ""}">${p.label}</a>`).join("");
  const header = `<header class="site-header"><div class="wrap">
    <a class="logo" href="index.html">${LOGO_SVG}<span>Glow Kit</span></a>
    <button class="nav-toggle" aria-label="Ouvrir le menu" onclick="document.querySelector('.nav').classList.toggle('open')">☰ Menu</button>
    <nav class="nav">${nav}<a href="commande.html" class="btn sm" style="color:#fff;margin-left:6px">Commander</a></nav>
  </div></header>`;
  document.body.insertAdjacentHTML("afterbegin", banner + header);

  if (!document.body.dataset.nofooter) {
    const footer = `<footer><div class="wrap">
      <div class="grid g3">
        <div><a class="logo" href="index.html" style="color:#fff">${LOGO_SVG}<span>Glow Kit</span></a>
          <p class="small" style="margin-top:12px">La routine skincare en 3 gestes, choisie pour ta peau. Pas pour l'algorithme.</p></div>
        <div><b>Le site</b><br><a href="index.html">Boutique</a> · <a href="commande.html">Commander</a> · <a href="index.html#faq">FAQ</a><br>
          <a href="crm.html">CRM (interne)</a> · <a href="strategie.html">Dossier stratégique</a> · <a href="communication.html">Plan de communication</a></div>
        <div><b>Contact (démo)</b><br>bonjour@glowkit-demo.fr<br><span class="small">Adresse fictive, aucun message n'est envoyé.</span></div>
      </div>
      <p class="small" style="margin-top:28px;border-top:1px solid rgba(255,255,255,.15);padding-top:16px">
        Projet étudiant INSEEC Grande École, démo sans vente réelle. Glow Kit est une marque fictive. Les marques citées (Typology, The Ordinary, Blissim…) sont des concurrents réels mentionnés à titre d'analyse : aucune ne travaille avec Glow Kit. Avis et témoignages fictifs.</p>
    </div></footer>`;
    document.body.insertAdjacentHTML("beforeend", footer);
  }
})();

// ---- Stockage des commandes de démo (localStorage, partagé avec le CRM)
const GK = {
  ORDERS_KEY: "glowkit_orders_v1",
  getOrders() { try { return JSON.parse(localStorage.getItem(this.ORDERS_KEY)) || []; } catch (e) { return []; } },
  saveOrder(o) { try { const a = this.getOrders(); a.push(o); localStorage.setItem(this.ORDERS_KEY, JSON.stringify(a)); } catch (e) {} },
  euro(n) { return n.toLocaleString("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: n % 1 ? 2 : 0 }); },
  OFFERS: {
    essentiel: { name: "Kit Glow Essentiel", price: 44, desc: "Diagnostic + kit 3 produits, achat unique" },
    abonnement: { name: "Abonnement Glow", price: 36, desc: "Kit 3 produits livré tous les 2 mois, sans engagement" },
    coach: { name: "Glow Coach", price: 64, desc: "Kit 3 produits + visio 20 min avec une esthéticienne + suivi 30 jours" },
  },
};
