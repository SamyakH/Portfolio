// ================= Data =================
// ⚠️ EDIT THIS SECTION WITH YOUR REAL INFORMATION ⚠️
const data = {
  name: "Samyak Jain",  // Your full name
  title: "Web Developer",  // Your job title
  summary: "Highly motivated and detail-oriented web developer with a passion for building responsive and user-friendly applications.",  // Your professional summary
  
  // ⚠️ ADD YOUR SKILLS HERE ⚠️
  // Each skill needs: id, name, icon (from devicon), and level (Advanced/Intermediate/Beginner)
  skills: [
    { id: "s1", name: "Python", icon: "devicon-python-plain colored", level: "Advanced" },
    { id: "s2", name: "SQL", icon: "devicon-azuresqldatabase-plain colored", level: "Intermediate" },
    { id: "s3", name: "MongoDB", icon: "devicon-mongodb-plain colored", level: "Intermediate" },
    { id: "s4", name: "HTML5", icon: "devicon-html5-plain colored", level: "Advanced" },
    { id: "s5", name: "CSS3", icon: "devicon-css3-plain colored", level: "Advanced" },
    { id: "s6", name: "JavaScript", icon: "devicon-javascript-plain colored", level: "Intermediate" },
    { id: "s7", name: "Git", icon: "devicon-git-plain colored", level: "Advanced" },
    { id: "s8", name: "Excel", icon: "devicon-google-plain colored", level: "Advanced" }
  ],
  
  // ⚠️ ADD YOUR PROJECTS HERE ⚠️
  // Each project needs: id, name, description, image, tech (array of skill ids), link, challenge, solution, relatedExperience
  projects: [
    {
      id: "p1",
      name: "Portfolio Website",
      description: "Personal portfolio built with HTML, CSS, and JavaScript.",
      image: "https://placehold.co/800x500",  // Replace with your project screenshot
      tech: ["s4", "s5", "s6"],
      link: "https://github.com/SamR202/Portfolio",
      challenge: "Designing a personal site that looks professional and loads quickly.",
      solution: "Built a lightweight site using vanilla JS and CSS optimizations for speed.",
      relatedExperience: "Applied design principles and frontend performance best practices."
    },
    // ➕ ADD MORE PROJECTS HERE
  ],
  
  resume: {
    experience: [
      { 
        role: "Data Analyst Intern", 
        company: "NoBroker", 
        years: "June 2025 - July 2025", 
        description: "Worked on real datasets related to property trends, cleaning and analyzing data to support business insights. Gained practical experience with SQL, Python, and visualization tools while creating reports and dashboards." 
      }
      // ➕ ADD MORE EXPERIENCE HERE
    ],
    education: [
      { 
        degree: "Master of Science in Computer Science", 
        school: "SRM NCR", 
        years: "Currently Pursuing", 
        description: "" 
      },
      { 
        degree: "Bachelor of Science in Computer Science", 
        school: "Chaudhary Charan Singh University", 
        years: "Graduated 2023", 
        description: "" 
      }
    ]
  }
};

// ================= Theme & Nav =================
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
          bar.style.width = bar.dataset.level + "%";
          observer.unobserve(bar);
        }
      });
    },
    { threshold: 0.4 }
  );
  skillBars.forEach((bar) => observer.observe(bar));
}

// ================= Project Filter =================
function initProjectFilter() {
  const searchInput = document.getElementById("search-input");
  const filterTags = document.querySelectorAll(".filter-tag");
  const clearBtn = document.getElementById("clear-filters");
  const cards = document.querySelectorAll(".project-card");

  if (!cards.length) return;

  function applyFilters() {
    const query = searchInput ? searchInput.value.toLowerCase() : "";
    const activeTags = [...filterTags]
      .filter((t) => t.classList.contains("active"))
      .map((t) => t.dataset.tech);

    cards.forEach((card) => {
      const title = card.querySelector("h3").textContent.toLowerCase();
      const tags = [...card.querySelectorAll(".mini-tag")].map((t) =>
        t.textContent.toLowerCase()
      );
      const matchQuery = !query || title.includes(query);
      const matchTags =
        !activeTags.length || activeTags.every((t) => tags.some((tag) => tag.includes(t)));
      card.style.display = matchQuery && matchTags ? "" : "none";
    });
  }

  if (searchInput) searchInput.addEventListener("input", applyFilters);
  filterTags.forEach((tag) =>
    tag.addEventListener("click", () => {
      tag.classList.toggle("active");
      applyFilters();
    })
  );
  if (clearBtn)
    clearBtn.addEventListener("click", () => {
      filterTags.forEach((t) => t.classList.remove("active"));
      if (searchInput) searchInput.value = "";
      applyFilters();
    });

  applyFilters();
}

// ================= Contact Page Copy Email =================
function initContact() {
  const copyBtn = document.getElementById("copy-email");
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      const email = copyBtn.dataset.email;
      navigator.clipboard.writeText(email).then(() => {
        copyBtn.textContent = "Copied!";
        setTimeout(() => (copyBtn.textContent = "Copy"), 2000);
      });
    });
  }
}

// ================= Init All =================
document.addEventListener("DOMContentLoaded", () => {
  initPageChrome();
  initSkills();
  initProjectFilter();
  initContact();
});


// ================= Home =================
function loadHome() {
  const nameEl = document.getElementById("home-name");
  const titleElId = "home-title";
  const summaryEl = document.getElementById("home-summary");
  if (nameEl) nameEl.textContent = data.name;
  if (summaryEl) summaryEl.textContent = data.summary;
  typeWriter(titleElId, data.title, 60);

  const container = document.getElementById("home-skills");
  if (container) {
    container.innerHTML = "";
    data.skills.slice(0, 5).forEach(s => {
      const tag = document.createElement("a");
      tag.className = "tag";
      tag.href = `projects.html?skill=${s.id}`;
      tag.innerHTML = `<i class="${s.icon}"></i>${s.name}`;
      container.appendChild(tag);
    });
  }

  const featured = document.getElementById("featured-projects");
  if (featured) {
    featured.innerHTML = "";
    data.projects.slice(0, 3).forEach(p => {
      featured.innerHTML += projectCardHTML(p);
    });
  }
}

// ================= Projects Page =================
function initProjectsPage() {
  const list = document.getElementById("projects-list");
  const filters = document.getElementById("tech-filters");
  const search = document.getElementById("search-input");
  const clearBtn = document.getElementById("clear-filters");

  const params = new URLSearchParams(location.search);
  const preSkill = params.get("skill");

  if (filters) {
    filters.innerHTML = "";
    data.skills.forEach(s => {
      const active = preSkill === s.id ? "active" : "";
      filters.innerHTML += `<button class="filter-tag ${active}" data-skill="${s.id}">${s.name}</button>`;
    });
  }

  function render() {
    if (!list) return;
    const term = (search?.value || "").toLowerCase();
    const active = filters ? [...filters.querySelectorAll(".filter-tag.active")].map(b => b.dataset.skill) : [];
    list.innerHTML = "";
    data.projects
      .filter(p =>
        p.name.toLowerCase().includes(term) &&
        (active.length === 0 || active.some(a => p.tech.includes(a)))
      )
      .forEach(p => { list.innerHTML += projectCardHTML(p); });
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
function projectCardHTML(p) {
  const techs = p.tech
    .map(id => {
      const skill = data.skills.find(s => s.id === id);
      return skill
        ? `<span class="mini-tag"><i class="${skill.icon}"></i>${skill.name}</span>`
        : "";
    })
    .join(" ");

  return `
  <a href="project.html?id=${p.id}" class="card project-card" aria-label="Open ${p.name} details">
    <img class="thumb" src="${p.image}" alt="${p.name}" loading="lazy" />
    <div class="body">
      <h3>${p.name}</h3>
      <p>${p.description}</p>
      <div class="tech-tags">${techs}</div>
    </div>
  </a>`;
}

// ================= Project Detail Page =================
function loadProjectDetail() {
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const project = data.projects.find(p => p.id === id);
  const container = document.getElementById("project-detail");

  if (!container) return;

  if (!project) {
    container.innerHTML = `
      <div class="card project-detail-card">
        <div class="body">
          <h2>Project Not Found</h2>
          <p>Sorry, we couldn’t find the project you’re looking for.</p>
          <a href="projects.html" class="btn">Back to Projects</a>
        </div>
      </div>`;
    return;
  }

  const techs = project.tech
    .map(tid => {
      const s = data.skills.find(s => s.id === tid);
      return s ? `<span class="mini-tag"><i class="${s.icon}"></i>${s.name}</span>` : "";
    })
    .join(" ");

  container.innerHTML = `
    <div class="card project-detail-card">
      <img src="${project.image}" alt="${project.name}" class="thumb" />
      <div class="body">
        <h2>${project.name}</h2>
        <p>${project.description}</p>
        <div class="tech-tags">${techs}</div>

        <div class="project-section">
          <h3>Challenge</h3>
          <p>${project.challenge}</p>
        </div>
        <div class="project-section">
          <h3>Solution</h3>
          <p>${project.solution}</p>
        </div>
        <div class="project-section">
          <h3>Related Experience</h3>
          <p>${project.relatedExperience} (<a href="resume.html" target="_blank" rel="noopener">View Resume</a>)</p>
        </div>

        <a href="${project.link}" target="_blank" rel="noopener" class="btn">View on GitHub</a>
        <a href="projects.html" class="btn outline">Back to Projects</a>
      </div>
    </div>
  `;
}
window.loadProjectDetail = loadProjectDetail;

// ================= Skills Page =================
function loadSkills() {
  const list = document.getElementById("skills-list");
  if (!list) return;

  const categories = {
    "Programming": ["s1", "s2", "s6"],
    "Frontend": ["s4", "s5", "s6"],
    "Database": ["s3"],
    "Tools": ["s7", "s8"]
  };

  list.innerHTML = "";

  Object.keys(categories).forEach(cat => {
    const section = document.createElement("section");
    section.className = "skill-section";
    section.innerHTML = `<h2 class="skill-category">${cat}</h2><div class="skill-group"></div>`;
    const group = section.querySelector(".skill-group");

    categories[cat].forEach(id => {
      const s = data.skills.find(x => x.id === id);
      if (!s) return;
      const count = data.projects.filter(p => p.tech.includes(s.id)).length;
      let width = s.level === "Advanced" ? 90 : s.level === "Intermediate" ? 70 : 50;

      group.innerHTML += `
        <a href="projects.html?skill=${s.id}" class="card skill-card" aria-label="View projects with ${s.name}">
          <div class="body">
            <i class="${s.icon} skill-icon"></i>
            <h3>${s.name}</h3>
            <p class="muted">${s.level} • ${count} project${count!==1?'s':''}</p>
            <div class="progress"><div class="progress-bar" style="width:0%" data-width="${width}%"></div></div>
          </div>
        </a>`;
    });

    list.appendChild(section);
  });

  // Animate bars after insertion
  setTimeout(() => {
    document.querySelectorAll(".progress-bar").forEach(bar => {
      bar.style.width = bar.dataset.width;
    });
  }, 150);
}

// ================= Resume =================
function loadResume() {
  const container = document.getElementById("resume-cards");
  if (!container) return;
  container.innerHTML = "";

  container.innerHTML += `<h3 class="resume-section-title">Experience</h3>`;
  data.resume.experience.forEach(exp => {
    container.innerHTML += `
      <div class="card resume-card">
        <h4>${exp.role} <span class="company">• ${exp.company}</span></h4>
        <div class="dates">${exp.years}</div>
        <p>${exp.description}</p>
      </div>`;
  });

  container.innerHTML += `<h3 class="resume-section-title">Education</h3>`;
  data.resume.education.forEach(ed => {
    container.innerHTML += `
      <div class="card resume-card">
        <h4>${ed.degree}</h4>
        <div class="company">${ed.school}</div>
        <div class="dates">${ed.years}</div>
        <p>${ed.description}</p>
      </div>`;
  });
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
        copyBtn.textContent = "Copied!";
        setTimeout(() => (copyBtn.textContent = "Copy"), 1500);
      });
    });
  }
}

// ================= Helpers =================
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
