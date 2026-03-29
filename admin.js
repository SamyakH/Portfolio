// ================= Default Data =================
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
    { id: "s8", name: "Excel", icon: "devicon-google-plain colored", level: "Advanced" }
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

// ================= Data Management =================
function loadData() {
  const saved = localStorage.getItem('portfolioData');
  if (saved) {
    return JSON.parse(saved);
  }
  return JSON.parse(JSON.stringify(defaultData));
}

function saveData(data) {
  localStorage.setItem('portfolioData', JSON.stringify(data));
  showSaveIndicator();
}

function showSaveIndicator() {
  const indicator = document.getElementById('saveIndicator');
  indicator.classList.add('show');
  setTimeout(() => indicator.classList.remove('show'), 2000);
}

function exportData() {
  const data = loadData();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'portfolio-data.json';
  a.click();
  URL.revokeObjectURL(url);
}

function resetData() {
  if (confirm('Are you sure you want to reset all data to default? This cannot be undone!')) {
    localStorage.removeItem('portfolioData');
    location.reload();
  }
}

// ================= Section Navigation =================
function showSection(sectionId) {
  document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
  
  document.getElementById(sectionId).classList.add('active');
  event.target.classList.add('active');
  
  if (sectionId === 'skills') renderSkillsList();
  if (sectionId === 'projects') renderProjectsList();
  if (sectionId === 'experience') renderExperienceList();
  if (sectionId === 'education') renderEducationList();
}

// ================= Personal Info =================
function loadPersonalInfo() {
  const data = loadData();
  document.getElementById('editName').value = data.name;
  document.getElementById('editTitle').value = data.title;
  document.getElementById('editSummary').value = data.summary;
}

function savePersonalInfo() {
  const data = loadData();
  data.name = document.getElementById('editName').value;
  data.title = document.getElementById('editTitle').value;
  data.summary = document.getElementById('editSummary').value;
  saveData(data);
}

// ================= Skills Management =================
function renderSkillsList() {
  const data = loadData();
  const container = document.getElementById('skillsList');
  container.innerHTML = '<h4 style="margin: 2rem 0 1rem; color: var(--accent);"><i class="fas fa-list"></i> Current Skills</h4>';
  
  data.skills.forEach(skill => {
    container.innerHTML += `
      <div class="item-card">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <i class="${skill.icon}" style="font-size: 1.5rem; margin-right: 0.5rem;"></i>
            <strong>${skill.name}</strong> - ${skill.level}
          </div>
          <div class="item-actions">
            <button class="btn small" onclick="editSkill('${skill.id}')">
              <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-danger small" onclick="deleteSkill('${skill.id}')">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  });
}

function addSkill() {
  const data = loadData();
  const name = document.getElementById('newSkillName').value.trim();
  const level = document.getElementById('newSkillLevel').value;
  const icon = document.getElementById('newSkillIcon').value.trim();
  
  if (!name || !icon) {
    alert('Please fill in all fields');
    return;
  }
  
  const newId = 's' + (data.skills.length + 1) + '_' + Date.now();
  data.skills.push({ id: newId, name, icon, level });
  saveData(data);
  
  document.getElementById('newSkillName').value = '';
  document.getElementById('newSkillIcon').value = '';
  renderSkillsList();
}

function editSkill(id) {
  const data = loadData();
  const skill = data.skills.find(s => s.id === id);
  if (!skill) return;
  
  const newName = prompt('Skill Name:', skill.name);
  if (newName === null) return;
  
  const newLevel = prompt('Level (Advanced/Intermediate/Beginner):', skill.level);
  if (newLevel === null) return;
  
  const newIcon = prompt('Icon Class:', skill.icon);
  if (newIcon === null) return;
  
  skill.name = newName;
  skill.level = newLevel;
  skill.icon = newIcon;
  saveData(data);
  renderSkillsList();
}

function deleteSkill(id) {
  if (!confirm('Delete this skill?')) return;
  const data = loadData();
  data.skills = data.skills.filter(s => s.id !== id);
  saveData(data);
  renderSkillsList();
}

// ================= Projects Management =================
function renderTechCheckboxes() {
  const data = loadData();
  const container = document.getElementById('techCheckboxes');
  container.innerHTML = '';
  
  data.skills.forEach(skill => {
    container.innerHTML += `
      <label class="tech-checkbox" id="tech_${skill.id}">
        <input type="checkbox" value="${skill.id}" onchange="toggleTechCheckbox(this)">
        <i class="${skill.icon}"></i> ${skill.name}
      </label>
    `;
  });
}

function toggleTechCheckbox(checkbox) {
  const label = checkbox.parentElement;
  label.classList.toggle('selected', checkbox.checked);
}

function renderProjectsList() {
  const data = loadData();
  const container = document.getElementById('projectsList');
  container.innerHTML = '<h4 style="margin: 2rem 0 1rem; color: var(--accent);"><i class="fas fa-list"></i> Current Projects</h4>';
  
  data.projects.forEach(project => {
    const techNames = project.tech.map(tid => {
      const skill = data.skills.find(s => s.id === tid);
      return skill ? skill.name : '';
    }).join(', ');
    
    container.innerHTML += `
      <div class="item-card">
        <h4>${project.name}</h4>
        <p style="color: var(--muted);">${project.description}</p>
        <p><strong>Technologies:</strong> ${techNames || 'None'}</p>
        <div class="item-actions">
          <button class="btn small" onclick="editProject('${project.id}')">
            <i class="fas fa-edit"></i> Edit
          </button>
          <button class="btn btn-danger small" onclick="deleteProject('${project.id}')">
            <i class="fas fa-trash"></i> Delete
          </button>
        </div>
      </div>
    `;
  });
  
  renderTechCheckboxes();
}

function addProject() {
  const data = loadData();
  const name = document.getElementById('newProjectName').value.trim();
  const link = document.getElementById('newProjectLink').value.trim();
  const desc = document.getElementById('newProjectDesc').value.trim();
  const image = document.getElementById('newProjectImage').value.trim() || 'https://placehold.co/800x500';
  const challenge = document.getElementById('newProjectChallenge').value.trim();
  const solution = document.getElementById('newProjectSolution').value.trim();
  
  const selectedTech = [...document.querySelectorAll('#techCheckboxes input:checked')].map(cb => cb.value);
  
  if (!name || !desc) {
    alert('Please fill in project name and description');
    return;
  }
  
  const newId = 'p' + (data.projects.length + 1) + '_' + Date.now();
  data.projects.push({
    id: newId,
    name,
    description: desc,
    image,
    tech: selectedTech,
    link: link || '#',
    challenge: challenge || 'N/A',
    solution: solution || 'N/A',
    relatedExperience: ''
  });
  saveData(data);
  
  document.getElementById('newProjectName').value = '';
  document.getElementById('newProjectLink').value = '';
  document.getElementById('newProjectDesc').value = '';
  document.getElementById('newProjectImage').value = '';
  document.getElementById('newProjectChallenge').value = '';
  document.getElementById('newProjectSolution').value = '';
  document.querySelectorAll('#techCheckboxes input').forEach(cb => {
    cb.checked = false;
    cb.parentElement.classList.remove('selected');
  });
  
  renderProjectsList();
}

function editProject(id) {
  const data = loadData();
  const project = data.projects.find(p => p.id === id);
  if (!project) return;
  
  const newName = prompt('Project Name:', project.name);
  if (newName === null) return;
  
  const newDesc = prompt('Description:', project.description);
  if (newDesc === null) return;
  
  const newLink = prompt('GitHub Link:', project.link);
  if (newLink === null) return;
  
  project.name = newName;
  project.description = newDesc;
  project.link = newLink;
  saveData(data);
  renderProjectsList();
}

function deleteProject(id) {
  if (!confirm('Delete this project?')) return;
  const data = loadData();
  data.projects = data.projects.filter(p => p.id !== id);
  saveData(data);
  renderProjectsList();
}

// ================= Experience Management =================
function renderExperienceList() {
  const data = loadData();
  const container = document.getElementById('experienceList');
  container.innerHTML = '<h4 style="margin: 2rem 0 1rem; color: var(--accent);"><i class="fas fa-list"></i> Current Experience</h4>';
  
  data.resume.experience.forEach(exp => {
    container.innerHTML += `
      <div class="item-card">
        <h4>${exp.role} at ${exp.company}</h4>
        <p style="color: var(--muted);">${exp.years}</p>
        <p>${exp.description}</p>
        <div class="item-actions">
          <button class="btn small" onclick="editExperience('${exp.id}')">
            <i class="fas fa-edit"></i> Edit
          </button>
          <button class="btn btn-danger small" onclick="deleteExperience('${exp.id}')">
            <i class="fas fa-trash"></i> Delete
          </button>
        </div>
      </div>
    `;
  });
}

function addExperience() {
  const data = loadData();
  const role = document.getElementById('newExpRole').value.trim();
  const company = document.getElementById('newExpCompany').value.trim();
  const years = document.getElementById('newExpYears').value.trim();
  const desc = document.getElementById('newExpDesc').value.trim();
  
  if (!role || !company) {
    alert('Please fill in role and company');
    return;
  }
  
  const newId = 'e' + (data.resume.experience.length + 1) + '_' + Date.now();
  data.resume.experience.push({
    id: newId,
    role,
    company,
    years: years || 'N/A',
    description: desc || ''
  });
  saveData(data);
  
  document.getElementById('newExpRole').value = '';
  document.getElementById('newExpCompany').value = '';
  document.getElementById('newExpYears').value = '';
  document.getElementById('newExpDesc').value = '';
  
  renderExperienceList();
}

function editExperience(id) {
  const data = loadData();
  const exp = data.resume.experience.find(e => e.id === id);
  if (!exp) return;
  
  const newRole = prompt('Job Role:', exp.role);
  if (newRole === null) return;
  
  const newCompany = prompt('Company:', exp.company);
  if (newCompany === null) return;
  
  const newYears = prompt('Duration:', exp.years);
  if (newYears === null) return;
  
  const newDesc = prompt('Description:', exp.description);
  if (newDesc === null) return;
  
  exp.role = newRole;
  exp.company = newCompany;
  exp.years = newYears;
  exp.description = newDesc;
  saveData(data);
  renderExperienceList();
}

function deleteExperience(id) {
  if (!confirm('Delete this experience?')) return;
  const data = loadData();
  data.resume.experience = data.resume.experience.filter(e => e.id !== id);
  saveData(data);
  renderExperienceList();
}

// ================= Education Management =================
function renderEducationList() {
  const data = loadData();
  const container = document.getElementById('educationList');
  container.innerHTML = '<h4 style="margin: 2rem 0 1rem; color: var(--accent);"><i class="fas fa-list"></i> Current Education</h4>';
  
  data.resume.education.forEach(edu => {
    container.innerHTML += `
      <div class="item-card">
        <h4>${edu.degree}</h4>
        <p><strong>${edu.school}</strong> - ${edu.years}</p>
        ${edu.description ? `<p>${edu.description}</p>` : ''}
        <div class="item-actions">
          <button class="btn small" onclick="editEducation('${edu.id}')">
            <i class="fas fa-edit"></i> Edit
          </button>
          <button class="btn btn-danger small" onclick="deleteEducation('${edu.id}')">
            <i class="fas fa-trash"></i> Delete
          </button>
        </div>
      </div>
    `;
  });
}

function addEducation() {
  const data = loadData();
  const degree = document.getElementById('newEduDegree').value.trim();
  const school = document.getElementById('newEduSchool').value.trim();
  const years = document.getElementById('newEduYears').value.trim();
  const desc = document.getElementById('newEduDesc').value.trim();
  
  if (!degree || !school) {
    alert('Please fill in degree and school');
    return;
  }
  
  const newId = 'ed' + (data.resume.education.length + 1) + '_' + Date.now();
  data.resume.education.push({
    id: newId,
    degree,
    school,
    years: years || 'N/A',
    description: desc || ''
  });
  saveData(data);
  
  document.getElementById('newEduDegree').value = '';
  document.getElementById('newEduSchool').value = '';
  document.getElementById('newEduYears').value = '';
  document.getElementById('newEduDesc').value = '';
  
  renderEducationList();
}

function editEducation(id) {
  const data = loadData();
  const edu = data.resume.education.find(e => e.id === id);
  if (!edu) return;
  
  const newDegree = prompt('Degree:', edu.degree);
  if (newDegree === null) return;
  
  const newSchool = prompt('School:', edu.school);
  if (newSchool === null) return;
  
  const newYears = prompt('Year:', edu.years);
  if (newYears === null) return;
  
  edu.degree = newDegree;
  edu.school = newSchool;
  edu.years = newYears;
  saveData(data);
  renderEducationList();
}

function deleteEducation(id) {
  if (!confirm('Delete this education?')) return;
  const data = loadData();
  data.resume.education = data.resume.education.filter(e => e.id !== id);
  saveData(data);
  renderEducationList();
}

// ================= Initialize =================
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear();
  loadPersonalInfo();
  renderTechCheckboxes();
});