/* =========================================================
   AHDK — Sprint 01 incremental behavior
   Injeta melhorias de home sem tocar no app.js principal.
   ========================================================= */

(function initSprint01() {
  const app = document.getElementById("app");
  const bottomNav = document.getElementById("bottomNav");

  if (!app || !bottomNav) return;

  const goToPage = (page) => {
    const button = bottomNav.querySelector(`[data-page="${page}"]`);
    if (button) button.click();
  };

  const getActivePage = () => {
    const active = bottomNav.querySelector(".nav.active");
    return active?.dataset?.page || "home";
  };

  const makeButton = (className, label, page) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = className;
    button.textContent = label;
    button.addEventListener("click", () => goToPage(page));
    return button;
  };

  const enhanceHero = (hero) => {
    if (!hero || hero.dataset.sprint01Hero === "true") return;

    hero.dataset.sprint01Hero = "true";
    hero.classList.add("sprint01-hero");

    const kicker = document.createElement("div");
    kicker.className = "sprint01-hero-kicker";
    kicker.textContent = "Drop atual · curadoria limitada";
    hero.prepend(kicker);

    const actions = hero.querySelector(".hero-actions");
    if (actions) {
      const hasMain = actions.querySelector(".sprint01-main-cta");
      if (!hasMain) {
        actions.prepend(makeButton("cta sprint01-main-cta", "Explorar catálogo", "produtos"));
        actions.appendChild(makeButton("ghost sprint01-drop-cta", "Ver drop", "avisos"));
      }
    }

    const proof = document.createElement("div");
    proof.className = "sprint01-hero-proof";
    proof.innerHTML = `
      <span class="sprint01-proof-chip">Curadoria premium</span>
      <span class="sprint01-proof-chip">Drops selecionados</span>
      <span class="sprint01-proof-chip">Atendimento direto</span>
    `;
    hero.appendChild(proof);
  };

  const buildSprintHome = () => {
    const section = document.createElement("section");
    section.className = "sprint01-home";
    section.dataset.sprint01 = "home";

    section.innerHTML = `
      <div class="sprint01-section-head">
        <h3>Entrada rápida</h3>
        <span>Escolha o caminho</span>
      </div>

      <div class="sprint01-category-grid" aria-label="Atalhos principais da home">
        <button class="sprint01-category" type="button" data-sprint-page="produtos">
          <i>⌕</i>
          <b>Catálogo</b>
          <small>Peças, kits e itens disponíveis.</small>
        </button>
        <button class="sprint01-category" type="button" data-sprint-page="avisos">
          <i>✧</i>
          <b>Drop atual</b>
          <small>Novidades e séries em destaque.</small>
        </button>
        <button class="sprint01-category" type="button" data-sprint-page="colecoes">
          <i>◇</i>
          <b>Coleções</b>
          <small>Leitura editorial por linha.</small>
        </button>
        <button class="sprint01-category" type="button" data-sprint-page="equipe">
          <i>☏</i>
          <b>Atendimento</b>
          <small>Chame para disponibilidade e pedido.</small>
        </button>
      </div>

      <article class="sprint01-panel sprint01-drop">
        <span class="badge">Concept Pack 01</span>
        <h3>Drop escuro. Presença limpa.</h3>
        <p>Uma entrada mais direta para explorar o catálogo, entender o drop e chamar atendimento sem perder o clima premium da marca.</p>
        <div class="sprint01-drop-actions">
          <button class="cta" type="button" data-sprint-page="produtos">Explorar catálogo</button>
          <button class="ghost" type="button" data-sprint-page="equipe">Chamar atendimento</button>
        </div>
      </article>

      <div class="sprint01-section-head">
        <h3>Destaques</h3>
        <span>Visual de vitrine</span>
      </div>

      <div class="sprint01-highlight-row" aria-label="Produtos em destaque">
        <button class="sprint01-highlight" type="button" data-sprint-page="produtos">
          <img src="assets/49_boxy_tee_washed_black_AHDK.jpg" alt="AHDK Boxy Tee" loading="lazy">
          <div><b>Boxy Tee</b><small>Vestuário</small></div>
        </button>
        <button class="sprint01-highlight" type="button" data-sprint-page="produtos">
          <img src="assets/50_boxy_hoodie_black_AHDK.jpg" alt="AHDK Boxy Hoodie" loading="lazy">
          <div><b>Boxy Hoodie</b><small>Drop wear</small></div>
        </button>
        <button class="sprint01-highlight" type="button" data-sprint-page="produtos">
          <img src="assets/48_concept_pack_AHDK.jpg" alt="AHDK Concept Pack" loading="lazy">
          <div><b>Concept Pack</b><small>Lookbook</small></div>
        </button>
      </div>

      <div class="sprint01-panel sprint01-service-strip" aria-label="Garantias comerciais">
        <span>Compra assistida</span>
        <span>Disponibilidade por atendimento</span>
        <span>Leitura mobile limpa</span>
      </div>
    `;

    section.addEventListener("click", (event) => {
      const target = event.target.closest("[data-sprint-page]");
      if (!target) return;
      goToPage(target.dataset.sprintPage);
    });

    return section;
  };

  const enhanceHome = () => {
    document.body.classList.add("sprint01-active");

    if (getActivePage() !== "home") return;

    const hero = app.querySelector(".hero");
    if (!hero) return;

    enhanceHero(hero);

    if (!app.querySelector('[data-sprint01="home"]')) {
      const sprintHome = buildSprintHome();
      hero.insertAdjacentElement("afterend", sprintHome);
    }
  };

  const observer = new MutationObserver(() => {
    window.requestAnimationFrame(enhanceHome);
  });

  observer.observe(app, { childList: true, subtree: false });

  bottomNav.addEventListener("click", () => {
    window.setTimeout(enhanceHome, 40);
  });

  document.addEventListener("DOMContentLoaded", enhanceHome);
  window.setTimeout(enhanceHome, 0);
  window.setTimeout(enhanceHome, 300);
})();
