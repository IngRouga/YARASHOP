/* Yara Shop — catalogue, fiche produit, panier WhatsApp */
(function () {
  "use strict";

  var WA_NUMBER = "22799565603";

  // Tailles proposées par défaut (à confirmer avec la cliente)
  var SIZES = {
    age: ["2 ans", "3 ans", "4 ans", "5 ans", "6 ans", "7 ans", "8 ans", "10 ans"],
    bebe: ["0-3 mois", "3-6 mois", "6-9 mois", "9-12 mois", "12-18 mois", "18-24 mois"],
    pointure: ["24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34"]
  };

  var CATS = [
    { id: "tout", label: "Tout" },
    { id: "bebe", label: "Bébé" },
    { id: "filles", label: "Filles" },
    { id: "garcons", label: "Garçons" },
    { id: "survetements", label: "Survêtements" },
    { id: "pyjamas", label: "Pyjamas" },
    { id: "chaussures", label: "Chaussures" }
  ];

  // price: mettre un nombre (ex. 8500) pour afficher le prix en FCFA ; null = « Prix sur demande »
  var PRODUCTS = [
    { id: "cardigan-rose", name: "Ensemble cardigan rose & jupe plissée", cats: ["filles"], sizes: "age", price: null, badge: "Coup de cœur",
      desc: "Cardigan en maille rose à boutons dorés, porté sur un haut rose et une jupe plissée beige. Une tenue chic pour les sorties et les fêtes.",
      colors: [{ name: "Rose & beige", hex: "#f2b6cf", img: "images/ensemble-cardigan-rose.jpg" }] },
    { id: "noeud-rayures", name: "Tunique marine à nœud & leggings rayés", cats: ["filles"], sizes: "age", price: null, badge: "Nouveau",
      desc: "Tunique manches longues bleu marine avec grand nœud rayé, et leggings rayés rouge et blanc ornés de petits nœuds.",
      colors: [{ name: "Marine & rouge", hex: "#1d2b4f", img: "images/ensemble-noeud-porte.jpg" }, { name: "Vue à plat", hex: "#d6343e", img: "images/ensemble-noeud-marine.jpg" }] },
    { id: "little-princess", name: "Ensemble bébé « Little Princess »", cats: ["bebe", "filles"], sizes: "bebe", price: null, badge: "Bébé",
      desc: "Haut blanc à manches volantées imprimé « Little Princess » doré, culotte fleurie rose et bandeau à nœud assorti.",
      colors: [{ name: "Blanc & rose", hex: "#f7c9dc", img: "images/bebe-little-princess.jpg" }] },
    { id: "survet-coeurs", name: "Survêtement Cœurs", cats: ["filles", "survetements"], sizes: "age", price: null,
      desc: "Sweat à capuche molletonné avec poche kangourou, imprimé cœurs, et pantalon de jogging assorti.",
      colors: [{ name: "Rose", hex: "#f7a8c4", img: "images/survet-coeurs-rose.jpg" }] },
    { id: "survet-new-york", name: "Survêtement New York", cats: ["filles", "garcons", "survetements"], sizes: "age", price: null,
      desc: "Ensemble sweat à capuche et jogging gris chiné, imprimé « New York – Brooklyn » bleu marine. Pour filles et garçons.",
      colors: [{ name: "Gris chiné", hex: "#a9adb2", img: "images/survet-new-york.jpg" }] },
    { id: "survet-california", name: "Survêtement California", cats: ["filles", "garcons", "survetements"], sizes: "age", price: null,
      desc: "Sweat à capuche et jogging beige, grand imprimé « CA California » blanc. Doux et chaud.",
      colors: [{ name: "Beige", hex: "#d9bfa6", img: "images/survet-california.jpg" }] },
    { id: "survet-23", name: "Survêtement 23", cats: ["garcons", "survetements"], sizes: "age", price: null,
      desc: "Ensemble sweat à capuche et jogging kaki, imprimé « 23 » blanc devant et sur la jambe.",
      colors: [{ name: "Kaki", hex: "#4b5320", img: "images/survet-23-kaki.jpg" }] },
    { id: "survet-spiderman", name: "Survêtement Spider-Man", cats: ["garcons", "survetements"], sizes: "age", price: null,
      desc: "Sweat à capuche et jogging gris anthracite, imprimé super-héros devant et sur la jambe.",
      colors: [{ name: "Anthracite", hex: "#45484d", img: "images/survet-spiderman.jpg" }] },
    { id: "ensemble-donald", name: "Ensemble Donald", cats: ["garcons", "filles"], sizes: "age", price: null, badge: "3 couleurs",
      desc: "Sweat col rond imprimé Donald et jogging coloré assorti avec cordon de serrage.",
      colors: [
        { name: "Gris & rouge", hex: "#d93a2b", img: "images/ensemble-donald-gris.jpg" },
        { name: "Bleu & lilas", hex: "#1f6fd1", img: "images/ensemble-donald-bleu.jpg" },
        { name: "Turquoise & jaune fluo", hex: "#c9f000", img: "images/ensemble-donald-turquoise.jpg" }
      ] },
    { id: "pyjama-minnie", name: "Pyjama Minnie « Happy Girl »", cats: ["filles", "pyjamas"], sizes: "age", price: null, badge: "3 couleurs",
      desc: "Pyjama deux pièces en coton : t-shirt imprimé Minnie « Happy Girl » à manches volantées et pantalon imprimé assorti.",
      colors: [
        { name: "Rouge & papillons", hex: "#d81f2a", img: "images/pyjama-minnie-rouge.jpg" },
        { name: "Prune & zèbre", hex: "#5a2238", img: "images/pyjama-minnie-prune.jpg" },
        { name: "Corail & marine", hex: "#ff8a6b", img: "images/pyjama-minnie-corail.jpg" }
      ] },
    { id: "baskets-menthe", name: "Baskets menthe à scratch", cats: ["chaussures", "garcons", "filles"], sizes: "pointure", price: null,
      desc: "Baskets en suédine vert menthe, bride à scratch et boucle, smiley brodé au talon. Faciles à enfiler seul.",
      colors: [{ name: "Vert menthe", hex: "#8fdcc0", img: "images/baskets-menthe.jpg" }] },
    { id: "baskets-girafe", name: "Baskets girafe rose", cats: ["chaussures", "filles"], sizes: "pointure", price: null,
      desc: "Baskets légères en mesh rose et motif girafe, double scratch et petit nœud au talon.",
      colors: [{ name: "Rose & girafe", hex: "#e8608a", img: "images/baskets-girafe.jpg" }] },
    { id: "slipon-licorne", name: "Slip-on licorne à paillettes", cats: ["chaussures", "filles"], sizes: "pointure", price: null,
      desc: "Chaussures à enfiler en toile pailletée fuchsia et rose, licorne brodée sur le dessus.",
      colors: [{ name: "Fuchsia pailleté", hex: "#c8186c", img: "images/slipon-licorne.jpg" }] },
    { id: "montantes-roses", name: "Baskets montantes roses à zip", cats: ["chaussures", "filles"], sizes: "pointure", price: null,
      desc: "Baskets montantes matelassées roses, lacets violets, œillets étoiles dorés et fermeture éclair latérale.",
      colors: [{ name: "Rose & violet", hex: "#d6338a", img: "images/montantes-roses.jpg" }] }
  ];

  var CAT_LABEL = {};
  CATS.forEach(function (c) { CAT_LABEL[c.id] = c.label; });

  var $ = function (s) { return document.querySelector(s); };
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  var priceText = function (p) { return p ? new Intl.NumberFormat("fr-FR").format(p) + " FCFA" : "Prix sur demande"; };
  var byId = function (id) { return PRODUCTS.find(function (p) { return p.id === id; }); };

  /* ---------- Filtres + grille ---------- */
  var current = "tout";
  function renderFilters() {
    $("#filters").innerHTML = CATS.map(function (c) {
      var n = c.id === "tout" ? PRODUCTS.length : PRODUCTS.filter(function (p) { return p.cats.indexOf(c.id) > -1; }).length;
      return '<button class="chip" role="tab" type="button" data-cat="' + c.id + '" aria-selected="' + (c.id === current) + '">' + c.label + '<span class="n">' + n + "</span></button>";
    }).join("");
  }
  function renderGrid() {
    var list = current === "tout" ? PRODUCTS : PRODUCTS.filter(function (p) { return p.cats.indexOf(current) > -1; });
    $("#grid").innerHTML = list.map(function (p) {
      var dots = p.colors.length > 1 ? '<span class="dots">' + p.colors.map(function (c) { return '<i style="background:' + c.hex + '" title="' + esc(c.name) + '"></i>'; }).join("") + "</span>" : "";
      return '<button class="card" type="button" data-id="' + p.id + '">' +
        '<span class="ph"><img src="' + p.colors[0].img + '" alt="' + esc(p.name) + '" loading="lazy">' + (p.badge ? '<span class="badge">' + esc(p.badge) + "</span>" : "") + "</span>" +
        "<h3>" + esc(p.name) + "</h3>" +
        '<span class="meta"><span class="price">' + priceText(p.price) + "</span>" + dots + "</span>" +
        '<span class="add">Choisir ma taille →</span></button>';
    }).join("");
  }
  $("#filters").addEventListener("click", function (e) {
    var b = e.target.closest(".chip"); if (!b) return;
    current = b.dataset.cat; renderFilters(); renderGrid();
  });
  document.querySelectorAll("[data-jump]").forEach(function (a) {
    a.addEventListener("click", function () { current = a.dataset.jump; renderFilters(); renderGrid(); });
  });

  /* ---------- Fiche produit ---------- */
  var modal = $("#modal"), mp = null, mColor = 0, mQty = 1, lastFocus = null;
  function openModal(id) {
    mp = byId(id); if (!mp) return;
    mColor = 0; mQty = 1; lastFocus = document.activeElement;
    $("#mCat").textContent = mp.cats.map(function (c) { return CAT_LABEL[c]; }).join(" · ");
    $("#mTitle").textContent = mp.name;
    $("#mDesc").textContent = mp.desc;
    $("#mPrice").textContent = priceText(mp.price);
    $("#mSizeLabel").textContent = mp.sizes === "pointure" ? "Pointure" : (mp.sizes === "bebe" ? "Âge de bébé" : "Âge de l'enfant");
    $("#mSize").innerHTML = '<option value="">Choisir…</option>' + SIZES[mp.sizes].map(function (s) { return "<option>" + s + "</option>"; }).join("") + '<option value="À confirmer">Je ne sais pas, à confirmer</option>';
    $("#mColorsWrap").hidden = mp.colors.length < 2;
    $("#mColors").innerHTML = mp.colors.map(function (c, i) {
      return '<button class="sw" type="button" data-i="' + i + '" aria-pressed="' + (i === 0) + '" aria-label="' + esc(c.name) + '"><img src="' + c.img + '" alt=""></button>';
    }).join("");
    setColor(0); $("#mQty").textContent = "1";
    modal.hidden = false; document.body.style.overflow = "hidden";
    modal.querySelector(".x").focus();
  }
  function setColor(i) {
    mColor = i; var c = mp.colors[i];
    $("#mImg").src = c.img; $("#mImg").alt = mp.name + " – " + c.name;
    $("#mColorName").textContent = c.name;
    document.querySelectorAll("#mColors .sw").forEach(function (b, j) { b.setAttribute("aria-pressed", j === i); });
  }
  function closeModal() { modal.hidden = true; document.body.style.overflow = ""; if (lastFocus) lastFocus.focus(); }
  $("#grid").addEventListener("click", function (e) { var c = e.target.closest(".card"); if (c) openModal(c.dataset.id); });
  $("#mColors").addEventListener("click", function (e) { var b = e.target.closest(".sw"); if (b) setColor(+b.dataset.i); });
  $("#qMinus").addEventListener("click", function () { mQty = Math.max(1, mQty - 1); $("#mQty").textContent = mQty; });
  $("#qPlus").addEventListener("click", function () { mQty = Math.min(20, mQty + 1); $("#mQty").textContent = mQty; });
  modal.addEventListener("click", function (e) { if (e.target.closest("[data-close]")) closeModal(); });
  $("#mAdd").addEventListener("click", function () {
    var size = $("#mSize").value;
    if (!size) { $("#mSize").focus(); toast("Choisissez une taille (ou « à confirmer »)"); return; }
    addToCart({ id: mp.id, color: mp.colors[mColor].name, img: mp.colors[mColor].img, size: size, qty: mQty });
    closeModal(); toast("Ajouté au panier");
  });

  /* ---------- Panier ---------- */
  var cart = [];
  try { cart = JSON.parse(localStorage.getItem("yara-cart") || "[]") || []; } catch (e) { cart = []; }
  cart = cart.filter(function (l) { return byId(l.id); });
  function save() { try { localStorage.setItem("yara-cart", JSON.stringify(cart)); } catch (e) { /* stockage indisponible */ } }
  function addToCart(item) {
    var ex = cart.find(function (l) { return l.id === item.id && l.color === item.color && l.size === item.size; });
    if (ex) ex.qty += item.qty; else cart.push(item);
    save(); renderCart();
    var b = $("#cartOpen"); b.classList.remove("bump"); void b.offsetWidth; b.classList.add("bump");
  }
  function renderCart() {
    var count = cart.reduce(function (s, l) { return s + l.qty; }, 0);
    $("#cartCount").textContent = count;
    $("#cartList").innerHTML = cart.length ? cart.map(function (l, i) {
      var p = byId(l.id);
      return '<div class="line"><img src="' + l.img + '" alt=""><div><h4>' + esc(p.name) + "</h4><p>" + esc(l.color) + " · " + esc(l.size) + " · Qté " + l.qty + "</p><p>" + priceText(p.price) + '</p></div><button class="rm" type="button" data-rm="' + i + '">Retirer</button></div>';
    }).join("") : '<p class="empty">Votre panier est vide.<br>Ajoutez des articles depuis la boutique.</p>';
    updateWaLink();
  }
  function updateWaLink() {
    var a = $("#sendWa");
    if (!cart.length) { a.classList.add("disabled"); a.href = "#"; return; }
    a.classList.remove("disabled");
    var name = $("#cName").value.trim(), note = $("#cNote").value.trim();
    var msg = "Bonjour Yara Shop ! Je souhaite commander :\n\n" + cart.map(function (l, i) {
      var p = byId(l.id);
      return (i + 1) + ". " + p.name + "\n   Couleur : " + l.color + " | Taille : " + l.size + " | Qté : " + l.qty;
    }).join("\n") + "\n\nPouvez-vous me confirmer le prix et la disponibilité ?";
    if (name) msg += "\nNom : " + name;
    if (note) msg += "\nPrécision : " + note;
    a.href = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(msg);
  }
  $("#cartList").addEventListener("click", function (e) {
    var b = e.target.closest("[data-rm]"); if (!b) return;
    cart.splice(+b.dataset.rm, 1); save(); renderCart();
  });
  $("#cName").addEventListener("input", updateWaLink);
  $("#cNote").addEventListener("input", updateWaLink);
  var drawer = $("#drawer");
  $("#cartOpen").addEventListener("click", function () { drawer.hidden = false; document.body.style.overflow = "hidden"; drawer.querySelector(".x").focus(); });
  drawer.addEventListener("click", function (e) { if (e.target.closest("[data-cclose]")) { drawer.hidden = true; document.body.style.overflow = ""; } });
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (!modal.hidden) closeModal();
    if (!drawer.hidden) { drawer.hidden = true; document.body.style.overflow = ""; }
  });

  /* ---------- Divers ---------- */
  var tt;
  function toast(t) { var el = $("#toast"); el.textContent = t; el.hidden = false; clearTimeout(tt); tt = setTimeout(function () { el.hidden = true; }, 2200); }
  $("#copyPhone").addEventListener("click", function () {
    var txt = $("#phoneTxt").textContent;
    var fallback = function () { var r = document.createRange(); r.selectNodeContents($("#phoneTxt")); var s = getSelection(); s.removeAllRanges(); s.addRange(r); toast("Numéro sélectionné"); };
    if (navigator.clipboard) navigator.clipboard.writeText(txt).then(function () { toast("Numéro copié"); }, fallback); else fallback();
  });
  $("#year").textContent = new Date().getFullYear();

  renderFilters(); renderGrid(); renderCart();
})();
