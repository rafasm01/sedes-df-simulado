import React, { useState, useEffect } from 'react';

export default function Simulator({ questions }) {
  // Simulator States
  // 'config' | 'playing' | 'results'
  const [gameState, setGameState] = useState('config');
  
  // Config States
  const [numQuestions, setNumQuestions] = useState(10);
  const [selectedSubject, setSelectedSubject] = useState('Todas');
  const [selectedType, setSelectedType] = useState('Todos');
  
  // Playing States
  const [testQuestions, setTestQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { [questionId]: letter }
  const [flaggedQuestions, setFlaggedQuestions] = useState({}); // { [questionId]: boolean }
  
  // Timer States
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  
  // Results States
  const [results, setResults] = useState(null);

  // Available subjects from database
  const getSubjectsList = () => {
    const list = new Set(questions.map(q => q.subject));
    return ['Todas', ...Array.from(list)];
  };

  // Timer Ticking Effect
  useEffect(() => {
    let interval = null;
    if (timerActive && gameState === 'playing') {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerActive, gameState]);

  const handleStartSimulado = () => {
    // Filter questions based on configuration
    let pool = [...questions];
    if (selectedSubject !== 'Todas') {
      pool = pool.filter(q => q.subject === selectedSubject);
    }
    if (selectedType !== 'Todos') {
      pool = pool.filter(q => q.type === selectedType);
    }

    if (pool.length === 0) {
      alert("Nenhuma questão disponível para esses filtros. Tente selecionar outra matéria ou tipo!");
      return;
    }

    // Shuffle pool
    const shuffled = pool.sort(() => 0.5 - Math.random());
    // Slice according to number of questions
    const limit = Math.min(numQuestions, shuffled.length);
    const selected = shuffled.slice(0, limit);

    setTestQuestions(selected);
    setCurrentIdx(0);
    setUserAnswers({});
    setFlaggedQuestions({});
    setTimeElapsed(0);
    setGameState('playing');
    setTimerActive(true);
  };

  const handleSelectAnswer = (letter) => {
    const activeQuestion = testQuestions[currentIdx];
    setUserAnswers({
      ...userAnswers,
      [activeQuestion.id]: letter
    });
  };

  const handleToggleFlag = () => {
    const activeQuestion = testQuestions[currentIdx];
    setFlaggedQuestions({
      ...flaggedQuestions,
      [activeQuestion.id]: !flaggedQuestions[activeQuestion.id]
    });
  };

  const handleNext = () => {
    if (currentIdx < testQuestions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  const handleFinishSimulado = async () => {
    setTimerActive(false);
    
    // Check if there are unanswered questions
    const unansweredCount = testQuestions.filter(q => !userAnswers[q.id]).length;
    if (unansweredCount > 0) {
      if (!confirm(`Você ainda possui ${unansweredCount} questões não respondidas. Deseja finalizar assim mesmo?`)) {
        setTimerActive(true);
        return;
      }
    }

    // Process statistics
    let correct = 0;
    let incorrect = 0;
    const details = testQuestions.map(q => {
      const uAns = userAnswers[q.id] || null;
      const isCorrect = uAns === q.correctAnswer;
      if (isCorrect) correct++;
      else incorrect++;
      
      return {
        questionId: q.id,
        userAnswer: uAns,
        isCorrect
      };
    });

    const percent = parseFloat(((correct / testQuestions.length) * 100).toFixed(1));

    const finalSimulado = {
      questionsCount: testQuestions.length,
      correctCount: correct,
      incorrectCount: incorrect,
      percentage: percent,
      durationSeconds: timeElapsed,
      answers: details
    };

    try {
      // Save stats to local database
      const res = await fetch('/api/simulados', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalSimulado)
      });
      const saved = await res.json();
      setResults({ ...saved, questions: testQuestions, answersMap: userAnswers });
      setGameState('results');
    } catch (error) {
      console.error("Error saving mock exam results:", error);
      // Fallback in case of server failure
      setResults({ ...finalSimulado, id: 'offline', date: new Date().toISOString(), questions: testQuestions, answersMap: userAnswers });
      setGameState('results');
    }
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // SVG Circular Gauge renderer
  const renderRadialProgress = (percentage) => {
    const radius = 60;
    const stroke = 12;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    let color = 'var(--color-danger)';
    if (percentage >= 70) color = 'var(--color-success)';
    else if (percentage >= 50) color = 'var(--color-warning)';

    return (
      <svg height={radius * 2} width={radius * 2} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          stroke="var(--bg-input)"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.5s ease-in-out' }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          strokeLinecap="round"
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          stroke={color}
          strokeWidth="1.5px"
          dy=".3em"
          style={{ transform: 'rotate(90deg)', transformOrigin: 'center', fontSize: '1.2rem', fontFamily: 'var(--font-display)', fontWeight: '800' }}
        >
          {percentage}%
        </text>
      </svg>
    );
  };

  // Renders different game screens
  if (questions.length === 0) {
    return (
      <div className="card text-center" style={{ padding: '60px 40px', maxWidth: '600px', margin: '40px auto', textAlign: 'center' }}>
        <span style={{ fontSize: '4rem' }}>⚠️</span>
        <h2 style={{ fontSize: '1.8rem', margin: '20px 0 10px' }}>Banco de Questões Vazio</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6', marginBottom: '30px' }}>
          Para iniciar um simulado, primeiro você precisa adicionar questões ao banco de dados. Você pode fazer o download de provas anteriores e extrair as questões automaticamente, ou cadastrá-las manualmente no banco de dados.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <button className="btn btn-primary" onClick={() => window.location.reload()}>
            Recarregar Página
          </button>
        </div>
      </div>
    );
  }

  // SCREEN 1: Configuration
  if (gameState === 'config') {
    const subjectsList = getSubjectsList();
    return (
      <div className="animate-fade" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div className="page-header text-center" style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 className="page-title">Configurar Simulado</h1>
          <p className="page-subtitle">Personalize a quantidade de questões e disciplinas para treinar</p>
        </div>

        <div className="card">
          <h3 style={{ fontSize: '1.2rem', marginBottom: '24px', paddingBottom: '12px', borderBottom: '1px solid var(--border-light)' }}>
            ⚙️ Opções de Personalização
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div className="form-group">
              <label className="form-label">Disciplina / Assunto</label>
              <select
                className="form-select"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                style={{ padding: '14px' }}
              >
                {subjectsList.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="form-group">
                <label className="form-label">Quantidade de Questões</label>
                <select
                  className="form-select"
                  value={numQuestions}
                  onChange={(e) => setNumQuestions(parseInt(e.target.value, 10))}
                  style={{ padding: '14px' }}
                >
                  <option value={5}>5 Questões</option>
                  <option value={10}>10 Questões</option>
                  <option value={20}>20 Questões</option>
                  <option value={30}>30 Questões</option>
                  <option value={50}>50 Questões</option>
                  <option value={100}>100 Questões</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Formato das Questões</label>
                <select
                  className="form-select"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  style={{ padding: '14px' }}
                >
                  <option value="Todos">Todos (Mesclado)</option>
                  <option value="multiple_choice">Múltipla Escolha (A-E)</option>
                  <option value="certo_errado">Certo / Errado</option>
                </select>
              </div>
            </div>

            <button
              className="btn btn-primary"
              onClick={handleStartSimulado}
              style={{
                marginTop: '16px',
                padding: '16px',
                fontSize: '1.1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px'
              }}
            >
              🚀 Iniciar Simulado Cronometrado
            </button>
          </div>
        </div>
      </div>
    );
  }

  // SCREEN 2: Playing / Taking Test
  if (gameState === 'playing') {
    const activeQuestion = testQuestions[currentIdx];
    const isQuestionFlagged = flaggedQuestions[activeQuestion.id];
    const hasAnswered = userAnswers[activeQuestion.id];

    return (
      <div className="animate-fade" style={{
        display: 'grid',
        gridTemplateColumns: '2.5fr 1fr',
        gap: '32px',
        alignItems: 'start'
      }}>
        
        {/* Left Side: Exam Sheet */}
        <div className="card" style={{ padding: '32px', borderLeft: '4px solid var(--accent-primary)' }}>
          {/* Header Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px',
            borderBottom: '1px solid var(--border-light)',
            paddingBottom: '16px'
          }}>
            <div>
              <span className="badge badge-info">{activeQuestion.subject}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginLeft: '12px' }}>
                {activeQuestion.source} • {activeQuestion.year}
              </span>
            </div>
            
            {/* Timer HUD */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: 'var(--bg-input)',
              padding: '6px 14px',
              borderRadius: '20px',
              border: '1px solid var(--border-light)',
              fontWeight: '600',
              fontFamily: 'monospace'
            }}>
              <span>⏱️ {formatTime(timeElapsed)}</span>
              <button
                type="button"
                onClick={() => setTimerActive(!timerActive)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
                title={timerActive ? "Pausar Cronômetro" : "Retomar Cronômetro"}
              >
                {timerActive ? '⏸️' : '▶️'}
              </button>
            </div>
          </div>

          {/* Question Text */}
          <div style={{ minHeight: '120px', marginBottom: '32px' }}>
            <h3 style={{ fontSize: '1.15rem', lineHeight: '1.6', fontWeight: '500', color: 'var(--color-text-primary)', whiteSpace: 'pre-wrap' }}>
              {activeQuestion.text}
            </h3>
          </div>

          {/* Answer Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px' }}>
            {activeQuestion.options.map((opt) => {
              const isSelected = userAnswers[activeQuestion.id] === opt.letter;
              return (
                <button
                  key={opt.letter}
                  className={`btn ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => handleSelectAnswer(opt.letter)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    gap: '16px',
                    padding: '16px 20px',
                    textAlign: 'left',
                    borderRadius: 'var(--radius-md)',
                    border: `1px solid ${isSelected ? 'var(--accent-primary)' : 'var(--border-light)'}`,
                    background: isSelected ? 'var(--grad-hero)' : 'rgba(255,255,255,0.01)',
                    boxShadow: 'none',
                    fontWeight: isSelected ? '600' : 'normal',
                    lineHeight: '1.4'
                  }}
                >
                  <span style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    fontWeight: '700',
                    fontSize: '0.95rem',
                    background: isSelected ? 'rgba(255, 255, 255, 0.2)' : 'var(--bg-input)',
                    color: isSelected ? '#fff' : 'var(--color-text-secondary)'
                  }}>
                    {opt.letter}
                  </span>
                  <span style={{ flexGrow: 1 }}>{opt.text}</span>
                </button>
              );
            })}
          </div>

          {/* Controls Footer */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid var(--border-light)',
            paddingTop: '24px'
          }}>
            <button
              className="btn btn-secondary"
              onClick={handlePrev}
              disabled={currentIdx === 0}
            >
              ⬅️ Anterior
            </button>

            <button
              onClick={handleToggleFlag}
              className="btn btn-secondary"
              style={{
                borderColor: isQuestionFlagged ? 'var(--color-warning)' : '',
                color: isQuestionFlagged ? 'var(--color-warning)' : '',
                background: isQuestionFlagged ? 'rgba(245, 158, 11, 0.08)' : ''
              }}
            >
              🚩 {isQuestionFlagged ? 'Marcada para Revisão' : 'Marcar para Revisão'}
            </button>

            {currentIdx === testQuestions.length - 1 ? (
              <button
                className="btn btn-primary"
                onClick={handleFinishSimulado}
                style={{ background: 'var(--color-success)', boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)' }}
              >
                🏁 Finalizar Prova
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={handleNext}
              >
                Avançar ➡️
              </button>
            )}
          </div>
        </div>

        {/* Right Side: Navigation Grid Sheet */}
        <div className="card">
          <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Gabarito de Respostas</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '20px' }}>
            Navegue pulando para qualquer questão clicando nos blocos correspondentes:
          </p>

          {/* Navigation Matrix Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '10px',
            marginBottom: '24px'
          }}>
            {testQuestions.map((q, idx) => {
              const isSelected = idx === currentIdx;
              const hasAnsweredQ = userAnswers[q.id];
              const isFlagged = flaggedQuestions[q.id];

              let border = '1px solid var(--border-light)';
              let bg = 'var(--bg-input)';
              let color = 'var(--color-text-secondary)';

              if (hasAnsweredQ) {
                bg = 'var(--accent-glow)';
                border = '1px solid var(--accent-primary)';
                color = 'var(--accent-primary)';
              }
              if (isFlagged) {
                border = '1px solid var(--color-warning)';
                color = 'var(--color-warning)';
              }
              if (isSelected) {
                bg = 'var(--accent-primary)';
                color = '#fff';
                border = '1px solid var(--accent-primary)';
              }

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIdx(idx)}
                  style={{
                    height: '42px',
                    borderRadius: 'var(--radius-sm)',
                    border,
                    background: bg,
                    color,
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                  }}
                >
                  {idx + 1}
                  {isFlagged && (
                    <span style={{
                      position: 'absolute',
                      top: '2px',
                      right: '2px',
                      fontSize: '0.55rem'
                    }}>🚩</span>
                  )}
                </button>
              );
            })}
          </div>

          <div style={{
            borderTop: '1px solid var(--border-light)',
            paddingTop: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            fontSize: '0.75rem',
            color: 'var(--color-text-secondary)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '12px', height: '12px', background: 'var(--accent-primary)', borderRadius: '3px' }} />
              Questão Atual
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '12px', height: '12px', background: 'var(--accent-glow)', border: '1px solid var(--accent-primary)', borderRadius: '3px' }} />
              Respondida
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '12px', height: '12px', background: 'var(--bg-input)', border: '1px solid var(--border-light)', borderRadius: '3px' }} />
              Não Respondida
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '12px', height: '12px', border: '1px solid var(--color-warning)', borderRadius: '3px' }} />
              Revisão Pendente (Flag)
            </div>
          </div>
        </div>

      </div>
    );
  }

  // SCREEN 3: Results Dashboard
  if (gameState === 'results' && results) {
    return (
      <div className="animate-fade" style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        {/* Results Header Card */}
        <div className="card" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '32px',
          padding: '32px',
          background: 'var(--bg-card)',
          marginBottom: '32px',
          borderLeft: `4px solid ${results.percentage >= 70 ? 'var(--color-success)' : results.percentage >= 50 ? 'var(--color-warning)' : 'var(--color-danger)'}`
        }}>
          {/* Radial circular indicator */}
          <div>
            {renderRadialProgress(results.percentage)}
          </div>

          <div style={{ flexGrow: 1 }}>
            <span className={`badge ${results.percentage >= 70 ? 'badge-success' : results.percentage >= 50 ? 'badge-warning' : 'badge-danger'}`} style={{ marginBottom: '8px' }}>
              {results.percentage >= 70 ? 'Aprovado no Simulado!' : results.percentage >= 50 ? 'Estude mais um pouco!' : 'Desempenho Crítico'}
            </span>
            <h2 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '8px' }}>Resultado Final</h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
              Você concluiu o teste com {results.correctCount} acertos e {results.incorrectCount} erros em um total de {results.questionsCount} questões.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '150px' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
              ⏱️ Tempo: <strong>{formatTime(results.durationSeconds)}</strong>
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
              📅 Concluído em: <strong>{new Date(results.date).toLocaleDateString('pt-BR')}</strong>
            </div>
            <button className="btn btn-primary" onClick={() => setGameState('config')} style={{ fontSize: '0.85rem', padding: '10px' }}>
              🔄 Novo Simulado
            </button>
          </div>
        </div>

        {/* Detailed Correction Review Section */}
        <h3 style={{ fontSize: '1.25rem', marginBottom: '20px' }}>🔍 Gabarito Comentado e Revisão de Respostas</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {results.questions.map((q, idx) => {
            const uAns = results.answersMap[q.id] || null;
            const isCorrect = uAns === q.correctAnswer;
            
            return (
              <div className="card" key={q.id} style={{
                background: 'var(--bg-input)',
                borderLeft: `4px solid ${isCorrect ? 'var(--color-success)' : 'var(--color-danger)'}`
              }}>
                {/* Header */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '16px',
                  borderBottom: '1px solid var(--border-light)',
                  paddingBottom: '8px',
                  fontSize: '0.8rem',
                  color: 'var(--color-text-muted)'
                }}>
                  <div>
                    <span className="badge badge-info" style={{ marginRight: '8px' }}>{q.subject}</span>
                    <span>Questão {idx + 1}</span>
                  </div>
                  <div>
                    {isCorrect ? (
                      <span style={{ color: 'var(--color-success)', fontWeight: 'bold' }}>✓ ACERTOU</span>
                    ) : (
                      <span style={{ color: 'var(--color-danger)', fontWeight: 'bold' }}>✗ ERROU</span>
                    )}
                  </div>
                </div>

                {/* Text */}
                <p style={{ fontSize: '0.95rem', lineHeight: '1.5', color: 'var(--color-text-primary)', marginBottom: '16px', whiteSpace: 'pre-line' }}>
                  {q.text}
                </p>

                {/* Alternative items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {q.options.map(opt => {
                    const optIsUserAnswer = uAns === opt.letter;
                    const optIsCorrectAnswer = q.correctAnswer === opt.letter;

                    let bg = 'rgba(255,255,255,0.01)';
                    let border = '1px solid var(--border-light)';
                    let checkSymbol = '';

                    if (optIsCorrectAnswer) {
                      bg = 'rgba(16, 185, 129, 0.06)';
                      border = '1px solid var(--color-success)';
                      checkSymbol = ' (Gabarito Oficial ✓)';
                    }
                    if (optIsUserAnswer && !isCorrect) {
                      bg = 'rgba(239, 68, 68, 0.06)';
                      border = '1px solid var(--color-danger)';
                      checkSymbol = ' (Sua Resposta ✗)';
                    } else if (optIsUserAnswer && isCorrect) {
                      checkSymbol = ' (Sua Resposta Correta ✓)';
                    }

                    return (
                      <div key={opt.letter} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 16px',
                        borderRadius: 'var(--radius-sm)',
                        background: bg,
                        border,
                        fontSize: '0.85rem'
                      }}>
                        <span style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          fontSize: '0.75rem',
                          fontWeight: 'bold',
                          background: optIsCorrectAnswer ? 'var(--color-success)' : optIsUserAnswer ? 'var(--color-danger)' : 'var(--bg-input)',
                          color: optIsCorrectAnswer || optIsUserAnswer ? '#fff' : 'var(--color-text-secondary)'
                        }}>
                          {opt.letter}
                        </span>
                        <span style={{ color: optIsCorrectAnswer ? 'var(--color-text-primary)' : 'var(--color-text-secondary)', fontWeight: optIsCorrectAnswer ? '500' : 'normal' }}>
                          {opt.text} <strong>{checkSymbol}</strong>
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Explanation commentary */}
                {q.explanation && (
                  <div style={{
                    marginTop: '16px',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(99, 102, 241, 0.05)',
                    border: '1px solid rgba(99, 102, 241, 0.15)',
                    fontSize: '0.8rem',
                    color: 'var(--color-text-secondary)'
                  }}>
                    💡 <strong>Comentário de Gabarito:</strong> {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    );
  }
}
