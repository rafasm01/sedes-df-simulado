import React, { useState, useEffect } from 'react';

export default function QuestionBank({ questions, setQuestions }) {
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [filterSubject, setFilterSubject] = useState('Todas');
  const [filterType, setFilterType] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal editor states
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  const subjects = [
    'Todas',
    'Língua Portuguesa',
    'Lei Orgânica do DF (LODF)',
    'Direito Administrativo',
    'Direito Constitucional',
    'Assistência Social - Geral',
    'Lei Orgânica da Assistência Social (LOAS)',
    'Conhecimentos Específicos',
    'Raciocínio Lógico',
    'Atualidades',
    'Geral'
  ];

  const fetchQuestions = async () => {
    try {
      const res = await fetch('/api/questions');
      const data = await res.json();
      setQuestions(data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    let result = [...questions];

    // Filter by subject
    if (filterSubject !== 'Todas') {
      result = result.filter(q => q.subject === filterSubject);
    }

    // Filter by type
    if (filterType !== 'Todos') {
      result = result.filter(q => q.type === filterType);
    }

    // Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(q => 
        q.text.toLowerCase().includes(query) || 
        (q.explanation && q.explanation.toLowerCase().includes(query)) ||
        (q.source && q.source.toLowerCase().includes(query))
      );
    }

    setFilteredQuestions(result);
  }, [questions, filterSubject, filterType, searchQuery]);

  const handleDelete = async (id) => {
    if (!confirm("Deseja realmente deletar esta questão permanentemente?")) return;
    
    try {
      const res = await fetch(`/api/questions/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        setQuestions(questions.filter(q => q.id !== id));
      }
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const handleEditClick = (q) => {
    setEditingQuestion({ ...q });
    setShowModal(true);
  };

  const handleCreateClick = () => {
    setEditingQuestion({
      text: '',
      type: 'multiple_choice',
      options: [
        { letter: 'A', text: '' },
        { letter: 'B', text: '' },
        { letter: 'C', text: '' },
        { letter: 'D', text: '' },
        { letter: 'E', text: '' }
      ],
      correctAnswer: 'A',
      explanation: '',
      subject: 'Assistência Social - Geral',
      year: new Date().getFullYear(),
      source: 'SEDES-DF (Manual)'
    });
    setShowModal(true);
  };

  const handleModalSave = async (e) => {
    e.preventDefault();
    if (!editingQuestion.text.trim()) return;

    try {
      const res = await fetch('/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingQuestion)
      });
      const saved = await res.json();
      
      if (editingQuestion.id) {
        setQuestions(questions.map(q => q.id === saved.id ? saved : q));
      } else {
        setQuestions([...questions, saved]);
      }
      
      setShowModal(false);
      setEditingQuestion(null);
    } catch (error) {
      console.error("Error saving question:", error);
    }
  };

  const handleModalQuestionChange = (field, value) => {
    setEditingQuestion({ ...editingQuestion, [field]: value });
  };

  const handleModalOptionChange = (idx, value) => {
    const options = [...editingQuestion.options];
    options[idx] = { ...options[idx], text: value };
    setEditingQuestion({ ...editingQuestion, options });
  };

  const handleModalToggleType = () => {
    const newType = editingQuestion.type === 'multiple_choice' ? 'certo_errado' : 'multiple_choice';
    const newOptions = newType === 'certo_errado' ? [
      { letter: 'C', text: 'Certo' },
      { letter: 'E', text: 'Errado' }
    ] : [
      { letter: 'A', text: '' },
      { letter: 'B', text: '' },
      { letter: 'C', text: '' },
      { letter: 'D', text: '' },
      { letter: 'E', text: '' }
    ];

    setEditingQuestion({
      ...editingQuestion,
      type: newType,
      options: newOptions,
      correctAnswer: newType === 'certo_errado' ? 'C' : 'A'
    });
  };

  return (
    <div className="animate-fade">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="page-title">Banco de Questões</h1>
          <p className="page-subtitle">Pesquise, filtre, edite e gerencie o acervo de questões cadastradas</p>
        </div>
        <button className="btn btn-primary" onClick={handleCreateClick}>
          ➕ Criar Questão
        </button>
      </div>

      {/* Filter and search controls bar */}
      <div className="card" style={{ marginBottom: '32px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr',
          gap: '16px'
        }}>
          <div className="form-group" style={{ marginBottom: '0' }}>
            <label className="form-label">Buscar por Texto</label>
            <input
              type="text"
              className="form-input"
              placeholder="Digite partes do enunciado, gabarito ou banca..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '0' }}>
            <label className="form-label">Disciplina / Matéria</label>
            <select
              className="form-select"
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
            >
              {subjects.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: '0' }}>
            <label className="form-label">Formato de Questão</label>
            <select
              className="form-select"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="Todos">Todos os Tipos</option>
              <option value="multiple_choice">📝 Múltipla Escolha</option>
              <option value="certo_errado">⚖️ Certo / Errado</option>
            </select>
          </div>
        </div>
      </div>

      {/* Questions list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((q, idx) => (
            <div className="card animate-scale" key={q.id || idx} style={{
              background: 'var(--bg-card)',
              borderLeft: '4px solid var(--accent-secondary)'
            }}>
              
              {/* Question Header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px',
                borderBottom: '1px solid var(--border-light)',
                paddingBottom: '12px'
              }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
                  <span className="badge badge-info">{q.subject}</span>
                  <span className="badge badge-success" style={{ textTransform: 'none' }}>
                    {q.type === 'multiple_choice' ? 'Múltipla Escolha' : 'Certo / Errado'}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginLeft: '8px' }}>
                    Source: {q.source} • {q.year}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="btn btn-secondary" onClick={() => handleEditClick(q)} style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                    ✏️ Editar
                  </button>
                  <button className="btn btn-secondary" onClick={() => handleDelete(q.id)} style={{ padding: '6px 12px', fontSize: '0.8rem', color: 'var(--color-danger)', borderColor: 'rgba(239, 68, 68, 0.2)' }}>
                    🗑️ Excluir
                  </button>
                </div>
              </div>

              {/* Question Text */}
              <p style={{
                fontSize: '1rem',
                lineHeight: '1.6',
                color: 'var(--color-text-primary)',
                marginBottom: '20px',
                whiteSpace: 'pre-line'
              }}>
                {q.text}
              </p>

              {/* Question Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {q.options && q.options.map((opt) => {
                  const isCorrect = q.correctAnswer === opt.letter;
                  return (
                    <div key={opt.letter} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-md)',
                      background: isCorrect ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255, 255, 255, 0.01)',
                      border: `1px solid ${isCorrect ? 'var(--color-success)' : 'var(--border-light)'}`
                    }}>
                      <span style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        fontWeight: '700',
                        fontSize: '0.9rem',
                        background: isCorrect ? 'var(--color-success)' : 'var(--bg-input)',
                        color: isCorrect ? '#fff' : 'var(--color-text-secondary)'
                      }}>
                        {opt.letter}
                      </span>
                      <span style={{
                        fontSize: '0.95rem',
                        color: isCorrect ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                        fontWeight: isCorrect ? '500' : 'normal'
                      }}>
                        {opt.text}
                      </span>
                      {isCorrect && <span style={{ marginLeft: 'auto', color: 'var(--color-success)' }}>Gabarito Oficial ✓</span>}
                    </div>
                  );
                })}
              </div>

              {/* Explanation section if exists */}
              {q.explanation && (
                <div style={{
                  marginTop: '16px',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(99, 102, 241, 0.05)',
                  border: '1px solid rgba(99, 102, 241, 0.15)',
                  fontSize: '0.85rem',
                  color: 'var(--color-text-secondary)'
                }}>
                  💡 <strong>Comentário/Dica:</strong> {q.explanation}
                </div>
              )}

            </div>
          ))
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: 'var(--color-text-secondary)',
            border: '2px dashed var(--border-light)',
            borderRadius: '12px'
          }}>
            Nenhuma questão encontrada com os filtros selecionados.
          </div>
        )}
      </div>

      {/* Editor Modal */}
      {showModal && editingQuestion && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.75)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          backdropFilter: 'blur(5px)',
          padding: '20px'
        }}>
          <div className="card animate-scale" style={{
            width: '100%',
            maxWidth: '750px',
            maxHeight: '90vh',
            overflowY: 'auto',
            background: 'var(--bg-sidebar)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
          }}>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid var(--border-light)' }}>
              {editingQuestion.id ? '✏️ Editar Questão' : '➕ Nova Questão'}
            </h2>

            <form onSubmit={handleModalSave}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div className="form-group" style={{ marginBottom: '0' }}>
                  <label className="form-label">Disciplina / Assunto</label>
                  <select
                    className="form-select"
                    value={editingQuestion.subject}
                    onChange={(e) => handleModalQuestionChange('subject', e.target.value)}
                  >
                    {subjects.filter(s => s !== 'Todas').map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: '0', display: 'flex', alignItems: 'flex-end' }}>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleModalToggleType}
                    style={{ width: '100%', height: '45px' }}
                  >
                    Tipo: {editingQuestion.type === 'multiple_choice' ? '📝 Múltipla Escolha' : '⚖️ Certo / Errado'}
                  </button>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div className="form-group" style={{ marginBottom: '0' }}>
                  <label className="form-label">Origem / Concurso</label>
                  <input
                    type="text"
                    className="form-input"
                    value={editingQuestion.source || ''}
                    onChange={(e) => handleModalQuestionChange('source', e.target.value)}
                    required
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '0' }}>
                  <label className="form-label">Ano</label>
                  <input
                    type="number"
                    className="form-input"
                    value={editingQuestion.year || ''}
                    onChange={(e) => handleModalQuestionChange('year', parseInt(e.target.value, 10))}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Enunciado da Questão</label>
                <textarea
                  className="form-textarea"
                  rows="4"
                  value={editingQuestion.text}
                  onChange={(e) => handleModalQuestionChange('text', e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Alternativas (Marque o gabarito oficial clicando na letra)</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {editingQuestion.options.map((opt, idx) => (
                    <div key={opt.letter} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <button
                        type="button"
                        className={`btn ${editingQuestion.correctAnswer === opt.letter ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => handleModalQuestionChange('correctAnswer', opt.letter)}
                        style={{
                          minWidth: '40px',
                          height: '40px',
                          padding: '0',
                          fontWeight: '700',
                          borderRadius: 'var(--radius-sm)',
                          background: editingQuestion.correctAnswer === opt.letter ? 'var(--color-success)' : '',
                          boxShadow: 'none'
                        }}
                      >
                        {opt.letter}
                      </button>
                      {editingQuestion.type === 'multiple_choice' ? (
                        <input
                          type="text"
                          className="form-input"
                          value={opt.text}
                          onChange={(e) => handleModalOptionChange(idx, e.target.value)}
                          placeholder={`Texto da alternativa ${opt.letter}`}
                          required
                        />
                      ) : (
                        <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>{opt.text}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Anotações do Gabarito / Comentário Explicativo</label>
                <textarea
                  className="form-textarea"
                  rows="2"
                  placeholder="Explicação do gabarito, fundamentação jurídica, etc."
                  value={editingQuestion.explanation || ''}
                  onChange={(e) => handleModalQuestionChange('explanation', e.target.value)}
                />
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '12px',
                marginTop: '24px',
                borderTop: '1px solid var(--border-light)',
                paddingTop: '16px'
              }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => { setShowModal(false); setEditingQuestion(null); }}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Salvar Questão
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
