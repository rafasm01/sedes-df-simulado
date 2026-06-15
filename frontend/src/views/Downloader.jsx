import React, { useState, useEffect } from 'react';

export default function Downloader({ setTab, setSelectedFile }) {
  const [searchQuery, setSearchQuery] = useState('SEDES DF');
  const [searchResults, setSearchResults] = useState([]);
  const [localFiles, setLocalFiles] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [downloadingUrl, setDownloadingUrl] = useState('');
  const [directUrl, setDirectUrl] = useState('');
  const [directName, setDirectName] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });

  const fetchLocalFiles = async () => {
    try {
      const res = await fetch('/api/exams/local');
      const data = await res.json();
      setLocalFiles(data);
    } catch (error) {
      console.error("Error fetching local downloaded files:", error);
    }
  };

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    setLoadingSearch(true);
    setMessage({ text: '', type: '' });
    try {
      const res = await fetch(`/api/exams/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      setSearchResults(data);
      if (data.length === 0) {
        setMessage({ text: 'Nenhuma prova encontrada na pesquisa. Tente usar outros termos.', type: 'warning' });
      }
    } catch (error) {
      console.error("Error searching exams:", error);
      setMessage({ text: 'Erro ao conectar à pesquisa de provas. Usando cache local.', type: 'danger' });
    } finally {
      setLoadingSearch(false);
    }
  };

  const handleDownload = async (url, title) => {
    setDownloadingUrl(url);
    setMessage({ text: '', type: '' });
    
    // Create clean file name
    const sanitizedTitle = title
      .toLowerCase()
      .replace(/[^a-z0-9]/gi, '_')
      .replace(/_{2,}/g, '_')
      .substring(0, 50) + '.pdf';

    try {
      const res = await fetch('/api/exams/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, filename: sanitizedTitle })
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ text: `Prova baixada com sucesso como "${data.filename}"!`, type: 'success' });
        fetchLocalFiles();
      } else {
        setMessage({ text: 'Falha no download da prova.', type: 'danger' });
      }
    } catch (error) {
      console.error("Error downloading file:", error);
      setMessage({ text: 'Ocorreu um erro ao baixar o arquivo PDF da prova.', type: 'danger' });
    } finally {
      setDownloadingUrl('');
    }
  };

  const handleDirectDownload = async (e) => {
    e.preventDefault();
    if (!directUrl) return;
    
    setDownloadingUrl(directUrl);
    setMessage({ text: '', type: '' });
    
    const filename = directName ? (directName.endsWith('.pdf') ? directName : directName + '.pdf') : null;

    try {
      const res = await fetch('/api/exams/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: directUrl, filename })
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ text: `Prova baixada com sucesso como "${data.filename}"!`, type: 'success' });
        setDirectUrl('');
        setDirectName('');
        fetchLocalFiles();
      } else {
        setMessage({ text: 'Falha no download por link direto.', type: 'danger' });
      }
    } catch (error) {
      console.error("Direct download error:", error);
      setMessage({ text: 'Erro ao baixar link direto. Certifique-se de que é um PDF direto.', type: 'danger' });
    } finally {
      setDownloadingUrl('');
    }
  };

  const handleDeleteFile = async (filename) => {
    if (!confirm(`Deseja realmente excluir o arquivo "${filename}"?`)) return;
    
    try {
      const res = await fetch(`/api/exams/local/${encodeURIComponent(filename)}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        fetchLocalFiles();
        setMessage({ text: 'Arquivo deletado com sucesso.', type: 'success' });
      }
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  const handleParseRedirect = (filename) => {
    setSelectedFile(filename);
    setTab('parser');
  };

  useEffect(() => {
    fetchLocalFiles();
    handleSearch();
  }, []);

  return (
    <div className="animate-fade">
      <div className="page-header">
        <h1 className="page-title">Buscar e Guardar Provas</h1>
        <p className="page-subtitle">Faça o download de provas anteriores da internet e gerencie seus arquivos PDF locais</p>
      </div>

      {message.text && (
        <div style={{
          padding: '16px',
          borderRadius: 'var(--radius-md)',
          marginBottom: '24px',
          background: message.type === 'success' ? 'rgba(16, 185, 129, 0.15)' : message.type === 'warning' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(239, 68, 68, 0.15)',
          color: message.type === 'success' ? 'var(--color-success)' : message.type === 'warning' ? 'var(--color-warning)' : 'var(--color-danger)',
          border: `1px solid ${message.type === 'success' ? 'var(--color-success)' : message.type === 'warning' ? 'var(--color-warning)' : 'var(--color-danger)'}`,
          fontWeight: '500'
        }}>
          {message.text}
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.5fr 1fr',
        gap: '32px',
        alignItems: 'start'
      }}>
        
        {/* Left column: Search and download results */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          <div className="card">
            <h3 style={{ fontSize: '1.2rem', marginBottom: '20px' }}>🔍 Pesquisar Provas na Internet</h3>
            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <input
                type="text"
                className="form-input"
                placeholder="Ex: SEDES DF, Quadrix Psicologia, IADES Assistente Social..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ flexGrow: 1 }}
              />
              <button type="submit" className="btn btn-primary" disabled={loadingSearch}>
                {loadingSearch ? 'Buscando...' : 'Buscar'}
              </button>
            </form>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {loadingSearch ? (
                <div style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-secondary)' }}>
                  <div style={{ display: 'inline-block', width: '30px', height: '30px', border: '3px solid var(--accent-secondary)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '12px' }}></div>
                  <p>Buscando provas no PCI Concursos e repositórios...</p>
                </div>
              ) : searchResults.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {searchResults.map((exam, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '16px',
                      borderRadius: 'var(--radius-md)',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid var(--border-light)'
                    }}>
                      <div style={{ flexGrow: 1, paddingRight: '16px' }}>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: '600', marginBottom: '4px' }}>{exam.title}</h4>
                        <div style={{ display: 'flex', gap: '12px', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                          <span>🏛️ Banca: <strong>{exam.institution}</strong></span>
                          <span>📅 Ano: {exam.year}</span>
                        </div>
                      </div>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleDownload(exam.directUrl || exam.url, exam.title)}
                        disabled={downloadingUrl !== ''}
                        style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                      >
                        {downloadingUrl === (exam.directUrl || exam.url) ? 'Baixando...' : '📥 Baixar PDF'}
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: 'var(--color-text-secondary)', textAlign: 'center', padding: '20px 0' }}>
                  Digite os termos de busca acima para encontrar provas online.
                </p>
              )}
            </div>
          </div>
          
          <div className="card">
            <h3 style={{ fontSize: '1.2rem', marginBottom: '20px' }}>🔗 Download por Link Direto</h3>
            <form onSubmit={handleDirectDownload} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="form-group" style={{ marginBottom: '0' }}>
                <label className="form-label">Link do PDF do Simulado</label>
                <input
                  type="url"
                  className="form-input"
                  placeholder="https://exemplo.com/prova.pdf"
                  value={directUrl}
                  onChange={(e) => setDirectUrl(e.target.value)}
                  required
                />
              </div>
              <div className="form-group" style={{ marginBottom: '0' }}>
                <label className="form-label">Nome Opcional para o Arquivo</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="prova_sedes_assistente.pdf"
                  value={directName}
                  onChange={(e) => setDirectName(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-secondary" disabled={downloadingUrl !== ''} style={{ alignSelf: 'flex-start' }}>
                {downloadingUrl === directUrl ? 'Baixando Arquivo...' : 'Baixar Link Direto'}
              </button>
            </form>
          </div>

        </div>

        {/* Right column: Local downloaded PDF files */}
        <div className="card" style={{ height: '100%' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '20px' }}>📂 Pasta de Destino (`/downloads`)</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '20px' }}>
            Os arquivos abaixo estão salvos localmente e prontos para a extração automática de questões.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '580px', overflowY: 'auto', paddingRight: '4px' }}>
            {localFiles.length > 0 ? (
              localFiles.map((file) => (
                <div key={file.name} style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-light)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '12px'
                  }}>
                    <span style={{ fontSize: '1.8rem' }}>📕</span>
                    <div style={{ minWidth: '0', flexGrow: 1 }}>
                      <h4 style={{
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }} title={file.name}>
                        {file.name}
                      </h4>
                      <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        {file.sizeMb} • Baixado em {new Date(file.createdAt).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleParseRedirect(file.name)}
                      style={{ flexGrow: 1, padding: '8px 12px', fontSize: '0.8rem' }}
                    >
                      ⚡ Varrer Prova
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleDeleteFile(file.name)}
                      style={{ padding: '8px 12px', fontSize: '0.8rem', color: 'var(--color-danger)' }}
                      title="Deletar Arquivo"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '40px 20px',
                color: 'var(--color-text-secondary)',
                border: '2px dashed var(--border-light)',
                borderRadius: '12px'
              }}>
                Nenhuma prova salva na pasta local ainda. Faça o download usando a pesquisa ou adicione links diretos.
              </div>
            )}
          </div>
        </div>

      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
