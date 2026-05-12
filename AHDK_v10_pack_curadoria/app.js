/* =========================================================
   AHDK MINIAPP — APP.JS
   Conteúdo, navegação, permissões e módulos de gestão.
   Identidade aplicada para tabacaria premium AHDK.
   ========================================================= */

const TG = window.Telegram?.WebApp;
if (TG) {
  TG.ready();
  TG.expand();
  TG.setHeaderColor("#050403");
  TG.setBackgroundColor("#050403");
}

const APP_DATA_VERSION = "v10-pack-vestuario-tabacaria";

const BRAND_CONFIG = {
  appName: "AHDK",
  subtitle: "Vestuário • tabacaria • séries limitadas",
  whatsappNumber: "5599999999999",
  defaultProfile: "cliente"
};

const app = document.getElementById("app");
const profileLabel = document.getElementById("profileLabel");
const bottomNav = document.getElementById("bottomNav") || document.querySelector(".bottom-nav");
document.getElementById("brandName").textContent = BRAND_CONFIG.appName;

const profiles = ["cliente", "equipe", "gestor"];

const savedInterestList = (() => {
  try {
    const parsed = JSON.parse(localStorage.getItem("ahdkInterestList") || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
})();

const savedStockChecked = (() => {
  try {
    const parsed = JSON.parse(localStorage.getItem("ahdkStockChecked") || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
})();

const state = {
  page: "home",
  profile: localStorage.getItem("ahdkProfile") || BRAND_CONFIG.defaultProfile,
  search: "",
  selectedProductIndex: null,
  selectedZoomIndex: null,
  cartOpen: false,
  catalogHubOpen: false,
  selectedDetail: null,
  activeModule: null,
  heroSlide: 0,
  catalogCategory: "Todos",
  interestList: savedInterestList,
  stockChecked: savedStockChecked,
  teamView: "painel"
};

const permissions = {
  cliente: ["home", "produtos", "avisos", "colecoes", "equipe"],
  equipe: ["home", "produtos", "avisos", "colecoes", "equipe", "mais", "crm", "estoque"],
  gestor: ["home", "produtos", "avisos", "colecoes", "equipe", "mais", "dashboard", "crm", "financeiro", "estoque", "integracoes", "configuracoes"]
};

const NAV_SETS = {
  cliente: [
    ["home", "⌂", "Início"],
    ["produtos", "⌕", "Catálogo"],
    ["avisos", "✧", "Drops"],
    ["colecoes", "◇", "Coleções"],
    ["equipe", "☏", "Atendimento"]
  ],
  equipe: [
    ["home", "⌂", "Início"],
    ["produtos", "⌕", "Catálogo"],
    ["avisos", "✧", "Drops"],
    ["equipe", "▤", "Operação"],
    ["mais", "☷", "Gestão"]
  ],
  gestor: [
    ["home", "⌂", "Início"],
    ["produtos", "⌕", "Catálogo"],
    ["avisos", "✧", "Drops"],
    ["equipe", "▤", "Operação"],
    ["mais", "☷", "Gestão"]
  ]
};

const products = [
  {
    image: "assets/49_boxy_tee_washed_black_AHDK.jpg",
    name: "AHDK Boxy Tee — Washed Black",
    category: "Vestuário",
    price: "R$189,00",
    priceValue: 189,
    stock: 18,
    status: "OK",
    description: "Camiseta boxy em preto lavado, algodão pesado e bordado tonal discreto para uma presença limpa, escura e cotidiana.",
    badge: "Concept Pack",
    featured: true,
    edition: "Concept Pack 01",
    material: "Algodão pesado em lavagem black",
    process: "Modelagem ampla, acabamento tonal e leitura minimalista",
    limited: "Drop inicial",
    care: "Lavar do avesso, em água fria, e secar à sombra.",
    collectibleCode: "AHDK-WEAR-01"
  },
  {
    image: "assets/28_porta_sedas_piteiras_AHDK.jpg",
    name: "Porta Sedas e Piteiras",
    category: "Tabacaria",
    price: "R$149,00",
    priceValue: 149,
    stock: 24,
    status: "OK",
    description: "Organizador de bancada para sedas, piteiras e pequenos itens, pensado para acompanhar o look sem virar excesso visual.",
    badge: "Bancada",
    featured: true,
    edition: "Série Tabacaria Seletiva",
    material: "Acabamento fosco com marca em baixo relevo",
    process: "Peça revisada individualmente para encaixe e presença de balcão",
    limited: "Lote curto",
    care: "Limpar com pano seco e manter longe de calor intenso.",
    collectibleCode: "AHDK-TAB-01"
  },
  {
    image: "assets/50_boxy_hoodie_black_AHDK.jpg",
    name: "AHDK Boxy Hoodie — Black",
    category: "Vestuário",
    price: "R$359,00",
    priceValue: 359,
    stock: 12,
    status: "OK",
    description: "Hoodie boxy em fleece pesado, capuz estruturado, desenho sem cordão e aplicação pequena para manter a marca em silêncio.",
    badge: "Drop Wear",
    featured: true,
    edition: "Concept Pack 01",
    material: "Fleece pesado em preto profundo",
    process: "Capuz escultórico, bolso canguru e costura limpa",
    limited: "Drop inicial",
    care: "Lavar do avesso e evitar secadora para preservar estrutura.",
    collectibleCode: "AHDK-WEAR-02"
  },
  {
    image: "assets/05_piteira_de_vidro_AHDK.jpg",
    name: "Piteira de Vidro AHDK",
    category: "Tabacaria",
    price: "R$59,00",
    priceValue: 59,
    stock: 36,
    status: "OK",
    description: "Item compacto e discreto para compor kits de tabacaria com acabamento mais limpo e leitura premium.",
    badge: "Seleção",
    featured: true,
    edition: "Série Tabacaria Seletiva",
    material: "Vidro com embalagem AHDK",
    process: "Curadoria de item essencial para kit e atendimento",
    limited: "Reposição controlada",
    care: "Higienizar com cuidado e transportar na embalagem.",
    collectibleCode: "AHDK-TAB-02"
  },
  {
    image: "assets/51_cuffed_sweatpants_black_AHDK.jpg",
    name: "AHDK Cuffed Sweatpants — Black",
    category: "Vestuário",
    price: "R$329,00",
    priceValue: 329,
    stock: 10,
    status: "OK",
    description: "Calça relaxed com punho ajustável, algodão premium e visual preto integral para combinar com peças de bancada discretas.",
    badge: "Concept Pack",
    featured: true,
    edition: "Concept Pack 01",
    material: "Moletom premium em preto lavado",
    process: "Cintura elástica, caimento amplo e ajuste no tornozelo",
    limited: "Drop inicial",
    care: "Lavar do avesso e não alvejar.",
    collectibleCode: "AHDK-WEAR-03"
  },
  {
    image: "assets/35_case_retratil_isqueiro_AHDK.jpg",
    name: "Case Retrátil para Isqueiro",
    category: "Tabacaria",
    price: "R$89,00",
    priceValue: 89,
    stock: 18,
    status: "OK",
    description: "Case de balcão com retorno seguro, ideal para atendimento, composição de kit e uso cotidiano sem perder o objeto.",
    badge: "Uso diário",
    featured: true,
    edition: "Série Tabacaria Seletiva",
    material: "Corpo fosco com cabo retrátil",
    process: "Montagem revisada para tração e encaixe",
    limited: "Lote curto",
    care: "Evitar puxões excessivos e guardar sem pressão sobre o cabo.",
    collectibleCode: "AHDK-TAB-03"
  },
  {
    image: "assets/52_tapered_trouser_brown_beige_AHDK.jpg",
    name: "AHDK Tapered Trouser — Brown Beige",
    category: "Vestuário",
    price: "R$349,00",
    priceValue: 349,
    stock: 9,
    status: "OK",
    description: "Calça tapered em bege amarronzado, referência 90s, pregas suaves e barra afunilada para quebrar a base preta do drop.",
    badge: "Tailoring",
    featured: true,
    edition: "Concept Pack 01",
    material: "Sarja encorpada com lavagem vintage",
    process: "Alfaiataria relaxada, pregas frontais e barra tapered",
    limited: "Drop inicial",
    care: "Lavar separadamente nas primeiras lavagens e secar à sombra.",
    collectibleCode: "AHDK-WEAR-04"
  },
  {
    image: "assets/31_bandeja_organizadora_AHDK.jpg",
    name: "Bandeja Ritual AHDK",
    category: "Bancada",
    price: "R$179,00",
    priceValue: 179,
    stock: 20,
    status: "OK",
    description: "Bandeja de apoio para organizar seda, piteira, isqueiro e pequenos objetos com presença escura e discreta.",
    badge: "Bancada",
    featured: true,
    edition: "Série Bancada Ritual",
    material: "Acabamento fosco e textura premium",
    process: "Peça de apoio finalizada em lote pequeno",
    limited: "Baixa escala",
    care: "Limpar com pano seco. Não expor a calor direto.",
    collectibleCode: "AHDK-BAN-01"
  },
  {
    image: "assets/53_tailored_trouser_brown_beige_AHDK.jpg",
    name: "AHDK Tailored Trouser — Brown Beige",
    category: "Vestuário",
    price: "R$369,00",
    priceValue: 369,
    stock: 8,
    status: "OK",
    description: "Trouser de alfaiataria relaxada, pregas expressivas e queda ampla para uma leitura mais editorial do pack.",
    badge: "Editorial",
    featured: true,
    edition: "Concept Pack 01",
    material: "Tecido de alfaiataria com toque lavado",
    process: "Caimento solto, pregas profundas e acabamento limpo",
    limited: "Drop inicial",
    care: "Passar em baixa temperatura pelo avesso e secar à sombra.",
    collectibleCode: "AHDK-WEAR-05"
  },
  {
    image: "assets/32_pote_hermetico_tampa_AHDK.jpg",
    name: "Pote Hermético AHDK",
    category: "Armazenamento",
    price: "R$119,00",
    priceValue: 119,
    stock: 16,
    status: "OK",
    description: "Pote compacto com tampa para guardar pequenos acessórios de tabacaria com aparência limpa e controlada.",
    badge: "Discreto",
    featured: true,
    edition: "Série Stash Clean",
    material: "Corpo fosco com tampa ajustada",
    process: "Acabamento revisado para fechamento firme",
    limited: "Reposição limitada",
    care: "Limpar com pano seco. Não usar solventes.",
    collectibleCode: "AHDK-ARM-01"
  },
  {
    image: "assets/48_concept_pack_AHDK.jpg",
    name: "AHDK Concept Pack",
    category: "Lookbook",
    price: "R$1.299,00",
    priceValue: 1299,
    stock: 5,
    status: "OK",
    description: "Composição visual do pack com camiseta, hoodie, sweatpants e trousers para apresentar a direção estética do drop.",
    badge: "Pack",
    featured: true,
    edition: "Concept Pack 01",
    material: "Curadoria visual de vestuário AHDK",
    process: "Lookbook de referência para exposição, venda assistida e drops",
    limited: "Pack completo sob consulta",
    care: "Consultar disponibilidade por peça e tamanho no atendimento.",
    collectibleCode: "AHDK-PACK-01"
  },
  {
    image: "assets/33_cinzeiro_com_tampa_AHDK.jpg",
    name: "Cinzeiro com Tampa",
    category: "Tabacaria",
    price: "R$99,00",
    priceValue: 99,
    stock: 14,
    status: "OK",
    description: "Cinzeiro fechado, discreto e compacto para bancada, kit de atendimento ou uso pessoal adulto.",
    badge: "Discreto",
    featured: true,
    edition: "Série Tabacaria Seletiva",
    material: "Acabamento fosco com tampa",
    process: "Peça compacta pensada para rotina e controle visual",
    limited: "Lote curto",
    care: "Usar com proteção térmica. Evitar contato prolongado com brasa direta.",
    collectibleCode: "AHDK-TAB-04"
  },
  {
    image: "assets/03_shoulder_bags_AHDK.jpg",
    name: "Shoulder Bag AHDK",
    category: "Acessórios",
    price: "R$229,00",
    priceValue: 229,
    stock: 11,
    status: "OK",
    description: "Bolsa compacta para carregar itens essenciais sem destoar da silhueta escura do vestuário.",
    badge: "Essencial",
    featured: true,
    edition: "Carry AHDK",
    material: "Tecido técnico escuro e ferragens discretas",
    process: "Construção compacta para rotina, evento e atendimento",
    limited: "Drop sazonal",
    care: "Limpar com pano úmido e secar à sombra.",
    collectibleCode: "AHDK-CAR-01"
  },
  {
    image: "assets/09_isqueiros_AHDK.jpg",
    name: "Isqueiro AHDK",
    category: "Tabacaria",
    price: "R$49,00",
    priceValue: 49,
    stock: 40,
    status: "OK",
    description: "Isqueiro de identidade limpa para kits, balcão e composição com o case retrátil.",
    badge: "Kit",
    featured: false,
    edition: "Série Tabacaria Seletiva",
    material: "Isqueiro com aplicação AHDK",
    process: "Item de reposição e composição para kits",
    limited: "Reposição controlada",
    care: "Produto de uso adulto. Manter longe de crianças e calor excessivo.",
    collectibleCode: "AHDK-TAB-05"
  },
  {
    image: "assets/07_slicks_AHDK.jpg",
    name: "Slicks AHDK",
    category: "Tabacaria",
    price: "R$29,00",
    priceValue: 29,
    stock: 52,
    status: "OK",
    description: "Consumível de tabacaria com embalagem alinhada à estética do drop, pensado para kits enxutos.",
    badge: "Kit",
    featured: false,
    edition: "Série Tabacaria Seletiva",
    material: "Embalagem AHDK",
    process: "Curadoria de item pequeno para kit e atendimento",
    limited: "Reposição contínua",
    care: "Armazenar fechado, seco e longe de calor.",
    collectibleCode: "AHDK-TAB-06"
  },
  {
    image: "assets/08_ziplock_AHDK.jpg",
    name: "Ziplock AHDK",
    category: "Tabacaria",
    price: "R$19,00",
    priceValue: 19,
    stock: 60,
    status: "OK",
    description: "Embalagem discreta para kits e organização de pequenos itens, com leitura visual da marca.",
    badge: "Embalagem",
    featured: false,
    edition: "Série Tabacaria Seletiva",
    material: "Ziplock com identidade AHDK",
    process: "Item de apoio para kits, brindes e organização",
    limited: "Reposição contínua",
    care: "Manter seco e evitar objetos pontiagudos.",
    collectibleCode: "AHDK-TAB-07"
  },
  {
    image: "assets/20_pote_stash_tampa_AHDK.jpg",
    name: "Stash Pot AHDK",
    category: "Armazenamento",
    price: "R$129,00",
    priceValue: 129,
    stock: 9,
    status: "Baixo",
    description: "Pote de stash com tampa para compor bancada, kit pessoal ou vitrine de acessórios discretos.",
    badge: "Stash",
    featured: false,
    edition: "Série Stash Clean",
    material: "Corpo fosco com tampa de encaixe",
    process: "Peça de armazenamento revisada por lote",
    limited: "Lote curto",
    care: "Limpar a seco e evitar queda.",
    collectibleCode: "AHDK-ARM-02"
  },
  {
    image: "assets/44_chaveiro_tag_AHDK.jpg",
    name: "Chaveiro Tag AHDK",
    category: "Acessórios",
    price: "R$45,00",
    priceValue: 45,
    stock: 24,
    status: "OK",
    description: "Tag pequena para acompanhar compra, kit ou drop como item colecionável sem roubar a cena da roupa.",
    badge: "Tag",
    featured: false,
    edition: "Micro série AHDK",
    material: "Tag fosca com argola metálica",
    process: "Produzido em lote curto para kits e ações",
    limited: "Colecionável",
    care: "Evitar atrito intenso com chaves pesadas.",
    collectibleCode: "AHDK-ACC-02"
  }
]

const storyByCategory = {
  "Vestuário": { edition: "Drop Wear AHDK", material: "Tecido selecionado conforme lote", process: "Modelagem autoral e aplicação discreta de marca", limited: "Drop sazonal", care: "Lavar do avesso e secar à sombra." },
  "Tabacaria": { edition: "Série Tabacaria Seletiva", material: "Materiais definidos por lote", process: "Curadoria de itens de uso adulto para kit e bancada", limited: "Reposição controlada", care: "Manter seco, longe de calor e fora do alcance de crianças." },
  "Bancada": { edition: "Série Bancada Ritual", material: "Acabamento fosco e textura premium", process: "Peça de apoio finalizada em lote pequeno", limited: "Baixa escala", care: "Limpar com pano seco. Não expor a calor direto." },
  "Armazenamento": { edition: "Série Stash Clean", material: "Corpo fosco com tampa ajustada", process: "Acabamento revisado para fechamento firme", limited: "Reposição limitada", care: "Limpar com pano seco. Não usar solventes." },
  "Acessórios": { edition: "Série Carry & Tags", material: "Materiais e ferragens conforme lote", process: "Peças de apoio para kit, rotina e presença de marca", limited: "Lotes pequenos", care: "Manter seco e guardar sem pressão sobre a peça." },
  "Lookbook": { edition: "Concept Pack 01", material: "Curadoria visual de vestuário AHDK", process: "Composição editorial para exposição e venda assistida", limited: "Pack completo sob consulta", care: "Consultar disponibilidade por peça e tamanho no atendimento." }
};

function ensureProductStoryShape() {
  products.forEach((product, index) => {
    const base = storyByCategory[product.category] || storyByCategory["Acessórios"];
    if (!product.edition) product.edition = base.edition;
    if (!product.material) product.material = base.material;
    if (!product.process) product.process = base.process;
    if (!product.limited) product.limited = base.limited;
    if (!product.care) product.care = base.care;
    if (!product.collectibleCode) product.collectibleCode = `AHDK-${String(index + 1).padStart(2, "0")}`;
  });
}

const notices = [
  ["✦", "Concept Pack adicionado", "Novas imagens de vestuário entraram na vitrine e no catálogo.", "ATIVO", "catalogo"],
  ["◇", "Curadoria tabacaria", "Itens de bancada e kit foram intercalados com o drop de roupa.", "ATIVO", "catalogo"],
  ["△", "Checklist de embalagem", "Pedidos aguardando embalagem, etiqueta ou expedição.", "TOQUE", "embalagem"],
  ["△", "Estoque baixo", "Itens seletivos precisam de revisão antes do próximo drop.", "TOQUE", "estoque"]
];

const operation = [
  ["✺", "Responder clientes", "Priorizar pedidos do catálogo e dúvidas de produto.", "Agora", "painel"],
  ["▤", "Conferir estoque", "Validar quantidades, itens baixos e peças pausadas.", "Hoje", "estoque"],
  ["☷", "Separar pedidos", "Abrir OS, conferir itens, embalagem e etiqueta.", "17:00", "os"],
  ["▣", "Checklist de embalagem", "Marcar separar, embalagem, etiqueta e expedição.", "Hoje", "embalagem"]
];

const clients = [
  ["✦", "Cliente Premium", "18 pedidos registrados", "VIP"],
  ["◎", "Revenda Central", "9 pedidos registrados", "Ativo"],
  ["◇", "Novo contato", "1 atendimento iniciado", "Novo"]
];

const supportTickets = [
  { id: "ATD-031", client: "Cliente Premium", source: "WhatsApp", time: "10:42", status: "Responder", request: "Quer confirmar disponibilidade da Boxy Tee, do Porta Sedas e do Case Retrátil.", items: [{ productIndex: 0, qty: 1 }, { productIndex: 1, qty: 1 }, { productIndex: 5, qty: 1 }] },
  { id: "ATD-032", client: "Revenda Central", source: "WhatsApp", time: "11:08", status: "Aguardando retorno", request: "Solicitou uma seleção de tabacaria para acompanhar o drop de vestuário.", items: [{ productIndex: 3, qty: 6 }, { productIndex: 13, qty: 6 }, { productIndex: 14, qty: 10 }] }
];

const orders = [
  { id: "OS-302", client: "Cliente Premium", time: "Hoje 14:20", status: "Separar", shipping: "Etiqueta pendente", items: [{ productIndex: 0, qty: 1, checked: false }, { productIndex: 1, qty: 1, checked: false }, { productIndex: 5, qty: 1, checked: false }], checklist: { embalagem: false, etiqueta: false, conferencia: false } },
  { id: "OS-303", client: "Revenda Central", time: "Hoje 15:05", status: "Conferência", shipping: "Aguardando embalagem", items: [{ productIndex: 2, qty: 2, checked: false }, { productIndex: 3, qty: 10, checked: false }, { productIndex: 13, qty: 10, checked: false }], checklist: { embalagem: false, etiqueta: false, conferencia: false } }
];

const finance = {
  entradas: 48750,
  saidas: 12540,
  pedidos: 156,
  meta: 80000,
  movements: [
    { type: "entrada", value: 12000, note: "Pedidos pagos", date: "Hoje" },
    { type: "entrada", value: 8750, note: "Atendimentos convertidos", date: "Ontem" },
    { type: "saida", value: 2540, note: "Reposição e operação", date: "Ontem" }
  ]
};

const integrationStatus = {
  whatsapp: true,
  automacao: true,
  api: true
};

const integrationConfig = {
  whatsapp: {
    defaultMessage: "Olá, vim pelo MiniApp AHDK e quero receber informações sobre o catálogo."
  },
  automacao: {
    tasks: ["Avisar quando estoque ficar baixo", "Registrar novo atendimento no CRM"]
  },
  api: {
    endpoints: ["/catalogo", "/clientes", "/estoque"]
  }
};

const integrationDescriptions = {
  whatsapp: "O WhatsApp Bot abre atendimento com uma mensagem pronta, reduzindo fricção para o cliente e padronizando a entrada de atendimentos.",
  automacao: "A automação organiza tarefas repetitivas: alertas de estoque, registro de clientes e avisos de drops.",
  api: "A API AHDK prepara o app para integrar catálogo, estoque, CRM e financeiro com sistemas externos."
};


const STORAGE_KEYS = {
  brand: "ahdkBrandConfig",
  products: "ahdkProducts",
  notices: "ahdkNotices",
  operation: "ahdkOperation",
  clients: "ahdkClients",
  supportTickets: "ahdkSupportTickets",
  orders: "ahdkOrders",
  finance: "ahdkFinance",
  integrationStatus: "ahdkIntegrationStatus",
  integrationConfig: "ahdkIntegrationConfig",
  permissions: "ahdkPermissions"
};

const DEFAULT_SNAPSHOT = JSON.parse(JSON.stringify({
  brand: BRAND_CONFIG,
  products,
  notices,
  operation,
  clients,
  supportTickets,
  orders,
  finance,
  integrationStatus,
  integrationConfig,
  permissions
}));

function readStore(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.warn("Falha ao ler armazenamento local", key, error);
    return null;
  }
}

function writeStore(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn("Falha ao salvar armazenamento local", key, error);
  }
}

function replaceArray(target, source) {
  if (!Array.isArray(source)) return;
  target.splice(0, target.length, ...source);
}

function replaceObject(target, source) {
  if (!source || typeof source !== "object" || Array.isArray(source)) return;
  Object.keys(target).forEach(key => delete target[key]);
  Object.assign(target, source);
}

function hydrateStore() {
  const savedVersion = localStorage.getItem("ahdkDataVersion");
  if (savedVersion !== APP_DATA_VERSION) {
    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
    localStorage.removeItem("ahdkInterestList");
    localStorage.removeItem("ahdkStockChecked");
    localStorage.removeItem("ahdkProfile");
    localStorage.setItem("ahdkDataVersion", APP_DATA_VERSION);
  }

  const savedBrand = readStore(STORAGE_KEYS.brand);
  const savedProducts = readStore(STORAGE_KEYS.products);
  const savedNotices = readStore(STORAGE_KEYS.notices);
  const savedOperation = readStore(STORAGE_KEYS.operation);
  const savedClients = readStore(STORAGE_KEYS.clients);
  const savedSupportTickets = readStore(STORAGE_KEYS.supportTickets);
  const savedOrders = readStore(STORAGE_KEYS.orders);
  const savedFinance = readStore(STORAGE_KEYS.finance);
  const savedIntegrationStatus = readStore(STORAGE_KEYS.integrationStatus);
  const savedIntegrationConfig = readStore(STORAGE_KEYS.integrationConfig);
  const savedPermissions = readStore(STORAGE_KEYS.permissions);

  replaceObject(BRAND_CONFIG, savedBrand);
  replaceArray(products, savedProducts);
  replaceArray(notices, savedNotices);
  replaceArray(operation, savedOperation);
  replaceArray(clients, savedClients);
  replaceArray(supportTickets, savedSupportTickets);
  replaceArray(orders, savedOrders);
  replaceObject(finance, savedFinance);
  ensureFinanceShape();
  ensureOrderShape();
  replaceObject(integrationStatus, savedIntegrationStatus);
  replaceObject(integrationConfig, savedIntegrationConfig);
  replaceObject(permissions, savedPermissions);
  ensureProductStoryShape();

  state.profile = localStorage.getItem("ahdkProfile") || BRAND_CONFIG.defaultProfile || "cliente";
  if (!profiles.includes(state.profile)) state.profile = "cliente";
  document.getElementById("brandName").textContent = BRAND_CONFIG.appName;
}

function persistAll() {
  localStorage.setItem("ahdkDataVersion", APP_DATA_VERSION);
  writeStore(STORAGE_KEYS.brand, BRAND_CONFIG);
  writeStore(STORAGE_KEYS.products, products);
  writeStore(STORAGE_KEYS.notices, notices);
  writeStore(STORAGE_KEYS.operation, operation);
  writeStore(STORAGE_KEYS.clients, clients);
  writeStore(STORAGE_KEYS.supportTickets, supportTickets);
  writeStore(STORAGE_KEYS.orders, orders);
  writeStore(STORAGE_KEYS.finance, finance);
  writeStore(STORAGE_KEYS.integrationStatus, integrationStatus);
  writeStore(STORAGE_KEYS.integrationConfig, integrationConfig);
  writeStore(STORAGE_KEYS.permissions, permissions);
}

function resetDemoData() {
  if (!confirm("Restaurar dados demonstrativos AHDK? Isso apaga alterações locais.")) return;
  replaceObject(BRAND_CONFIG, JSON.parse(JSON.stringify(DEFAULT_SNAPSHOT.brand)));
  replaceArray(products, JSON.parse(JSON.stringify(DEFAULT_SNAPSHOT.products)));
  replaceArray(notices, JSON.parse(JSON.stringify(DEFAULT_SNAPSHOT.notices)));
  replaceArray(operation, JSON.parse(JSON.stringify(DEFAULT_SNAPSHOT.operation)));
  replaceArray(clients, JSON.parse(JSON.stringify(DEFAULT_SNAPSHOT.clients)));
  replaceArray(supportTickets, JSON.parse(JSON.stringify(DEFAULT_SNAPSHOT.supportTickets)));
  replaceArray(orders, JSON.parse(JSON.stringify(DEFAULT_SNAPSHOT.orders)));
  replaceObject(finance, JSON.parse(JSON.stringify(DEFAULT_SNAPSHOT.finance)));
  ensureFinanceShape();
  ensureOrderShape();
  replaceObject(integrationStatus, JSON.parse(JSON.stringify(DEFAULT_SNAPSHOT.integrationStatus)));
  replaceObject(integrationConfig, JSON.parse(JSON.stringify(DEFAULT_SNAPSHOT.integrationConfig)));
  replaceObject(permissions, JSON.parse(JSON.stringify(DEFAULT_SNAPSHOT.permissions)));
  ensureProductStoryShape();
  state.interestList = [];
  localStorage.removeItem("ahdkInterestList");
  state.stockChecked = [];
  localStorage.removeItem("ahdkStockChecked");
  persistAll();
  toast("Sistema restaurado");
  setPage("home");
}

hydrateStore();

function profilePublicName(profile = state.profile) {
  return profile === "cliente" ? "Cliente" : profile === "equipe" ? "Equipe" : "Gestor";
}

function setProfileLabel() {
  const labels = {
    cliente: BRAND_CONFIG.subtitle || "Vestuário • tabacaria • séries limitadas",
    equipe: "Operação interna AHDK",
    gestor: "Gestão AHDK"
  };
  profileLabel.textContent = labels[state.profile] || BRAND_CONFIG.subtitle || "Sistema autoral";
  document.body.dataset.profile = state.profile;
  document.getElementById("brandName").textContent = BRAND_CONFIG.appName;
  const profileBtn = document.getElementById("profileBtn");
  if (profileBtn) {
    profileBtn.textContent = state.profile === "cliente" ? "INT" : state.profile === "equipe" ? "EQP" : "GST";
    profileBtn.setAttribute("aria-label", `Alternar perfil. Perfil atual: ${profilePublicName()}`);
  }
  localStorage.setItem("ahdkProfile", state.profile);
}

function switchProfile(profile) {
  if (!profiles.includes(profile)) return;
  state.profile = profile;
  if (!canAccess(state.page)) state.page = "home";
  if (state.activeModule && !canAccess(state.activeModule)) state.activeModule = null;
  state.selectedDetail = null;
  setProfileLabel();
  toast(`Modo ${profilePublicName(profile)}`);
  render();
}

document.getElementById("profileBtn").onclick = () => {
  const index = profiles.indexOf(state.profile);
  switchProfile(profiles[(index + 1) % profiles.length]);
};

function canAccess(page) {
  return permissions[state.profile]?.includes(page);
}

function navItemsForProfile() {
  return NAV_SETS[state.profile] || NAV_SETS.cliente;
}

function syncNavActive() {
  if (!bottomNav) return;
  bottomNav.querySelectorAll(".nav").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.page === state.page);
  });
}

function renderNavigation() {
  if (!bottomNav) return;
  const items = navItemsForProfile().filter(([page]) => canAccess(page));
  bottomNav.innerHTML = items.map(([page, icon, label]) => `
    <button class="nav ${state.page === page ? "active" : ""}" data-page="${page}" aria-label="Abrir ${escapeAttr(label)}">
      <i aria-hidden="true">${icon}</i><span>${escapeHtml(label)}</span>
    </button>`).join("");
  bottomNav.querySelectorAll(".nav").forEach(btn => {
    btn.onclick = () => setPage(btn.dataset.page);
  });
}

function setPage(page) {
  if (!canAccess(page)) {
    toast("Acesso restrito para este perfil");
    return;
  }
  state.page = page;
  state.activeModule = null;
  state.selectedDetail = null;
  syncNavActive();
  render();
}


function setTeamView(view) {
  state.teamView = view;
  state.selectedDetail = null;
  render();
}

function routeNoticeTarget(target, event) {
  if (event) event.stopPropagation();
  if (target === "catalogo") return setPage("produtos");
  if (["painel", "os", "embalagem", "estoque"].includes(target)) {
    state.page = "equipe";
    state.teamView = target;
    state.selectedDetail = null;
    syncNavActive();
    render();
  }
}

function render() {
  setProfileLabel();
  renderNavigation();
  updateHeaderCart();
  const pages = { home, produtos, avisos, colecoes, equipe, mais };
  const modules = { dashboard, crm, financeiro, estoque, integracoes, configuracoes };
  const content = state.page === "mais" && state.activeModule && modules[state.activeModule]
    ? modules[state.activeModule]()
    : pages[state.page]();
  app.innerHTML = content + productPreviewModal() + imageZoomModal() + cartDrawer() + detailModal() + catalogHubModal();
  const anyModalOpen = state.selectedProductIndex !== null || state.selectedZoomIndex !== null || state.cartOpen || state.selectedDetail !== null || state.catalogHubOpen;
  document.body.classList.toggle("modal-open", anyModalOpen);
}

function home() {
  const { lucro, margem } = financeSummary();
  const lowStock = products.filter(isLowStock).length;
  return `
  <div class="page">
    <label class="search"><span>⌕</span><input placeholder="Buscar peça, drop ou categoria..." oninput="state.search=this.value; setPage('produtos')" /></label>

    ${state.profile !== "cliente" ? compactSessionSwitcher() : ""}

    ${heroSpotlight()}

    ${featuredCarousel()}

    ${catalogOverview()}

    <div class="quick-grid public-actions">
      <button class="quick" onclick="setPage('produtos')"><i>⌕</i><b>Catálogo</b><small>Produtos</small></button>
      <button class="quick" onclick="setPage('avisos')"><i>✧</i><b>Drops</b><small>Novidades</small></button>
      <button class="quick" onclick="setPage('colecoes')"><i>◇</i><b>Coleções</b><small>Peças seletivas</small></button>
      <button class="quick" onclick="abrirAtendimento()"><i>☏</i><b>Atendimento</b><small>WhatsApp</small></button>
    </div>

    ${state.profile === "gestor" ? `
    <div class="section"><h3>Visão Geral</h3><span>Gestão</span></div>
    <div class="kpis">
      ${kpi("Pedidos ativos", String(finance.pedidos), "Operação", "metric", "pedidos")}
      ${kpi("Faturamento", formatMoney(finance.entradas), "Meta mensal", "metric", "faturamento")}
      ${kpi("Lucro líquido", formatMoney(lucro), "Margem " + margem, "metric", "lucro")}
      ${kpi("Estoque baixo", String(lowStock), lowStock ? "Revisar" : "OK", "metric", "estoque_baixo")}
    </div>` : ""}

    ${state.profile === "cliente" ? publicHomeStory() : `
    <div class="section"><h3>Prioridades</h3><span>Hoje</span></div>
    <div class="stack">
      ${operation.slice(0, 2).map((e, index) => item(...e, e[3] === "Agora" ? "gold" : "", "operation", String(index))).join("")}
    </div>`}
  </div>`;
}

function publicHomeStory() {
  return `
    <section class="brand-ritual-card">
      <span class="label">Essência AHDK</span>
      <h3>Peças de uso, bancada e coleção.</h3>
      <p>O catálogo intercala vestuário e tabacaria em uma curadoria de uso adulto, bancada e coleção, com presença escura, tátil e discreta.</p>
      <div class="ritual-points">
        <span>vestuário</span>
        <span>feito à mão</span>
        <span>baixa escala</span>
      </div>
    </section>`;
}

function sessionSwitcher() {
  return `
    <section class="session-panel" aria-label="Sessões do MiniApp">
      <div>
        <span class="label">Sessões</span>
        <strong>${state.profile === "cliente" ? "Cliente" : state.profile === "equipe" ? "Equipe" : "Gestor"}</strong>
        <small>Troque o perfil para validar a experiência de cada acesso.</small>
      </div>
      <div class="session-actions">
        ${profiles.map(profile => `<button class="${state.profile === profile ? "active" : ""}" onclick="switchProfile('${profile}')">${profile}</button>`).join("")}
      </div>
    </section>`;
}


function compactSessionSwitcher() {
  return `
    <section class="session-strip" aria-label="Trocar sessão">
      <span>Trocar sessão</span>
      <div>
        ${profiles.map(profile => `<button class="${state.profile === profile ? "active" : ""}" onclick="switchProfile('${profile}')">${profile === "cliente" ? "Cliente" : profile === "equipe" ? "Equipe" : "Gestor"}</button>`).join("")}
      </div>
    </section>`;
}

function heroSpotlight() {
  const heroProducts = products
    .map((product, index) => ({ product, index }))
    .filter(({ product }) => product.featured || product.badge)
    .slice(0, 6);
  const slide = Math.min(state.heroSlide, heroProducts.length - 1);
  const current = heroProducts[slide]?.product || products[0];
  const currentIndex = heroProducts[slide]?.index ?? 0;

  return `
    <section class="hero hero-carousel hero-product-first" aria-label="Destaque inicial AHDK" onclick="openProductPreview(${currentIndex})">
      <div class="hero-media hero-media-clean" aria-hidden="true">
        ${heroProducts.map(({ product }, index) => `
          <img class="${index === slide ? "active" : ""}" src="${product.image}" alt="">
        `).join("")}
      </div>
      <div class="hero-minimal-ui">
        <strong>AHDK</strong>
        <button onclick="openProductPreview(${currentIndex}, event)">Ver produto</button>
      </div>
      <div class="hero-carousel-ui dots-only">
        <div class="hero-dots">
          ${heroProducts.map((_, index) => `<button class="${index === slide ? "active" : ""}" onclick="setHeroSlide(${index}, event)" aria-label="Ir para destaque ${index + 1}"></button>`).join("")}
        </div>
      </div>
    </section>`;
}

function changeHeroSlide(direction, event) {
  if (event) event.stopPropagation();
  const total = products.filter(product => product.featured || product.badge).slice(0, 6).length || Math.min(products.length, 6);
  if (!total) return;
  state.heroSlide = (state.heroSlide + direction + total) % total;
  render();
}

function setHeroSlide(index, event) {
  if (event) event.stopPropagation();
  state.heroSlide = index;
  render();
}

function featuredCarousel() {
  const featured = products
    .map((product, index) => ({ product, index }))
    .filter(({ product }) => product.featured || product.badge)
    .slice(0, 10);

  if (!featured.length) return "";

  return `
    <section class="featured-block" aria-label="Produtos em destaque">
      <div class="section compact">
        <h3>Destaques</h3>
        <span>Arraste para ver mais</span>
      </div>
      <div class="carousel-shell clean-carousel">
        <div class="featured-carousel" id="featuredCarousel">
          ${featured.map(({ product, index }) => featuredCard(product, index)).join("")}
        </div>
      </div>
      <div class="featured-dots" aria-hidden="true">${featured.slice(0, 5).map((_, index) => `<span class="${index === 0 ? "active" : ""}"></span>`).join("")}</div>
      <div class="swipe-hint"><span>↔</span> Arraste para o lado e veja mais itens</div>
    </section>`;
}

function scrollFeatured(direction, event) {
  if (event) event.stopPropagation();
  const carousel = document.getElementById("featuredCarousel");
  if (!carousel) return;
  carousel.scrollBy({ left: direction * Math.round(carousel.clientWidth * 0.82), behavior: "smooth" });
}

function featuredCard(product, index) {
  const count = interestCount(index);
  const story = productNarrative(product, index);
  return `
    <article class="featured-card ${count > 0 ? "in-cart" : ""}" onclick="openProductPreview(${index})" role="button" tabindex="0" onkeydown="handleCardKey(event, ${index})">
      <div class="featured-image"><img src="${product.image}" alt="${escapeHtml(product.name)}" loading="lazy" decoding="async"></div>
      <div class="featured-copy">
        <span>${escapeHtml(product.badge || story.edition || "Destaque")}</span>
        <h4>${escapeHtml(product.name)}</h4>
        <small class="featured-story">${escapeHtml(story.limited)}</small>
        <div class="featured-row">
          <strong>${escapeHtml(product.price)}</strong>
          <button class="mini-cart ${count > 0 ? "added" : ""}" onclick="addToInterestList(${index}, event)" aria-label="Adicionar ${escapeAttr(product.name)} ao carrinho">${count > 0 ? `✓ ${count}` : "+"}</button>
        </div>
      </div>
    </article>`;
}

function produtos() {
  const query = (state.search || "").toLowerCase();
  const activeCategory = state.catalogCategory || "Todos";
  const list = products.filter(p => {
    const text = `${p.name} ${p.category} ${p.description}`.toLowerCase();
    const matchesSearch = !query || text.includes(query);
    const matchesCategory = activeCategory === "Todos" || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return `
  <div class="page">
    <label class="search"><span>⌕</span><input value="${escapeHtml(state.search || "")}" placeholder="Buscar produto, coleção ou categoria..." oninput="state.search=this.value; render()" /></label>
    <div class="section"><h3>Catálogo</h3><span>${list.length} itens</span></div>
    ${catalogOverview(true)}
    ${catalogFilters()}

    <div class="product-grid">
      ${list.map((p, i) => productCard(p, products.indexOf(p))).join("")}
    </div>

    ${state.profile === "gestor" ? `
      <button class="quick full-width-action" onclick="addProduct()">
        <i>＋</i><b>Novo item</b><small>Adicionar ao catálogo</small>
      </button>` : ""}
  </div>`;
}

function productCard(product, index) {
  const remove = state.profile === "gestor" ? `<button class="delete-btn" onclick="removeProduct(${index}, event)">Remover</button>` : "";
  const count = interestCount(index);
  const added = count > 0;
  const story = productNarrative(product, index);

  return `
  <article class="product-card ${added ? "in-cart" : ""} ${isLowStock(product) ? "low-stock-card" : ""}" onclick="openProductPreview(${index})" role="button" tabindex="0" onkeydown="handleCardKey(event, ${index})">
    <div class="cover">
      <img src="${product.image}" alt="${escapeHtml(product.name)}" loading="lazy" decoding="async">
      <span class="tap-hint">Tocar para expandir</span>
    </div>
    <div class="product-body">
      <span class="label">${escapeHtml(product.category)}</span>
      <h4>${escapeHtml(product.name)}</h4>
      <p>${escapeHtml(product.description)}</p>
      <div class="product-story-line"><span>${escapeHtml(story.edition)}</span><span>${escapeHtml(story.limited)}</span></div>
      <div class="product-meta">
        <strong class="price">${escapeHtml(product.price)}</strong>
        <div class="product-actions">
          <button class="cart-btn ${added ? "added" : ""}" onclick="addToInterestList(${index}, event)" aria-label="Adicionar ${escapeAttr(product.name)} ao carrinho">
            <span>${added ? "✓" : "+"}</span><em>${added ? "Adicionado" : "Adicionar"}</em>
          </button>
          ${remove}
        </div>
      </div>
    </div>
  </article>`;
}

function productPreviewModal() {
  const index = state.selectedProductIndex;
  const product = Number.isInteger(index) ? products[index] : null;
  if (!product) return "";

  const count = interestCount(index);
  const added = count > 0;
  const story = productNarrative(product, index);
  const addLabel = added ? `✓ Adicionar mais um (${count})` : "+ Adicionar ao carrinho";

  return `
  <div class="product-modal-backdrop" onclick="closeAllModals(event)">
    <section class="product-modal" role="dialog" aria-modal="true" aria-label="Detalhes do produto">
      <button class="modal-close" onclick="closeAllModals()" aria-label="Fechar">×</button>
      <button class="modal-image-wrap" onclick="openImageZoom(${index}, event)" aria-label="Explorar produto em movimento visual">
        <img src="${product.image}" alt="${escapeHtml(product.name)}" loading="lazy" decoding="async">
        <span class="modal-badge">${escapeHtml(product.badge || product.category)}</span>
        <span class="zoom-hint">Toque para explorar</span>
      </button>
      <div class="modal-content">
        <span class="label">${escapeHtml(product.category)}</span>
        <h3>${escapeHtml(product.name)}</h3>
        <p>${escapeHtml(product.description)}</p>
        <div class="product-story-grid">
          <div><small>Edição</small><strong>${escapeHtml(story.edition)}</strong></div>
          <div><small>Material</small><strong>${escapeHtml(story.material)}</strong></div>
          <div><small>Processo</small><strong>${escapeHtml(story.process)}</strong></div>
          <div><small>Lote</small><strong>${escapeHtml(story.limited)}</strong></div>
        </div>
        <p class="care-note">${escapeHtml(story.care)}</p>
        <div class="modal-meta">
          <div>
            <small>Preço</small>
            <strong>${escapeHtml(product.price)}</strong>
          </div>
          <span class="pill ${state.profile !== "cliente" && product.status === "Baixo" ? "red" : "gold"}">${escapeHtml(state.profile === "cliente" ? "Sob consulta" : product.status)}</span>
        </div>
        <button class="modal-cart ${added ? "added" : ""}" onclick="addToInterestList(${index}, event)">${addLabel}</button>
        <button class="modal-ghost" onclick="abrirAtendimento()">Finalizar pelo WhatsApp</button>
      </div>
    </section>
  </div>`;
}

function imageZoomModal() {
  const index = state.selectedZoomIndex;
  const product = Number.isInteger(index) ? products[index] : null;
  if (!product) return "";

  return `
  <div class="image-zoom-backdrop" onclick="closeAllModals(event)">
    <section class="image-zoom product-explorer" role="dialog" aria-modal="true" aria-label="Explorar produto em movimento visual">
      <button class="modal-close zoom-close" onclick="closeAllModals()" aria-label="Fechar">×</button>
      <div class="explorer-stage" onpointermove="moveProductExplorer(event)" onpointerleave="resetProductExplorer(event)">
        <span class="explorer-orbit one"></span>
        <span class="explorer-orbit two"></span>
        <span class="explorer-particle p1"></span>
        <span class="explorer-particle p2"></span>
        <span class="explorer-particle p3"></span>
        <img class="explorer-product" src="${product.image}" alt="${escapeHtml(product.name)}">
      </div>
      <div class="image-zoom-caption">
        <span>${escapeHtml(product.category)}</span>
        <strong>${escapeHtml(product.name)}</strong>
        <small>Arraste o dedo ou mouse para movimentar. A imagem acompanha o gesto para explorar detalhes da peça.</small>
        <div class="explorer-caption-row">
          <b>${escapeHtml(product.price)}</b>
          <button class="modal-cart ${interestCount(index) > 0 ? "added" : ""}" onclick="addToInterestList(${index}, event)">${interestCount(index) > 0 ? "✓ Adicionar mais" : "+ Adicionar"}</button>
        </div>
      </div>
    </section>
  </div>`;
}

function cartDrawer() {
  if (!state.cartOpen) return "";
  const grouped = cartGroupedItems();
  const total = cartTotalValue(grouped);

  return `
  <div class="cart-backdrop" onclick="closeAllModals(event)">
    <aside class="cart-drawer" role="dialog" aria-modal="true" aria-label="Carrinho AHDK">
      <button class="modal-close" onclick="closeAllModals()" aria-label="Fechar">×</button>
      <div class="cart-head">
        <span class="label">Pedido em montagem</span>
        <h3>Carrinho AHDK</h3>
        <p>${grouped.length ? "Revise os itens antes de finalizar o atendimento." : "Nenhum item adicionado ainda."}</p>
      </div>
      <div class="cart-list">
        ${grouped.length ? grouped.map(item => cartItem(item)).join("") : `<div class="empty-cart">Toque em adicionar nos cards para montar sua lista.</div>`}
      </div>
      ${grouped.length ? `<div class="cart-total"><span>Total estimado</span><strong>${formatMoney(total)}</strong></div>` : ""}
      <div class="cart-actions">
        <button class="modal-cart ${grouped.length ? "added" : ""}" onclick="abrirAtendimento()">Finalizar pelo WhatsApp</button>
        <button class="modal-ghost" onclick="clearInterestList(event)">Limpar carrinho</button>
      </div>
    </aside>
  </div>`;
}

function cartItem({ index, count }) {
  const product = products[index];
  if (!product) return "";
  const subtotal = productPriceValue(product) * count;
  return `
    <article class="cart-item">
      <img src="${product.image}" alt="${escapeHtml(product.name)}" loading="lazy" decoding="async">
      <div>
        <span>${escapeHtml(product.category)}</span>
        <strong>${escapeHtml(product.name)}</strong>
        <small>${escapeHtml(product.price)} • ${count}x • ${formatMoney(subtotal)}</small>
      </div>
      <div class="cart-qty-actions">
        <button onclick="removeOneFromInterestList(${index}, event)" aria-label="Remover uma unidade">−</button>
        <button onclick="addToInterestList(${index}, event)" aria-label="Adicionar mais uma unidade">＋</button>
        <button onclick="removeAllFromInterestList(${index}, event)" aria-label="Remover item do carrinho">×</button>
      </div>
    </article>`;
}

function cartGroupedItems() {
  const map = new Map();
  state.interestList.forEach(index => {
    if (!products[index]) return;
    map.set(index, (map.get(index) || 0) + 1);
  });
  return Array.from(map.entries()).map(([index, count]) => ({ index, count }));
}

function productPriceValue(product) {
  if (!product) return 0;
  if (typeof product.priceValue === "number") return product.priceValue;
  return parseMoneyInput(product.price);
}

function cartTotalValue(grouped = cartGroupedItems()) {
  return grouped.reduce((sum, { index, count }) => sum + productPriceValue(products[index]) * count, 0);
}

function openProductPreview(index, event) {
  if (event) event.stopPropagation();
  if (!products[index]) return;
  state.cartOpen = false;
  state.selectedProductIndex = index;
  render();
}

function closeProductPreview(event) {
  if (event && event.type === "click" && event.currentTarget !== event.target) return;
  state.selectedProductIndex = null;
  render();
}

function openImageZoom(index, event) {
  if (event) event.stopPropagation();
  if (!products[index]) return;
  state.selectedZoomIndex = index;
  render();
}

function closeImageZoom(event) {
  if (event && event.type === "click" && event.currentTarget !== event.target) return;
  state.selectedZoomIndex = null;
  render();
}

function openCartDrawer() {
  state.cartOpen = true;
  state.selectedProductIndex = null;
  state.selectedZoomIndex = null;
  render();
}

function closeCartDrawer(event) {
  if (event && event.type === "click" && event.currentTarget !== event.target) return;
  state.cartOpen = false;
  render();
}

function closeAllModals(event) {
  if (event && event.type === "click" && event.currentTarget !== event.target) return;
  state.selectedProductIndex = null;
  state.selectedZoomIndex = null;
  state.cartOpen = false;
  state.selectedDetail = null;
  state.catalogHubOpen = false;
  render();
}

function moveProductExplorer(event) {
  const stage = event.currentTarget;
  const rect = stage.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
  const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
  stage.style.setProperty("--rx", `${(-y * 8).toFixed(2)}deg`);
  stage.style.setProperty("--ry", `${(x * 10).toFixed(2)}deg`);
  stage.style.setProperty("--mx", `${(50 + x * 10).toFixed(1)}%`);
  stage.style.setProperty("--my", `${(50 + y * 10).toFixed(1)}%`);
}

function resetProductExplorer(event) {
  const stage = event.currentTarget;
  stage.style.setProperty("--rx", "0deg");
  stage.style.setProperty("--ry", "0deg");
  stage.style.setProperty("--mx", "50%");
  stage.style.setProperty("--my", "50%");
}

function handleCardKey(event, index) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openProductPreview(index);
  }
}

function interestCount(index) {
  return state.interestList.filter(itemIndex => itemIndex === index).length;
}

function saveInterestList() {
  localStorage.setItem("ahdkInterestList", JSON.stringify(state.interestList));
  updateHeaderCart();
}

function addToInterestList(index, event) {
  if (event) event.stopPropagation();
  if (!products[index]) return;
  state.interestList.push(index);
  saveInterestList();
  toast("Item adicionado ao carrinho");
  render();
}

function removeOneFromInterestList(index, event) {
  if (event) event.stopPropagation();
  const pos = state.interestList.lastIndexOf(index);
  if (pos >= 0) {
    state.interestList.splice(pos, 1);
    saveInterestList();
    toast("Item removido");
    render();
  }
}

function removeAllFromInterestList(index, event) {
  if (event) event.stopPropagation();
  state.interestList = state.interestList.filter(itemIndex => itemIndex !== index);
  saveInterestList();
  toast("Produto removido do carrinho");
  render();
}

function clearInterestList(event) {
  if (event) event.stopPropagation();
  state.interestList = [];
  saveInterestList();
  toast("Carrinho limpo");
  render();
}

function updateHeaderCart() {
  const btn = document.getElementById("headerCartBtn");
  const count = document.getElementById("cartCount");
  if (!btn || !count) return;
  const total = state.interestList.length;
  btn.classList.toggle("active", total > 0);
  count.textContent = String(total);
  btn.setAttribute("aria-label", total ? `Abrir carrinho com ${total} itens` : "Abrir carrinho");
}

window.addEventListener("keydown", event => {
  if (event.key !== "Escape") return;
  closeAllModals();
});

function openDetail(type, key, event) {
  if (event) event.stopPropagation();
  state.selectedDetail = { type, key: String(key) };
  state.cartOpen = false;
  state.selectedProductIndex = null;
  state.selectedZoomIndex = null;
  render();
}

function closeDetail(event) {
  if (event && event.type === "click" && event.currentTarget !== event.target) return;
  state.selectedDetail = null;
  render();
}

function detailModal() {
  if (!state.selectedDetail) return "";
  const detail = buildDetailContent(state.selectedDetail.type, state.selectedDetail.key);
  if (!detail) return "";

  return `
  <div class="detail-backdrop" onclick="closeAllModals(event)">
    <section class="detail-modal" role="dialog" aria-modal="true" aria-label="Detalhes">
      <button class="modal-close" onclick="closeAllModals()" aria-label="Fechar">×</button>
      <div class="detail-head">
        <span class="label">${escapeHtml(detail.label || "Detalhes")}</span>
        <h3>${escapeHtml(detail.title)}</h3>
        <p>${escapeHtml(detail.description || "")}</p>
      </div>
      <div class="detail-grid">
        ${detail.metrics.map(metric => `<article><small>${escapeHtml(metric.label)}</small><strong>${escapeHtml(metric.value)}</strong><span>${escapeHtml(metric.note || "")}</span></article>`).join("")}
      </div>
      ${detail.list?.length ? `<div class="detail-list">${detail.list.map(row => `<div><b>${escapeHtml(row.title)}</b><small>${escapeHtml(row.text)}</small></div>`).join("")}</div>` : ""}
      <div class="detail-actions">
        ${detail.actions.map(action => `<button class="${action.primary ? "modal-cart" : "modal-ghost"}" onclick="${action.onclick}">${escapeHtml(action.label)}</button>`).join("")}
      </div>
    </section>
  </div>`;
}

function buildDetailContent(type, key) {
  if (type === "metric") return metricDetail(key);
  if (type === "operation") return operationDetail(parseInt(key));
  if (type === "notice") return noticeDetail(parseInt(key));
  if (type === "client") return clientDetail(parseInt(key));
  if (type === "support") return supportDetail(parseInt(key));
  if (type === "order") return orderDetail(parseInt(key));
  if (type === "product") return productDetail(parseInt(key));
  if (type === "integration") return integrationDetail(key);
  return null;
}

function metricDetail(key) {
  const { lucro, margem } = financeSummary();
  const lowStock = state.profile === "cliente" ? [] : products.filter(isLowStock);
  const totalStock = products.reduce((sum, product) => sum + (Number(product.stock) || 0), 0);
  const progress = Math.min(100, Math.round((finance.entradas / Math.max(finance.meta, 1)) * 100));
  const grouped = cartGroupedItems();

  const baseActions = [
    { label: "Abrir dashboard", onclick: "closeDetail(); openModule('dashboard')", primary: true },
    { label: "Fechar", onclick: "closeDetail()" }
  ];

  const details = {
    pedidos: {
      label: "Operação",
      title: "Pedidos ativos",
      description: "Resumo rápido da movimentação registrada no financeiro e no fluxo operacional.",
      metrics: [
        { label: "Pedidos", value: String(finance.pedidos), note: "total registrado" },
        { label: "Prioridades", value: String(operation.length), note: "tarefas abertas" },
        { label: "Carrinho local", value: String(state.interestList.length), note: "itens de interesse" }
      ],
      list: operation.slice(0, 4).map(op => ({ title: op[1], text: `${op[2]} • ${op[3]}` })),
      actions: [
        { label: "Ver operação", onclick: "closeDetail(); setPage('equipe')", primary: true },
        { label: "Registrar pedido", onclick: "registerOrder()" }
      ]
    },
    faturamento: {
      label: "Financeiro",
      title: "Faturamento",
      description: "Entradas acumuladas e acompanhamento da meta mensal.",
      metrics: [
        { label: "Entradas", value: formatMoney(finance.entradas), note: "valor bruto" },
        { label: "Meta", value: formatMoney(finance.meta), note: `${progress}% alcançado` },
        { label: "Pedidos", value: String(finance.pedidos), note: "registrados" }
      ],
      list: [{ title: "Leitura", text: progress >= 100 ? "Meta mensal batida." : "Ainda existe espaço para acelerar ofertas e atendimento." }],
      actions: [
        { label: "Abrir financeiro", onclick: "closeDetail(); openModule('financeiro')", primary: true },
        { label: "Adicionar entrada", onclick: "addEntrada()" }
      ]
    },
    lucro: {
      label: "Financeiro",
      title: "Lucro líquido",
      description: "Diferença entre entradas e saídas registradas localmente.",
      metrics: [
        { label: "Lucro", value: formatMoney(lucro), note: "entradas - saídas" },
        { label: "Margem", value: margem, note: "sobre entradas" },
        { label: "Saídas", value: formatMoney(finance.saidas), note: "custos/despesas" }
      ],
      list: [{ title: "Atenção", text: "Use o financeiro para registrar entradas e saídas antes de tomar decisão." }],
      actions: [
        { label: "Abrir financeiro", onclick: "closeDetail(); openModule('financeiro')", primary: true },
        { label: "Adicionar saída", onclick: "addSaida()" }
      ]
    },
    estoque_baixo: {
      label: "Estoque",
      title: "Estoque baixo",
      description: lowStock.length ? "Itens que precisam de revisão ou reposição." : "Nenhum item crítico neste momento.",
      metrics: [
        { label: "Críticos", value: String(lowStock.length), note: "5 unid. ou menos" },
        { label: "Total em estoque", value: String(totalStock), note: `${products.length} itens` },
        { label: "Catálogo", value: String(products.length), note: "produtos cadastrados" }
      ],
      list: (lowStock.length ? lowStock : products.slice(0, 3)).map(p => ({ title: p.name, text: `${p.price} • estoque ${p.stock} • ${p.status}` })),
      actions: [
        { label: "Abrir estoque", onclick: "closeDetail(); openModule('estoque')", primary: true },
        { label: "Novo item", onclick: "addProduct()" }
      ]
    },
    estoque_total: {
      label: "Estoque",
      title: "Estoque total",
      description: "Visão somada do catálogo cadastrado no MiniApp.",
      metrics: [
        { label: "Unidades", value: String(totalStock), note: "total somado" },
        { label: "Produtos", value: String(products.length), note: "cadastros" },
        { label: "Baixo", value: String(lowStock.length), note: "revisar" }
      ],
      list: products.slice(0, 5).map(p => ({ title: p.name, text: `${p.price} • estoque ${p.stock}` })),
      actions: [
        { label: "Abrir estoque", onclick: "closeDetail(); openModule('estoque')", primary: true },
        { label: "Adicionar produto", onclick: "addProduct()" }
      ]
    },
    meta: {
      label: "Meta mensal",
      title: "Acompanhamento da meta",
      description: "Barra de progresso da meta definida para o mês.",
      metrics: [
        { label: "Atual", value: formatMoney(finance.entradas), note: "faturamento" },
        { label: "Meta", value: formatMoney(finance.meta), note: "objetivo" },
        { label: "Progresso", value: `${progress}%`, note: "concluído" }
      ],
      list: [{ title: "Direção", text: "Use os destaques da home e o atendimento para empurrar itens prioritários." }],
      actions: [
        { label: "Abrir financeiro", onclick: "closeDetail(); openModule('financeiro')", primary: true },
        { label: "Adicionar entrada", onclick: "addEntrada()" }
      ]
    },
    carrinho: {
      label: "Carrinho",
      title: "Itens em carrinho local",
      description: "Lista local usada para atendimento e consulta, sem checkout automático.",
      metrics: [
        { label: "Total", value: String(state.interestList.length), note: "cliques no carrinho" },
        { label: "Tipos", value: String(grouped.length), note: "produtos diferentes" },
        { label: "Sessão", value: state.profile, note: "perfil ativo" }
      ],
      list: grouped.length ? grouped.map(({ index, count }) => ({ title: products[index].name, text: `${count}x • ${products[index].price}` })) : [{ title: "Vazio", text: "Adicione itens pelo catálogo ou destaques." }],
      actions: [
        { label: "Abrir carrinho", onclick: "closeDetail(); openCartDrawer()", primary: true },
        { label: "Ver catálogo", onclick: "closeDetail(); setPage('produtos')" }
      ]
    },
    avisos: {
      label: "Drops",
      title: "Drops cadastrados",
      description: "Comunicados ativos para cliente, equipe e gestor.",
      metrics: [
        { label: "Total", value: String(notices.length), note: "avisos" },
        { label: "Públicos", value: String(notices.filter(n => n[3] !== "Interno").length), note: "cliente vê" },
        { label: "Internos", value: String(notices.filter(n => n[3] === "Interno").length), note: "equipe/gestor" }
      ],
      list: notices.slice(0, 5).map(n => ({ title: n[1], text: `${n[2]} • ${n[3]}` })),
      actions: [
        { label: "Abrir drops", onclick: "closeDetail(); setPage('avisos')", primary: true },
        { label: "Gerenciar", onclick: "openNotificationConfig()" }
      ]
    },
    entradas: null,
    saidas: null,
    margem: null
  };

  if (key === "entradas") return details.faturamento;
  if (key === "saidas") return {
    label: "Financeiro",
    title: "Saídas",
    description: "Custos e despesas cadastrados para leitura da margem.",
    metrics: [
      { label: "Saídas", value: formatMoney(finance.saidas), note: "registrado" },
      { label: "Entradas", value: formatMoney(finance.entradas), note: "comparação" },
      { label: "Lucro", value: formatMoney(lucro), note: "resultado" }
    ],
    list: [{ title: "Controle", text: "Registre despesas com frequência para o painel ficar realista." }],
    actions: [
      { label: "Abrir financeiro", onclick: "closeDetail(); openModule('financeiro')", primary: true },
      { label: "Adicionar saída", onclick: "addSaida()" }
    ]
  };
  if (key === "margem") return details.lucro;

  return details[key] || details.pedidos;
}

function operationDetail(index) {
  const entry = operation[index];
  if (!entry) return null;
  const isResponder = entry[1].toLowerCase().includes("responder");
  const isSeparar = entry[1].toLowerCase().includes("separar");
  const isConferir = entry[1].toLowerCase().includes("estoque");
  const list = isResponder
    ? supportTickets.map(ticket => ({ title: `${ticket.id} • ${ticket.client}`, text: `${ticket.request} • ${ticket.time} • ${ticket.status}` }))
    : isSeparar
      ? orders.map(order => ({ title: `${order.id} • ${order.client}`, text: `${order.items.map(formatOrderItem).join(" + ")} • ${order.status}` }))
      : isConferir
        ? products.filter(isLowStock).map(p => ({ title: p.name, text: `Estoque ${p.stock} • alerta com 10 unidades ou menos` }))
        : [{ title: "Próximo passo", text: entry[3] === "Agora" ? "Resolver antes das demais tarefas." : "Acompanhar dentro da rotina do dia." }];
  return {
    label: "Prioridade operacional",
    title: entry[1],
    description: entry[2],
    metrics: [
      { label: "Status", value: entry[3], note: "prazo" },
      { label: "Ordem", value: `#${index + 1}`, note: "fila" },
      { label: "Abertos", value: String(isResponder ? supportTickets.length : isSeparar ? orders.length : operation.length), note: "itens" }
    ],
    list,
    actions: [
      { label: isResponder ? "Ver atendimentos" : isSeparar ? "Ver pedidos" : "Abrir operação", onclick: "closeDetail(); setPage('equipe')", primary: true },
      ...(state.profile === "gestor" ? [{ label: "Remover tarefa", onclick: `removeOperationTask(${index}, event)` }] : [])
    ]
  };
}

function noticeDetail(index) {
  const entry = notices[index];
  if (!entry) return null;
  return {
    label: "Drop & aviso",
    title: entry[1],
    description: entry[2],
    metrics: [
      { label: "Status", value: entry[3], note: entry[3] === "Interno" ? "restrito" : "visível" },
      { label: "Tipo", value: entry[3] === "Interno" ? "Interno" : "Público", note: "alcance" },
      { label: "Ícone", value: entry[0], note: "identidade" }
    ],
    list: [{ title: "Uso", text: entry[3] === "Interno" ? "Aparece para equipe/gestor." : "Pode aparecer para cliente." }],
    actions: [
      { label: "Abrir drops", onclick: "closeDetail(); setPage('avisos')", primary: true },
      ...(state.profile === "gestor" ? [{ label: "Gerenciar avisos", onclick: "openNotificationConfig()" }] : [])
    ]
  };
}

function clientDetail(index) {
  const entry = clients[index];
  if (!entry) return null;
  const insight = clientInsights(index);
  return {
    label: "Cliente",
    title: entry[1],
    description: `${entry[2]} • ${entry[3]}`,
    metrics: [
      { label: "Total gasto", value: formatMoney(insight.total), note: "histórico local" },
      { label: "Última compra", value: insight.last, note: "recência" },
      { label: "Frequência", value: insight.frequency, note: "ritmo" }
    ],
    list: [
      { title: "Itens mais comprados", text: insight.favorites.join(", ") },
      { title: "Último pedido", text: `${insight.lastOrder} • ${insight.ticket}` },
      { title: "Leitura comercial", text: insight.note }
    ],
    actions: [
      { label: "Abrir clientes", onclick: "closeDetail(); openModule('crm')", primary: true },
      { label: "Registrar pedido", onclick: "registerOrder()" },
      ...(state.profile === "gestor" ? [{ label: "Remover cliente", onclick: `removeClient(${index}, event)` }] : [])
    ]
  };
}

function productDetail(index) {
  const product = products[index];
  if (!product) return null;
  return {
    label: product.category,
    title: product.name,
    description: product.description,
    metrics: [
      { label: "Preço", value: product.price, note: "catálogo" },
      { label: "Estoque", value: String(product.stock), note: isLowStock(product) ? "baixo" : "ok" },
      { label: "Status", value: product.status, note: "operação" }
    ],
    list: [{ title: "Imagem", text: "Abra o produto para ver a imagem ampliada e adicionar ao carrinho." }],
    actions: [
      { label: "Abrir produto", onclick: `closeDetail(); openProductPreview(${index})`, primary: true },
      { label: interestCount(index) ? "✓ No carrinho" : "Adicionar", onclick: `addToInterestList(${index}, event)` }
    ]
  };
}

function integrationDetail(type) {
  const labels = { whatsapp: "WhatsApp Bot", automacao: "Automação", api: "API AHDK" };
  const active = integrationStatus[type];
  const list = type === "whatsapp"
    ? [{ title: "Mensagem padrão", text: integrationConfig.whatsapp.defaultMessage }]
    : type === "automacao"
      ? integrationConfig.automacao.tasks.map((task, index) => ({ title: `Automação ${index + 1}`, text: task }))
      : integrationConfig.api.endpoints.map((endpoint, index) => ({ title: `Endpoint ${index + 1}`, text: endpoint }));

  return {
    label: "Integração",
    title: labels[type] || type,
    description: integrationDescriptions[type] || "Integração configurável do projeto.",
    metrics: [
      { label: "Status", value: active ? "Ativo" : "Inativo", note: "conexão" },
      { label: "Itens", value: String(list.length || 1), note: "configurados" },
      { label: "Perfil", value: state.profile, note: "sessão" }
    ],
    list: list.length ? list : [{ title: "Configuração", text: "Nenhum item extra cadastrado." }],
    actions: [
      { label: active ? "Desativar" : "Ativar", onclick: `toggleIntegrationStatus('${type}', event)`, primary: true },
      { label: "Editar", onclick: `editIntegration('${type}', event)` }
    ]
  };
}

function productNarrative(product, index = 0) {
  const base = storyByCategory[product?.category] || storyByCategory["Acessórios"];
  return {
    edition: product?.edition || base.edition,
    material: product?.material || base.material,
    process: product?.process || base.process,
    limited: product?.limited || base.limited,
    care: product?.care || base.care,
    code: product?.collectibleCode || `AHDK-${String(index + 1).padStart(2, "0")}`
  };
}

function collectionProducts() {
  const priority = ["Vestuário", "Tabacaria", "Bancada", "Armazenamento", "Acessórios", "Lookbook"];
  return products
    .map((product, index) => ({ product, index }))
    .filter(({ product }) => priority.includes(product.category) || product.edition || product.limited || product.badge)
    .slice(0, 14);
}

function colecoes() {
  const list = collectionProducts();
  return `
  <div class="page">
    <section class="collection-hero">
      <span class="label">Colecionáveis AHDK</span>
      <h2>Vestuário, tabacaria e baixa escala.</h2>
      <p>Uma área para peças com narrativa: roupa, bancada, acessórios e itens seletivos que podem virar drops comerciais.</p>
      <div class="collection-stats">
        <b>${list.length}<small>peças mapeadas</small></b>
        <b>${products.filter(p => p.category === "Brindes" || p.category === "Identidade").length}<small>micro séries</small></b>
      </div>
    </section>
    <div class="section"><h3>Peças com narrativa</h3><span>toque</span></div>
    <div class="collection-grid">
      ${list.map(({ product, index }) => collectionCard(product, index)).join("")}
    </div>
  </div>`;
}

function collectionCard(product, index) {
  const story = productNarrative(product, index);
  return `
    <article class="collection-card" onclick="openProductPreview(${index})" role="button" tabindex="0" onkeydown="handleCardKey(event, ${index})">
      <img src="${product.image}" alt="${escapeHtml(product.name)}" loading="lazy" decoding="async">
      <div>
        <span>${escapeHtml(story.code)}</span>
        <h4>${escapeHtml(product.name)}</h4>
        <p>${escapeHtml(story.edition)} • ${escapeHtml(story.limited)}</p>
      </div>
    </article>`;
}

function publicDropList() {
  return [
    { title: "AHDK Concept Pack", tag: "drop visual", text: "Boxy tee, hoodie, sweatpants e trousers organizados como direção estética do próximo drop.", image: "assets/48_concept_pack_AHDK.jpg", page: "produtos", category: "Vestuário" },
    { title: "Tabacaria seletiva", tag: "kit adulto", text: "Porta sedas, piteira, case de isqueiro e bandeja para acompanhar a roupa sem excesso visual.", image: "assets/28_porta_sedas_piteiras_AHDK.jpg", page: "produtos", category: "Tabacaria" },
    { title: "Bancada Ritual", tag: "em curadoria", text: "Objetos de apoio, armazenamento e apresentação pensados para compor vitrine, foto e rotina.", image: "assets/31_bandeja_organizadora_AHDK.jpg", page: "produtos", category: "Bancada" }
  ];
}

function publicDropCard(drop) {
  const action = drop.category ? `state.catalogCategory='${escapeAttr(drop.category)}'; setPage('${drop.page}')` : `setPage('${drop.page}')`;
  return `
    <article class="drop-card" onclick="${action}" role="button" tabindex="0">
      <img src="${drop.image}" alt="" aria-hidden="true" loading="lazy" decoding="async">
      <div>
        <span class="label">${escapeHtml(drop.tag)}</span>
        <h4>${escapeHtml(drop.title)}</h4>
        <p>${escapeHtml(drop.text)}</p>
        <small>Explorar →</small>
      </div>
    </article>`;
}

function avisos() {
  if (state.profile === "cliente") {
    const drops = publicDropList();
    return `
    <div class="page">
      <div class="section"><h3>Drops AHDK</h3><span>${drops.length} em pauta</span></div>
      <div class="drop-stack">${drops.map(publicDropCard).join("")}</div>
      <section class="brand-ritual-card compact-card">
        <span class="label">Próxima camada</span>
        <h3>O colecionável nasce do detalhe.</h3>
        <p>Use esta área para anunciar lote, numeração, material e bastidor de produção sem transformar a navegação em painel interno.</p>
      </section>
    </div>`;
  }

  const list = notices
    .map((entry, index) => ({ entry, index }))
    .filter(({ entry }) => state.profile !== "cliente" || entry[3] !== "Interno");
  return `
  <div class="page">
    <div class="section"><h3>Drops & Avisos</h3><span>${list.length} ativos</span></div>
    <div class="stack">${list.map(({ entry, index }) => noticeActionCard(entry, index)).join("")}</div>
    ${state.profile === "gestor" ? `<button class="quick full-width-action" onclick="openNotificationConfig()"><i>＋</i><b>Novo drop</b><small>Adicionar aviso</small></button>` : ""}
  </div>`;
}

function equipe() {
  if (state.profile === "cliente") {
    const grouped = cartGroupedItems();
    return `
    <div class="page">
      <section class="support-hero">
        <span class="label">Atendimento AHDK</span>
        <h2>Pedido sem pressa, conversa direta.</h2>
        <p>Monte sua lista no catálogo, revise os itens e envie para a equipe pelo WhatsApp com a mensagem já organizada.</p>
        <button class="cta" onclick="abrirAtendimento()">Chamar no WhatsApp</button>
      </section>
      <div class="section"><h3>Sua lista</h3><span>${grouped.length} item(ns)</span></div>
      <div class="cart-preview-list">
        ${grouped.length ? grouped.map(item => cartItem(item)).join("") : `<div class="empty-cart">Nenhum item adicionado ainda. Explore catálogo, drops ou coleções.</div>`}
      </div>
      <section class="support-steps">
        <div><b>1</b><span>Escolha as peças</span></div>
        <div><b>2</b><span>Envie pelo WhatsApp</span></div>
        <div><b>3</b><span>Finalize prazo e retirada/envio</span></div>
      </section>
    </div>`;
  }

  const view = state.teamView || "painel";
  return `
  <div class="page">
    ${compactSessionSwitcher()}
    <div class="section"><h3>Central da Equipe</h3><span>Equipe</span></div>
    <div class="team-tabs">
      ${[["painel","Painel"],["os","OS"],["embalagem","Embalagem"],["estoque","Estoque"]].map(([id,label]) => `<button class="${view === id ? "active" : ""}" onclick="setTeamView('${id}')">${label}</button>`).join("")}
    </div>
    ${teamViewContent(view)}
  </div>`;
}


function teamViewContent(view) {
  if (view === "os") {
    return `
      <div class="section"><h3>Separar pedidos</h3><span>${orders.length} ordens</span></div>
      <div class="stack">${orders.map((order, index) => orderCard(order, index)).join("")}</div>`;
  }
  if (view === "embalagem") {
    return `
      <div class="section"><h3>Embalagem & Etiqueta</h3><span>Checklist</span></div>
      <div class="stack">${orders.map((order, index) => packagingCard(order, index)).join("")}</div>`;
  }
  if (view === "estoque") {
    return `
      <div class="section"><h3>Conferir estoque</h3><span>${stockCheckedCount()} / ${products.length}</span></div>
      <div class="stock-check-grid">${products.map((product, index) => stockCheckCard(product, index)).join("")}</div>`;
  }
  return `
    ${state.profile === "gestor" ? `<div class="quick-grid"><button class="quick" onclick="addOperationTask()"><i>＋</i><b>Tarefa</b><small>Adicionar</small></button><button class="quick" onclick="createOperationOrder()"><i>◇</i><b>Nova OS</b><small>Separação</small></button></div>` : ""}
    <div class="team-kpis">
      <button class="card interactive-card" onclick="setTeamView('os')"><small>OS abertas</small><strong>${orders.length}</strong><span class="up">Ver ordens →</span></button>
      <button class="card interactive-card" onclick="setTeamView('embalagem')"><small>Checklist pendente</small><strong>${orders.reduce((sum, order) => sum + Object.values(order.checklist || {}).filter(v => !v).length, 0)}</strong><span class="up">Ver embalagem →</span></button>
      <button class="card interactive-card" onclick="setTeamView('estoque')"><small>Itens monitorados</small><strong>${products.length}</strong><span class="up">Ver estoque →</span></button>
      <button class="card interactive-card alert-card" onclick="setTeamView('estoque')"><small>Alertas</small><strong>${products.filter(isLowStock).length}</strong><span>Estoque baixo →</span></button>
    </div>
    <div class="section"><h3>Alertas importantes</h3><span>Toque</span></div>
    <div class="stack">${notices.map((notice, index) => noticeActionCard(notice, index)).join("")}</div>`;
}

function noticeActionCard(entry, index) {
  const target = entry[4] || "painel";
  return `<article class="item interactive-item alert-notice" onclick="routeNoticeTarget('${target}', event)" role="button" tabindex="0"><div class="thumb">${entry[0]}</div><div><h4>${escapeHtml(entry[1])}</h4><p>${escapeHtml(entry[2])}</p></div><span class="pill gold">abrir</span></article>`;
}

function packagingCard(order, index) {
  return `<article class="order-card packaging-card interactive-item" onclick="openDetail('order', '${index}')" role="button" tabindex="0">
    <div class="order-head"><div><span class="label">${escapeHtml(order.id)}</span><h4>${escapeHtml(order.client)}</h4><p>${escapeHtml(order.time)} • ${escapeHtml(order.shipping)}</p></div><span class="pill">Checklist</span></div>
    <div class="checklist-actions">
      ${Object.entries(order.checklist || {}).map(([key, value]) => `<button class="check-action ${value ? "checked" : ""}" onclick="toggleOrderChecklist(${index}, '${key}', event)">${value ? "✓" : "○"} ${key === "conferencia" ? "conferência" : key}</button>`).join("")}
      <button class="check-action" onclick="openDetail('order', '${index}', event)">Abrir OS</button>
    </div>
  </article>`;
}

function itemWithAction(entry, index) {
  const pill = entry[3] === "Agora" ? "gold" : "";
  const remove = state.profile === "gestor" ? `<button class="delete-btn" onclick="removeOperationTask(${index}, event)">Remover</button>` : "";
  return `<article class="item interactive-item" onclick="openDetail('operation', '${index}')" role="button" tabindex="0"><div class="thumb">${entry[0]}</div><div><h4>${escapeHtml(entry[1])}</h4><p>${escapeHtml(entry[2])}</p></div><span class="pill ${pill}">${escapeHtml(entry[3])}</span><em class="item-more">Abrir</em>${remove}</article>`;
}

function mais() {
  const allModules = [
    ["dashboard", "▣", "Dashboard", "Métricas da tabacaria"],
    ["crm", "♙", "Clientes", "Histórico e relacionamento"],
    ["financeiro", "$", "Financeiro", "Entradas, saídas e meta"],
    ["estoque", "▤", "Estoque", "Disponibilidade do catálogo"],
    ["integracoes", "◎", "Integrações", "WhatsApp, API e automações"],
    ["configuracoes", "⚙", "Configurações", "Permissões e identidade"]
  ];
  const modules = allModules.filter(m => canAccess(m[0]));

  return `
  <div class="page">
    <div class="section"><h3>Gestão</h3><span>Interno</span></div>
    ${modules.length ? `<div class="menu">
      ${modules.map(m => `<button onclick="openModule('${m[0]}')"><i>${m[1]}</i><div><b>${m[2]}</b><small>${m[3]}</small></div></button>`).join("")}
    </div>` : `
      <section class="access-card">
        <span class="label">Área restrita</span>
        <h3>Gestão liberada apenas para equipe e gestor</h3>
        <p>Na sessão cliente, esta área fica protegida para manter o app limpo e seguro.</p>
        <button class="modal-ghost" onclick="switchProfile('equipe')">Ver como equipe</button>
        <button class="modal-cart" onclick="switchProfile('gestor')">Ver como gestor</button>
      </section>`}
  </div>`;
}

function openModule(module) {
  if (!canAccess(module)) {
    toast("Acesso restrito para este perfil");
    return;
  }

  state.page = "mais";
  state.activeModule = module;
  state.cartOpen = false;
  state.selectedProductIndex = null;
  state.selectedZoomIndex = null;
  state.selectedDetail = null;
  syncNavActive();
  render();
}

function dashboard() {
  const { lucro, margem } = financeSummary();
  const progress = Math.min(100, Math.round((finance.entradas / Math.max(finance.meta, 1)) * 100));
  const lowStock = state.profile === "cliente" ? [] : products.filter(isLowStock);
  const totalStock = products.reduce((sum, product) => sum + (Number(product.stock) || 0), 0);
  const cartTotal = state.interestList.length;
  return `
  <div class="page">
    <div class="section"><h3>Dashboard</h3><span>Gestor</span></div>
    <div class="kpis">
      ${kpi("Faturamento", formatMoney(finance.entradas), "Meta " + progress + "%", "metric", "faturamento")}
      ${kpi("Lucro", formatMoney(lucro), "Margem " + margem, "metric", "lucro")}
      ${kpi("Pedidos", String(finance.pedidos), "Registrados", "metric", "pedidos")}
      ${kpi("Estoque total", String(totalStock), products.length + " itens", "metric", "estoque_total")}
    </div>
    <br>
    <button type="button" class="card dashboard-card interactive-card wide-card" onclick="openDetail('metric', 'meta')">
      <small>Meta mensal</small>
      <strong>${formatMoney(finance.entradas)} / ${formatMoney(finance.meta)}</strong>
      <div class="progress"><span style="width:${progress}%"></span></div>
      <p>${progress >= 100 ? "Meta batida. Próximo passo: revisar reposição e atendimento." : "Acompanhe entradas, pedidos e itens com estoque baixo."}</p>
      <em class="card-more">Ver detalhes</em>
    </button>

    <div class="section"><h3>Operação</h3><span>Agora</span></div>
    <div class="dashboard-grid">
      <button type="button" class="mini-report interactive-report" onclick="openDetail('metric', 'carrinho')"><span>🛒</span><b>${cartTotal}</b><small>itens em carrinho local</small></button>
      <button type="button" class="mini-report interactive-report" onclick="openDetail('metric', 'estoque_baixo')"><span>⚠</span><b>${lowStock.length}</b><small>itens com estoque baixo</small></button>
      <button type="button" class="mini-report interactive-report" onclick="openDetail('metric', 'avisos')"><span>✧</span><b>${notices.length}</b><small>drops cadastrados</small></button>
    </div>

    <div class="section"><h3>Estoque baixo</h3><span>${lowStock.length || "OK"}</span></div>
    <div class="stack">
      ${(lowStock.length ? lowStock : products.slice(0, 2)).map((p) => {
        const index = products.indexOf(p);
        return `<article class="item interactive-item" onclick="openDetail('product', '${index}')" role="button" tabindex="0"><div class="thumb"><img src="${p.image}" alt="${escapeHtml(p.name)}"></div><div><h4>${escapeHtml(p.name)}</h4><p>${escapeHtml(p.price)} • estoque ${p.stock}</p></div><span class="pill ${isLowStock(p) ? "red" : "gold"}">${isLowStock(p) ? "Repor" : "OK"}</span><em class="item-more">Ver</em></article>`;
      }).join("")}
    </div>
  </div>`;
}

function crm() {
  const list = clients.map((c, i) => {
    const pill = c[3] === "VIP" ? "gold" : "";
    const remove = state.profile === "gestor" ? `<button class="delete-btn" onclick="removeClient(${i}, event)">Remover</button>` : "";
    return `<article class="item interactive-item" onclick="openDetail('client', '${i}')" role="button" tabindex="0"><div class="thumb">${c[0]}</div><div><h4>${escapeHtml(c[1])}</h4><p>${escapeHtml(c[2])}</p></div><span class="pill ${pill}">${escapeHtml(c[3])}</span><em class="item-more">Abrir</em>${remove}</article>`;
  }).join("");

  return `
  <div class="page">
    <div class="section"><h3>Clientes</h3><span>${clients.length} históricos</span></div>
    ${state.profile === "gestor" ? `<button class="quick" style="width:100%;min-height:78px;margin-bottom:12px" onclick="addClient()"><i>＋</i><b>Novo cliente</b><small>Adicionar contato</small></button>` : ""}
    <div class="stack">${list}</div>
  </div>`;
}

function financeiro() {
  ensureFinanceShape();
  const { lucro, margem } = financeSummary();
  const progress = Math.min(100, Math.round((finance.entradas / Math.max(finance.meta, 1)) * 100));
  return `
  <div class="page">
    <div class="section"><h3>Financeiro</h3><span>Contas batendo</span></div>
    <div class="kpis">
      ${kpi("Entradas", formatMoney(finance.entradas), "Somado", "metric", "entradas")}
      ${kpi("Saídas", formatMoney(finance.saidas), "Somado", "metric", "saidas")}
      ${kpi("Lucro", formatMoney(lucro), "Atual", "metric", "lucro")}
      ${kpi("Margem", margem, "Operação", "metric", "margem")}
    </div>
    <button type="button" class="card dashboard-card interactive-card wide-card finance-balance" onclick="openDetail('metric', 'meta')">
      <small>Meta mensal</small>
      <strong>${formatMoney(finance.entradas)} / ${formatMoney(finance.meta)}</strong>
      <div class="progress"><span style="width:${progress}%"></span></div>
      <p>${progress}% da meta. Entradas e saídas são recalculadas automaticamente a cada lançamento.</p>
      <em class="card-more">Ver detalhes</em>
    </button>
    ${state.profile === "gestor" ? `<div class="section"><h3>Ações</h3><span>Gestor</span></div><div class="quick-grid"><button class="quick" onclick="addEntrada()"><i>＋</i><b>Entrada</b><small>Somar</small></button><button class="quick" onclick="addSaida()"><i>−</i><b>Saída</b><small>Somar</small></button><button class="quick" onclick="registerOrder()"><i>◇</i><b>Pedido</b><small>Registrar</small></button></div>` : ""}
    <div class="section"><h3>Lançamentos</h3><span>${finance.movements.length} registros</span></div>
    <div class="stack finance-list">${finance.movements.slice().reverse().slice(0, 8).map(movementCard).join("")}</div>
  </div>`;
}

function estoque() {
  const list = products.map((p, i) => {
    const pill = p.status === "Baixo" ? "red" : "";
    const remove = state.profile === "gestor" ? `<button class="delete-btn" onclick="removeProduct(${i}, event); openModule('estoque')">Remover</button>` : "";
    return `<article class="item interactive-item ${isLowStock(p) ? "low-stock-item" : ""}" onclick="openDetail('product', '${i}')" role="button" tabindex="0"><div class="thumb"><img src="${p.image}" alt="${escapeHtml(p.name)}"></div><div><h4>${escapeHtml(p.name)}</h4><p>${escapeHtml(p.price)} • estoque ${p.stock}</p></div><span class="pill ${isLowStock(p) ? "red" : pill}">${isLowStock(p) ? "Baixo" : escapeHtml(p.status)}</span><em class="item-more">Abrir</em>${remove}</article>`;
  }).join("");

  return `
  <div class="page">
    <div class="section"><h3>Estoque</h3><span>${products.length} itens</span></div>
    ${state.profile === "gestor" ? `<button class="quick" style="width:100%;min-height:78px;margin-bottom:12px" onclick="addProduct(); openModule('estoque')"><i>＋</i><b>Novo item</b><small>Adicionar</small></button>` : ""}
    <div class="stack">${list}</div>
  </div>`;
}

function integracoes() {
  const items = [
    ["☏", "WhatsApp Bot", "Atendimento guiado para dúvidas do catálogo.", "whatsapp"],
    ["⚙", "Automação", "Alertas, rotinas e webhooks.", "automacao"],
    ["◎", "API AHDK", "Base para catálogo, CRM e financeiro.", "api"]
  ];

  return `
  <div class="page">
    <div class="section"><h3>Integrações</h3><span>Status</span></div>
    <div class="stack">
      ${items.map(i => {
        const type = i[3];
        const active = integrationStatus[type];
        const label = active ? "Ativo" : "Inativo";
        const toggle = active ? "Desativar" : "Ativar";
        return `<article class="item interactive-item" onclick="openDetail('integration', '${type}')"><div class="thumb">${i[0]}</div><div><h4>${i[1]}</h4><p>${i[2]}</p></div><span class="pill ${active ? 'gold' : 'red'}">${label}</span><em class="item-more">Abrir</em><button class="action-btn" onclick="toggleIntegrationStatus('${type}', event)">${toggle}</button><button class="action-btn" onclick="editIntegration('${type}', event)">Editar</button></article>`;
      }).join("")}
    </div>
  </div>`;
}

function configuracoes() {
  return `
  <div class="page">
    <div class="section"><h3>Configurações</h3><span>Gestor</span></div>
    ${sessionSwitcher()}
    <div class="stack">
      <article class="item interactive-item" onclick="openPermissionConfig()"><div class="thumb">🔐</div><div><h4>Permissões</h4><p>Cliente, equipe e gestor.</p></div><span class="pill gold">Editar</span></article>
      <article class="item interactive-item" onclick="openIdentityConfig()"><div class="thumb">✦</div><div><h4>Identidade</h4><p>Nome, contato e dados gerais do app.</p></div><span class="pill gold">Editar</span></article>
      <article class="item interactive-item" onclick="openNotificationConfig()"><div class="thumb">✧</div><div><h4>Drops & Avisos</h4><p>Comunicados para clientes e equipe.</p></div><span class="pill">Gerenciar</span></article>
      <article class="item interactive-item" onclick="resetDemoData()"><div class="thumb">↺</div><div><h4>Restaurar demo</h4><p>Voltar aos dados originais do projeto.</p></div><span class="pill red">Reset</span></article>
    </div>
  </div>`;
}

function kpi(label, value, up, detailType = "metric", detailKey = "") {
  const safeType = escapeHtml(detailType);
  const safeKey = escapeHtml(detailKey || normalizeKey(label));
  return `<button type="button" class="card interactive-card" onclick="openDetail('${safeType}', '${safeKey}')"><small>${escapeHtml(label)}</small><strong>${escapeHtml(value)}</strong><span class="up">${escapeHtml(up)}</span><em class="card-more">Ver detalhes</em></button>`;
}

function item(icon, title, desc, status, pill = "", detailType = "", detailKey = "") {
  const interactive = detailType ? " interactive-item" : "";
  const action = detailType ? ` onclick="openDetail('${escapeHtml(detailType)}', '${escapeHtml(detailKey)}')" role="button" tabindex="0"` : "";
  const more = detailType ? `<em class="item-more">Abrir</em>` : "";
  return `<article class="item${interactive}"${action}><div class="thumb">${icon}</div><div><h4>${escapeHtml(title)}</h4><p>${escapeHtml(desc)}</p></div><span class="pill ${pill}">${escapeHtml(status)}</span>${more}</article>`;
}

function normalizeKey(label) {
  return String(label).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
}

function financeSummary() {
  const lucro = finance.entradas - finance.saidas;
  const margem = finance.entradas > 0 ? Math.round((lucro / finance.entradas) * 100) + "%" : "0%";
  return { lucro, margem };
}

function formatMoney(value) {
  return "R$" + Number(value).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function addEntrada() {
  const value = parseMoneyInput(prompt("Valor de entrada (R$):", "0"));
  if (value > 0) {
    const note = prompt("Descrição da entrada:", "Entrada operacional") || "Entrada operacional";
    finance.entradas += value;
    finance.movements.unshift({ type: "entrada", value, note, date: currentDateLabel() });
    persistAll();
    toast("Entrada somada");
    openModule("financeiro");
  }
}

function addSaida() {
  const value = parseMoneyInput(prompt("Valor de saída (R$):", "0"));
  if (value > 0) {
    const note = prompt("Descrição da saída:", "Saída operacional") || "Saída operacional";
    finance.saidas += value;
    finance.movements.unshift({ type: "saida", value, note, date: currentDateLabel() });
    persistAll();
    toast("Saída somada");
    openModule("financeiro");
  }
}

function registerOrder() {
  const value = parseMoneyInput(prompt("Valor do pedido (opcional):", "0"));
  finance.pedidos += 1;
  if (value > 0) {
    finance.entradas += value;
    finance.movements.unshift({ type: "entrada", value, note: "Pedido registrado", date: currentDateLabel() });
  }
  persistAll();
  toast(value > 0 ? "Pedido e entrada registrados" : "Pedido registrado");
  openModule("financeiro");
}

function addClient() {
  const nome = prompt("Nome do cliente:");
  if (!nome) return;
  const desc = prompt("Descrição:", "Novo atendimento iniciado");
  const status = prompt("Status:", "Ativo");
  clients.push(["◇", nome, desc || "Novo atendimento iniciado", status || "Ativo"]);
  persistAll();
  toast("Cliente adicionado");
  openModule("crm");
}

function removeClient(index, event) {
  if (event) event.stopPropagation();
  if (confirm("Remover cliente?")) {
    clients.splice(index, 1);
    persistAll();
    toast("Cliente removido");
    openModule("crm");
  }
}

function addOperationTask() {
  const title = prompt("Título da tarefa:", "Conferir pedido");
  if (!title) return;
  const desc = prompt("Descrição:", "Tarefa operacional da equipe AHDK.");
  const status = prompt("Status:", "Hoje");
  operation.push(["✺", title, desc || "Tarefa operacional da equipe AHDK.", status || "Hoje"]);
  persistAll();
  toast("Tarefa adicionada");
  setPage("equipe");
}

function removeOperationTask(index, event) {
  if (event) event.stopPropagation();
  if (confirm("Remover tarefa?")) {
    operation.splice(index, 1);
    persistAll();
    toast("Tarefa removida");
    setPage("equipe");
  }
}

function completeFirstOperation() {
  if (!operation.length) {
    toast("Sem tarefas abertas");
    return;
  }
  operation.shift();
  persistAll();
  toast("Tarefa concluída");
  setPage("equipe");
}

function addProduct() {
  const name = prompt("Nome do produto:");
  if (!name) return;
  const price = prompt("Preço:", "R$0,00");
  const stock = parseInt(prompt("Estoque:", "0"));
  const category = prompt("Categoria:", "Catálogo");
  const image = prompt("Imagem (caminho em assets):", "assets/10_acessorios_e_embalagens_AHDK.jpg");
  const description = prompt("Descrição:", "Produto autoral AHDK.");
  products.push({
    image: image || "assets/10_acessorios_e_embalagens_AHDK.jpg",
    name,
    category: category || "Catálogo",
    price: price || "R$0,00",
    stock: isNaN(stock) ? 0 : stock,
    status: stock <= 10 ? "Baixo" : "OK",
    description: description || "Produto autoral AHDK.",
    badge: "Novo"
  });
  persistAll();
  toast("Produto adicionado");
  setPage("produtos");
}

function removeProduct(index, event) {
  if (event) event.stopPropagation();
  if (confirm("Remover produto?")) {
    products.splice(index, 1);
    state.interestList = state.interestList
      .filter(itemIndex => itemIndex !== index)
      .map(itemIndex => itemIndex > index ? itemIndex - 1 : itemIndex);
    saveInterestList();
    persistAll();
    toast("Produto removido");
    setPage("produtos");
  }
}

function viewIntegrationDetail(type) {
  alert(integrationDescriptions[type]);
}

function toggleIntegrationStatus(type, event) {
  event.stopPropagation();
  integrationStatus[type] = !integrationStatus[type];
  persistAll();
  toast(`${type} ${integrationStatus[type] ? "ativado" : "desativado"}`);
  openModule("integracoes");
}

function editIntegration(type, event) {
  event.stopPropagation();

  if (type === "whatsapp") {
    const msg = prompt("Mensagem padrão do WhatsApp:", integrationConfig.whatsapp.defaultMessage);
    if (msg) integrationConfig.whatsapp.defaultMessage = msg;
    toast("Mensagem atualizada");
  }

  if (type === "automacao") {
    const current = integrationConfig.automacao.tasks.join("\n") || "Nenhuma automação";
    const action = prompt(`Automações atuais:\n${current}\n\nDigite adicionar ou remover:`, "adicionar");
    if (action === "adicionar") {
      const task = prompt("Nova automação:");
      if (task) integrationConfig.automacao.tasks.push(task);
    }
    if (action === "remover") {
      const idx = parseInt(prompt("Número da automação:")) - 1;
      if (!isNaN(idx)) integrationConfig.automacao.tasks.splice(idx, 1);
    }
  }

  if (type === "api") {
    const current = integrationConfig.api.endpoints.join("\n") || "Nenhum endpoint";
    const action = prompt(`Endpoints atuais:\n${current}\n\nDigite adicionar ou remover:`, "adicionar");
    if (action === "adicionar") {
      const endpoint = prompt("Endpoint:", "/catalogo");
      if (endpoint) integrationConfig.api.endpoints.push(endpoint);
    }
    if (action === "remover") {
      const idx = parseInt(prompt("Número do endpoint:")) - 1;
      if (!isNaN(idx)) integrationConfig.api.endpoints.splice(idx, 1);
    }
  }

  persistAll();
  openModule("integracoes");
}

function openPermissionConfig() {
  Object.keys(permissions).forEach(profile => {
    const modules = prompt(`Módulos para ${profile} separados por vírgula:`, permissions[profile].join(","));
    if (modules) permissions[profile] = modules.split(",").map(s => s.trim());
  });
  persistAll();
  toast("Permissões atualizadas");
  render();
}

function openIdentityConfig() {
  const name = prompt("Nome da marca:", BRAND_CONFIG.appName);
  if (name) {
    BRAND_CONFIG.appName = name;
    document.getElementById("brandName").textContent = name;
  }

  const whatsapp = prompt("Número do WhatsApp:", BRAND_CONFIG.whatsappNumber);
  if (whatsapp) BRAND_CONFIG.whatsappNumber = whatsapp;

  persistAll();
  render();
  toast("Identidade atualizada");
}

function openNotificationConfig() {
  const action = prompt("Drops: digite listar, adicionar ou remover:", "listar");
  if (!action) return;

  if (action === "listar") {
    alert("Drops atuais:\n" + notices.map((n, i) => `${i + 1}. ${n[1]} — ${n[2]} [${n[3]}]`).join("\n"));
  }

  if (action === "adicionar") {
    const raw = prompt("Novo drop no formato: ícone,título,descrição,status");
    if (!raw) return;
    const parts = raw.split(",").map(part => part.trim());
    if (parts.length >= 4) {
      notices.push(parts.slice(0, 4));
      persistAll();
      toast("Drop adicionado");
      setPage("avisos");
    } else {
      alert("Formato inválido.");
    }
  }

  if (action === "remover") {
    const idx = parseInt(prompt("Número do drop:")) - 1;
    if (!isNaN(idx) && idx >= 0 && idx < notices.length) {
      notices.splice(idx, 1);
      persistAll();
      toast("Drop removido");
      setPage("avisos");
    }
  }
}

function catalogOverview(compact = false) {
  const total = products.length;
  const low = products.filter(isLowStock).length;
  const categories = getCatalogCategories();
  const topCats = categories.filter(category => category !== "Todos").slice(0, compact ? 4 : 5);
  const publicCopy = state.profile === "cliente";
  return `
    <section class="catalog-overview ${compact ? "compact" : ""}">
      <div class="catalog-overview-head">
        <img src="assets/ahdk_symbol_header.jpg" alt="" aria-hidden="true" loading="lazy" decoding="async">
        <div>
          <span class="label">${publicCopy ? "Catálogo AHDK" : "Central do Catálogo"}</span>
          <h4>${publicCopy ? "Peças por categoria" : `${total} itens organizados`}</h4>
          <p>${publicCopy ? "Explore vestuário, tabacaria, objetos e séries de baixa escala." : low ? `${low} item(ns) com alerta de estoque.` : "Catálogo sem alertas críticos."}</p>
        </div>
        <button class="action-btn" onclick="openCatalogHub(event)">${publicCopy ? "Explorar" : "Abrir menu"}</button>
      </div>
      <div class="catalog-category-chips">
        ${topCats.map(category => `<button onclick="setCategoryAndOpen('${escapeAttr(category)}', event)">${escapeHtml(category)}<small>${categoryCount(category)}</small></button>`).join("")}
      </div>
    </section>`;
}

function getCatalogCategories() {
  return ["Todos", ...Array.from(new Set(products.map(p => p.category).filter(Boolean)))];
}

function categoryCount(category) {
  return category === "Todos" ? products.length : products.filter(product => product.category === category).length;
}

function openCatalogHub(event) {
  if (event) event.stopPropagation();
  state.catalogHubOpen = true;
  state.selectedProductIndex = null;
  state.selectedZoomIndex = null;
  state.cartOpen = false;
  state.selectedDetail = null;
  render();
}

function closeCatalogHub(event) {
  if (event && event.type === "click" && event.currentTarget !== event.target) return;
  state.catalogHubOpen = false;
  render();
}

function setCategoryAndOpen(category, event) {
  if (event) event.stopPropagation();
  state.catalogCategory = category || "Todos";
  state.page = "produtos";
  state.activeModule = null;
  state.catalogHubOpen = false;
  syncNavActive();
  render();
}

function catalogHubModal() {
  if (!state.catalogHubOpen) return "";
  const categories = getCatalogCategories();
  const lowStock = state.profile === "cliente" ? [] : products.filter(isLowStock);
  const featured = products.filter(product => product.featured || product.badge).slice(0, 5);
  return `
  <div class="catalog-hub-backdrop" onclick="closeAllModals(event)">
    <section class="catalog-hub" role="dialog" aria-modal="true" aria-label="Central do catálogo AHDK">
      <button class="modal-close" onclick="closeAllModals()" aria-label="Fechar">×</button>
      <div class="catalog-hub-head">
        <img src="assets/ahdk_logo_header.jpg" alt="AHDK">
        <span class="label">Menu do catálogo</span>
        <h3>Produtos, categorias e coleções</h3>
        <p>Um menu curto para explorar peças sem perder o respiro da navegação.</p>
      </div>
      <div class="catalog-hub-grid">
        ${categories.map(category => `<button class="${(state.catalogCategory || "Todos") === category ? "active" : ""}" onclick="setCategoryAndOpen('${escapeAttr(category)}', event)"><b>${escapeHtml(category)}</b><small>${categoryCount(category)} item(ns)</small></button>`).join("")}
      </div>
      <div class="detail-list hub-list">
        <div><b>Destaques atuais</b><small>${featured.map(p => escapeHtml(p.name)).join(" • ") || "Nenhum destaque cadastrado"}</small></div>
        <div><b>${state.profile === "cliente" ? "Narrativa" : "Estoque baixo"}</b><small>${state.profile === "cliente" ? "Edição, material, processo e lote aparecem dentro de cada peça." : lowStock.length ? lowStock.map(p => `${escapeHtml(p.name)} (${escapeHtml(p.stock)})`).join(" • ") : "Sem alerta"}</small></div>
      </div>
      <div class="detail-actions">
        <button class="modal-cart" onclick="setCategoryAndOpen('Todos', event)">Ver catálogo completo</button>
        <button class="modal-ghost" onclick="closeAllModals()">Fechar</button>
      </div>
    </section>
  </div>`;
}

function catalogFilters() {
  const categories = getCatalogCategories();
  return `<div class="catalog-tabs" aria-label="Categorias do catálogo">${categories.map(category => `<button class="${(state.catalogCategory || "Todos") === category ? "active" : ""}" onclick="setCatalogCategory('${escapeAttr(category)}')">${escapeHtml(category)}</button>`).join("")}</div>`;
}

function setCatalogCategory(category) {
  state.catalogCategory = category || "Todos";
  render();
}

function isLowStock(product) {
  return Number(product?.stock || 0) <= 10;
}

function ensureFinanceShape() {
  if (!Array.isArray(finance.movements)) finance.movements = [];
  finance.entradas = Number(finance.entradas) || 0;
  finance.saidas = Number(finance.saidas) || 0;
  finance.pedidos = Number(finance.pedidos) || 0;
  finance.meta = Number(finance.meta) || 0;
}

function ensureOrderShape() {
  orders.forEach(order => {
    if (!Array.isArray(order.items)) order.items = [];
    order.items.forEach(item => {
      if (typeof item.checked !== "boolean") item.checked = false;
    });
    if (!order.checklist) order.checklist = { embalagem: false, etiqueta: false, conferencia: false };
    ["embalagem", "etiqueta", "conferencia"].forEach(key => {
      if (typeof order.checklist[key] !== "boolean") order.checklist[key] = false;
    });
  });
}

function parseMoneyInput(raw) {
  if (!raw) return 0;
  let text = String(raw).trim().toLowerCase();
  const multiplier = text.includes("mil") ? 1000 : 1;
  text = text.replace(/mil/g, "").replace(/r\$/g, "").replace(/\s/g, "");
  if (text.includes(",")) text = text.replace(/\./g, "").replace(",", ".");
  const value = Number.parseFloat(text.replace(/[^0-9.\-]/g, ""));
  return Number.isFinite(value) ? value * multiplier : 0;
}

function currentDateLabel() {
  return new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
}

function movementCard(movement) {
  const isIn = movement.type === "entrada";
  return `<article class="item finance-movement ${isIn ? "movement-in" : "movement-out"}"><div class="thumb">${isIn ? "＋" : "−"}</div><div><h4>${escapeHtml(movement.note || (isIn ? "Entrada" : "Saída"))}</h4><p>${escapeHtml(movement.date || "Hoje")} • ${isIn ? "somou em entradas" : "somou em saídas"}</p></div><span class="pill ${isIn ? "gold" : "red"}">${formatMoney(movement.value)}</span></article>`;
}

function stockCheckedCount() {
  return state.stockChecked.filter(name => products.some(product => product.name === name)).length;
}

function isStockChecked(product) {
  return state.stockChecked.includes(product.name);
}

function toggleStockCheck(index, event) {
  if (event) event.stopPropagation();
  const product = products[index];
  if (!product) return;
  const current = new Set(state.stockChecked);
  if (current.has(product.name)) current.delete(product.name);
  else current.add(product.name);
  state.stockChecked = Array.from(current);
  localStorage.setItem("ahdkStockChecked", JSON.stringify(state.stockChecked));
  toast(current.has(product.name) ? "Item conferido" : "Conferência removida");
  render();
}

function stockCheckCard(product, index) {
  const checked = isStockChecked(product);
  return `<button type="button" class="stock-check-card ${checked ? "checked" : ""} ${isLowStock(product) ? "low" : ""}" onclick="toggleStockCheck(${index}, event)"><img src="${product.image}" alt="${escapeHtml(product.name)}" loading="lazy" decoding="async"><span>${escapeHtml(product.name)}</span><small>${product.stock} unid • ${checked ? "Conferido" : isLowStock(product) ? "Baixo estoque" : "Conferir"}</small></button>`;
}

function supportTicketCard(ticket, index) {
  const itemText = ticket.items.map(formatOrderItem).join(" + ");
  return `<article class="item interactive-item support-card" onclick="openDetail('support', '${index}')" role="button" tabindex="0"><div class="thumb">☏</div><div><h4>${escapeHtml(ticket.client)}</h4><p>${escapeHtml(ticket.id)} • ${escapeHtml(ticket.time)} • ${escapeHtml(itemText || ticket.request)}</p></div><span class="pill gold">${escapeHtml(ticket.status)}</span><em class="item-more">Abrir</em></article>`;
}

function orderCard(order, index) {
  const checkedItems = order.items.filter(item => item.checked).length;
  const totalItems = order.items.length || 1;
  return `<article class="order-card interactive-item ${checkedItems === totalItems ? "ready" : ""}" onclick="openDetail('order', '${index}')" role="button" tabindex="0">
    <div class="order-head"><div><span class="label">${escapeHtml(order.id)}</span><h4>${escapeHtml(order.client)}</h4><p>${escapeHtml(order.time)} • ${escapeHtml(order.shipping)}</p></div><span class="pill ${checkedItems === totalItems ? "gold" : ""}">${escapeHtml(order.status)}</span></div>
    <div class="order-mini-items">${order.items.map((item, itemIndex) => orderItemButton(order, index, item, itemIndex)).join("")}</div>
    <div class="order-progress"><span style="width:${Math.round((checkedItems / totalItems) * 100)}%"></span></div>
    <em class="item-more">Abrir OS</em>
  </article>`;
}

function orderItemButton(order, orderIndex, item, itemIndex) {
  const product = products[item.productIndex];
  if (!product) return "";
  return `<button type="button" class="order-item-pill ${item.checked ? "checked" : ""}" onclick="toggleOrderItem(${orderIndex}, ${itemIndex}, event)"><img src="${product.image}" alt="" loading="lazy" decoding="async"><b>${escapeHtml(product.name)}</b><small>${item.qty}x</small></button>`;
}

function toggleOrderItem(orderIndex, itemIndex, event) {
  if (event) event.stopPropagation();
  const order = orders[orderIndex];
  if (!order || !order.items[itemIndex]) return;
  order.items[itemIndex].checked = !order.items[itemIndex].checked;
  if (order.items.every(item => item.checked)) order.status = "Itens separados";
  persistAll();
  toast(order.items[itemIndex].checked ? "Item separado" : "Item pendente");
  render();
}

function toggleOrderChecklist(orderIndex, key, event) {
  if (event) event.stopPropagation();
  const order = orders[orderIndex];
  if (!order || !order.checklist) return;
  order.checklist[key] = !order.checklist[key];
  if (order.checklist.embalagem && order.checklist.etiqueta && order.checklist.conferencia && order.items.every(item => item.checked)) {
    order.status = "Pronto para envio";
  }
  persistAll();
  toast(order.checklist[key] ? "Checklist marcado" : "Checklist removido");
  render();
}

function formatOrderItem(item) {
  const product = products[item.productIndex];
  return product ? `${item.qty}x ${product.name}` : `${item.qty || 1}x item`;
}

function supportDetail(index) {
  const ticket = supportTickets[index];
  if (!ticket) return null;
  return {
    label: "Atendimento",
    title: `${ticket.id} • ${ticket.client}`,
    description: ticket.request,
    metrics: [
      { label: "Origem", value: ticket.source, note: "entrada" },
      { label: "Hora", value: ticket.time, note: "fila" },
      { label: "Status", value: ticket.status, note: "atual" }
    ],
    list: ticket.items.map(item => ({ title: formatOrderItem(item), text: "Item citado no atendimento" })),
    actions: [
      { label: "Marcar respondido", onclick: `markSupportAnswered(${index})`, primary: true },
      { label: "Abrir clientes", onclick: "closeDetail(); openModule('crm')" }
    ]
  };
}

function markSupportAnswered(index) {
  const ticket = supportTickets[index];
  if (!ticket) return;
  ticket.status = "Respondido";
  persistAll();
  toast("Atendimento marcado");
  closeDetail();
  setPage("equipe");
}

function orderDetail(index) {
  const order = orders[index];
  if (!order) return null;
  const separated = order.items.filter(item => item.checked).length;
  const checks = Object.values(order.checklist || {}).filter(Boolean).length;
  return {
    label: "Ordem de operação",
    title: order.id,
    description: `${order.client} • ${order.time} • ${order.shipping}`,
    metrics: [
      { label: "Itens", value: `${separated}/${order.items.length}`, note: "separados" },
      { label: "Checklist", value: `${checks}/3`, note: "operação" },
      { label: "Status", value: order.status, note: "pedido" }
    ],
    list: [
      ...order.items.map(item => ({ title: formatOrderItem(item), text: item.checked ? "Separado" : "Pendente" })),
      { title: "Embalagem", text: order.checklist.embalagem ? "OK" : "Pendente" },
      { title: "Etiqueta", text: order.checklist.etiqueta ? "OK" : "Pendente" },
      { title: "Conferência final", text: order.checklist.conferencia ? "OK" : "Pendente" }
    ],
    actions: [
      { label: "Gerar OS", onclick: `generateOperationOrder(${index})`, primary: true },
      { label: order.checklist.embalagem ? "✓ Embalagem" : "Marcar embalagem", onclick: `toggleOrderChecklist(${index}, 'embalagem', event)` },
      { label: order.checklist.etiqueta ? "✓ Etiqueta" : "Marcar etiqueta", onclick: `toggleOrderChecklist(${index}, 'etiqueta', event)` },
      { label: order.checklist.conferencia ? "✓ Conferido" : "Conferência final", onclick: `toggleOrderChecklist(${index}, 'conferencia', event)` }
    ]
  };
}

function generateOperationOrder(index) {
  const order = orders[index];
  if (!order) return;
  order.status = "OS gerada";
  if (!operation.some(task => task[1].includes(order.id))) {
    operation.push(["◇", `Separação ${order.id}`, `${order.client}: ${order.items.map(formatOrderItem).join(" + ")}`, "Hoje"]);
  }
  persistAll();
  toast("Ordem de operação gerada");
  closeDetail();
  setPage("equipe");
}

function createOperationOrder() {
  const client = prompt("Cliente:", "Novo cliente");
  if (!client) return;
  const firstProduct = products[0]?.name || "Item";
  const raw = prompt("Itens da OS:", `1x ${firstProduct}`) || `1x ${firstProduct}`;
  const id = `AHDK-${String(1029 + orders.length).padStart(4, "0")}`;
  orders.push({ id, client, time: "Agora", status: "Separar", shipping: "Envio pendente", items: [{ productIndex: 0, qty: 1, checked: false }], checklist: { embalagem: false, etiqueta: false, conferencia: false }, note: raw });
  finance.pedidos += 1;
  persistAll();
  toast("OS criada");
  setPage("equipe");
}

function clientInsights(index) {
  const fallback = [
    { total: 8240, last: "há 6 dias", frequency: "quinzenal", favorites: ["Kit Autoral AHDK", "Bandeja de Tabacaria"], lastOrder: "AHDK-1027", ticket: "Preferência por kits completos", note: "Cliente com boa recorrência. Vale avisar primeiro sobre drops e combos." },
    { total: 19680, last: "há 2 dias", frequency: "semanal", favorites: ["Slicks AHDK", "Ziplock", "Acessórios"], lastOrder: "AHDK-1028", ticket: "Compra em volume", note: "Perfil de revenda. Priorize disponibilidade, reposição e prazo." },
    { total: 149, last: "primeiro contato", frequency: "novo", favorites: ["Porta Isqueiro", "Camisetas AHDK"], lastOrder: "Atendimento aberto", ticket: "Ainda sem padrão", note: "Bom momento para explicar categorias e apresentar os destaques." }
  ];
  return fallback[index] || { total: 0, last: "sem histórico", frequency: "novo", favorites: ["Sem preferência definida"], lastOrder: "Nenhum", ticket: "Sem dados", note: "Histórico será enriquecido conforme os atendimentos forem registrados." };
}

function abrirAtendimento() {
  const grouped = cartGroupedItems();
  const total = cartTotalValue(grouped);
  const cartText = grouped.length
    ? "\n\nPedido em montagem:\n" + grouped.map(({ index, count }) => {
        const product = products[index];
        const subtotal = productPriceValue(product) * count;
        return `- ${product.name} | ${count}x | ${product.price} | subtotal ${formatMoney(subtotal)}`;
      }).join("\n") + `\n\nTotal estimado: ${formatMoney(total)}`
    : "";
  const msg = `${integrationConfig.whatsapp.defaultMessage}${cartText}`;
  window.open(`https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`, "_blank");
}

function toast(text) {
  const t = document.getElementById("toast");
  t.textContent = text;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 1600);
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, match => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[match]));
}

function escapeAttr(str) {
  return String(str).replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/"/g, "&quot;");
}
let heroAutoplayTimer = null;
function startHeroAutoplay() {
  if (heroAutoplayTimer) clearInterval(heroAutoplayTimer);
  heroAutoplayTimer = setInterval(() => {
    const modalOpen = state.selectedProductIndex !== null || state.selectedZoomIndex !== null || state.cartOpen || state.selectedDetail !== null || state.catalogHubOpen;
    if (state.page !== "home" || modalOpen || products.length < 2) return;
    const heroTotal = products.filter(product => product.featured || product.badge).slice(0, 6).length || Math.min(products.length, 6);
    state.heroSlide = (state.heroSlide + 1) % heroTotal;
    render();
  }, 3000);
}

startHeroAutoplay();
render();
