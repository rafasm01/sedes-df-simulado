import React, { useState, useEffect } from 'react';
import Dashboard from './views/Dashboard';
import Downloader from './views/Downloader';
import Parser from './views/Parser';
import QuestionBank from './views/QuestionBank';
import Simulator from './views/Simulator';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [questions, setQuestions] = useState([]);
  const [selectedFile, setSelectedFile] = useState('');
  const [theme, setTheme] = useState('dark');

  // Fetch initial questions list to share
  const fetchQuestionsList = async () => {
    try {
      const res = await fetch('/api/questions');
      const data = await res.json();
      setQuestions(data);
    } catch (error) {
      console.error("Failed to load questions shared list:", error);
    }
  };

  useEffect(() => {
    fetchQuestionsList();
  }, [activeTab]);

  // Handle theme switching
  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    if (nextTheme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard setTab={setActiveTab} questions={questions} setQuestions={setQuestions} />;
      case 'downloader':
        return <Downloader setTab={setActiveTab} setSelectedFile={setSelectedFile} />;
      case 'parser':
        return <Parser selectedFile={selectedFile} setSelectedFile={setSelectedFile} />;
      case 'bank':
        return <QuestionBank questions={questions} setQuestions={setQuestions} />;
      case 'simulator':
        return <Simulator questions={questions} />;
      default:
        return <Dashboard setTab={setActiveTab} questions={questions} setQuestions={setQuestions} />;
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar navigation */}
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-logo">📝</span>
          <span className="brand-name">SEDES Simulado</span>
        </div>

        <nav className="nav-links">
          <div
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <span>📊</span> Painel Geral
          </div>
          
          <div
            className={`nav-item ${activeTab === 'downloader' ? 'active' : ''}`}
            onClick={() => setActiveTab('downloader')}
          >
            <span>📥</span> Baixar Provas
          </div>
          
          <div
            className={`nav-item ${activeTab === 'parser' ? 'active' : ''}`}
            onClick={() => setActiveTab('parser')}
          >
            <span>⚡</span> Varrer PDF
          </div>
          
          <div
            className={`nav-item ${activeTab === 'bank' ? 'active' : ''}`}
            onClick={() => setActiveTab('bank')}
          >
            <span>📚</span> Banco de Questões
          </div>
          
          <div
            className={`nav-item ${activeTab === 'simulator' ? 'active' : ''}`}
            onClick={() => setActiveTab('simulator')}
          >
            <span>🚀</span> Fazer Simulado
          </div>
        </nav>

        <div className="sidebar-footer">
          <button className="theme-toggle-btn" onClick={toggleTheme}>
            {theme === 'dark' ? '☀️ Modo Claro' : '🌙 Modo Escuro'}
          </button>
          
          <div style={{
            fontSize: '0.75rem',
            color: 'var(--color-text-muted)',
            textAlign: 'center',
            borderTop: '1px solid var(--border-light)',
            paddingTop: '12px'
          }}>
            V 1.0.0 • SEDES-DF 2026
          </div>
        </div>
      </aside>

      {/* Main viewport */}
      <main className="main-content">
        {renderActiveView()}
      </main>
    </div>
  );
}
