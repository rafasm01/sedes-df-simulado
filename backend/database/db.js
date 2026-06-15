import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const QUESTIONS_FILE = path.join(__dirname, 'questions.json');
const SIMULADOS_FILE = path.join(__dirname, 'simulados.json');

// Ensure files exist with empty array structure
const initializeFile = (filePath) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([], null, 2), 'utf-8');
  }
};

initializeFile(QUESTIONS_FILE);
initializeFile(SIMULADOS_FILE);

// Helper to read file
const readJSON = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return [];
  }
};

// Helper to write file
const writeJSON = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error(`Error writing to ${filePath}:`, error);
    return false;
  }
};

export const db = {
  // Questions CRUD
  getQuestions: () => readJSON(QUESTIONS_FILE),
  
  saveQuestion: (question) => {
    const questions = readJSON(QUESTIONS_FILE);
    if (!question.id) {
      question.id = 'q_' + Math.random().toString(36).substr(2, 9);
      question.createdAt = new Date().toISOString();
      questions.push(question);
    } else {
      const index = questions.findIndex(q => q.id === question.id);
      if (index !== -1) {
        questions[index] = { ...questions[index], ...question, updatedAt: new Date().toISOString() };
      } else {
        question.createdAt = new Date().toISOString();
        questions.push(question);
      }
    }
    writeJSON(QUESTIONS_FILE, questions);
    return question;
  },

  deleteQuestion: (id) => {
    const questions = readJSON(QUESTIONS_FILE);
    const filtered = questions.filter(q => q.id !== id);
    writeJSON(QUESTIONS_FILE, filtered);
    return true;
  },

  importQuestions: (newQuestions) => {
    const questions = readJSON(QUESTIONS_FILE);
    let importedCount = 0;
    
    newQuestions.forEach(q => {
      // Avoid exact duplicates by text check or generate ID
      const exists = questions.some(ex => ex.text.trim() === q.text.trim());
      if (!exists) {
        q.id = 'q_' + Math.random().toString(36).substr(2, 9);
        q.createdAt = new Date().toISOString();
        questions.push(q);
        importedCount++;
      }
    });
    
    writeJSON(QUESTIONS_FILE, questions);
    return importedCount;
  },

  // Simulados CRUD
  getSimulados: () => readJSON(SIMULADOS_FILE),
  
  saveSimulado: (simulado) => {
    const simulados = readJSON(SIMULADOS_FILE);
    simulado.id = 's_' + Math.random().toString(36).substr(2, 9);
    simulado.date = new Date().toISOString();
    simulados.push(simulado);
    writeJSON(SIMULADOS_FILE, simulados);
    return simulado;
  },

  deleteSimulado: (id) => {
    const simulados = readJSON(SIMULADOS_FILE);
    const filtered = simulados.filter(s => s.id !== id);
    writeJSON(SIMULADOS_FILE, filtered);
    return true;
  }
};
