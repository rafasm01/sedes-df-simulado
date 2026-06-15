import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { db } from './database/db.js';
import { downloader } from './services/downloader.js';
import { parser } from './services/parser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Expand payload limits for importing large question arrays

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// --- QUESTIONS API ---
app.get('/api/questions', (req, res) => {
  try {
    const questions = db.getQuestions();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/questions', (req, res) => {
  try {
    const question = req.body;
    if (!question.text) {
      return res.status(400).json({ error: "Question text is required." });
    }
    const saved = db.saveQuestion(question);
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/questions/:id', (req, res) => {
  try {
    const { id } = req.params;
    db.deleteQuestion(id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/questions/import', (req, res) => {
  try {
    const { questions } = req.body;
    if (!Array.isArray(questions)) {
      return res.status(400).json({ error: "Questions array is required." });
    }
    const count = db.importQuestions(questions);
    res.json({ success: true, count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// --- SIMULADOS API ---
app.get('/api/simulados', (req, res) => {
  try {
    const simulados = db.getSimulados();
    res.json(simulados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/simulados', (req, res) => {
  try {
    const simulado = req.body;
    if (!simulado.answers || !Array.isArray(simulado.answers)) {
      return res.status(400).json({ error: "Simulado details are incomplete." });
    }
    const saved = db.saveSimulado(simulado);
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/simulados/:id', (req, res) => {
  try {
    const { id } = req.params;
    db.deleteSimulado(id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// --- EXAM SEARCH & DOWNLOAD API ---
app.get('/api/exams/search', async (req, res) => {
  try {
    const { q } = req.query;
    const exams = await downloader.searchExams(q);
    res.json(exams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/exams/download', async (req, res) => {
  try {
    const { url, filename } = req.body;
    if (!url) {
      return res.status(400).json({ error: "URL is required." });
    }
    const result = await downloader.downloadFile(url, filename);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/exams/local', (req, res) => {
  try {
    const files = downloader.listFiles();
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/exams/local/:filename', (req, res) => {
  try {
    const { filename } = req.params;
    const success = downloader.deleteFile(filename);
    res.json({ success });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// --- PDF PARSING API ---
app.post('/api/exams/parse', async (req, res) => {
  try {
    const { filename } = req.body;
    if (!filename) {
      return res.status(400).json({ error: "Filename is required." });
    }
    
    const downloadsDir = downloader.getDownloadsDir();
    const pdfPath = path.join(downloadsDir, filename);
    
    if (!path.resolve(pdfPath).startsWith(path.resolve(downloadsDir))) {
      return res.status(400).json({ error: "Invalid path." });
    }
    
    console.log(`Parsing PDF file: ${pdfPath}`);
    const rawText = await parser.extractTextFromPdf(pdfPath);
    const parsedQuestions = parser.parseExamText(rawText);
    
    res.json({
      success: true,
      rawText,
      questions: parsedQuestions
    });
  } catch (error) {
    console.error("Error in parse endpoint:", error);
    res.status(500).json({ error: error.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`SEDES-DF Simulado Server running on http://localhost:${PORT}`);
});
