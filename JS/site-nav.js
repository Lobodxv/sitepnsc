(function () {
  const menu = document.getElementById("nav-menu");
  if (!menu) return;

  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const items = [
    { label: "Início", href: currentPage === "index.html" ? "#inicio" : "index.html", page: "index.html" },
    { label: "Celebrações", href: "celebracoes.html", page: "celebracoes.html" },
    { label: "Paróquia", href: "parocos.html", page: "parocos.html" },
    { label: "Pastorais", href: "pastorais.html", page: "pastorais.html" },
    { label: "Liturgia", href: "liturgia.html", page: "liturgia.html" },
    { label: "Sacramentos", href: "sacramentos.html", page: "sacramentos.html" },
    { label: "Notícias", href: "noticias.html", page: "noticias.html" },
    { label: "Contribua", href: "contribua.html", page: "contribua.html" },
    {
      label: "Entrar em contato",
      href: "https://wa.me/5588981996070?text=Ol%C3%A1%2C%20gostaria%20de%20entrar%20em%20contato%20com%20a%20secretaria%20da%20par%C3%B3quia.",
      contact: true
    }
  ];

  menu.replaceChildren(...items.map((item) => {
    const listItem = document.createElement("li");
    const link = document.createElement("a");
    link.href = item.href;
    link.textContent = item.label;

    if (item.contact) {
      link.classList.add("nav-contact-link");
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
    if (item.page === currentPage) {
      link.classList.add("nav-current");
      link.setAttribute("aria-current", "page");
    }

    listItem.appendChild(link);
    return listItem;
  }));
})();
