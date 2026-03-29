const defaultData = {
  name: "Samyak Jain",
  title: "Web Developer",
  summary: "Highly motivated and detail-oriented web developer with a passion for building responsive and user-friendly applications.",
  skills: [
    { id: "s1", name: "Python", icon: "devicon-python-plain colored", level: "Advanced" },
    { id: "s2", name: "SQL", icon: "devicon-azuresqldatabase-plain colored", level: "Intermediate" },
    { id: "s3", name: "MongoDB", icon: "devicon-mongodb-plain colored", level: "Intermediate" },
    { id: "s4", name: "HTML5", icon: "devicon-html5-plain colored", level: "Advanced" },
    { id: "s5", name: "CSS3", icon: "devicon-css3-plain colored", level: "Advanced" },
    { id: "s6", name: "JavaScript", icon: "devicon-javascript-plain colored", level: "Intermediate" },
    { id: "s7", name: "Git", icon: "devicon-git-plain colored", level: "Advanced" },
    { id: "s8", name: "Excel", icon: "devicon-microsoftsqlserver-plain colored", level: "Advanced" }
  ],
  projects: [
    {
      id: "p1",
      name: "Portfolio Website",
      description: "Personal portfolio built with HTML, CSS, and JavaScript.",
      image: "https://placehold.co/800x500",
      tech: ["s4", "s5", "s6"],
      link: "https://github.com/SamR202/Portfolio",
      challenge: "Designing a personal site that looks professional and loads quickly.",
      solution: "Built a lightweight site using vanilla JS and CSS optimizations for speed.",
      relatedExperience: "Applied design principles and frontend performance best practices."
    }
  ],
  resume: {
    experience: [
      { 
        id: "e1",
        role: "Data Analyst Intern", 
        company: "NoBroker", 
        years: "June 2025 - July 2025", 
        description: "Worked on real datasets related to property trends, cleaning and analyzing data to support business insights. Gained practical experience with SQL, Python, and visualization tools while creating reports and dashboards." 
      }
    ],
    education: [
      { 
        id: "ed1",
        degree: "Master of Science in Computer Science", 
        school: "SRM NCR", 
        years: "Currently Pursuing", 
        description: "" 
      },
      { 
        id: "ed2",
        degree: "Bachelor of Science in Computer Science", 
        school: "Chaudhary Charan Singh University", 
        years: "Graduated 2023", 
        description: "" 
      }
    ]
  }
};

// Load data from localStorage or use default
function getPortfolioData() {
  const saved = localStorage.getItem('portfolioData');
  if (saved) {
    return JSON.parse(saved);
  }
  return defaultData;
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

// ================= Scroll Animations =================
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

  return `
  <a href="project.html?id=${encodeURIComponent(p.id)}" class="card project-card" aria-label="Open ${esc(p.name)} details">
    <img class="thumb" src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy" />
    <div class="body">
      <h3>${esc(p.name)}</h3>
      <p>${esc(p.description)}</p>
      <div class="tech-tags">${techs}</div>
    </div>
  </a>`;
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

        <a href="${esc(project.link)}" target="_blank" rel="noopener" class="btn">View on GitHub</a>
        <a href="projects.html" class="btn outline">Back to Projects</a>
      </div>
    </div>
  `;
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
          <i class="${esc(s.icon)} skill-icon"></i>
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

function loadResume() {
  // Reload data from localStorage to get latest changes
  const currentData = getPortfolioData();

  const container = document.getElementById("resume-cards");
  if (!container) return;
  container.innerHTML = "";

  const resume = currentData.resume || { experience: [], education: [] };
  const expList = Array.isArray(resume.experience) ? resume.experience : [];
  const eduList = Array.isArray(resume.education) ? resume.education : [];

  const hasExp = expList.length > 0;
  const hasEdu = eduList.length > 0;

  if (!hasExp && !hasEdu) {
    container.innerHTML = `
      <div class="card resume-card">
        <div class="body">
          <h3>No resume data yet</h3>
          <p class="muted">Add experience and education in the admin panel to see them here.</p>
        </div>
      </div>`;
    return;
  }

  if (hasExp) {
    container.innerHTML += `<h3 class="resume-section-title">Experience</h3>`;
    expList.forEach(exp => {
      container.innerHTML += `
        <div class="card resume-card">
          <h4>${esc(exp.role)} <span class="company">• ${esc(exp.company)}</span></h4>
          <div class="dates">${esc(exp.years)}</div>
          <p>${esc(exp.description)}</p>
        </div>`;
    });
  }

  if (hasEdu) {
    container.innerHTML += `<h3 class="resume-section-title">Education</h3>`;
    eduList.forEach(ed => {
      container.innerHTML += `
        <div class="card resume-card">
          <h4>${esc(ed.degree)}</h4>
          <div class="company">${esc(ed.school)}</div>
          <div class="dates">${esc(ed.years)}</div>
          <p>${esc(ed.description)}</p>
        </div>`;
    });
  }
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
window.loadResume = loadResume;
window.initContactForm = initContactForm;
