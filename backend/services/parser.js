import fs from 'fs';
import path from 'path';
import pdf from 'pdf-parse/lib/pdf-parse.js';

export const parser = {
  extractTextFromPdf: async (pdfPath) => {
    try {
      const dataBuffer = fs.readFileSync(pdfPath);
      const data = await pdf(dataBuffer);
      return data.text;
    } catch (error) {
      console.error(`Error parsing PDF at ${pdfPath}:`, error);
      throw error;
    }
  },

  parseExamText: (text) => {
    if (!text || text.trim() === '') {
      return [];
    }

    // Clean up text slightly to resolve common pdf-parse artifacts
    // Replace multiple spaces, keep some line breaks for structural analysis
    let cleanedText = text
      .replace(/\r\n/g, '\n')
      .replace(/[ \t]+/g, ' ')
      .replace(/\n\s*\n/g, '\n\n');

    // Regex to split by question markers
    // e.g. "Questão 1", "QUESTÃO 01", "1.", "01."
    // Let's look for: Questão \d+ or \n\d+[\.\-]\s+
    // We want to capture the question number and split the text.
    // To do this, we can find all indices of question numbers.
    const questionMarkers = [];
    const markerRegex = /(?:\n|^)(?:QUESTÃO|Questão|Questao|QUESTAO)\s+(\d+)[\s.:-]|[^\d\n](?:\n|^)(\d+)[\s\.\-]{1,2}(?=[A-Z\xC0-\xDFÀ-ÿ])/g;
    
    let match;
    while ((match = markerRegex.exec(cleanedText)) !== null) {
      const qNum = match[1] || match[2];
      questionMarkers.push({
        index: match.index,
        length: match[0].length,
        number: parseInt(qNum, 10)
      });
    }

    // If no markers found, try a simpler backup regex for lines starting with numbers
    if (questionMarkers.length === 0) {
      const backupRegex = /(?:\n|^)(\d+)[\.\-\)]\s+(?=[A-Z\xC0-\xDFÀ-ÿ])/g;
      while ((match = backupRegex.exec(cleanedText)) !== null) {
        questionMarkers.push({
          index: match.index,
          length: match[0].length,
          number: parseInt(match[1], 10)
        });
      }
    }

    // Sort markers by index
    questionMarkers.sort((a, b) => a.index - b.index);

    const questions = [];

    for (let i = 0; i < questionMarkers.length; i++) {
      const current = questionMarkers[i];
      const next = questionMarkers[i + 1];
      
      const startIdx = current.index + current.length;
      const endIdx = next ? next.index : cleanedText.length;
      
      let rawQuestionContent = cleanedText.substring(current.index, endIdx).trim();
      
      // Separate the text from options
      // Options typically look like: A) B) C) D) E) or (A) (B) (C) (D) (E)
      // Let's identify the options inside the raw question content.
      const optionRegex = /(?:\n|^)(?:\(?([A-Ea-e])\)|([A-Ea-e])[\.\-]\s+)(?=[A-Z0-9\xC0-\xDFÀ-ÿ\s])/g;
      
      const optionMatches = [];
      let optMatch;
      // We reset the regex index
      optionRegex.lastIndex = 0;
      
      while ((optMatch = optionRegex.exec(rawQuestionContent)) !== null) {
        const letter = (optMatch[1] || optMatch[2]).toUpperCase();
        optionMatches.push({
          index: optMatch.index,
          length: optMatch[0].length,
          letter
        });
      }

      let qText = rawQuestionContent;
      let options = [];
      let type = 'certo_errado';

      if (optionMatches.length >= 2) {
        // It's a multiple choice question!
        type = 'multiple_choice';
        
        // Extract the base question text (before the first option)
        qText = rawQuestionContent.substring(0, optionMatches[0].index).trim();
        
        // Remove the leading question number if it got inside
        const numCleanRegex = /^(?:QUESTÃO|Questão|Questao|QUESTAO)\s+\d+[\s.:-]*|^\d+[\s\.\-]*\s*/i;
        qText = qText.replace(numCleanRegex, '').trim();

        // Extract options
        for (let j = 0; j < optionMatches.length; j++) {
          const optStart = optionMatches[j].index + optionMatches[j].length;
          const optEnd = optionMatches[j + 1] ? optionMatches[j + 1].index : rawQuestionContent.length;
          
          let optText = rawQuestionContent.substring(optStart, optEnd).trim();
          // Remove trailing linebreaks
          optText = optText.replace(/\s+/g, ' ');
          
          options.push({
            letter: optionMatches[j].letter,
            text: optText
          });
        }
      } else {
        // It might be a Certo/Errado (True/False) question
        type = 'certo_errado';
        
        // Clean up the text
        const numCleanRegex = /^(?:QUESTÃO|Questão|Questao|QUESTAO)\s+\d+[\s.:-]*|^\d+[\s\.\-]*\s*/i;
        qText = rawQuestionContent.replace(numCleanRegex, '').trim();
        
        // Check if there are indicators like ( ) Certo ( ) Errado
        // and strip them from the question text
        const ceIndicatorRegex = /(?:\(\s*\)\s*Certo\s*(?:\(\s*\)\s*Errado)?|\(\s*\)\s*Errado\s*(?:\(\s*\)\s*Certo)?)/gi;
        qText = qText.replace(ceIndicatorRegex, '').trim();
      }

      // Check if question has valid text
      if (qText.length > 5) {
        questions.push({
          number: current.number,
          text: qText,
          type,
          options: type === 'multiple_choice' ? options : [
            { letter: 'C', text: 'Certo' },
            { letter: 'E', text: 'Errado' }
          ],
          correctAnswer: '', // User will supply or we can guess if we find key patterns
          explanation: '',
          subject: 'Geral',
          year: 2019,
          source: 'SEDES-DF'
        });
      }
    }

    return questions;
  }
};
