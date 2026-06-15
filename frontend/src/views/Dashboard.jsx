import React, { useEffect, useState } from 'react';

export default function Dashboard({ setTab, questions, setQuestions }) {
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState({
    totalQuestions: 0,
    totalSimulados: 0,
    avgScore: 0,
    successRate: 0
  });

  const fetchDashboardData = async () => {
    try {
      const qRes = await fetch('/api/questions');
      const qData = await qRes.json();
      setQuestions(qData);

      const sRes = await fetch('/api/simulados');
      const sData = await sRes.json();
      setHistory(sData);

      if (sData.length > 0) {
        const totalCorrect = sData.reduce((acc, curr) => acc + (curr.correctCount || 0), 0);
        const totalQ = sData.reduce((acc, curr) => acc + (curr.questionsCount || 0), 0);
        const rate = totalQ > 0 ? ((totalCorrect / totalQ) * 100).toFixed(1) : 0;
        
        const avg = sData.reduce((acc, curr) => acc + (curr.percentage || 0), 0) / sData.length;

        setStats({
          totalQuestions: qData.length,
          totalSimulados: sData.length,
          avgScore: avg.toFixed(1),
          successRate: rate
        });
      } else {
        setStats({
          totalQuestions: qData.length,
          totalSimulados: 0,
          avgScore: 0,
          successRate: 0
        });
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Format duration (seconds -> MM:SS)
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="animate-fade">
      <div className="page-header">
        <h1 className="page-title">Painel do Candidato</h1>
        <p className="page-subtitle">Monitore sua preparação para o concurso da SEDES-DF</p>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '24px',
        marginBottom: '40px'
      }}>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ fontSize: '2.5rem', background: 'rgba(139, 92, 246, 0.1)', padding: '16px', borderRadius: '16px' }}>📚</div>
          <div>
            <h4 style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase' }}>Banco de Questões</h4>
            <h2 style={{ fontSize: '2rem', marginTop: '4px' }}>{stats.totalQuestions}</h2>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ fontSize: '2.5rem', background: 'rgba(99, 102, 241, 0.1)', padding: '16px', borderRadius: '16px' }}>🏆</div>
          <div>
            <h4 style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase' }}>Simulados Feitos</h4>
            <h2 style={{ fontSize: '2rem', marginTop: '4px' }}>{stats.totalSimulados}</h2>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ fontSize: '2.5rem', background: 'rgba(16, 185, 129, 0.1)', padding: '16px', borderRadius: '16px' }}>📈</div>
          <div>
            <h4 style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase' }}>Média de Acertos</h4>
            <h2 style={{ fontSize: '2rem', marginTop: '4px' }}>{stats.avgScore}%</h2>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ fontSize: '2.5rem', background: 'rgba(245, 158, 11, 0.1)', padding: '16px', borderRadius: '16px' }}>🎯</div>
          <div>
            <h4 style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase' }}>Aproveitamento Total</h4>
            <h2 style={{ fontSize: '2rem', marginTop: '4px' }}>{stats.successRate}%</h2>
          </div>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '32px'
      }}>
        {/* Main Dashboard Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Performance Chart */}
          <div className="card">
            <h3 style={{ fontSize: '1.2rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              📊 Evolução de Desempenho
            </h3>
            {history.length > 0 ? (
              <div style={{ position: 'relative', height: '200px', display: 'flex', alignItems: 'flex-end', gap: '20px', padding: '20px 10px 0' }}>
                {history.slice(-8).map((sim, index) => (
                  <div key={sim.id} style={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '100%'
                  }}>
                    <div style={{ color: 'var(--accent-primary)', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '8px' }}>
                      {sim.percentage}%
                    </div>
                    {/* Bar graphic */}
                    <div style={{
                      width: '32px',
                      height: `${sim.percentage}%`,
                      background: 'var(--grad-hero)',
                      borderRadius: '8px 8px 0 0',
                      boxShadow: '0 4px 10px rgba(139, 92, 246, 0.3)',
                      transition: 'height var(--transition-normal) ease'
                    }} />
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '8px', textAlign: 'center', width: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {new Date(sim.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{
                height: '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-text-muted)',
                border: '2px dashed var(--border-light)',
                borderRadius: '12px'
              }}>
                Nenhum simulado feito ainda. Os resultados dos seus testes aparecerão aqui!
              </div>
            )}
          </div>

          {/* Recent History Table */}
          <div className="card">
            <h3 style={{ fontSize: '1.2rem', marginBottom: '20px' }}>📝 Histórico Recente de Simulados</h3>
            {history.length > 0 ? (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-light)', color: 'var(--color-text-secondary)' }}>
                      <th style={{ padding: '12px 16px' }}>Data</th>
                      <th style={{ padding: '12px 16px' }}>Questões</th>
                      <th style={{ padding: '12px 16px' }}>Acertos</th>
                      <th style={{ padding: '12px 16px' }}>Desempenho</th>
                      <th style={{ padding: '12px 16px' }}>Tempo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.slice(-5).reverse().map((sim) => (
                      <tr key={sim.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                        <td style={{ padding: '16px' }}>
                          {new Date(sim.date).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}
                        </td>
                        <td style={{ padding: '16px' }}>{sim.questionsCount}</td>
                        <td style={{ padding: '16px' }}>
                          <span style={{ color: 'var(--color-success)', fontWeight: 'bold' }}>{sim.correctCount}</span> / <span style={{ color: 'var(--color-danger)' }}>{sim.incorrectCount}</span>
                        </td>
                        <td style={{ padding: '16px' }}>
                          <span className={`badge ${sim.percentage >= 70 ? 'badge-success' : sim.percentage >= 50 ? 'badge-warning' : 'badge-danger'}`}>
                            {sim.percentage}%
                          </span>
                        </td>
                        <td style={{ padding: '16px' }}>{formatTime(sim.durationSeconds)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p style={{ color: 'var(--color-text-secondary)', textAlign: 'center', padding: '20px 0' }}>
                Nenhum registro encontrado. Comece respondendo a um simulado!
              </p>
            )}
          </div>
        </div>

        {/* Sidebar Actions / Tips */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div className="card" style={{ background: 'var(--grad-hero)', color: '#fff', border: 'none' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '12px' }}>Comece Agora</h3>
            <p style={{ opacity: 0.9, fontSize: '0.95rem', marginBottom: '24px', lineHeight: '1.5' }}>
              Baixe provas da internet em PDF, extraia as questões automaticamente, revise e monte seu simulado personalizado!
            </p>
            <button className="btn btn-secondary" onClick={() => setTab('simulator')} style={{ background: '#fff', color: 'var(--accent-primary)', border: 'none', width: '100%' }}>
              🚀 Iniciar Novo Simulado
            </button>
          </div>

          <div className="card">
            <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>💡 Dicas de Estudo</h3>
            <ul style={{ listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
              <li style={{ display: 'flex', gap: '10px' }}>
                <span>🎯</span>
                <span>Foque na <strong>Lei Orgânica da Assistência Social (LOAS)</strong>, tema muito cobrado em provas da SEDES.</span>
              </li>
              <li style={{ display: 'flex', gap: '10px' }}>
                <span>⏱️</span>
                <span>Tente resolver simulados cronometrados para simular a pressão real do dia da prova.</span>
              </li>
              <li style={{ display: 'flex', gap: '10px' }}>
                <span>📝</span>
                <span>Ao errar uma questão, use o banco para editar e adicionar uma anotação explicando a regra.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
