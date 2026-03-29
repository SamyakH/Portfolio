// ================= Data Management =================
function loadData() {
  // Use getPortfolioData from script.js
  return getPortfolioData();
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
function showSection(sectionId, clickedBtn) {
  document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));

  const section = document.getElementById(sectionId);
  if (section) section.classList.add('active');
  if (clickedBtn) clickedBtn.classList.add('active');

  if (sectionId === 'skills') renderSkillsList();
  if (sectionId === 'projects') renderProjectsList();
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
            <i class="${esc(skill.icon)}" style="font-size: 1.5rem; margin-right: 0.5rem;"></i>
            <strong>${esc(skill.name)}</strong> - ${esc(skill.level)}
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
      return skill ? esc(skill.name) : '';
    }).join(', ');
    
       container.innerHTML += `
      <div class="item-card">
        <h4>${esc(project.name)}</h4>
        <p style="color: var(--muted);">${esc(project.description)}</p>
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


// ================= Initialize =================
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear();
  loadPersonalInfo();
  renderTechCheckboxes();
});