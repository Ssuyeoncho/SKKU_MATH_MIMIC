const seminarArchive = [
  {
    label: "2025 Fall",
    items: [
      { title: "1+1=0", href: "2025fall/one-plus-one-equals-zero.html" },
      { title: "Course Registration and Game Theory" },
      { title: "Tessellation of H²" },
      { title: "Randomness and Infinity" },
      { title: "Dual Number and Split-Complex Number" },
      { title: "Basic Convex Optimization II - Second-Order Methods" },
      { title: "Peter-Weyl Theorem" },
      { title: "Root System of Semisimple Lie Algebra and its Classification" },
      { title: "Antipodes and Involutions" },
    ],
  },
  {
    label: "2025 Spring",
    items: [{ title: "Coming soon" }],
  },
  {
    label: "2024 Fall",
    items: [{ title: "Coming soon" }],
  },
  {
    label: "2024 Spring",
    items: [{ title: "Coming soon" }],
  },
  {
    label: "2023 Fall",
    items: [{ title: "Coming soon" }],
  },
  {
    label: "2023 Spring",
    items: [{ title: "Coming soon" }],
  },
  {
    label: "2022 Fall",
    items: [{ title: "Coming soon" }],
  },
  {
    label: "2022 Spring",
    items: [{ title: "Coming soon" }],
  },
];

function buildSeminarHref(basePath, href) {
  if (!href) {
    return "";
  }

  const normalizedBase = basePath ? `${basePath.replace(/\/+$/, "")}/` : "";
  return `${normalizedBase}${href}`;
}

function renderSeminarSidebar(root) {
  const basePath = root.dataset.basePath || "";
  const currentPath = root.dataset.currentPath || "";

  const sections = seminarArchive
    .map((season, index) => {
      const hasCurrent = season.items.some((item) => item.href === currentPath);
      const isExpanded = hasCurrent || (!currentPath && index === 0);
      const items = season.items
        .map((item) => {
          const isCurrent = item.href && item.href === currentPath;

          if (item.href) {
            return `
              <li class="season-item">
                <a class="season-link${isCurrent ? " is-current" : ""}" href="${buildSeminarHref(basePath, item.href)}">${item.title}</a>
              </li>
            `;
          }

          return `
            <li class="season-item">
              <span class="season-link">${item.title}</span>
            </li>
          `;
        })
        .join("");

      return `
        <section class="season" data-expanded="${isExpanded ? "true" : "false"}">
          <button class="season-toggle" type="button" aria-expanded="${isExpanded ? "true" : "false"}">
            <span>${season.label}</span>
            <span class="season-icon" aria-hidden="true">${isExpanded ? "⌃" : "⌄"}</span>
          </button>
          <ul class="season-items" style="${isExpanded ? "" : "display: none;"}">
            ${items}
          </ul>
        </section>
      `;
    })
    .join("");

  root.innerHTML = `
    <div class="seminar-sidebar-header">
      <h1>SEMINARS</h1>
    </div>
    <div class="season-list">
      ${sections}
    </div>
  `;

  root.querySelectorAll(".season").forEach((season) => {
    const toggle = season.querySelector(".season-toggle");
    const items = season.querySelector(".season-items");
    const icon = season.querySelector(".season-icon");

    toggle.addEventListener("click", () => {
      const isExpanded = toggle.getAttribute("aria-expanded") === "true";

      toggle.setAttribute("aria-expanded", String(!isExpanded));
      season.setAttribute("data-expanded", String(!isExpanded));
      items.style.display = isExpanded ? "none" : "block";
      icon.textContent = isExpanded ? "⌄" : "⌃";
    });
  });
}

document.querySelectorAll("[data-seminar-sidebar]").forEach(renderSeminarSidebar);
