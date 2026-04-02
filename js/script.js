const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", mobileMenu);
}

function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}

// Close navbar when link is clicked
const navLinks = Array.from(document.querySelectorAll(".nav-link"));

navLinks.forEach((n) => n.addEventListener("click", closeMenu));

function closeMenu() {
  if (!hamburger || !navMenu) {
    return;
  }

  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}

// Highlight active navbar link on scroll (main page sections)
const scrollSpyItems = navLinks
  .map((link) => {
    const href = link.getAttribute("href");
    if (!href) {
      return null;
    }

    let hash = "";

    try {
      const linkUrl = new URL(href, window.location.href);
      const normalizePath = (path) =>
        path.replace(/\/index\.html$/, "/").replace(/\/+$/, "") || "/";
      if (
        linkUrl.origin !== window.location.origin ||
        normalizePath(linkUrl.pathname) !== normalizePath(window.location.pathname)
      ) {
        return null;
      }
      hash = linkUrl.hash;
    } catch (error) {
      if (href.startsWith("#")) {
        hash = href;
      } else {
        return null;
      }
    }

    if (!hash || hash === "#") {
      return null;
    }

    const section = document.querySelector(hash);
    if (!section) {
      return null;
    }

    return { link, section };
  })
  .filter(Boolean);

if (scrollSpyItems.length > 0) {
  const setActiveLink = (activeLink) => {
    scrollSpyItems.forEach(({ link }) => {
      link.classList.toggle("is-active", link === activeLink);
    });
  };

  const updateActiveLinkByScroll = () => {
    const navbar = document.querySelector(".navbar");
    const navHeight = navbar ? navbar.offsetHeight : 0;
    const probeLine = navHeight + window.innerHeight * 0.35;
    let activeItem = scrollSpyItems[0];

    scrollSpyItems.forEach((item) => {
      const sectionTop = item.section.getBoundingClientRect().top;
      if (sectionTop <= probeLine) {
        activeItem = item;
      }
    });

    setActiveLink(activeItem.link);
  };

  let ticking = false;
  const requestActiveLinkUpdate = () => {
    if (ticking) {
      return;
    }

    ticking = true;
    window.requestAnimationFrame(() => {
      updateActiveLinkByScroll();
      ticking = false;
    });
  };

  window.addEventListener("scroll", requestActiveLinkUpdate, { passive: true });
  window.addEventListener("resize", requestActiveLinkUpdate);
  requestActiveLinkUpdate();
}

const donationSliders = Array.from(
  document.querySelectorAll("[data-donations-slider]")
);

donationSliders.forEach((slider) => {
  const reduceMotionQuery = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  if (reduceMotionQuery.matches) {
    return;
  }

  const track = slider.querySelector(".donations-slider-track");
  if (!track) {
    return;
  }

  const slides = Array.from(track.children);
  if (slides.length <= 1) {
    return;
  }

  const hasClone = slides[slides.length - 1].classList.contains(
    "donor-slide-clone"
  );
  let currentIndex = 0;
  let intervalId = null;
  let resetTimeoutId = null;

  const setSlidePosition = (animate) => {
    track.style.transition = animate ? "transform 480ms ease" : "none";
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
  };

  const stopSlider = () => {
    if (intervalId !== null) {
      window.clearInterval(intervalId);
      intervalId = null;
    }

    if (resetTimeoutId !== null) {
      window.clearTimeout(resetTimeoutId);
      resetTimeoutId = null;
    }
  };

  const advanceSlider = () => {
    currentIndex += 1;
    setSlidePosition(true);

    if (hasClone && currentIndex === slides.length - 1) {
      resetTimeoutId = window.setTimeout(() => {
        currentIndex = 0;
        setSlidePosition(false);
      }, 500);
    }
  };

  const startSlider = () => {
    if (intervalId !== null) {
      return;
    }

    intervalId = window.setInterval(advanceSlider, 2600);
  };

  setSlidePosition(false);
  startSlider();

  slider.addEventListener("mouseenter", stopSlider);
  slider.addEventListener("mouseleave", startSlider);
  slider.addEventListener("focusin", stopSlider);
  slider.addEventListener("focusout", startSlider);
});

// Event Listeners: Handling toggle event
const toggleSwitch = document.querySelector(
  '.theme-switch input[type="checkbox"]'
);

const applyTheme = (theme) => {
  if (theme !== "dark" && theme !== "light") {
    return;
  }

  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.style.colorScheme = theme;
};

const getSavedTheme = () => {
  try {
    return localStorage.getItem("theme");
  } catch (error) {
    return null;
  }
};

const saveTheme = (theme) => {
  try {
    localStorage.setItem("theme", theme);
  } catch (error) {
    // Ignore localStorage access errors.
  }
};

function switchTheme(e) {
  const nextTheme = e.target.checked ? "dark" : "light";
  applyTheme(nextTheme);
  saveTheme(nextTheme);
}

if (toggleSwitch) {
  toggleSwitch.addEventListener("change", switchTheme, false);
}

const currentTheme = getSavedTheme();

if (currentTheme === "dark" || currentTheme === "light") {
  applyTheme(currentTheme);
}

if (toggleSwitch) {
  toggleSwitch.checked =
    document.documentElement.getAttribute("data-theme") === "dark";
}

//Adding date

let myDate = document.querySelector("#datee");

const yes = new Date().getFullYear();
if (myDate) {
  myDate.innerHTML = yes;
}
