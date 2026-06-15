import React, { useState, useEffect } from 'react';

export default function Parser({ selectedFile, setSelectedFile }) {
  const [localFiles, setLocalFiles] = useState([]);
  const [targetFile, setTargetFile] = useState(selectedFile || '');
  const [parsing, setParsing] = useState(false);
  const [rawText, setRawText] = useState('');
  const [extractedQuestions, setExtractedQuestions] = useState([]);
  const [subjects, setSubjects] = useState([
    'Língua Portuguesa',
    'Lei Orgânica do DF (LODF)',
    'Direito Administrativo',
    'Direito Constitucional',
    'Assistência Social - Geral',
    'Lei Orgânica da Assistência Social (LOAS)',
    'Conhecimentos Específicos',
    'Raciocínio Lógico',
    'Atualidades'
  ]);
  const [globalSubject, setGlobalSubject] = useState('Assistência Social - Geral');
  const [globalSource, setGlobalSource] = useState('SEDES-DF');
  const [globalYear, setGlobalYear] = useState('2019');
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    fetchLocalFiles();
    if (selectedFile) {
      setTargetFile(selectedFile);
    }
  }, [selectedFile]);

  const fetchLocalFiles = async () => {
    try {
      const res = await fetch('/api/exams/local');
      const data = await res.json();
      setLocalFiles(data);
      if (data.length > 0 && !targetFile) {
        setTargetFile(data[0].name);
      }
    } catch (error) {
      console.error("Error fetching local files:", error);
    }
  };

  const handleParse = async () => {
    if (!targetFile) return;
    setParsing(true);
    setMessage({ text: '', type: '' });
    setRawText('');
    setExtractedQuestions([]);
    
    try {
      const res = await fetch('/api/exams/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename: targetFile })
      });
      const data = await res.json();
      
      if (data.success) {
        setRawText(data.rawText || '');
        // Inject global defaults to questions
        const enriched = (data.questions || []).map(q => ({
          ...q,
          subject: globalSubject,
          source: globalSource,
          year: parseInt(globalYear, 10) || 2019
        }));
        setExtractedQuestions(enriched);
        setMessage({ text: `Varrimento concluído! Encontramos ${data.questions.length} questões estruturadas.`, type: 'success' });
      } else {
        setMessage({ text: `Falha ao ler e varrer o arquivo PDF: ${data.error}`, type: 'danger' });
      }
    } catch (error) {
      console.error("Error parsing file:", error);
      setMessage({ text: 'Erro de comunicação com o servidor ao ler o arquivo PDF.', type: 'danger' });
    } finally {
      setParsing(false);
    }
  };

  const handleQuestionChange = (index, field, value) => {
    const updated = [...extractedQuestions];
    updated[index] = { ...updated[index], [field]: value };
    setExtractedQuestions(updated);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updated = [...extractedQuestions];
    const options = [...updated[qIndex].options];
    options[oIndex] = { ...options[oIndex], text: value };
    updated[qIndex] = { ...updated[qIndex], options };
    setExtractedQuestions(updated);
  };

  const handleRemoveQuestion = (index) => {
    const updated = extractedQuestions.filter((_, idx) => idx !== index);
    setExtractedQuestions(updated);
  };

  const handleAddQuestion = () => {
    const newQ = {
      number: extractedQuestions.length + 1,
      text: 'Novo enunciado da questão aqui...',
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
      subject: globalSubject,
      year: parseInt(globalYear, 10) || 2019,
      source: globalSource
    };
    setExtractedQuestions([...extractedQuestions, newQ]);
  };

  const handleToggleType = (index) => {
    const updated = [...extractedQuestions];
    const currentType = updated[index].type;
    
    if (currentType === 'multiple_choice') {
      updated[index].type = 'certo_errado';
      updated[index].options = [
        { letter: 'C', text: 'Certo' },
        { letter: 'E', text: 'Errado' }
      ];
      updated[index].correctAnswer = 'C';
    } else {
      updated[index].type = 'multiple_choice';
      updated[index].options = [
        { letter: 'A', text: '' },
        { letter: 'B', text: '' },
        { letter: 'C', text: '' },
        { letter: 'D', text: '' },
        { letter: 'E', text: '' }
      ];
      updated[index].correctAnswer = 'A';
    }
    
    setExtractedQuestions(updated);
  };

  const handleSaveToDatabase = async () => {
    if (extractedQuestions.length === 0) return;
    
    // Validate that correctAnswers are defined for all questions
    const incomplete = extractedQuestions.some(q => !q.correctAnswer);
    if (incomplete) {
      if (!confirm("Algumas questões estão sem o gabarito (resposta correta) definido. Deseja salvá-las mesmo assim?")) {
        return;
      }
    }

    try {
      const res = await fetch('/api/questions/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questions: extractedQuestions })
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ text: `Banco de dados atualizado! ${data.count} novas questões salvas com sucesso no banco de dados!`, type: 'success' });
        // Clear workspace
        setExtractedQuestions([]);
        setRawText('');
        setSelectedFile('');
      } else {
        setMessage({ text: `Falha ao importar questões: ${data.error}`, type: 'danger' });
      }
    } catch (error) {
      console.error("Import error:", error);
      setMessage({ text: 'Ocorreu um erro ao importar as questões.', type: 'danger' });
    }
  };

  // Set values for all questions at once
  const applyGlobalDefaults = () => {
    const updated = extractedQuestions.map(q => ({
      ...q,
      subject: globalSubject,
      source: globalSource,
      year: parseInt(globalYear, 10) || 2019
    }));
    setExtractedQuestions(updated);
    setMessage({ text: "Valores globais aplicados a todas as questões extraídas!", type: "info" });
  };

  return (
    <div className="animate-fade">
      <div className="page-header">
        <h1 className="page-title">Varrer e Extrair Questões</h1>
        <p className="page-subtitle">Converta textos de provas em PDFs baixados em blocos de questões estruturados e editáveis</p>
      </div>

      {message.text && (
        <div style={{
          padding: '16px',
          borderRadius: 'var(--radius-md)',
          marginBottom: '24px',
          background: message.type === 'success' ? 'rgba(16, 185, 129, 0.15)' : message.type === 'info' ? 'rgba(14, 165, 233, 0.15)' : 'rgba(239, 68, 68, 0.15)',
          color: message.type === 'success' ? 'var(--color-success)' : message.type === 'info' ? 'var(--color-info)' : 'var(--color-danger)',
          border: `1px solid ${message.type === 'success' ? 'var(--color-success)' : message.type === 'info' ? 'var(--color-info)' : 'var(--color-danger)'}`,
          fontWeight: '500'
        }}>
          {message.text}
        </div>
      )}

      {/* Configuration bar */}
      <div className="card" style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>⚙️ Configurações Gerais da Prova a Extrair</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px',
          alignItems: 'end'
        }}>
          <div className="form-group" style={{ marginBottom: '0' }}>
            <label className="form-label">Arquivo de Prova PDF</label>
            <select
              className="form-select"
              value={targetFile}
              onChange={(e) => setTargetFile(e.target.value)}
            >
              <option value="">Selecione um arquivo...</option>
              {localFiles.map(f => (
                <option key={f.name} value={f.name}>{f.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: '0' }}>
            <label className="form-label">Matéria/Disciplina Padrão</label>
            <select
              className="form-select"
              value={globalSubject}
              onChange={(e) => setGlobalSubject(e.target.value)}
            >
              {subjects.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: '0' }}>
            <label className="form-label">Fonte (Ex: SEDES-DF 2019)</label>
            <input
              type="text"
              className="form-input"
              value={globalSource}
              onChange={(e) => setGlobalSource(e.target.value)}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '0' }}>
            <label className="form-label">Ano da Prova</label>
            <input
              type="number"
              className="form-input"
              value={globalYear}
              onChange={(e) => setGlobalYear(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              className="btn btn-primary"
              onClick={handleParse}
              disabled={!targetFile || parsing}
              style={{ flexGrow: 1 }}
            >
              {parsing ? 'Varrendo PDF...' : '⚡ Varrer Arquivo'}
            </button>
            {extractedQuestions.length > 0 && (
              <button
                className="btn btn-secondary"
                onClick={applyGlobalDefaults}
                title="Aplicar dados padrões a todas as questões"
              >
                🔄 Aplicar
              </button>
            )}
          </div>
        </div>
      </div>

      {extractedQuestions.length > 0 && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'var(--bg-card)',
          padding: '16px 24px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-light)',
          marginBottom: '24px'
        }}>
          <div>
            <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>📋 Painel de Edição e Importação</span>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
              Revise e edite as questões abaixo. Quando terminar, salve-as no banco de dados.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn btn-secondary" onClick={handleAddQuestion}>
              ➕ Inserir Questão Manual
            </button>
            <button className="btn btn-primary" onClick={handleSaveToDatabase} style={{ background: 'var(--color-success)' }}>
              📥 Salvar {extractedQuestions.length} Questões no Banco
            </button>
          </div>
        </div>
      )}

      {/* Split Workstation Pane */}
      {(rawText || extractedQuestions.length > 0) && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: rawText ? '1.2fr 2fr' : '1fr',
          gap: '32px',
          alignItems: 'start'
        }}>
          
          {/* Left Panel: Raw text for reference */}
          {rawText && (
            <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '80vh' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '12px', paddingBottom: '8px', borderBottom: '1px solid var(--border-light)' }}>
                📕 Texto Original da Prova (Referência)
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '12px' }}>
                Use este texto para copiar enunciados ou tabelas que a extração regex automática possa ter pulado ou omitido.
              </p>
              <textarea
                readOnly
                value={rawText}
                style={{
                  width: '100%',
                  flexGrow: 1,
                  background: 'rgba(0, 0, 0, 0.2)',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--color-text-secondary)',
                  padding: '12px',
                  fontFamily: 'monospace',
                  fontSize: '0.85rem',
                  lineHeight: '1.5',
                  resize: 'none'
                }}
              />
            </div>
          )}

          {/* Right Panel: Parsed Question Editor Cards */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            maxHeight: rawText ? '80vh' : 'auto',
            overflowY: rawText ? 'auto' : 'visible',
            paddingRight: rawText ? '8px' : '0'
          }}>
            {extractedQuestions.map((q, qIdx) => (
              <div className="card animate-scale" key={qIdx} style={{
                position: 'relative',
                borderLeft: '4px solid var(--accent-primary)',
                background: 'var(--bg-card)'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '16px',
                  borderBottom: '1px solid var(--border-light)',
                  paddingBottom: '12px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'var(--accent-glow)',
                      color: 'var(--accent-primary)',
                      fontWeight: 'bold',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%'
                    }}>{qIdx + 1}</span>
                    <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>Questão {q.number || qIdx + 1}</span>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleToggleType(qIdx)}
                      style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                    >
                      Tipo: {q.type === 'multiple_choice' ? '📝 Múltipla Escolha' : '⚖️ Certo / Errado'}
                    </button>
                    <button
                      className="btn"
                      onClick={() => handleRemoveQuestion(qIdx)}
                      style={{ background: 'transparent', color: 'var(--color-danger)', border: 'none', padding: '4px 8px' }}
                      title="Remover Questão"
                    >
                      🗑️ Excluir
                    </button>
                  </div>
                </div>

                {/* Question text */}
                <div className="form-group">
                  <label className="form-label">Enunciado da Questão</label>
                  <textarea
                    className="form-textarea"
                    rows="3"
                    value={q.text}
                    onChange={(e) => handleQuestionChange(qIdx, 'text', e.target.value)}
                    style={{ fontSize: '0.9rem', lineHeight: '1.4' }}
                  />
                </div>

                {/* Options list */}
                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label className="form-label">Alternativas e Respostas</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {q.options.map((opt, oIdx) => (
                      <div key={opt.letter} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button
                          type="button"
                          className={`btn ${q.correctAnswer === opt.letter ? 'btn-primary' : 'btn-secondary'}`}
                          onClick={() => handleQuestionChange(qIdx, 'correctAnswer', opt.letter)}
                          style={{
                            minWidth: '40px',
                            height: '40px',
                            borderRadius: 'var(--radius-sm)',
                            padding: '0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: '700',
                            background: q.correctAnswer === opt.letter ? 'var(--color-success)' : '',
                            boxShadow: 'none'
                          }}
                        >
                          {opt.letter}
                        </button>
                        {q.type === 'multiple_choice' ? (
                          <input
                            type="text"
                            className="form-input"
                            value={opt.text}
                            onChange={(e) => handleOptionChange(qIdx, oIdx, e.target.value)}
                            placeholder={`Alternativa ${opt.letter}`}
                            style={{ fontSize: '0.85rem' }}
                          />
                        ) : (
                          <span style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>{opt.text}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Meta details per question */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                  marginTop: '16px',
                  paddingTop: '16px',
                  borderTop: '1px solid var(--border-light)'
                }}>
                  <div className="form-group" style={{ marginBottom: '0' }}>
                    <label className="form-label" style={{ fontSize: '0.75rem' }}>Matéria da Questão</label>
                    <select
                      className="form-select"
                      value={q.subject}
                      onChange={(e) => handleQuestionChange(qIdx, 'subject', e.target.value)}
                      style={{ fontSize: '0.8rem', padding: '8px 12px' }}
                    >
                      {subjects.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="form-group" style={{ marginBottom: '0' }}>
                    <label className="form-label" style={{ fontSize: '0.75rem' }}>Explicação / Anotação (Opcional)</label>
                    <input
                      type="text"
                      className="form-input"
                      value={q.explanation || ''}
                      onChange={(e) => handleQuestionChange(qIdx, 'explanation', e.target.value)}
                      placeholder="Gabarito comentado ou anotações..."
                      style={{ fontSize: '0.8rem', padding: '8px 12px' }}
                    />
                  </div>
                </div>

              </div>
            ))}
            
            <button className="btn btn-secondary" onClick={handleAddQuestion} style={{ border: '2px dashed var(--border-light)', padding: '16px', background: 'transparent' }}>
              ➕ Inserir Outra Questão Manual
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
