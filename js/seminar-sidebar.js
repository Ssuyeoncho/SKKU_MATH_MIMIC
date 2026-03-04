document.querySelectorAll(".seminar-sidebar .season").forEach((season) => {
  const toggle = season.querySelector(".season-toggle");
  const items = season.querySelector(".season-items");
  const icon = season.querySelector(".season-icon");

  if (!toggle || !items || !icon) {
    return;
  }

  toggle.addEventListener("click", () => {
    const isExpanded = toggle.getAttribute("aria-expanded") === "true";

    toggle.setAttribute("aria-expanded", String(!isExpanded));
    season.setAttribute("data-expanded", String(!isExpanded));
    items.style.display = isExpanded ? "none" : "block";
    icon.textContent = isExpanded ? "⌄" : "⌃";
  });
});
