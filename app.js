// Standalone local database & script logic for SEDES-DF Simulado App

// --- PRELOADED CROWD SOURCED QUESTIONS ---
const PRELOADED_QUESTIONS = [
  {
    id: "q_pre_1",
    text: "Com base na Lei Orgânica da Assistência Social (LOAS) - Lei nº 8.742/1993, a assistência social é direito do cidadão e dever do Estado, sendo uma política de seguridade social não contributiva, que provê os mínimos sociais, canalizada por meio de um conjunto integrado de ações de iniciativa pública e da sociedade, para garantir o atendimento às necessidades básicas.",
    type: "certo_errado",
    options: [
      { letter: "C", text: "Certo" },
      { letter: "E", text: "Errado" }
    ],
    correctAnswer: "C",
    explanation: "Conforme o Artigo 1º da Lei nº 8.742/1993 (LOAS). A Assistência Social faz parte da Seguridade Social junto com a Saúde e a Previdência, porém se diferencia desta última por ser não contributiva.",
    subject: "Lei Orgânica da Assistência Social (LOAS)",
    source: "SEDES-DF 2019 IBRAE",
    year: 2019
  },
  {
    id: "q_pre_2",
    text: "De acordo com a LOAS, o Benefício de Prestação Continuada (BPC) consiste na garantia de um salário-mínimo mensal à pessoa com deficiência e ao idoso com idade de:",
    type: "multiple_choice",
    options: [
      { letter: "A", text: "60 (sessenta) anos ou mais que comprovem não possuir meios de prover a própria manutenção." },
      { letter: "B", text: "62 (sessenta e dois) anos ou mais para mulheres e 65 para homens." },
      { letter: "C", text: "65 (sessenta e cinco) anos ou mais que comprovem não possuir meios de prover a própria manutenção." },
      { letter: "D", text: "70 (setenta) anos ou mais, independentemente de comprovação de renda." },
      { letter: "E", text: "Qualquer idade, desde que comprove renda familiar per capita inferior a 1 salário mínimo." }
    ],
    correctAnswer: "C",
    explanation: "O BPC (Art. 20 da LOAS) assegura um salário-mínimo mensal para idosos com 65 anos ou mais e pessoas com deficiência física ou mental que comprovem não possuir meios de prover a própria subsistência ou de tê-la provida por sua família.",
    subject: "Lei Orgânica da Assistência Social (LOAS)",
    source: "SEDES-DF 2019 IBRAE",
    year: 2019
  },
  {
    id: "q_pre_3",
    text: "O Centro de Referência de Assistência Social (CRAS) é a unidade pública estatal de referência territorial para a prestação de serviços de assistência social básica, enquanto o CREAS é voltado para média e alta complexidade.",
    type: "certo_errado",
    options: [
      { letter: "C", text: "Certo" },
      { letter: "E", text: "Errado" }
    ],
    correctAnswer: "C",
    explanation: "Exato! O CRAS atua na Proteção Social Básica (prevenção), ao passo que o CREAS (Centro de Referência Especializado de Assistência Social) atende famílias e indivíduos em situação de risco pessoal ou social por violação de direitos (Proteção Especial).",
    subject: "Assistência Social - Geral",
    source: "SEDES-DF 2019 IBRAE",
    year: 2019
  },
  {
    id: "q_pre_4",
    text: "A Norma Operacional Básica do Sistema Único de Assistência Social (NOB/SUAS) organiza a proteção social em:",
    type: "multiple_choice",
    options: [
      { letter: "A", text: "Proteção Social Alternativa e Proteção Social Definitiva." },
      { letter: "B", text: "Proteção Social Básica e Proteção Social Especial (de Média e Alta Complexidade)." },
      { letter: "C", text: "Atenção Primária de Saúde e Proteção Previdenciária." },
      { letter: "D", text: "Proteção Familiar Singular e Acolhimento Institucional Geral." },
      { letter: "E", text: "Seguro-Desemprego, BPC e Previdência Social Complementar." }
    ],
    correctAnswer: "B",
    explanation: "A NOB/SUAS e a própria Lei Orgânica dividem a Assistência Social em Proteção Social Básica (CRAS) e Proteção Social Especial (CREAS), sendo a especial subdividida em média e alta complexidade.",
    subject: "Assistência Social - Geral",
    source: "SEDES-DF 2019 IBRAE",
    year: 2019
  },
  {
    id: "q_pre_5",
    text: "A respeito dos direitos expressos na Lei Orgânica do Distrito Federal (LODF), a assistência social será prestada a quem dela necessitar, independentemente de contribuição à seguridade social.",
    type: "certo_errado",
    options: [
      { letter: "C", text: "Certo" },
      { letter: "E", text: "Errado" }
    ],
    correctAnswer: "C",
    explanation: "Perfeito! A LODF replica a diretriz nacional constitucional de que a assistência social é concedida de forma não contributiva a qualquer cidadão que necessite.",
    subject: "Lei Orgânica do DF (LODF)",
    source: "SEDES-DF 2019 IBRAE",
    year: 2019
  },
  {
    id: "q_pre_6",
    text: "Constituem objetivos da assistência social, exceto:",
    type: "multiple_choice",
    options: [
      { letter: "A", text: "A proteção à família, à maternidade, à infância, à adolescência e à velhice." },
      { letter: "B", text: "O amparo às crianças e aos adolescentes carentes." },
      { letter: "C", text: "A promoção da integração ao mercado de trabalho." },
      { letter: "D", text: "A garantia de pensão vitalícia integral de aposentadoria para todo trabalhador informal." },
      { letter: "E", text: "A habilitação e reabilitação das pessoas com deficiência e a promoção de sua integração à vida comunitária." }
    ],
    correctAnswer: "D",
    explanation: "A garantia de aposentadoria ou pensões vitalícias integrais para todos os trabalhadores é matéria de Previdência Social (contributiva) ou regras fiscais específicas, e não faz parte dos objetivos de assistência social listados na LOAS.",
    subject: "Lei Orgânica da Assistência Social (LOAS)",
    source: "SEDES-DF 2019 IBRAE",
    year: 2019
  },
  {
    id: "q_pre_7",
    text: "Segundo a LOAS, a organização da assistência social tem como base diretrizes como a descentralização político-administrativa para os Estados, o Distrito Federal e os Municípios.",
    type: "certo_errado",
    options: [
      { letter: "C", text: "Certo" },
      { letter: "E", text: "Errado" }
    ],
    correctAnswer: "C",
    explanation: "Correto. As diretrizes constitucionais e da LOAS incluem a Descentralização Político-Administrativa e a Participação da População na formulação e controle das políticas.",
    subject: "Lei Orgânica da Assistência Social (LOAS)",
    source: "SEDES-DF 2019 IBRAE",
    year: 2019
  }
];

// --- LOCAL STORAGE DATABASE MANAGER ---
const db = {
  getQuestions: () => {
    const list = localStorage.getItem('sedes_questions');
    if (!list) {
      localStorage.setItem('sedes_questions', JSON.stringify(PRELOADED_QUESTIONS));
      return PRELOADED_QUESTIONS;
    }
    return JSON.parse(list);
  },

  saveQuestion: (q) => {
    const list = db.getQuestions();
    if (!q.id) {
      q.id = 'q_' + Math.random().toString(36).substr(2, 9);
      q.createdAt = new Date().toISOString();
      list.push(q);
    } else {
      const idx = list.findIndex(item => item.id === q.id);
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...q, updatedAt: new Date().toISOString() };
      } else {
        q.createdAt = new Date().toISOString();
        list.push(q);
      }
    }
    localStorage.setItem('sedes_questions', JSON.stringify(list));
    return q;
  },

  deleteQuestion: (id) => {
    const list = db.getQuestions();
    const filtered = list.filter(item => item.id !== id);
    localStorage.setItem('sedes_questions', JSON.stringify(filtered));
    return true;
  },

  importQuestions: (newArr) => {
    const list = db.getQuestions();
    let imported = 0;
    newArr.forEach(q => {
      const exists = list.some(item => item.text.trim() === q.text.trim());
      if (!exists) {
        q.id = 'q_' + Math.random().toString(36).substr(2, 9);
        q.createdAt = new Date().toISOString();
        list.push(q);
        imported++;
      }
    });
    localStorage.setItem('sedes_questions', JSON.stringify(list));
    return imported;
  },

  getSimulados: () => {
    const list = localStorage.getItem('sedes_simulados');
    return list ? JSON.parse(list) : [];
  },

  saveSimulado: (s) => {
    const list = db.getSimulados();
    s.id = 's_' + Math.random().toString(36).substr(2, 9);
    s.date = new Date().toISOString();
    list.push(s);
    localStorage.setItem('sedes_simulados', JSON.stringify(list));
    return s;
  },

  deleteSimulado: (id) => {
    const list = db.getSimulados();
    const filtered = list.filter(item => item.id !== id);
    localStorage.setItem('sedes_simulados', JSON.stringify(filtered));
    return true;
  }
};

// --- APP STATE ---
const state = {
  activeTab: 'dashboard',
  theme: 'dark',
  questions: [],
  simulados: [],
  selectedFile: null,
  rawText: '',
  extractedQuestions: [],
  
  // Active test taking
  activeTest: null, // { questions, currentIdx, answers: {}, flagged: {}, time: 0, timerActive: false, intervalId: null }
};

// Initialize State
state.questions = db.getQuestions();
state.simulados = db.getSimulados();

// --- ROUTING / VIEW SWITCHER ---
function setTab(tabName) {
  // Check lock permission for administrative tabs
  const restricted = ['downloader', 'parser', 'bank'];
  if (restricted.includes(tabName) && state.userRole !== 'admin') {
    promptAdminUnlock(tabName);
    return;
  }

  state.activeTab = tabName;
  
  // Pause any running test timers if navigating away from simulator
  if (tabName !== 'simulator' && state.activeTest && state.activeTest.timerActive) {
    pauseTimer();
  }

  // Update navigation visual highlight
  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.remove('active');
  });
  const activeEl = document.querySelector(`.nav-item[data-tab="${tabName}"]`);
  if (activeEl) activeEl.classList.add('active');

  // Render view
  renderView();
}

// --- PERMISSIONS, ACCESS PROTECTION & SECURITY ---
function initLoginCheck() {
  const hash = localStorage.getItem('admin_password_hash');
  const overlay = document.getElementById('login-overlay');
  overlay.style.display = 'flex';
  
  // Reset fields
  document.getElementById('setup-password-input').value = '';
  document.getElementById('setup-confirm-input').value = '';
  document.getElementById('login-password-input').value = '';
  document.getElementById('login-error-msg').style.display = 'none';
  document.getElementById('login-password-prompt').style.display = 'none';
  
  if (!hash) {
    // Show Setup Admin Password
    document.getElementById('login-title').innerText = 'Cadastrar Administrador';
    document.getElementById('login-subtitle').innerText = 'Crie uma senha para proteger o banco de questões contra edições de terceiros';
    document.getElementById('login-role-selection').style.display = 'none';
    document.getElementById('login-setup-fields').style.display = 'flex';
  } else {
    // Show default Role Selection
    document.getElementById('login-title').innerText = 'Acesso ao Simulado';
    document.getElementById('login-subtitle').innerText = 'Selecione seu perfil de acesso';
    document.getElementById('login-role-selection').style.display = 'flex';
    document.getElementById('login-setup-fields').style.display = 'none';
  }
}

function hashPassword(pwd) {
  let hash = 5381;
  for (let i = 0; i < pwd.length; i++) {
    hash = (hash * 33) ^ pwd.charCodeAt(i);
  }
  return (hash >>> 0).toString(16);
}

function setupAdminPassword() {
  const pwd = document.getElementById('setup-password-input').value;
  const confirmPwd = document.getElementById('setup-confirm-input').value;
  const errMsg = document.getElementById('login-error-msg');
  
  if (!pwd) {
    errMsg.innerText = 'A senha não pode ser vazia.';
    errMsg.style.display = 'block';
    return;
  }
  
  if (pwd !== confirmPwd) {
    errMsg.innerText = 'As senhas não coincidem.';
    errMsg.style.display = 'block';
    return;
  }
  
  const hash = hashPassword(pwd);
  localStorage.setItem('admin_password_hash', hash);
  
  // Set role to admin and enter
  state.userRole = 'admin';
  document.getElementById('login-overlay').style.display = 'none';
  updateSidebarLocks();
  setTab('dashboard');
}

function selectRole(role) {
  if (role === 'candidato') {
    state.userRole = 'candidato';
    document.getElementById('login-overlay').style.display = 'none';
    updateSidebarLocks();
    setTab('dashboard');
  }
}

function showAdminPasswordPrompt() {
  document.getElementById('login-role-selection').style.display = 'none';
  document.getElementById('login-password-prompt').style.display = 'flex';
  document.getElementById('login-error-msg').style.display = 'none';
  setTimeout(() => {
    const input = document.getElementById('login-password-input');
    if (input) input.focus();
  }, 100);
}

function cancelAdminLogin() {
  document.getElementById('login-password-prompt').style.display = 'none';
  document.getElementById('login-role-selection').style.display = 'flex';
  document.getElementById('login-error-msg').style.display = 'none';
}

function loginAsAdmin() {
  const pwd = document.getElementById('login-password-input').value;
  const hash = hashPassword(pwd);
  const storedHash = localStorage.getItem('admin_password_hash');
  const errMsg = document.getElementById('login-error-msg');
  
  if (hash === storedHash) {
    state.userRole = 'admin';
    document.getElementById('login-overlay').style.display = 'none';
    updateSidebarLocks();
    setTab('dashboard');
  } else {
    errMsg.innerText = 'Senha incorreta. Acesso negado.';
    errMsg.style.display = 'block';
  }
}

function logoutSession() {
  // Pause any running test timers
  if (state.activeTest && state.activeTest.timerActive) {
    pauseTimer();
  }
  state.userRole = null;
  state.activeTest = null;
  state.activeTab = 'dashboard';
  
  initLoginCheck();
}

function promptAdminUnlock(targetTab) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay animate-fade';
  overlay.id = 'admin-unlock-modal';
  overlay.innerHTML = `
    <div class="modal-content animate-scale" style="width: 100%; max-width: 400px; text-align: center; border: 1px solid rgba(255, 255, 255, 0.15); background: var(--bg-sidebar); padding: 32px; border-radius: var(--radius-lg);">
      <span style="font-size: 3rem; display: block; margin-bottom: 16px;">🔑</span>
      <h3 style="font-size: 1.3rem; margin-bottom: 8px; font-family: var(--font-display); color: var(--color-text-primary);">Modo Administrador</h3>
      <p style="color: var(--color-text-secondary); font-size: 0.85rem; margin-bottom: 24px;">Esta funcionalidade (<b>${getTabFriendlyName(targetTab)}</b>) é restrita. Digite a senha administrativa para desbloquear.</p>
      
      <div class="form-group" style="text-align: left; margin-bottom: 20px;">
        <label class="form-label">Senha do Administrador</label>
        <input type="password" id="unlock-password-input" class="form-input" placeholder="Digite a senha..." onkeydown="if(event.key==='Enter') verifyUnlockPassword('${targetTab}')" />
      </div>
      
      <div style="display: flex; gap: 12px;">
        <button class="btn btn-secondary" onclick="closeUnlockModal()" style="flex-grow: 1; padding: 10px;">Cancelar</button>
        <button class="btn btn-primary" onclick="verifyUnlockPassword('${targetTab}')" style="flex-grow: 1; padding: 10px;">Desbloquear</button>
      </div>
      
      <p id="unlock-error-msg" style="color: var(--color-danger); font-size: 0.8rem; display: none; margin-top: 12px; font-weight: 600;"></p>
    </div>
  `;
  document.body.appendChild(overlay);
  setTimeout(() => {
    const input = document.getElementById('unlock-password-input');
    if (input) input.focus();
  }, 100);
}

function getTabFriendlyName(tab) {
  switch(tab) {
    case 'downloader': return 'Baixar Provas';
    case 'parser': return 'Varrer PDF';
    case 'bank': return 'Banco de Questões';
    default: return 'Área Administrativa';
  }
}

function closeUnlockModal() {
  const modal = document.getElementById('admin-unlock-modal');
  if (modal) modal.remove();
}

function verifyUnlockPassword(targetTab) {
  const pwd = document.getElementById('unlock-password-input').value;
  const hash = hashPassword(pwd);
  const storedHash = localStorage.getItem('admin_password_hash');
  
  if (hash === storedHash) {
    state.userRole = 'admin';
    closeUnlockModal();
    updateSidebarLocks();
    setTab(targetTab);
  } else {
    const errMsg = document.getElementById('unlock-error-msg');
    errMsg.innerText = 'Senha incorreta. Acesso negado.';
    errMsg.style.display = 'block';
  }
}

function updateSidebarLocks() {
  const restrictedTabs = ['downloader', 'parser', 'bank'];
  restrictedTabs.forEach(tab => {
    const navEl = document.querySelector(`.nav-item[data-tab="${tab}"]`);
    if (navEl) {
      let label = '';
      if (tab === 'downloader') label = '<span>📥</span> Baixar Provas';
      else if (tab === 'parser') label = '<span>⚡</span> Varrer PDF';
      else if (tab === 'bank') label = '<span>📚</span> Banco de Questões';
      
      if (state.userRole === 'admin') {
        navEl.innerHTML = label;
      } else {
        navEl.innerHTML = `${label} <span style="margin-left: auto; font-size: 0.8rem; opacity: 0.6;">🔒</span>`;
      }
    }
  });
}

function initTheme() {
  const localTheme = localStorage.getItem('sedes_theme') || 'dark';
  state.theme = localTheme;
  if (localTheme === 'light') {
    document.body.classList.add('light-theme');
    document.getElementById('theme-btn-text').innerText = '🌙 Modo Escuro';
  } else {
    document.body.classList.remove('light-theme');
    document.getElementById('theme-btn-text').innerText = '☀️ Modo Claro';
  }
}

function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('sedes_theme', state.theme);
  initTheme();
}

// --- RENDERING VIEWS ENGINE ---
function renderView() {
  const viewport = document.getElementById('main-viewport');
  viewport.innerHTML = ''; // Clear

  // Re-fetch database data to keep sync
  state.questions = db.getQuestions();
  state.simulados = db.getSimulados();

  switch (state.activeTab) {
    case 'dashboard':
      renderDashboard(viewport);
      break;
    case 'downloader':
      renderDownloader(viewport);
      break;
    case 'parser':
      renderParser(viewport);
      break;
    case 'bank':
      renderQuestionBank(viewport);
      break;
    case 'simulator':
      renderSimulator(viewport);
      break;
    case 'help':
      renderHelp(viewport);
      break;
  }
}

// --- VIEW 1: DASHBOARD ---
function renderDashboard(container) {
  // Process Stats
  const totalQ = state.questions.length;
  const totalS = state.simulados.length;
  let avgScore = 0;
  let rate = 0;

  if (totalS > 0) {
    const totalCorrect = state.simulados.reduce((acc, curr) => acc + curr.correctCount, 0);
    const totalTestQ = state.simulados.reduce((acc, curr) => acc + curr.questionsCount, 0);
    rate = totalTestQ > 0 ? ((totalCorrect / totalTestQ) * 100).toFixed(1) : 0;
    avgScore = (state.simulados.reduce((acc, curr) => acc + curr.percentage, 0) / totalS).toFixed(1);
  }

  const recentHistory = [...state.simulados].reverse().slice(0, 5);

  container.innerHTML = `
    <div class="animate-fade">
      <div class="page-header">
        <h1 class="page-title">Painel do Candidato</h1>
        <p class="page-subtitle">Monitore sua preparação para o concurso da SEDES-DF</p>
      </div>

      <!-- Stats Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 24px; margin-bottom: 40px;">
        <div class="card" style="display: flex; align-items: center; gap: 20px;">
          <div style="font-size: 2.5rem; background: rgba(139, 92, 246, 0.1); padding: 16px; border-radius: 16px;">📚</div>
          <div>
            <h4 style="color: var(--color-text-secondary); font-size: 0.85rem; text-transform: uppercase;">Banco de Questões</h4>
            <h2 style="font-size: 1.8rem; margin-top: 4px;">${totalQ}</h2>
          </div>
        </div>

        <div class="card" style="display: flex; align-items: center; gap: 20px;">
          <div style="font-size: 2.5rem; background: rgba(99, 102, 241, 0.1); padding: 16px; border-radius: 16px;">🏆</div>
          <div>
            <h4 style="color: var(--color-text-secondary); font-size: 0.85rem; text-transform: uppercase;">Simulados Feitos</h4>
            <h2 style="font-size: 1.8rem; margin-top: 4px;">${totalS}</h2>
          </div>
        </div>

        <div class="card" style="display: flex; align-items: center; gap: 20px;">
          <div style="font-size: 2.5rem; background: rgba(16, 185, 129, 0.1); padding: 16px; border-radius: 16px;">📈</div>
          <div>
            <h4 style="color: var(--color-text-secondary); font-size: 0.85rem; text-transform: uppercase;">Média de Acertos</h4>
            <h2 style="font-size: 1.8rem; margin-top: 4px;">${avgScore}%</h2>
          </div>
        </div>

        <div class="card" style="display: flex; align-items: center; gap: 20px;">
          <div style="font-size: 2.5rem; background: rgba(245, 158, 11, 0.1); padding: 16px; border-radius: 16px;">🎯</div>
          <div>
            <h4 style="color: var(--color-text-secondary); font-size: 0.85rem; text-transform: uppercase;">Aproveitamento</h4>
            <h2 style="font-size: 1.8rem; margin-top: 4px;">${rate}%</h2>
          </div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 2fr 1.2fr; gap: 32px; align-items: start;">
        <!-- Left Side: Performance Chart & History -->
        <div style="display: flex; flex-direction: column; gap: 32px;">
          
          <!-- Chart -->
          <div class="card">
            <h3 style="font-size: 1.2rem; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
              📊 Histórico Recente de Notas
            </h3>
            ${totalS > 0 ? `
              <div style="position: relative; height: 180px; display: flex; align-items: flex-end; gap: 20px; padding: 20px 10px 0;">
                ${state.simulados.slice(-8).map(sim => {
                  let colorClass = sim.percentage >= 70 ? 'var(--color-success)' : sim.percentage >= 50 ? 'var(--color-warning)' : 'var(--color-danger)';
                  return `
                    <div style="flex-grow: 1; display: flex; flex-direction: column; align-items: center; height: 100%;">
                      <div style="color: ${colorClass}; font-size: 0.8rem; font-weight: bold; margin-bottom: 8px;">
                        ${sim.percentage}%
                      </div>
                      <div style="width: 32px; height: ${sim.percentage}%; background: var(--grad-hero); border-radius: 8px 8px 0 0; box-shadow: 0 4px 10px rgba(139, 92, 246, 0.25);"></div>
                      <div style="font-size: 0.75rem; color: var(--color-text-muted); margin-top: 8px;">
                        ${new Date(sim.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            ` : `
              <div style="height: 180px; display: flex; align-items: center; justify-content: center; color: var(--color-text-muted); border: 2px dashed var(--border-light); border-radius: 12px;">
                Nenhum simulado feito ainda. Os resultados dos seus testes aparecerão aqui!
              </div>
            `}
          </div>

          <!-- History Table -->
          <div class="card">
            <h3 style="font-size: 1.2rem; margin-bottom: 20px;">📝 Lista de Tentativas</h3>
            ${totalS > 0 ? `
              <div style="overflow-x: auto;">
                <table>
                  <thead>
                    <tr style="border-bottom: 1px solid var(--border-light); color: var(--color-text-secondary);">
                      <th>Data</th>
                      <th>Questões</th>
                      <th>Acertos</th>
                      <th>Nota</th>
                      <th>Tempo</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${recentHistory.map(sim => `
                      <tr>
                        <td>${new Date(sim.date).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}</td>
                        <td>${sim.questionsCount}</td>
                        <td>
                          <span style="color: var(--color-success); font-weight: bold;">${sim.correctCount}</span> / <span style="color: var(--color-danger);">${sim.incorrectCount}</span>
                        </td>
                        <td>
                          <span class="badge ${sim.percentage >= 70 ? 'badge-success' : sim.percentage >= 50 ? 'badge-warning' : 'badge-danger'}">
                            ${sim.percentage}%
                          </span>
                        </td>
                        <td>${formatTime(sim.durationSeconds)}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            ` : `
              <p style="color: var(--color-text-secondary); text-align: center; padding: 20px 0;">
                Nenhum simulado registrado. Clique em "Fazer Simulado" no menu lateral para começar!
              </p>
            `}
          </div>

        </div>

        <!-- Right Side: Tips and Quick actions -->
        <div style="display: flex; flex-direction: column; gap: 32px;">
          
          <div class="card" style="background: var(--grad-hero); color: #fff; border: none;">
            <h3 style="font-size: 1.4rem; font-weight: 800; margin-bottom: 12px;">Comece Agora</h3>
            <p style="opacity: 0.9; font-size: 0.95rem; margin-bottom: 24px; line-height: 1.5;">
              Baixe editais e cadernos de provas em PDF, arraste e solte o arquivo em nosso portal para extrair as questões com Inteligência Heurística de forma instantânea!
            </p>
            <button class="btn btn-secondary" onclick="setTab('simulator')" style="background: #fff; color: var(--accent-primary); border: none; width: 100%;">
              🚀 Iniciar Simulado Realista
            </button>
          </div>

          <div class="card">
            <h3 style="font-size: 1.15rem; margin-bottom: 16px;">💡 Dicas de Estudo para SEDES-DF</h3>
            <ul style="list-style-type: none; display: flex; flex-direction: column; gap: 14px; font-size: 0.85rem; color: var(--color-text-secondary);">
              <li style="display: flex; gap: 10px;">
                <span>🎯</span>
                <span>Foque na <strong>Lei Orgânica da Assistência Social (LOAS)</strong> e na <strong>NOB/SUAS</strong>, que formam 40% das questões específicas.</span>
              </li>
              <li style="display: flex; gap: 10px;">
                <span>⏱️</span>
                <span>Faça simulados de <strong>20 a 30 questões</strong> para otimizar sua gestão de tempo de resposta.</span>
              </li>
              <li style="display: flex; gap: 10px;">
                <span>📂</span>
                <span>No painel "Baixar Provas", você encontra links para provas reais. Baixe o PDF e arraste na tela "Varrer PDF"!</span>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  `;
}

// --- VIEW 2: DOWNLOADER ---
function renderDownloader(container) {
  container.innerHTML = `
    <div class="animate-fade">
      <div class="page-header">
        <h1 class="page-title">Buscar e Guardar Provas</h1>
        <p class="page-subtitle">Links curados de provas anteriores da SEDES-DF e espaço para carregamento local de PDFs</p>
      </div>

      <div style="display: grid; grid-template-columns: 1.3fr 1fr; gap: 32px; align-items: start;">
        
        <!-- Left Side: Guide and Curated URLs -->
        <div style="display: flex; flex-direction: column; gap: 32px;">
          <div class="card">
            <h3 style="font-size: 1.2rem; margin-bottom: 16px;">🌐 Onde encontrar provas do SEDES-DF?</h3>
            <p style="color: var(--color-text-secondary); font-size: 0.95rem; line-height: 1.6; margin-bottom: 24px;">
              Devido a restrições de CORS que bloqueiam requisições de download direto pelo navegador de outros servidores públicos, recomendamos baixar as provas oficiais diretamente das fontes confiáveis abaixo. Após baixar os arquivos PDF em seu computador, arraste-os para a área de carregamento à direita.
            </p>

            <h4 style="font-size: 1rem; margin-bottom: 12px;">🔗 Links Rápidos Oficiais:</h4>
            <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px;">
              <a href="https://www.pciconcursos.com.br/provas/pesquisa/?q=SEDES+DF" target="_blank" class="btn btn-secondary" style="justify-content: flex-start; text-align: left;">
                🔍 Buscar Provas "SEDES DF" no PCI Concursos ↗
              </a>
              <a href="https://www.pciconcursos.com.br/provas/download/especialista-em-assistencia-social-psicologo-sedes-df-ibrae-2019" target="_blank" class="btn btn-secondary" style="justify-content: flex-start; text-align: left; font-size: 0.85rem;">
                📄 Prova de Psicólogo (SEDES-DF 2019) ↗
              </a>
              <a href="https://www.pciconcursos.com.br/provas/download/especialista-em-assistencia-social-assistente-social-sedes-df-ibrae-2019" target="_blank" class="btn btn-secondary" style="justify-content: flex-start; text-align: left; font-size: 0.85rem;">
                📄 Prova de Assistente Social (SEDES-DF 2019) ↗
              </a>
              <a href="https://www.pciconcursos.com.br/provas/download/tecnico-em-assistencia-social-cuidador-social-sedes-df-ibrae-2019" target="_blank" class="btn btn-secondary" style="justify-content: flex-start; text-align: left; font-size: 0.85rem;">
                📄 Prova de Cuidador Social (SEDES-DF 2019) ↗
              </a>
            </div>
            
            <div style="background: rgba(139, 92, 246, 0.05); padding: 16px; border-radius: var(--radius-md); border: 1px solid rgba(139, 92, 246, 0.15); font-size: 0.85rem; color: var(--color-text-secondary); line-height: 1.5;">
              💡 <strong>Dica de Organização:</strong> Para centralizar seus arquivos, recomendamos salvar as provas baixadas na pasta específica do seu simulado: <br>
              <code style="display: block; margin-top: 6px; padding: 6px; background: var(--bg-input); border-radius: 4px; font-family: monospace; color: var(--accent-primary);">C:\\Users\\simemp02\\.gemini\\antigravity\\scratch\\sedes-df-simulado\\downloads\\</code>
            </div>
          </div>
        </div>

        {/* Right Side: Upload Zone */}
        <div class="card" style="height: 100%;">
          <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>📥 Carregar Arquivo de Prova PDF</h3>
          <p style="font-size: 0.85rem; color: var(--color-text-secondary); margin-bottom: 20px;">
            Arraste e solte o arquivo PDF baixado aqui. A varredura de questões será iniciada automaticamente!
          </p>

          <div id="pdf-drop-zone" class="drop-zone">
            <span style="font-size: 3rem; display: block; margin-bottom: 12px;">📁</span>
            <strong style="display: block; font-size: 1rem; color: var(--color-text-primary); margin-bottom: 8px;">Arraste o PDF da Prova</strong>
            <span style="font-size: 0.8rem; color: var(--color-text-muted);">ou clique para abrir seus arquivos</span>
            <input type="file" id="pdf-file-input" accept="application/pdf" style="display: none;" />
          </div>

          <div id="upload-status" style="margin-top: 20px; display: none;">
            <div style="display: flex; align-items: center; gap: 12px; padding: 12px; border-radius: var(--radius-md); background: var(--bg-input); border: 1px solid var(--border-light);">
              <div id="upload-spinner" style="width: 20px; height: 20px; border: 2px solid var(--accent-secondary); border-top-color: transparent; border-radius: 50%; animation: spin 1s linear infinite;"></div>
              <span id="upload-status-text" style="font-size: 0.85rem;">Processando arquivo PDF...</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  `;

  // Bind Events
  const dropZone = document.getElementById('pdf-drop-zone');
  const fileInput = document.getElementById('pdf-file-input');

  dropZone.addEventListener('click', () => fileInput.click());
  
  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
  });

  dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover');
  });

  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type === 'application/pdf') {
      handlePdfSelected(files[0]);
    }
  });

  fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      handlePdfSelected(e.target.files[0]);
    }
  });
}

// --- PDF PARSING CLIENT SIDE CORE ---
function handlePdfSelected(file) {
  state.selectedFile = file;
  
  const statusDiv = document.getElementById('upload-status');
  const statusText = document.getElementById('upload-status-text');
  const spinner = document.getElementById('upload-spinner');

  statusDiv.style.display = 'block';
  statusText.innerText = `Lendo o arquivo "${file.name}"...`;

  const reader = new FileReader();
  reader.onload = async function(e) {
    try {
      statusText.innerText = "Extraindo texto das páginas do PDF (usando PDF.js)...";
      const typedarray = new Uint8Array(e.target.result);
      
      // Load pdf
      const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
      let rawText = '';
      
      for (let i = 1; i <= pdf.numPages; i++) {
        statusText.innerText = `Lendo página ${i} de ${pdf.numPages}...`;
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ');
        rawText += pageText + '\n';
      }

      state.rawText = rawText;
      statusText.innerText = "Executando algoritmo hebrístico de varredura...";
      
      // Parse questions
      const parsed = parseTextQuestions(rawText);
      state.extractedQuestions = parsed;

      statusText.innerText = `Varredura concluída! ${parsed.length} questões encontradas! Redirecionando...`;
      spinner.style.display = 'none';

      setTimeout(() => {
        setTab('parser');
      }, 1000);
    } catch (err) {
      console.error(err);
      statusText.innerText = "Erro ao processar PDF. Certifique-se de que é um PDF contendo texto selecionável.";
      spinner.style.display = 'none';
    }
  };
  
  reader.readAsArrayBuffer(file);
}

// Client-side regex parser (Heuristic engine matching the backend logic)
function parseTextQuestions(text) {
  if (!text || text.trim() === '') return [];

  let cleaned = text
    .replace(/[ \t]+/g, ' ')
    .replace(/\r\n/g, '\n')
    .replace(/\n\s*\n/g, '\n\n');

  const questionMarkers = [];
  // Detect "Questão 1", "01." etc.
  const markerRegex = /(?:\n|^)(?:QUESTÃO|Questão|Questao|QUESTAO)\s+(\d+)[\s.:-]|[^\d\n](?:\n|^)(\d+)[\s\.\-]{1,2}(?=[A-Z\xC0-\xDFÀ-ÿ])/g;
  
  let match;
  while ((match = markerRegex.exec(cleaned)) !== null) {
    const qNum = match[1] || match[2];
    questionMarkers.push({
      index: match.index,
      length: match[0].length,
      number: parseInt(qNum, 10)
    });
  }

  // Backup simple pattern if nothing matched
  if (questionMarkers.length === 0) {
    const backupRegex = /(?:\n|^)(\d+)[\.\-\)]\s+(?=[A-Z\xC0-\xDFÀ-ÿ])/g;
    while ((match = backupRegex.exec(cleaned)) !== null) {
      questionMarkers.push({
        index: match.index,
        length: match[0].length,
        number: parseInt(match[1], 10)
      });
    }
  }

  questionMarkers.sort((a, b) => a.index - b.index);
  const questions = [];

  for (let i = 0; i < questionMarkers.length; i++) {
    const current = questionMarkers[i];
    const next = questionMarkers[i + 1];
    
    const startIdx = current.index + current.length;
    const endIdx = next ? next.index : cleaned.length;
    
    let rawContent = cleaned.substring(current.index, endIdx).trim();
    
    // Check options
    const optionRegex = /(?:\n|^)(?:\(?([A-Ea-e])\)|([A-Ea-e])[\.\-]\s+)(?=[A-Z0-9\xC0-\xDFÀ-ÿ\s])/g;
    const optionMatches = [];
    let optMatch;
    optionRegex.lastIndex = 0;
    
    while ((optMatch = optionRegex.exec(rawContent)) !== null) {
      const letter = (optMatch[1] || optMatch[2]).toUpperCase();
      optionMatches.push({
        index: optMatch.index,
        length: optMatch[0].length,
        letter
      });
    }

    let qText = rawContent;
    let options = [];
    let type = 'certo_errado';

    if (optionMatches.length >= 2) {
      type = 'multiple_choice';
      qText = rawContent.substring(0, optionMatches[0].index).trim();
      
      const numCleanRegex = /^(?:QUESTÃO|Questão|Questao|QUESTAO)\s+\d+[\s.:-]*|^\d+[\s\.\-]*\s*/i;
      qText = qText.replace(numCleanRegex, '').trim();

      for (let j = 0; j < optionMatches.length; j++) {
        const optStart = optionMatches[j].index + optionMatches[j].length;
        const optEnd = optionMatches[j + 1] ? optionMatches[j + 1].index : rawContent.length;
        
        let optText = rawContent.substring(optStart, optEnd).trim();
        optText = optText.replace(/\s+/g, ' ');
        
        options.push({
          letter: optionMatches[j].letter,
          text: optText
        });
      }
    } else {
      type = 'certo_errado';
      const numCleanRegex = /^(?:QUESTÃO|Questão|Questao|QUESTAO)\s+\d+[\s.:-]*|^\d+[\s\.\-]*\s*/i;
      qText = rawContent.replace(numCleanRegex, '').trim();
      
      const ceIndicatorRegex = /(?:\(\s*\)\s*Certo\s*(?:\(\s*\)\s*Errado)?|\(\s*\)\s*Errado\s*(?:\(\s*\)\s*Certo)?)/gi;
      qText = qText.replace(ceIndicatorRegex, '').trim();
    }

    if (qText.length > 5) {
      questions.push({
        number: current.number || (i + 1),
        text: qText,
        type,
        options: type === 'multiple_choice' ? options : [
          { letter: 'C', text: 'Certo' },
          { letter: 'E', text: 'Errado' }
        ],
        correctAnswer: '',
        explanation: '',
        subject: 'Assistência Social - Geral',
        year: 2019,
        source: 'SEDES-DF'
      });
    }
  }

  return questions;
}

// --- VIEW 3: PARSER REVIEW PANEL ---
function renderParser(container) {
  if (state.extractedQuestions.length === 0) {
    container.innerHTML = `
      <div class="animate-fade" style="text-align: center; padding: 60px 20px; max-width: 600px; margin: 40px auto;">
        <span style="font-size: 4rem;">⚡</span>
        <h2 style="font-size: 1.8rem; margin: 20px 0 10px;">Workspace do Extrator Vazio</h2>
        <p style="color: var(--color-text-secondary); line-height: 1.6; margin-bottom: 30px;">
          Nenhum PDF de prova foi carregado no extrator ainda. Por favor, acesse o painel de download e carregue um arquivo.
        </p>
        <button class="btn btn-primary" onclick="setTab('downloader')">
          📥 Ir para Carregar PDF
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="animate-fade">
      <div class="page-header">
        <h1 class="page-title">Varrer e Extrair Questões</h1>
        <p class="page-subtitle">Revise, edite e gabarite as questões estruturadas antes de salvar permanentemente no banco</p>
      </div>

      <!-- Action Panel Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-card); padding: 16px 24px; border-radius: var(--radius-md); border: 1px solid var(--border-light); margin-bottom: 32px;">
        <div>
          <span style="font-size: 1.1rem; font-weight: bold;">📋 Revisão de Questões Extraídas</span>
          <p style="font-size: 0.8rem; color: var(--color-text-secondary); margin-top: 4px;">
            Defina o gabarito oficial de cada uma clicando nas letras. Altere os enunciados ou apague as incorretas.
          </p>
        </div>
        <div style="display: flex; gap: 12px;">
          <button class="btn btn-secondary" onclick="addManualQuestionInParser()">
            ➕ Inserir Questão Manual
          </button>
          <button class="btn btn-primary" onclick="saveParsedToDatabase()" style="background: var(--color-success); box-shadow: 0 4px 14px rgba(16, 185, 129, 0.3);">
            📥 Salvar ${state.extractedQuestions.length} Questões no Banco
          </button>
        </div>
      </div>

      <!-- Global Default Configurations Bar -->
      <div class="card" style="margin-bottom: 32px;">
        <h4 style="font-size: 0.95rem; margin-bottom: 12px;">⚙️ Definir Padrão Global para o Lote:</h4>
        <div style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 16px; align-items: end;">
          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label" style="font-size: 0.8rem;">Disciplina Padrão</label>
            <select class="form-select" id="global-subject">
              <option value="Assistência Social - Geral">Assistência Social - Geral</option>
              <option value="Língua Portuguesa">Língua Portuguesa</option>
              <option value="Lei Orgânica do DF (LODF)">Lei Orgânica do DF (LODF)</option>
              <option value="Direito Administrativo">Direito Administrativo</option>
              <option value="Direito Constitucional">Direito Constitucional</option>
              <option value="Lei Orgânica da Assistência Social (LOAS)">Lei Orgânica da Assistência Social (LOAS)</option>
              <option value="Conhecimentos Específicos">Conhecimentos Específicos</option>
              <option value="Raciocínio Lógico">Raciocínio Lógico</option>
              <option value="Atualidades">Atualidades</option>
            </select>
          </div>
          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label" style="font-size: 0.8rem;">Banca / Concurso</label>
            <input type="text" class="form-input" id="global-source" value="SEDES-DF" />
          </div>
          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label" style="font-size: 0.8rem;">Ano da Prova</label>
            <input type="number" class="form-input" id="global-year" value="2019" />
          </div>
          <button class="btn btn-secondary" onclick="applyGlobalSettingsToBatch()" style="height: 45px; width: 100%;">
            🔄 Aplicar em Todas
          </button>
        </div>
      </div>

      <!-- Split Layout Workstation -->
      <div style="display: grid; grid-template-columns: 1.2fr 2fr; gap: 32px; align-items: start;">
        
        <!-- Left Side: Raw extracted text reference -->
        <div class="card" style="display: flex; flex-direction: column; height: 75vh;">
          <h3 style="font-size: 1.1rem; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid var(--border-light);">
            📕 Texto Extraído do PDF (Referência)
          </h3>
          <textarea readonly style="width: 100%; flex-grow: 1; background: rgba(0,0,0,0.2); border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 12px; font-family: monospace; font-size: 0.8rem; line-height: 1.5; color: var(--color-text-secondary); resize: none;">${state.rawText}</textarea>
        </div>

        <!-- Right Side: Interactive Extracted Cards -->
        <div id="extracted-cards-container" style="display: flex; flex-direction: column; gap: 24px; max-height: 75vh; overflow-y: auto; padding-right: 8px;">
          <!-- Dynamically filled by buildExtractedCards() -->
        </div>

      </div>
    </div>
  `;

  buildExtractedCards();
}

function buildExtractedCards() {
  const container = document.getElementById('extracted-cards-container');
  container.innerHTML = '';

  state.extractedQuestions.forEach((q, idx) => {
    const card = document.createElement('div');
    card.className = 'card animate-scale';
    card.style.position = 'relative';
    card.style.borderLeft = '4px solid var(--accent-primary)';
    card.style.background = 'var(--bg-card)';
    card.style.marginBottom = '0';

    card.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; border-bottom: 1px solid var(--border-light); padding-bottom: 12px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="display: flex; align-items: center; justify-content: center; background: var(--accent-glow); color: var(--accent-primary); font-weight: bold; width: 30px; height: 30px; border-radius: 50%;">${idx + 1}</span>
          <span style="font-weight: bold; font-size: 0.95rem;">Questão ${q.number || idx + 1}</span>
        </div>
        <div style="display: flex; gap: 8px; align-items: center;">
          <button class="btn btn-secondary" onclick="toggleQuestionTypeInParser(${idx})" style="padding: 6px 12px; font-size: 0.75rem;">
            Tipo: ${q.type === 'multiple_choice' ? '📝 Múltipla Escolha' : '⚖️ Certo / Errado'}
          </button>
          <button class="btn" onclick="removeQuestionFromParser(${idx})" style="background: transparent; color: var(--color-danger); border: none; padding: 4px 8px; font-size: 0.85rem;">
            🗑️ Excluir
          </button>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label" style="font-size: 0.8rem;">Enunciado</label>
        <textarea class="form-textarea" rows="3" style="font-size: 0.85rem;" oninput="updateQuestionTextInParser(${idx}, this.value)">${q.text}</textarea>
      </div>

      <div class="form-group">
        <label class="form-label" style="font-size: 0.8rem;">Alternativas (Selecione a Letra do Gabarito)</label>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${q.options.map((opt, oIdx) => {
            const isCorrect = q.correctAnswer === opt.letter;
            return `
              <div style="display: flex; align-items: center; gap: 8px;">
                <button type="button" class="btn ${isCorrect ? 'btn-primary' : 'btn-secondary'}" 
                  onclick="setQuestionGabaritoInParser(${idx}, '${opt.letter}')"
                  style="min-width: 36px; height: 36px; padding: 0; font-weight: 700; border-radius: 6px; background: ${isCorrect ? 'var(--color-success)' : ''}; box-shadow: none;">
                  ${opt.letter}
                </button>
                ${q.type === 'multiple_choice' ? `
                  <input type="text" class="form-input" value="${opt.text}" 
                    oninput="updateOptionTextInParser(${idx}, ${oIdx}, this.value)" 
                    placeholder="Texto da alternativa ${opt.letter}" style="font-size: 0.8rem; padding: 8px 12px;" />
                ` : `
                  <span style="font-size: 0.85rem; color: var(--color-text-secondary);">${opt.text}</span>
                `}
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--border-light);">
        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" style="font-size: 0.75rem;">Matéria da Questão</label>
          <select class="form-select" style="font-size: 0.8rem; padding: 8px 12px;" onchange="updateQuestionSubjectInParser(${idx}, this.value)">
            <option value="Assistência Social - Geral" ${q.subject === 'Assistência Social - Geral' ? 'selected' : ''}>Assistência Social - Geral</option>
            <option value="Língua Portuguesa" ${q.subject === 'Língua Portuguesa' ? 'selected' : ''}>Língua Portuguesa</option>
            <option value="Lei Orgânica do DF (LODF)" ${q.subject === 'Lei Orgânica do DF (LODF)' ? 'selected' : ''}>Lei Orgânica do DF (LODF)</option>
            <option value="Direito Administrativo" ${q.subject === 'Direito Administrativo' ? 'selected' : ''}>Direito Administrativo</option>
            <option value="Direito Constitucional" ${q.subject === 'Direito Constitucional' ? 'selected' : ''}>Direito Constitucional</option>
            <option value="Lei Orgânica da Assistência Social (LOAS)" ${q.subject === 'Lei Orgânica da Assistência Social (LOAS)' ? 'selected' : ''}>Lei Orgânica da Assistência Social (LOAS)</option>
            <option value="Conhecimentos Específicos" ${q.subject === 'Conhecimentos Específicos' ? 'selected' : ''}>Conhecimentos Específicos</option>
            <option value="Raciocínio Lógico" ${q.subject === 'Raciocínio Lógico' ? 'selected' : ''}>Raciocínio Lógico</option>
            <option value="Atualidades" ${q.subject === 'Atualidades' ? 'selected' : ''}>Atualidades</option>
          </select>
        </div>
        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" style="font-size: 0.75rem;">Comentários do Gabarito (Opcional)</label>
          <input type="text" class="form-input" placeholder="Comentário sobre a questão..." value="${q.explanation || ''}" 
            oninput="updateQuestionExplanationInParser(${idx}, this.value)" style="font-size: 0.8rem; padding: 8px 12px;" />
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

// Handlers for Parser Review Panel
function updateQuestionTextInParser(idx, val) {
  state.extractedQuestions[idx].text = val;
}
function updateQuestionExplanationInParser(idx, val) {
  state.extractedQuestions[idx].explanation = val;
}
function updateQuestionSubjectInParser(idx, val) {
  state.extractedQuestions[idx].subject = val;
}
function updateOptionTextInParser(qIdx, oIdx, val) {
  state.extractedQuestions[qIdx].options[oIdx].text = val;
}
function setQuestionGabaritoInParser(qIdx, letter) {
  if (state.extractedQuestions[qIdx].correctAnswer === letter) {
    state.extractedQuestions[qIdx].correctAnswer = '';
  } else {
    state.extractedQuestions[qIdx].correctAnswer = letter;
  }
  buildExtractedCards();
}
function removeQuestionFromParser(idx) {
  state.extractedQuestions.splice(idx, 1);
  renderParser(document.getElementById('main-viewport'));
}
function toggleQuestionTypeInParser(idx) {
  const q = state.extractedQuestions[idx];
  if (q.type === 'multiple_choice') {
    q.type = 'certo_errado';
    q.options = [
      { letter: 'C', text: 'Certo' },
      { letter: 'E', text: 'Errado' }
    ];
    q.correctAnswer = '';
  } else {
    q.type = 'multiple_choice';
    q.options = [
      { letter: 'A', text: '' },
      { letter: 'B', text: '' },
      { letter: 'C', text: '' },
      { letter: 'D', text: '' },
      { letter: 'E', text: '' }
    ];
    q.correctAnswer = '';
  }
  buildExtractedCards();
}
function addManualQuestionInParser() {
  const newQ = {
    number: state.extractedQuestions.length + 1,
    text: 'Novo enunciado de questão...',
    type: 'multiple_choice',
    options: [
      { letter: 'A', text: '' },
      { letter: 'B', text: '' },
      { letter: 'C', text: '' },
      { letter: 'D', text: '' },
      { letter: 'E', text: '' }
    ],
    correctAnswer: '',
    explanation: '',
    subject: document.getElementById('global-subject').value,
    year: parseInt(document.getElementById('global-year').value, 10) || 2019,
    source: document.getElementById('global-source').value
  };
  state.extractedQuestions.push(newQ);
  buildExtractedCards();
  // Scroll to bottom
  setTimeout(() => {
    const el = document.getElementById('extracted-cards-container');
    el.scrollTop = el.scrollHeight;
  }, 100);
}
function applyGlobalSettingsToBatch() {
  const sub = document.getElementById('global-subject').value;
  const src = document.getElementById('global-source').value;
  const yr = parseInt(document.getElementById('global-year').value, 10) || 2019;

  state.extractedQuestions.forEach(q => {
    q.subject = sub;
    q.source = src;
    q.year = yr;
  });

  buildExtractedCards();
  alert("Valores globais aplicados a todas as questões!");
}
function saveParsedToDatabase() {
  const count = db.importQuestions(state.extractedQuestions);
  alert(`${count} novas questões importadas e salvas com sucesso no banco de dados!`);
  state.extractedQuestions = [];
  state.rawText = '';
  setTab('bank');
}


// --- VIEW 4: QUESTION BANK & EDITOR ---
let bankFilterSubject = 'Todas';
let bankFilterType = 'Todos';
let bankSearchQuery = '';
let activeEditingQuestion = null;

function renderQuestionBank(container) {
  const subjects = ['Todas', ...Array.from(new Set(state.questions.map(q => q.subject)))];

  // Filtering questions
  let filtered = [...state.questions];
  if (bankFilterSubject !== 'Todas') {
    filtered = filtered.filter(q => q.subject === bankFilterSubject);
  }
  if (bankFilterType !== 'Todos') {
    filtered = filtered.filter(q => q.type === bankFilterType);
  }
  if (bankSearchQuery.trim() !== '') {
    const query = bankSearchQuery.toLowerCase();
    filtered = filtered.filter(q => 
      q.text.toLowerCase().includes(query) || 
      (q.explanation && q.explanation.toLowerCase().includes(query)) ||
      q.source.toLowerCase().includes(query)
    );
  }

  container.innerHTML = `
    <div class="animate-fade">
      <div class="page-header" style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h1 class="page-title">Banco de Questões</h1>
          <p class="page-subtitle">Pesquise, filtre, adicione e edite questões no banco de dados local</p>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-secondary" onclick="triggerDatabaseExport()">
            📥 Exportar Backup JSON
          </button>
          <button class="btn btn-primary" onclick="openCreateQuestionModal()">
            ➕ Criar Questão
          </button>
        </div>
      </div>

      <!-- Filters Panel Card -->
      <div class="card" style="margin-bottom: 32px;">
        <div style="display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 16px;">
          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label">Filtrar por Texto</label>
            <input type="text" class="form-input" id="bank-search" placeholder="Buscar no enunciado ou gabarito..." value="${bankSearchQuery}" oninput="handleBankSearchChange(this.value)" />
          </div>

          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label">Disciplina</label>
            <select class="form-select" id="bank-subject-filter" onchange="handleBankSubjectFilterChange(this.value)">
              ${subjects.map(s => `<option value="${s}" ${bankFilterSubject === s ? 'selected' : ''}>${s}</option>`).join('')}
            </select>
          </div>

          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label">Tipo de Questão</label>
            <select class="form-select" id="bank-type-filter" onchange="handleBankTypeFilterChange(this.value)">
              <option value="Todos" ${bankFilterType === 'Todos' ? 'selected' : ''}>Todos os Tipos</option>
              <option value="multiple_choice" ${bankFilterType === 'multiple_choice' ? 'selected' : ''}>Múltipla Escolha</option>
              <option value="certo_errado" ${bankFilterType === 'certo_errado' ? 'selected' : ''}>Certo / Errado</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Questions List container -->
      <div style="display: flex; flex-direction: column; gap: 24px;">
        ${filtered.length > 0 ? filtered.map((q, idx) => `
          <div class="card animate-scale" style="border-left: 4px solid var(--accent-secondary); background: var(--bg-card); margin-bottom: 0;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; border-bottom: 1px solid var(--border-light); padding-bottom: 12px;">
              <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
                <span class="badge badge-info">${q.subject}</span>
                <span class="badge badge-success" style="text-transform: none;">${q.type === 'multiple_choice' ? 'Múltipla Escolha' : 'Certo / Errado'}</span>
                ${(!q.correctAnswer || q.correctAnswer.trim() === '') ? `<span class="badge badge-danger" style="text-transform: none;">Sem Gabarito</span>` : ''}
                <span style="font-size: 0.8rem; color: var(--color-text-muted); margin-left: 8px;">Origem: ${q.source} • Ano: ${q.year}</span>
              </div>
              <div style="display: flex; gap: 8px;">
                <button class="btn btn-secondary" onclick="openEditQuestionModal('${q.id}')" style="padding: 6px 12px; font-size: 0.8rem;">
                  ✏️ Editar
                </button>
                <button class="btn btn-secondary" onclick="deleteQuestion('${q.id}')" style="padding: 6px 12px; font-size: 0.8rem; color: var(--color-danger); border-color: rgba(239, 68, 68, 0.2);">
                  🗑️ Excluir
                </button>
              </div>
            </div>

            <p style="font-size: 1rem; line-height: 1.6; color: var(--color-text-primary); margin-bottom: 20px; white-space: pre-line;">${q.text}</p>

            <div style="display: flex; flex-direction: column; gap: 10px;">
              ${q.options.map(opt => {
                const isCorrect = q.correctAnswer === opt.letter;
                return `
                  <div style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: var(--radius-md); background: ${isCorrect ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255,255,255,0.01)'}; border: 1px solid ${isCorrect ? 'var(--color-success)' : 'var(--border-light)'};">
                    <span style="display: flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 50%; font-weight: 700; font-size: 0.9rem; background: ${isCorrect ? 'var(--color-success)' : 'var(--bg-input)'}; color: ${isCorrect ? '#fff' : 'var(--color-text-secondary)'};">
                      ${opt.letter}
                    </span>
                    <span style="font-size: 0.95rem; color: ${isCorrect ? 'var(--color-text-primary)' : 'var(--color-text-secondary)'}; font-weight: ${isCorrect ? '500' : 'normal'};">
                      ${opt.text}
                    </span>
                    ${isCorrect ? `<span style="margin-left: auto; color: var(--color-success); font-size: 0.8rem; font-weight: bold;">Gabarito ✓</span>` : ''}
                  </div>
                `;
              }).join('')}
            </div>

            ${q.explanation ? `
              <div style="margin-top: 16px; padding: 12px 16px; border-radius: var(--radius-md); background: rgba(99,102,241,0.05); border: 1px solid rgba(99,102,241,0.15); font-size: 0.85rem; color: var(--color-text-secondary);">
                💡 <strong>Comentário/Dica:</strong> ${q.explanation}
              </div>
            ` : ''}
          </div>
        `).join('') : `
          <div style="text-align: center; padding: 60px 20px; color: var(--color-text-secondary); border: 2px dashed var(--border-light); border-radius: 12px;">
            Nenhuma questão encontrada com esses filtros.
          </div>
        `}
      </div>
    </div>
  `;
}

// Filters listeners
function handleBankSearchChange(val) {
  bankSearchQuery = val;
  renderView();
}
function handleBankSubjectFilterChange(val) {
  bankFilterSubject = val;
  renderView();
}
function handleBankTypeFilterChange(val) {
  bankFilterType = val;
  renderView();
}

function deleteQuestion(id) {
  if (confirm("Excluir esta questão permanentemente?")) {
    db.deleteQuestion(id);
    renderView();
  }
}

// Backup Trigger
function triggerDatabaseExport() {
  const data = db.getQuestions();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `backup_questoes_sedes_${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
}

// In-place modal CRUD Question
function openCreateQuestionModal() {
  activeEditingQuestion = {
    text: '',
    type: 'multiple_choice',
    options: [
      { letter: 'A', text: '' },
      { letter: 'B', text: '' },
      { letter: 'C', text: '' },
      { letter: 'D', text: '' },
      { letter: 'E', text: '' }
    ],
    correctAnswer: '',
    explanation: '',
    subject: 'Assistência Social - Geral',
    source: 'SEDES-DF',
    year: new Date().getFullYear()
  };
  renderQuestionModal();
}

function openEditQuestionModal(id) {
  const q = state.questions.find(item => item.id === id);
  activeEditingQuestion = JSON.parse(JSON.stringify(q)); // Deep clone
  renderQuestionModal();
}

function renderQuestionModal() {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay animate-fade';
  overlay.id = 'editor-modal-overlay';
  
  const subjects = [
    'Assistência Social - Geral',
    'Língua Portuguesa',
    'Lei Orgânica do DF (LODF)',
    'Direito Administrativo',
    'Direito Constitucional',
    'Lei Orgânica da Assistência Social (LOAS)',
    'Conhecimentos Específicos',
    'Raciocínio Lógico',
    'Atualidades'
  ];

  overlay.innerHTML = `
    <div class="modal-content animate-scale">
      <h2 style="font-size: 1.4rem; margin-bottom: 20px; padding-bottom: 12px; border-bottom: 1px solid var(--border-light);">
        ${activeEditingQuestion.id ? '✏️ Editar Questão' : '➕ Nova Questão'}
      </h2>

      <form id="modal-editor-form">
        <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 16px; margin-bottom: 16px;">
          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label">Disciplina / Assunto</label>
            <select class="form-select" id="m-subject">
              ${subjects.map(s => `<option value="${s}" ${activeEditingQuestion.subject === s ? 'selected' : ''}>${s}</option>`).join('')}
            </select>
          </div>
          <div class="form-group" style="margin-bottom: 0; display: flex; align-items: flex-end;">
            <button type="button" class="btn btn-secondary" onclick="toggleModalQuestionType()" style="width: 100%; height: 45px;">
              Tipo: ${activeEditingQuestion.type === 'multiple_choice' ? '📝 Múltipla Escolha' : '⚖️ Certo / Errado'}
            </button>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1.5fr 1fr; gap: 16px; margin-bottom: 16px;">
          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label">Origem / Concurso</label>
            <input type="text" class="form-input" id="m-source" value="${activeEditingQuestion.source}" required />
          </div>
          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label">Ano</label>
            <input type="number" class="form-input" id="m-year" value="${activeEditingQuestion.year}" required />
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Enunciado da Questão</label>
          <textarea class="form-textarea" rows="4" id="m-text" required>${activeEditingQuestion.text}</textarea>
        </div>

        <div class="form-group">
          <label class="form-label">Alternativas (Selecione clicando na Letra do Gabarito)</label>
          <div style="display: flex; flex-direction: column; gap: 10px;" id="modal-alternatives-container">
            <!-- Rendered by rebuildModalAlternatives() -->
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Comentário Explicativo (Gabarito Comentado)</label>
          <textarea class="form-textarea" rows="2" id="m-explanation">${activeEditingQuestion.explanation || ''}</textarea>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 24px; border-top: 1px solid var(--border-light); padding-top: 16px;">
          <button type="button" class="btn btn-secondary" onclick="closeQuestionModal()">Cancelar</button>
          <button type="submit" class="btn btn-primary">Salvar Questão</button>
        </div>
      </form>
    </div>
  `;

  document.body.appendChild(overlay);
  
  // Rebuild options block
  rebuildModalAlternatives();

  // Form submit
  document.getElementById('modal-editor-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    activeEditingQuestion.subject = document.getElementById('m-subject').value;
    activeEditingQuestion.source = document.getElementById('m-source').value;
    activeEditingQuestion.year = parseInt(document.getElementById('m-year').value, 10) || 2019;
    activeEditingQuestion.text = document.getElementById('m-text').value;
    activeEditingQuestion.explanation = document.getElementById('m-explanation').value;

    db.saveQuestion(activeEditingQuestion);
    closeQuestionModal();
    renderView();
  });
}

function rebuildModalAlternatives() {
  const container = document.getElementById('modal-alternatives-container');
  container.innerHTML = '';

  activeEditingQuestion.options.forEach((opt, idx) => {
    const isCorrect = activeEditingQuestion.correctAnswer === opt.letter;
    const div = document.createElement('div');
    div.style.display = 'flex';
    div.style.alignItems = 'center';
    div.style.gap = '10px';

    div.innerHTML = `
      <button type="button" class="btn ${isCorrect ? 'btn-primary' : 'btn-secondary'}" 
        onclick="setModalCorrectAnswer('${opt.letter}')"
        style="min-width: 40px; height: 40px; padding: 0; font-weight: 700; border-radius: var(--radius-sm); background: ${isCorrect ? 'var(--color-success)' : ''}; box-shadow: none;">
        ${opt.letter}
      </button>
      ${activeEditingQuestion.type === 'multiple_choice' ? `
        <input type="text" class="form-input" value="${opt.text}" oninput="updateModalOptionText(${idx}, this.value)" placeholder="Texto da alternativa ${opt.letter}" required />
      ` : `
        <span style="color: var(--color-text-secondary); font-size: 0.95rem;">${opt.text}</span>
      `}
    `;
    container.appendChild(div);
  });
}

function updateModalOptionText(idx, val) {
  activeEditingQuestion.options[idx].text = val;
}
function setModalCorrectAnswer(letter) {
  if (activeEditingQuestion.correctAnswer === letter) {
    activeEditingQuestion.correctAnswer = '';
  } else {
    activeEditingQuestion.correctAnswer = letter;
  }
  rebuildModalAlternatives();
}
function toggleModalQuestionType() {
  const nextType = activeEditingQuestion.type === 'multiple_choice' ? 'certo_errado' : 'multiple_choice';
  const nextOptions = nextType === 'certo_errado' ? [
    { letter: 'C', text: 'Certo' },
    { letter: 'E', text: 'Errado' }
  ] : [
    { letter: 'A', text: '' },
    { letter: 'B', text: '' },
    { letter: 'C', text: '' },
    { letter: 'D', text: '' },
    { letter: 'E', text: '' }
  ];

  activeEditingQuestion.type = nextType;
  activeEditingQuestion.options = nextOptions;
  activeEditingQuestion.correctAnswer = nextType === 'certo_errado' ? 'C' : 'A';
  
  rebuildModalAlternatives();
  
  // Re-toggle type button visual label
  document.querySelector('#modal-editor-form button[onclick="toggleModalQuestionType()"]').innerText = 
    `Tipo: ${nextType === 'multiple_choice' ? '📝 Múltipla Escolha' : '⚖️ Certo / Errado'}`;
}

function closeQuestionModal() {
  const modal = document.getElementById('editor-modal-overlay');
  if (modal) modal.remove();
  activeEditingQuestion = null;
}


// --- VIEW 5: SIMULATOR GAME SCREEN ---
let activeSimuladoConfig = {
  num: 10,
  subject: 'Todas',
  type: 'Todos'
};

function renderSimulator(container) {
  if (state.questions.length === 0) {
    container.innerHTML = `
      <div class="card text-center" style="padding: 60px 40px; max-width: 600px; margin: 40px auto; text-align: center;">
        <span style="font-size: 4rem;">⚠️</span>
        <h2 style="font-size: 1.8rem; margin: 20px 0 10px;">Banco de Questões Vazio</h2>
        <p style="color: var(--color-text-secondary); line-height: 1.6; margin-bottom: 30px;">
          Para iniciar um simulado, primeiro carregue provas em PDF e extraia suas questões ou crie questões manuais no Banco!
        </p>
      </div>
    `;
    return;
  }

  // SCREEN STATE RENDERER
  if (!state.activeTest) {
    renderConfigScreen(container);
  } else if (state.activeTest.state === 'playing') {
    renderPlayingScreen(container);
  } else if (state.activeTest.state === 'results') {
    renderResultsScreen(container);
  }
}

function renderConfigScreen(container) {
  const subjects = ['Todas', ...Array.from(new Set(state.questions.map(q => q.subject)))];

  container.innerHTML = `
    <div class="animate-fade" style="max-width: 800px; margin: 0 auto;">
      <div class="page-header" style="text-align: center; margin-bottom: 40px;">
        <h1 class="page-title">Configurar Simulado</h1>
        <p class="page-subtitle">Selecione as opções de disciplinas e perguntas para treinar</p>
      </div>

      <div class="card">
        <h3 style="font-size: 1.2rem; margin-bottom: 24px; padding-bottom: 12px; border-bottom: 1px solid var(--border-light);">
          ⚙️ Personalização do Teste
        </h3>

        <div style="display: flex; flex-direction: column; gap: 20px;">
          <div class="form-group">
            <label class="form-label">Disciplina / Assunto</label>
            <select class="form-select" id="sim-subject-select" style="padding: 14px;">
              ${subjects.map(s => `<option value="${s}" ${activeSimuladoConfig.subject === s ? 'selected' : ''}>${s}</option>`).join('')}
            </select>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div class="form-group">
              <label class="form-label">Quantidade de Questões</label>
              <select class="form-select" id="sim-num-select" style="padding: 14px;">
                <option value="5" ${activeSimuladoConfig.num === 5 ? 'selected' : ''}>5 Questões</option>
                <option value="10" ${activeSimuladoConfig.num === 10 ? 'selected' : ''}>10 Questões</option>
                <option value="20" ${activeSimuladoConfig.num === 20 ? 'selected' : ''}>20 Questões</option>
                <option value="30" ${activeSimuladoConfig.num === 30 ? 'selected' : ''}>30 Questões</option>
                <option value="50" ${activeSimuladoConfig.num === 50 ? 'selected' : ''}>50 Questões</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Formato das Questões</label>
              <select class="form-select" id="sim-type-select" style="padding: 14px;">
                <option value="Todos" ${activeSimuladoConfig.type === 'Todos' ? 'selected' : ''}>Todos (Mesclado)</option>
                <option value="multiple_choice" ${activeSimuladoConfig.type === 'multiple_choice' ? 'selected' : ''}>Múltipla Escolha (A-E)</option>
                <option value="certo_errado" ${activeSimuladoConfig.type === 'certo_errado' ? 'selected' : ''}>Certo / Errado</option>
              </select>
            </div>
          </div>

          <button class="btn btn-primary" onclick="initiateSimuladoGame()" style="margin-top: 16px; padding: 16px; font-size: 1.1rem; display: flex; align-items: center; justify-content: center; gap: 12px;">
            🚀 Iniciar Simulado Cronometrado
          </button>
        </div>
      </div>
    </div>
  `;
}

function initiateSimuladoGame() {
  const sub = document.getElementById('sim-subject-select').value;
  const num = parseInt(document.getElementById('sim-num-select').value, 10);
  const typ = document.getElementById('sim-type-select').value;

  activeSimuladoConfig = { subject: sub, num, type: typ };

  let pool = [...state.questions].filter(q => q.correctAnswer && q.correctAnswer.trim() !== '');
  if (sub !== 'Todas') {
    pool = pool.filter(q => q.subject === sub);
  }
  if (typ !== 'Todos') {
    pool = pool.filter(q => q.type === typ);
  }

  if (pool.length === 0) {
    alert("Nenhuma questão com gabarito definido está disponível para esses filtros. Adicione gabaritos no Banco de Questões primeiro!");
    return;
  }

  // Shuffle and Slice
  const shuffled = pool.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, Math.min(num, shuffled.length));

  state.activeTest = {
    state: 'playing',
    questions: selected,
    currentIdx: 0,
    answers: {},
    flagged: {},
    time: 0,
    timerActive: true
  };

  // Start interval
  startTimer();
  renderView();
}

function startTimer() {
  if (state.activeTest.intervalId) clearInterval(state.activeTest.intervalId);
  state.activeTest.intervalId = setInterval(() => {
    if (state.activeTest && state.activeTest.timerActive) {
      state.activeTest.time++;
      updateTimerDisplay();
    }
  }, 1000);
}

function pauseTimer() {
  if (state.activeTest) {
    state.activeTest.timerActive = false;
    const btn = document.getElementById('timer-pause-toggle');
    if (btn) btn.innerText = '▶️';
  }
}

function resumeTimer() {
  if (state.activeTest) {
    state.activeTest.timerActive = true;
    const btn = document.getElementById('timer-pause-toggle');
    if (btn) btn.innerText = '⏸️';
  }
}

function toggleTimerBtn() {
  if (state.activeTest.timerActive) {
    pauseTimer();
  } else {
    resumeTimer();
  }
}

function updateTimerDisplay() {
  const display = document.getElementById('sim-timer-clock');
  if (display && state.activeTest) {
    display.innerText = formatTime(state.activeTest.time);
  }
}

function renderPlayingScreen(container) {
  const test = state.activeTest;
  const activeQ = test.questions[test.currentIdx];
  const isFlagged = test.flagged[activeQ.id];

  container.innerHTML = `
    <div class="animate-fade" style="display: grid; grid-template-columns: 2.5fr 1fr; gap: 32px; align-items: start;">
      
      <!-- Left side: Question sheet -->
      <div class="card" style="padding: 32px; border-left: 4px solid var(--accent-primary); margin-bottom: 0;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; border-bottom: 1px solid var(--border-light); padding-bottom: 16px;">
          <div>
            <span class="badge badge-info">${activeQ.subject}</span>
            <span style="font-size: 0.8rem; color: var(--color-text-muted); margin-left: 12px;">Origem: ${activeQ.source} • Ano: ${activeQ.year}</span>
          </div>

          <!-- Timer Clock HUD -->
          <div style="display: flex; align-items: center; gap: 12px; background: var(--bg-input); padding: 6px 14px; border-radius: 20px; border: 1px solid var(--border-light); font-weight: 600; font-family: monospace;">
            <span id="sim-timer-clock">⏱️ ${formatTime(test.time)}</span>
            <button type="button" id="timer-pause-toggle" onclick="toggleTimerBtn()" style="background: transparent; border: none; cursor: pointer; font-size: 0.9rem;">
              ${test.timerActive ? '⏸️' : '▶️'}
            </button>
          </div>
        </div>

        <div style="min-height: 120px; margin-bottom: 32px;">
          <h3 style="font-size: 1.15rem; line-height: 1.6; font-weight: 500; color: var(--color-text-primary); whiteSpace: pre-wrap;">
            ${activeQ.text}
          </h3>
        </div>

        <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 40px;">
          ${activeQ.options.map(opt => {
            const isSelected = test.answers[activeQ.id] === opt.letter;
            return `
              <button class="btn ${isSelected ? 'btn-primary' : 'btn-secondary'}" 
                onclick="submitAnswerOption('${opt.letter}')"
                style="display: flex; align-items: center; justify-content: flex-start; gap: 16px; padding: 16px 20px; text-align: left; border-radius: var(--radius-md); border: 1px solid ${isSelected ? 'var(--accent-primary)' : 'var(--border-light)'}; background: ${isSelected ? 'var(--grad-hero)' : 'rgba(255,255,255,0.01)'}; box-shadow: none; font-weight: ${isSelected ? '600' : 'normal'}; line-height: 1.4;">
                <span style="display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 50%; font-weight: 700; font-size: 0.95rem; background: ${isSelected ? 'rgba(255,255,255,0.2)' : 'var(--bg-input)'}; color: ${isSelected ? '#fff' : 'var(--color-text-secondary)'};">
                  ${opt.letter}
                </span>
                <span style="flex-grow: 1;">${opt.text}</span>
              </button>
            `;
          }).join('')}
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-light); padding-top: 24px;">
          <button class="btn btn-secondary" onclick="prevSimuladoQuestion()" ${test.currentIdx === 0 ? 'disabled' : ''}>
            ⬅️ Anterior
          </button>
          
          <button class="btn btn-secondary" onclick="toggleQuestionFlag()" style="border-color: ${isFlagged ? 'var(--color-warning)' : ''}; color: ${isFlagged ? 'var(--color-warning)' : ''}; background: ${isFlagged ? 'rgba(245,158,11,0.08)' : ''};">
            🚩 ${isFlagged ? 'Marcada para Revisão' : 'Marcar para Revisão'}
          </button>

          ${test.currentIdx === test.questions.length - 1 ? `
            <button class="btn btn-primary" onclick="finishSimuladoGame()" style="background: var(--color-success); box-shadow: 0 4px 14px rgba(16, 185, 129, 0.3);">
              🏁 Finalizar Simulado
            </button>
          ` : `
            <button class="btn btn-primary" onclick="nextSimuladoQuestion()">
              Avançar ➡️
            </button>
          `}
        </div>
      </div>

      <!-- Right side: Questions navigation grid matrix -->
      <div class="card" style="margin-bottom: 0;">
        <h3 style="font-size: 1.1rem; margin-bottom: 8px;">Gabarito de Respostas</h3>
        <p style="font-size: 0.8rem; color: var(--color-text-secondary); margin-bottom: 20px;">
          Clique para navegar direto:
        </p>

        <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; margin-bottom: 24px;">
          ${test.questions.map((q, idx) => {
            const isCurrent = idx === test.currentIdx;
            const hasAnswered = test.answers[q.id];
            const flagged = test.flagged[q.id];

            let border = '1px solid var(--border-light)';
            let bg = 'var(--bg-input)';
            let color = 'var(--color-text-secondary)';

            if (hasAnswered) {
              bg = 'var(--accent-glow)';
              border = '1px solid var(--accent-primary)';
              color = 'var(--accent-primary)';
            }
            if (flagged) {
              border = '1px solid var(--color-warning)';
              color = 'var(--color-warning)';
            }
            if (isCurrent) {
              bg = 'var(--accent-primary)';
              color = '#fff';
              border = '1px solid var(--accent-primary)';
            }

            return `
              <button onclick="jumpToSimuladoQuestion(${idx})" style="height: 42px; border-radius: var(--radius-sm); border: ${border}; background: ${bg}; color: ${color}; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; position: relative;">
                ${idx + 1}
                ${flagged ? `<span style="position: absolute; top: 2px; right: 2px; font-size: 0.55rem;">🚩</span>` : ''}
              </button>
            `;
          }).join('')}
        </div>

        <div style="border-top: 1px solid var(--border-light); padding-top: 16px; display: flex; flex-direction: column; gap: 8px; font-size: 0.75rem; color: var(--color-text-secondary);">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="width: 12px; height: 12px; background: var(--accent-primary); border-radius: 3px;"></span>
            Questão Atual
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="width: 12px; height: 12px; background: var(--accent-glow); border: 1px solid var(--accent-primary); border-radius: 3px;"></span>
            Respondida
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="width: 12px; height: 12px; background: var(--bg-input); border: 1px solid var(--border-light); border-radius: 3px;"></span>
            Não Respondida
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="width: 12px; height: 12px; border: 1px solid var(--color-warning); border-radius: 3px;"></span>
            Revisão Pendente (Flag)
          </div>
        </div>
      </div>

    </div>
  `;
}

// Active test triggers
function jumpToSimuladoQuestion(idx) {
  state.activeTest.currentIdx = idx;
  renderView();
}
function prevSimuladoQuestion() {
  if (state.activeTest.currentIdx > 0) {
    state.activeTest.currentIdx--;
    renderView();
  }
}
function nextSimuladoQuestion() {
  if (state.activeTest.currentIdx < state.activeTest.questions.length - 1) {
    state.activeTest.currentIdx++;
    renderView();
  }
}
function toggleQuestionFlag() {
  const test = state.activeTest;
  const activeQ = test.questions[test.currentIdx];
  test.flagged[activeQ.id] = !test.flagged[activeQ.id];
  renderView();
}
function submitAnswerOption(letter) {
  const test = state.activeTest;
  const activeQ = test.questions[test.currentIdx];
  test.answers[activeQ.id] = letter;
  renderView();
}

function finishSimuladoGame() {
  const test = state.activeTest;
  clearInterval(test.intervalId);

  const unanswered = test.questions.filter(q => !test.answers[q.id]).length;
  if (unanswered > 0) {
    if (!confirm(`Você possui ${unanswered} questões não respondidas. Deseja finalizar mesmo assim?`)) {
      startTimer();
      return;
    }
  }

  // Calculate results
  let correct = 0;
  let incorrect = 0;
  const answersDetails = test.questions.map(q => {
    const userAns = test.answers[q.id] || null;
    const isCorrect = userAns === q.correctAnswer;
    if (isCorrect) correct++;
    else incorrect++;

    return {
      questionId: q.id,
      userAnswer: userAns,
      isCorrect
    };
  });

  const percentage = parseFloat(((correct / test.questions.length) * 100).toFixed(1));

  const resultSession = {
    questionsCount: test.questions.length,
    correctCount: correct,
    incorrectCount: incorrect,
    percentage,
    durationSeconds: test.time,
    answers: answersDetails
  };

  const saved = db.saveSimulado(resultSession);

  // Switch state to results view
  state.activeTest.state = 'results';
  state.activeTest.results = {
    ...saved,
    questions: test.questions,
    answersMap: test.answers
  };

  renderView();
}

function renderResultsScreen(container) {
  const test = state.activeTest;
  const results = test.results;

  // Radial Progress Circle markup
  const radius = 60;
  const stroke = 12;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (results.percentage / 100) * circumference;

  let color = 'var(--color-danger)';
  if (results.percentage >= 70) color = 'var(--color-success)';
  else if (results.percentage >= 50) color = 'var(--color-warning)';

  const circularGaugeMarkup = `
    <svg height="${radius * 2}" width="${radius * 2}" style="transform: rotate(-90deg);">
      <circle stroke="var(--bg-input)" fill="transparent" stroke-width="${stroke}" r="${normalizedRadius}" cx="${radius}" cy="${radius}"></circle>
      <circle stroke="${color}" fill="transparent" stroke-width="${stroke}" stroke-dasharray="${circumference} ${circumference}" style="stroke-dashoffset: ${strokeDashoffset};" r="${normalizedRadius}" cx="${radius}" cy="${radius}" stroke-linecap="round"></circle>
      <text x="50%" y="50%" text-anchor="middle" stroke="${color}" stroke-width="1.5px" dy=".3em" style="transform: rotate(90deg); transform-origin: center; font-size: 1.2rem; font-family: var(--font-display); font-weight: 800;">
        ${results.percentage}%
      </text>
    </svg>
  `;

  // Calculate stats per subject
  const subjectStats = {};
  const groupedQuestions = {};

  results.questions.forEach((q, idx) => {
    const uAns = results.answersMap[q.id] || null;
    const isCorrect = uAns === q.correctAnswer;
    
    // Group stats
    if (!subjectStats[q.subject]) {
      subjectStats[q.subject] = { correct: 0, total: 0 };
    }
    subjectStats[q.subject].total++;
    if (isCorrect) subjectStats[q.subject].correct++;

    // Group questions list
    if (!groupedQuestions[q.subject]) {
      groupedQuestions[q.subject] = [];
    }
    groupedQuestions[q.subject].push({ ...q, originalIndex: idx + 1 });
  });

  container.innerHTML = `
    <div class="animate-fade" style="max-width: 900px; margin: 0 auto;">
      
      <!-- Results Report Card Header -->
      <div class="card" style="display: flex; align-items: center; gap: 32px; padding: 32px; background: var(--bg-card); border-left: 4px solid ${color};">
        <div>
          ${circularGaugeMarkup}
        </div>
        <div style="flex-grow: 1;">
          <span class="badge ${results.percentage >= 70 ? 'badge-success' : results.percentage >= 50 ? 'badge-warning' : 'badge-danger'}" style="margin-bottom: 8px;">
            ${results.percentage >= 70 ? 'Aprovado no Simulado!' : results.percentage >= 50 ? 'Estude mais um pouco!' : 'Desempenho Crítico'}
          </span>
          <h2 style="font-size: 1.6rem; font-weight: 800; margin-bottom: 8px;">Resultado da Simulação</h2>
          <p style="color: var(--color-text-secondary); font-size: 0.9rem;">
            Você acertou <strong>${results.correctCount}</strong> e errou <strong>${results.incorrectCount}</strong> de um total de ${results.questionsCount} questões.
          </p>
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px; min-width: 160px; font-size: 0.85rem; color: var(--color-text-secondary);">
          <div>⏱️ Duração: <strong>${formatTime(results.durationSeconds)}</strong></div>
          <div>📅 Data: <strong>${new Date(results.date).toLocaleDateString('pt-BR')}</strong></div>
          <button class="btn btn-primary" onclick="resetSimuladoGameWorkspace()" style="font-size: 0.85rem; padding: 10px; margin-top: 6px;">
            🔄 Novo Simulado
          </button>
        </div>
      </div>

      <!-- Subject Performance Breakdown Card -->
      <div class="card" style="margin-bottom: 32px;">
        <h3 style="font-size: 1.15rem; margin-bottom: 16px;">📊 Desempenho por Assunto</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px;">
          ${Object.keys(subjectStats).map(subj => {
            const stat = subjectStats[subj];
            const pct = Math.round((stat.correct / stat.total) * 100);
            let barColor = 'var(--color-danger)';
            if (pct >= 70) barColor = 'var(--color-success)';
            else if (pct >= 50) barColor = 'var(--color-warning)';
            
            return `
              <div style="background: var(--bg-input); padding: 12px 16px; border-radius: var(--radius-md); border: 1px solid var(--border-light); display: flex; flex-direction: column; gap: 4px;">
                <span style="font-size: 0.85rem; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${subj}">${subj}</span>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px;">
                  <span style="font-size: 0.8rem; color: var(--color-text-secondary);">${stat.correct}/${stat.total} acertos</span>
                  <span style="font-size: 0.9rem; font-weight: bold; color: ${barColor};">${pct}%</span>
                </div>
                <div style="width: 100%; height: 6px; background: rgba(255,255,255,0.05); border-radius: 3px; overflow: hidden; margin-top: 4px;">
                  <div style="width: ${pct}%; height: 100%; background: ${barColor}; border-radius: 3px;"></div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Grouped Correction Sheet list -->
      <h3 style="font-size: 1.25rem; margin-bottom: 20px;">🔍 Correção Detalhada por Assunto</h3>
      <div style="display: flex; flex-direction: column; gap: 32px;">
        ${Object.keys(groupedQuestions).map(subj => `
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <h4 style="font-size: 1.15rem; color: var(--accent-primary); border-bottom: 2px solid var(--accent-glow); padding-bottom: 8px; font-family: var(--font-display);">${subj}</h4>
            <div style="display: flex; flex-direction: column; gap: 24px;">
              ${groupedQuestions[subj].map(q => {
                const uAns = results.answersMap[q.id] || null;
                const isCorrect = uAns === q.correctAnswer;

                return `
                  <div class="card" style="background: var(--bg-input); border-left: 4px solid ${isCorrect ? 'var(--color-success)' : 'var(--color-danger)'}; margin-bottom: 0;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; border-bottom: 1px solid var(--border-light); padding-bottom: 8px; font-size: 0.8rem; color: var(--color-text-muted);">
                      <div>
                        <span>Questão ${q.originalIndex}</span>
                      </div>
                      <div>
                        ${isCorrect ? `<span style="color: var(--color-success); font-weight: bold;">✓ ACERTOU</span>` : `<span style="color: var(--color-danger); font-weight: bold;">✗ ERROU</span>`}
                      </div>
                    </div>

                    <p style="font-size: 0.95rem; line-height: 1.5; color: var(--color-text-primary); margin-bottom: 16px; white-space: pre-wrap;">${q.text}</p>

                    <div style="display: flex; flex-direction: column; gap: 8px;">
                      ${q.options.map(opt => {
                        const optIsUser = uAns === opt.letter;
                        const optIsCorrect = q.correctAnswer === opt.letter;

                        let optBg = 'rgba(255,255,255,0.01)';
                        let optBorder = '1px solid var(--border-light)';
                        let tag = '';

                        if (optIsCorrect) {
                          optBg = 'rgba(16, 185, 129, 0.06)';
                          optBorder = '1px solid var(--color-success)';
                          tag = ' (Gabarito Oficial ✓)';
                        }
                        if (optIsUser && !isCorrect) {
                          optBg = 'rgba(239, 68, 68, 0.06)';
                          optBorder = '1px solid var(--color-danger)';
                          tag = ' (Sua Resposta ✗)';
                        } else if (optIsUser && isCorrect) {
                          tag = ' (Sua Resposta Correta ✓)';
                        }

                        return `
                          <div style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: var(--radius-sm); background: ${optBg}; border: ${optBorder}; font-size: 0.85rem;">
                            <span style="display: flex; align-items: center; justify-content: center; width: 24px; height: 24px; border-radius: 50%; font-size: 0.75rem; font-weight: bold; background: ${optIsCorrect ? 'var(--color-success)' : optIsUser ? 'var(--color-danger)' : 'var(--bg-input)'}; color: ${optIsCorrect || optIsUser ? '#fff' : 'var(--color-text-secondary)'};">
                              ${opt.letter}
                            </span>
                            <span style="color: ${optIsCorrect ? 'var(--color-text-primary)' : 'var(--color-text-secondary)'}; font-weight: ${optIsCorrect ? '500' : 'normal'};">
                              ${opt.text} <strong>${tag}</strong>
                            </span>
                          </div>
                        `;
                      }).join('')}
                    </div>

                    ${q.explanation ? `
                      <div style="margin-top: 16px; padding: 12px 16px; border-radius: var(--radius-sm); background: rgba(99,102,241,0.05); border: 1px solid rgba(99,102,241,0.15); font-size: 0.8rem; color: var(--color-text-secondary);">
                        💡 <strong>Comentário de Gabarito:</strong> ${q.explanation}
                      </div>
                    ` : ''}
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        `).join('')}
      </div>

    </div>
  `;
}

function resetSimuladoGameWorkspace() {
  state.activeTest = null;
  renderView();
}


// --- GLOBAL UTILITIES ---
function formatTime(secs) {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

// --- VIEW 6: HELP & USER GUIDE ---
function renderHelp(container) {
  container.innerHTML = `
    <div class="animate-fade" style="max-width: 1000px; margin: 0 auto;">
      <div class="page-header">
        <h1 class="page-title">Ajuda & Guia do Usuário</h1>
        <p class="page-subtitle">Aprenda a operar e extrair o máximo de proveito do SEDES-DF Simulado</p>
      </div>

      <div style="display: flex; flex-direction: column; gap: 32px;">
        
        <!-- Intro Card -->
        <div class="card" style="background: var(--grad-hero); color: #fff; border: none; margin-bottom: 0;">
          <h3 style="font-size: 1.3rem; font-weight: 700; margin-bottom: 8px;">Bem-vindo ao Simulador SEDES-DF!</h3>
          <p style="opacity: 0.95; line-height: 1.6; font-size: 0.95rem;">
            Este sistema foi projetado para rodar de forma 100% local no seu navegador. Isso significa que seus dados, questões e histórico de simulados nunca saem do seu computador. Veja a seguir como usar cada uma das funcionalidades principais.
          </p>
        </div>

        <!-- How to use Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
          
          <div class="card" style="margin-bottom: 0;">
            <h3 style="font-size: 1.1rem; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
              <span>📥</span> Baixar Provas
            </h3>
            <p style="color: var(--color-text-secondary); font-size: 0.88rem; line-height: 1.5; margin-bottom: 12px;">
              Clique no menu lateral e veja links rápidos curados para encontrar provas do SEDES-DF no PCI Concursos.
            </p>
            <ul style="padding-left: 16px; font-size: 0.8rem; color: var(--color-text-secondary); display: flex; flex-direction: column; gap: 6px;">
              <li>Faça o download do PDF oficial no seu computador.</li>
              <li>Recomendamos salvar no diretório <code>downloads/</code> do projeto para organização.</li>
              <li>Acesse a tela "Varrer PDF" para processar o arquivo.</li>
            </ul>
          </div>

          <div class="card" style="margin-bottom: 0;">
            <h3 style="font-size: 1.1rem; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
              <span>⚡</span> Varrer e Extrair
            </h3>
            <p style="color: var(--color-text-secondary); font-size: 0.88rem; line-height: 1.5; margin-bottom: 12px;">
              Arraste e solte o PDF baixado no painel. Nosso algoritmo hebrístico irá ler o PDF e tentar estruturar as questões automaticamente.
            </p>
            <ul style="padding-left: 16px; font-size: 0.8rem; color: var(--color-text-secondary); display: flex; flex-direction: column; gap: 6px;">
              <li><strong>Sem Gabarito?</strong> Não tem problema! Você pode importar questões sem definir gabarito. Elas apenas não serão sorteadas nos simulados até você editá-las e marcar a resposta correta no Banco.</li>
              <li>Você pode alterar enunciados ou alternativas diretamente na tela de revisão.</li>
              <li>Defina filtros globais de matéria/ano para agilizar a importação.</li>
            </ul>
          </div>

          <div class="card" style="margin-bottom: 0;">
            <h3 style="font-size: 1.1rem; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
              <span>📚</span> Banco de Questões
            </h3>
            <p style="color: var(--color-text-secondary); font-size: 0.88rem; line-height: 1.5; margin-bottom: 12px;">
              O coração da sua preparação. Aqui você gerencia o acervo completo de questões salvas no sistema.
            </p>
            <ul style="padding-left: 16px; font-size: 0.8rem; color: var(--color-text-secondary); display: flex; flex-direction: column; gap: 6px;">
              <li>Use a barra de pesquisa para filtrar por palavras, banca, ano ou matéria.</li>
              <li>As questões importadas sem gabarito recebem um destaque vermelho <code>[Sem Gabarito]</code>.</li>
              <li>Clique em "Editar" para atualizar enunciados ou definir respostas.</li>
              <li>Faça backups exportando suas questões para arquivos JSON.</li>
            </ul>
          </div>

          <div class="card" style="margin-bottom: 0;">
            <h3 style="font-size: 1.1rem; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
              <span>🚀</span> Simulados Reais
            </h3>
            <p style="color: var(--color-text-secondary); font-size: 0.88rem; line-height: 1.5; margin-bottom: 12px;">
              Pratique sob condições reais de prova com um cronômetro e feedback detalhado.
            </p>
            <ul style="padding-left: 16px; font-size: 0.8rem; color: var(--color-text-secondary); display: flex; flex-direction: column; gap: 6px;">
              <li>Selecione disciplinas específicas ou faça simulados gerais.</li>
              <li>Use a bandeira <code>🚩</code> para marcar questões difíceis para revisar no final antes de encerrar.</li>
              <li><strong>Correção por Assunto:</strong> O resultado final mostra o aproveitamento detalhado por matéria, permitindo mapear suas fraquezas de estudo.</li>
            </ul>
          </div>

        </div>

        <!-- Local Data Management Card -->
        <div class="card">
          <h3 style="font-size: 1.15rem; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
            <span>💾</span> Armazenamento e Backup dos Seus Dados
          </h3>
          <p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.6; margin-bottom: 12px;">
            Como as informações ficam armazenadas no <code>LocalStorage</code> do seu navegador, limpar o histórico recente ou os cookies do navegador pode apagar seus dados.
          </p>
          <p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.6; margin-bottom: 16px; font-weight: 600;">
            ⚠️ Recomendação Importante: Vá no menu "Banco de Questões" regularmente e clique em "Exportar Backup JSON". Esse arquivo contém todas as suas questões salvas e poderá ser importado de volta a qualquer momento.
          </p>
          <div style="display: flex; gap: 12px;">
            <button class="btn btn-secondary" onclick="setTab('dashboard')">🏠 Voltar ao Painel Geral</button>
            <button class="btn btn-primary" onclick="setTab('simulator')">🚀 Iniciar Novo Simulado</button>
          </div>
        </div>

      </div>
    </div>
  `;
}

// Window globally binding
window.setTab = setTab;
window.toggleTheme = toggleTheme;
window.initiateSimuladoGame = initiateSimuladoGame;
window.toggleTimerBtn = toggleTimerBtn;
window.submitAnswerOption = submitAnswerOption;
window.toggleQuestionFlag = toggleQuestionFlag;
window.nextSimuladoQuestion = nextSimuladoQuestion;
window.prevSimuladoQuestion = prevSimuladoQuestion;
window.finishSimuladoGame = finishSimuladoGame;
window.jumpToSimuladoQuestion = jumpToSimuladoQuestion;
window.resetSimuladoGameWorkspace = resetSimuladoGameWorkspace;

// Review Parser bindings
window.toggleQuestionTypeInParser = toggleQuestionTypeInParser;
window.removeQuestionFromParser = removeQuestionFromParser;
window.setQuestionGabaritoInParser = setQuestionGabaritoInParser;
window.updateOptionTextInParser = updateOptionTextInParser;
window.updateQuestionTextInParser = updateQuestionTextInParser;
window.updateQuestionSubjectInParser = updateQuestionSubjectInParser;
window.updateQuestionExplanationInParser = updateQuestionExplanationInParser;
window.addManualQuestionInParser = addManualQuestionInParser;
window.applyGlobalSettingsToBatch = applyGlobalSettingsToBatch;
window.saveParsedToDatabase = saveParsedToDatabase;

// Bank editor bindings
window.handleBankSearchChange = handleBankSearchChange;
window.handleBankSubjectFilterChange = handleBankSubjectFilterChange;
window.handleBankTypeFilterChange = handleBankTypeFilterChange;
window.deleteQuestion = deleteQuestion;
window.triggerDatabaseExport = triggerDatabaseExport;
window.openCreateQuestionModal = openCreateQuestionModal;
window.openEditQuestionModal = openEditQuestionModal;
window.closeQuestionModal = closeQuestionModal;
window.toggleModalQuestionType = toggleModalQuestionType;
window.updateModalOptionText = updateModalOptionText;
window.setModalCorrectAnswer = setModalCorrectAnswer;

// Login and Auth Bindings
window.setupAdminPassword = setupAdminPassword;
window.selectRole = selectRole;
window.showAdminPasswordPrompt = showAdminPasswordPrompt;
window.cancelAdminLogin = cancelAdminLogin;
window.loginAsAdmin = loginAsAdmin;
window.logoutSession = logoutSession;
window.verifyUnlockPassword = verifyUnlockPassword;
window.closeUnlockModal = closeUnlockModal;

// Initial Startup Calls
initTheme();
initLoginCheck();
