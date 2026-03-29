const PORTFOLIO_DATA_VERSION = "2026-03-29-v6";

const defaultData = {
  version: PORTFOLIO_DATA_VERSION,
  name: "Samyak Jain",
  title: "MCA Candidate | Full-Stack Developer (MERN & Next.js) | Specialized in Browser Extensions & Automation",
  summary:
    "Passionate and motivated MCA student with a strong interest in web development and hands-on experience in HTML, CSS, JavaScript, and React. Eager to apply academic knowledge and contribute to real-world projects through internship opportunities.",
  skills: [
    { id: "s1", name: "HTML5", icon: "fa-brands fa-html5", level: "Advanced" },
    { id: "s2", name: "CSS3", icon: "fa-brands fa-css3-alt", level: "Advanced" },
    { id: "s3", name: "JavaScript", icon: "fa-brands fa-js", level: "Advanced" },
    { id: "s4", name: "React", icon: "fa-brands fa-react", level: "Intermediate" },
    { id: "s5", name: "TypeScript", icon: "fa-solid fa-code", level: "Intermediate" },
    { id: "s9", name: "Node.js", icon: "fa-brands fa-node-js", level: "Intermediate" }
  ],
  projects: [
    {
      id: "p1",
      name: "Download Sorter Extension",
      description:
        "A browser extension that organizes downloads by creating folders based on the source domain and download date, then routes files into the right location automatically.",
      image: "assets/project-download-sorter.svg",
      tech: ["s3", "s5", "s9"],
      link: "https://github.com/SamyakH/SmartDownloadSorter.v3.2",
      challenge:
        "Ensuring downloads were grouped consistently without slowing down the workflow or creating confusing folder structures.",
      solution:
        "Designed a rule-based sorter that reads domain and timestamp data, builds folders dynamically, and redirects each download to the correct destination.",
      relatedExperience:
        "Strengthened problem-solving around automation, browser workflows, and practical JavaScript application design."
    },
    {
      id: "p2",
      name: "Auto Translate Browser Extension",
      description:
        "A Chrome extension that automatically translates foreign-language web pages, removes common translation blockers, enables text selection on restricted sites, and remembers processed domains for faster reuse.",
      image: "assets/project-auto-translate.svg",
      tech: ["s1", "s2", "s3"],
      link: "https://github.com/SamyakH/Auto-Translate",
      challenge:
        "Handling a range of website restrictions while keeping translation behavior reliable across repeat visits.",
      solution:
        "Added automated page handling, domain memory, and content interaction helpers so translation could run more smoothly on blocked or limited pages.",
      relatedExperience:
        "Built on frontend scripting skills and reinforced an interest in creating user-focused browser tooling."
    },
    {
      id: "p3",
      name: "Travel Agency Website",
      description:
        "A modern, secure, and high-performance travel agency website built with Next.js 16, React 19, and Supabase for luxury travel brands and tour operators.",
      image: "assets/project-travel-site.svg",
      tech: ["s2", "s4", "s5", "s9"],
      link: "https://github.com/SamyakH/my-travel-site",
      challenge:
        "Creating a polished travel experience that balances performance, security, and a premium visual presentation.",
      solution:
        "Used a modern React-based stack with structured components and backend services to support responsive UX, scalable content, and faster rendering.",
      relatedExperience:
        "Reflects academic and hands-on growth in modern web development using React-based frameworks and full-stack tooling."
    },
    {
      id: "p4",
      name: "CashChecker",
      description:
        "A local JSON-backed finance tracker with recurring income and expense automation, built around a modular app structure with navigator, pages, services, and models.",
      image: "assets/project-cashchecker.svg",
      tech: ["s3", "s5", "s9"],
      link: "https://github.com/SamyakH/CashChecker",
      challenge:
        "Keeping personal finance flows simple while supporting recurring transactions and a modular code structure.",
      solution:
        "Organized the app into clear modules and automated recurring records so the tracker stayed maintainable and easier to extend.",
      relatedExperience:
        "Demonstrates practical application architecture skills and an emphasis on maintainable, user-friendly tooling."
    }
  ]
};

function cloneDefaultData() {
  return JSON.parse(JSON.stringify(defaultData));
}

// Load data from localStorage or use default
function getPortfolioData() {
  const saved = localStorage.getItem("portfolioData");
  if (!saved) return cloneDefaultData();

  try {
    const parsed = JSON.parse(saved);
    if (!parsed || typeof parsed !== "object") return cloneDefaultData();
    if (parsed.version !== PORTFOLIO_DATA_VERSION) {
      localStorage.removeItem("portfolioData");
      return cloneDefaultData();
    }
    if (!Array.isArray(parsed.skills) || !Array.isArray(parsed.projects)) {
      return cloneDefaultData();
    }
    return parsed;
  } catch {
    console.warn("Invalid portfolioData in localStorage, resetting to defaults");
    localStorage.removeItem("portfolioData");
    return cloneDefaultData();
  }
}
// ================= Theme & Nav =================
function applySavedTheme() {
  const saved = localStorage.getItem("theme");
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const shouldDark = saved ? saved === "dark" : prefersDark;
  document.body.classList.toggle("dark", shouldDark);
  updateThemeButtonsUI();
}

function detectBtnMode(btn) {
  if (btn.querySelector("i.fa-solid, i.fas, i.fa-regular, i.fa-duotone, i.fa"))
    return "fa";
  if (btn.querySelector(".theme-icon")) return "text";
  return "text"; // safe fallback
}

function updateThemeButtonsUI() {
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  document.documentElement.style.colorScheme = isDark ? "dark" : "light";

  const buttons = document.querySelectorAll("#theme-toggle, .theme-btn");
  buttons.forEach((btn) => {
    const mode =
      btn.dataset.themeIconMode || (btn.dataset.themeIconMode = detectBtnMode(btn));
    btn.setAttribute("aria-pressed", String(isDark));
    btn.setAttribute("title", isDark ? "Switch to light mode" : "Switch to dark mode");

    if (mode === "fa") {
      // Font Awesome
      let iEl = btn.querySelector("i.fa-solid, i.fas, i.fa-regular, i.fa-duotone, i.fa");
      if (!iEl) {
        iEl = document.createElement("i");
        iEl.className = "fas";
        btn.innerHTML = "";
        btn.appendChild(iEl);
      }
      iEl.className = isDark ? "fas fa-sun" : "fas fa-moon";
    } else {
      // Emoji fallback
      const span = btn.querySelector(".theme-icon") || btn;
      span.textContent = isDark ? "☀︎" : "🌙";
    }
  });
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  updateThemeButtonsUI();
}

function initPageChrome() {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Hook theme buttons
  const btns = document.querySelectorAll("#theme-toggle, .theme-btn");
  btns.forEach((b) => (b.onclick = toggleTheme));

  applySavedTheme();

  // Active nav highlighting
  document.querySelectorAll(".header nav a").forEach((a) => {
    const href = a.getAttribute("href");
    if (!href) return;
    const path = location.pathname.split("/").pop() || "index.html";
    if (path === href) a.classList.add("active");
  });

  // Mobile navigation toggle
  initMobileNav();
}

// ================= Mobile Navigation =================
function initMobileNav() {
  const header = document.querySelector('.header');
  const nav = header?.querySelector('nav');
  
  if (!header || !nav) return;

  // Create mobile toggle button if it doesn't exist
  let toggleBtn = header.querySelector('.mobile-nav-toggle');
  if (!toggleBtn) {
    toggleBtn = document.createElement('button');
    toggleBtn.className = 'mobile-nav-toggle';
    toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
    toggleBtn.setAttribute('aria-label', 'Toggle navigation');
    toggleBtn.setAttribute('aria-expanded', 'false');
    
    // Insert before theme button
    const themeBtn = header.querySelector('.theme-btn');
    if (themeBtn) {
      header.insertBefore(toggleBtn, themeBtn);
    } else {
      header.appendChild(toggleBtn);
    }
  }

  // Toggle navigation
  toggleBtn.addEventListener('click', () => {
    const isOpen = nav.classList.contains('active');
    nav.classList.toggle('active');
    toggleBtn.setAttribute('aria-expanded', !isOpen);
    
    // Change icon
    const icon = toggleBtn.querySelector('i');
    if (icon) {
      icon.className = isOpen ? 'fas fa-bars' : 'fas fa-times';
    }
  });

  // Close nav when clicking outside
  document.addEventListener('click', (e) => {
    if (!header.contains(e.target) && nav.classList.contains('active')) {
      nav.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
      const icon = toggleBtn.querySelector('i');
      if (icon) icon.className = 'fas fa-bars';
    }
  });

  // Close nav when clicking a link
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
      const icon = toggleBtn.querySelector('i');
      if (icon) icon.className = 'fas fa-bars';
    });
  });

  // Close nav on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('active')) {
      nav.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
      const icon = toggleBtn.querySelector('i');
      if (icon) icon.className = 'fas fa-bars';
      toggleBtn.focus();
    }
  });
}

// Expose for inline onclick="toggleTheme()"
window.toggleTheme = toggleTheme;

// ================= Skills Animation =================
function initSkills() {
  const skillBars = document.querySelectorAll(".progress-bar");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const width = bar.dataset.width || bar.dataset.level || "0";
          bar.style.width = width;
          observer.unobserve(bar);
        }
      });
    },
    { threshold: 0.4 }
  );
  skillBars.forEach((bar) => observer.observe(bar));
}


// ================= Scroll Animations =================
let scrollObserver = null;

function observeAnimateables(root = document) {
  if (!scrollObserver) {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          scrollObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);
  }

  root
    .querySelectorAll(
      '.card, .skill-card, .project-card, .resume-card, .contact-card, .section-title, .hero-left, .hero-right'
    )
    .forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      scrollObserver.observe(el);
    });
}

function initScrollAnimations() {
  observeAnimateables(document);
}

document.addEventListener("DOMContentLoaded", () => {
  initPageChrome();

  // Only run skill bar observer when there are progress bars on page
  if (document.querySelector(".progress-bar")) {
    initSkills();
  }

  // Page-specific functions are called via body onload in each HTML file
  initScrollAnimations();
});


// ================= Home =================
function loadHome() {
  // Reload data from localStorage to get latest changes
  const currentData = getPortfolioData();
  
  const nameEl = document.getElementById("home-name");
  const titleElId = "home-title";
  const summaryEl = document.getElementById("home-summary");
  if (nameEl) nameEl.textContent = currentData.name;
  if (summaryEl) summaryEl.textContent = currentData.summary;
  typeWriter(titleElId, currentData.title, 60);

 const container = document.getElementById("home-skills");
  if (container) {
    container.innerHTML = "";
    currentData.skills.slice(0, 5).forEach(s => {
      const tag = document.createElement("a");
      tag.className = "tag";
      tag.href = `projects.html?skill=${encodeURIComponent(s.id)}`;
      tag.innerHTML = `<i class="${esc(s.icon)}"></i>${esc(s.name)}`;
      container.appendChild(tag);
    });
  }

  const featured = document.getElementById("featured-projects");
  if (featured) {
    featured.innerHTML = "";
    currentData.projects.slice(0, 3).forEach(p => {
      featured.innerHTML += projectCardHTML(p, currentData);
    });
    // ensure newly added cards get scroll animation
    if (typeof observeAnimateables === "function") {
      observeAnimateables(featured);
    }
  }
}

// ================= Projects Page =================
function initProjectsPage() {
  // Reload data from localStorage to get latest changes
  const currentData = getPortfolioData();
  
  const list = document.getElementById("projects-list");
  const filters = document.getElementById("tech-filters");
  const search = document.getElementById("search-input");
  const clearBtn = document.getElementById("clear-filters");

  const params = new URLSearchParams(location.search);
  const preSkill = params.get("skill");

  if (filters) {
    filters.innerHTML = "";
    currentData.skills.forEach(s => {
      const active = preSkill === s.id ? "active" : "";
      filters.innerHTML += `<button class="filter-tag ${active}" data-skill="${s.id}">${s.name}</button>`;
    });
  }

  function render() {
    if (!list) return;
    const term = (search?.value || "").toLowerCase();
    const active = filters ? [...filters.querySelectorAll(".filter-tag.active")].map(b => b.dataset.skill) : [];
    list.innerHTML = "";
    currentData.projects
      .filter(p =>
        p.name.toLowerCase().includes(term) &&
        (active.length === 0 || active.some(a => p.tech.includes(a)))
      )
      .forEach(p => { list.innerHTML += projectCardHTML(p, currentData); });

    if (typeof observeAnimateables === "function") {
      observeAnimateables(list);
    }
  }

  if (filters) {
    filters.addEventListener("click", e => {
      if (e.target.classList.contains("filter-tag")) e.target.classList.toggle("active");
      render();
    });
  }
  search?.addEventListener("input", render);
  if (clearBtn) clearBtn.onclick = () => {
    filters?.querySelectorAll(".filter-tag").forEach(f => f.classList.remove("active"));
    if (search) search.value = "";
    render();
  };

  render();
}

// ================= Project Card HTML =================
function projectCardHTML(p, dataObj = null) {
  const currentData = dataObj || getPortfolioData();
  const techs = (p.tech || [])
    .map(id => {
      const skill = currentData.skills.find(s => s.id === id);
      return skill
        ? `<span class="mini-tag"><i class="${esc(skill.icon)}"></i>${esc(skill.name)}</span>`
        : "";
    })
    .join(" ");

  const repoLink =
    p.link && p.link !== "#"
      ? `<a href="${esc(p.link)}" target="_blank" rel="noopener" class="btn small outline project-action">GitHub Repo</a>`
      : "";

  return `
  <article class="card project-card" aria-labelledby="project-title-${encodeURIComponent(p.id)}">
    <a href="project.html?id=${encodeURIComponent(p.id)}" class="project-card-link" aria-label="Open ${esc(p.name)} details"></a>
    <img class="thumb" src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy" />
    <div class="body">
      <h3 id="project-title-${encodeURIComponent(p.id)}">${esc(p.name)}</h3>
      <p>${esc(p.description)}</p>
      <div class="tech-tags">${techs}</div>
      <div class="project-actions">
        <a href="project.html?id=${encodeURIComponent(p.id)}" class="btn small project-action">View Details</a>
        ${repoLink}
      </div>
    </div>
  </article>`;
}

// ================= Project Detail Page =================
function loadProjectDetail() {
  // Reload data from localStorage to get latest changes
  const currentData = getPortfolioData();
  
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const project = currentData.projects.find(p => p.id === id);
  const container = document.getElementById("project-detail");

  if (!container) return;

  if (!project) {
    container.innerHTML = `
      <div class="card project-detail-card">
        <div class="body">
          <h2>Project Not Found</h2>
          <p>Sorry, we couldn't find the project you're looking for.</p>
          <a href="projects.html" class="btn">Back to Projects</a>
        </div>
      </div>`;
    if (typeof observeAnimateables === "function") {
      observeAnimateables(container);
    }
    return;
  }

  const techs = (project.tech || [])
    .map(tid => {
      const s = currentData.skills.find(s => s.id === tid);
      return s
        ? `<span class="mini-tag"><i class="${esc(s.icon)}"></i>${esc(s.name)}</span>`
        : "";
    })
    .join(" ");

  const projectLink =
    project.link && project.link !== "#"
      ? `<a href="${esc(project.link)}" target="_blank" rel="noopener" class="btn">GitHub Repo</a>`
      : "";

  container.innerHTML = `
    <div class="card project-detail-card">
      <img src="${esc(project.image)}" alt="${esc(project.name)}" class="thumb" />
      <div class="body">
        <h2>${esc(project.name)}</h2>
        <p>${esc(project.description)}</p>
        <div class="tech-tags">${techs}</div>

        <div class="project-section">
          <h3>Challenge</h3>
          <p>${esc(project.challenge)}</p>
        </div>
        <div class="project-section">
          <h3>Solution</h3>
          <p>${esc(project.solution)}</p>
        </div>
        <div class="project-section">
          <h3>Related Experience</h3>
          <p>${esc(project.relatedExperience)} (<a href="resume.html" target="_blank" rel="noopener">View Resume</a>)</p>
        </div>

        ${projectLink}
        <a href="projects.html" class="btn outline">Back to Projects</a>
      </div>
    </div>
  `;
  if (typeof observeAnimateables === "function") {
    observeAnimateables(container);
  }
}
window.loadProjectDetail = loadProjectDetail;

// ================= Skills Page =================
function loadSkills() {
  // Reload data from localStorage to get latest changes
  const currentData = getPortfolioData();
  
  const list = document.getElementById("skills-list");
  if (!list) return;

 // Show all skills dynamically in a simple grid
  list.innerHTML = "";
  currentData.skills.forEach(s => {
    const count = currentData.projects.filter(p => (p.tech || []).includes(s.id)).length;
    const width =
      s.level === "Advanced" ? 90 :
      s.level === "Intermediate" ? 70 : 50;

    list.innerHTML += `
      <a href="projects.html?skill=${encodeURIComponent(s.id)}" class="card skill-card" aria-label="View projects with ${esc(s.name)}">
        <div class="body">
          <div class="skill-icon" aria-hidden="true">
            <i class="${esc(s.icon)}"></i>
          </div>
          <h3>${esc(s.name)}</h3>
          <p class="muted">${esc(s.level)} • ${count} project${count !== 1 ? "s" : ""}</p>
          <div class="progress">
            <div class="progress-bar" style="width:0%" data-width="${width}%"></div>
          </div>
        </div>
      </a>`;
  });

  // Animate bars after insertion
  setTimeout(() => {
    document.querySelectorAll(".progress-bar").forEach(bar => {
      bar.style.width = bar.dataset.width;
    });

    if (typeof observeAnimateables === "function") {
      observeAnimateables(list);
    }
  }, 150);
}

// ================= Contact =================
function initContactForm() {
  const form = document.getElementById("contact-form");
  const emailLink = document.getElementById("email-link");
  const copyBtn = document.getElementById("copy-email");

  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const name = form.querySelector("[name=name]").value;
      const email = form.querySelector("[name=email]").value;
      const message = form.querySelector("[name=message]").value;
      const subject = `New Message from ${name}`;
      const body = `${message}\n\nFrom: ${name} (${email})`;
      window.location.href = `mailto:samyakj1978@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }

  if (copyBtn && emailLink) {
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(emailLink.textContent).then(() => {
        // Show a temporary tooltip-like label instead of removing the icon
        const originalTitle = copyBtn.getAttribute("title") || "";
        copyBtn.setAttribute("title", "Copied!");
        copyBtn.classList.add("copied");
        setTimeout(() => {
          copyBtn.setAttribute("title", originalTitle || "Copy Email");
          copyBtn.classList.remove("copied");
        }, 1500);
      });
    });
  }
}

// ================= Helpers =================
function esc(s) {
  const d = document.createElement("div");
  d.textContent = String(s);
  return d.innerHTML;
}

function typeWriter(id, text, speed) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = "";
  let i = 0;
  const itv = setInterval(() => {
    el.textContent += text.charAt(i);
    i++;
    if (i >= text.length) clearInterval(itv);
  }, speed);
}

// Expose globally
window.initPageChrome = initPageChrome;
window.loadHome = loadHome;
window.initProjectsPage = initProjectsPage;
window.loadSkills = loadSkills;
window.initContactForm = initContactForm;
