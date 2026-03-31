const languageTextKey = {
  ko: "languageTextKo",
  en: "languageTextEn",
};

const applyLanguage = (target) => {
  document.querySelectorAll("[data-language-toggle]").forEach((toggleRoot) => {
    toggleRoot.querySelectorAll("[data-language-button]").forEach((button) => {
      const isActive = button.dataset.languageButton === target;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  });

  document.querySelectorAll("[data-language-panel]").forEach((panel) => {
    panel.hidden = panel.dataset.languagePanel !== target;
  });

  const textKey = languageTextKey[target];
  document.querySelectorAll("[data-language-text]").forEach((node) => {
    const localizedText = node.dataset[textKey];

    if (typeof localizedText === "string" && localizedText !== "") {
      node.textContent = localizedText;
    }
  });

  document.querySelectorAll("[data-language-option]").forEach((node) => {
    const isActive = node.dataset.languageOption === target;
    node.classList.toggle("is-active", isActive);
    node.setAttribute("aria-hidden", String(!isActive));
  });
};

document.querySelectorAll("[data-language-toggle]").forEach((toggleRoot) => {
  const buttons = toggleRoot.querySelectorAll("[data-language-button]");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      applyLanguage(button.dataset.languageButton || "ko");
    });
  });
});

applyLanguage("ko");
