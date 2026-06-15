import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOWNLOADS_DIR = path.join(__dirname, '..', 'downloads');

// Ensure downloads directory exists
if (!fs.existsSync(DOWNLOADS_DIR)) {
  fs.mkdirSync(DOWNLOADS_DIR, { recursive: true });
}

// Curated list of high-quality exams for SEDES-DF/Quadrix/IADES
const CURATED_EXAMS = [
  {
    title: "SEDES-DF 2019 - Especialista em Assistência Social - Psicólogo",
    institution: "IBRAE",
    year: 2019,
    url: "https://www.pciconcursos.com.br/provas/download/especialista-em-assistencia-social-psicologo-sedes-df-ibrae-2019",
    directUrl: "https://arquivo.pciconcursos.com.br/provas/download/especialista-em-assistencia-social-psicologo-sedes-df-ibrae-2019.pdf"
  },
  {
    title: "SEDES-DF 2019 - Especialista em Assistência Social - Assistente Social",
    institution: "IBRAE",
    year: 2019,
    url: "https://www.pciconcursos.com.br/provas/download/especialista-em-assistencia-social-assistente-social-sedes-df-ibrae-2019",
    directUrl: "https://arquivo.pciconcursos.com.br/provas/download/especialista-em-assistencia-social-assistente-social-sedes-df-ibrae-2019.pdf"
  },
  {
    title: "SEDES-DF 2019 - Especialista em Assistência Social - Pedagogo",
    institution: "IBRAE",
    year: 2019,
    url: "https://www.pciconcursos.com.br/provas/download/especialista-em-assistencia-social-pedagogo-sedes-df-ibrae-2019",
    directUrl: "https://arquivo.pciconcursos.com.br/provas/download/especialista-em-assistencia-social-pedagogo-sedes-df-ibrae-2019.pdf"
  },
  {
    title: "SEDES-DF 2019 - Técnico em Assistência Social - Cuidador Social",
    institution: "IBRAE",
    year: 2019,
    url: "https://www.pciconcursos.com.br/provas/download/tecnico-em-assistencia-social-cuidador-social-sedes-df-ibrae-2019",
    directUrl: "https://arquivo.pciconcursos.com.br/provas/download/tecnico-em-assistencia-social-cuidador-social-sedes-df-ibrae-2019.pdf"
  },
  {
    title: "Quadrix 2023 - GDF - Assistente de Trânsito",
    institution: "Quadrix",
    year: 2023,
    url: "https://www.pciconcursos.com.br/provas/download/assistente-de-transito-detran-df-quadrix-2023",
    directUrl: "https://arquivo.pciconcursos.com.br/provas/download/assistente-de-transito-detran-df-quadrix-2023.pdf"
  }
];

export const downloader = {
  getDownloadsDir: () => DOWNLOADS_DIR,

  listFiles: () => {
    try {
      const files = fs.readdirSync(DOWNLOADS_DIR);
      return files.map(file => {
        const filePath = path.join(DOWNLOADS_DIR, file);
        const stats = fs.statSync(filePath);
        return {
          name: file,
          sizeBytes: stats.size,
          sizeMb: (stats.size / (1024 * 1024)).toFixed(2) + ' MB',
          createdAt: stats.birthtime.toISOString(),
          path: filePath
        };
      });
    } catch (error) {
      console.error("Error listing downloaded files:", error);
      return [];
    }
  },

  deleteFile: (filename) => {
    try {
      const filePath = path.join(DOWNLOADS_DIR, filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        return true;
      }
      return false;
    } catch (error) {
      console.error(`Error deleting file ${filename}:`, error);
      return false;
    }
  },

  searchExams: async (query) => {
    // If empty or "sedes" (case insensitive), we can include our curated ones first!
    let results = [];
    
    // Add curated ones if they match the query
    if (!query || query.trim() === '') {
      results = [...CURATED_EXAMS];
    } else {
      const qLower = query.toLowerCase();
      results = CURATED_EXAMS.filter(exam => 
        exam.title.toLowerCase().includes(qLower) || 
        exam.institution.toLowerCase().includes(qLower)
      );
    }

    // Try to scrape PCI Concursos search
    try {
      const searchUrl = `https://www.pciconcursos.com.br/provas/pesquisa/?q=${encodeURIComponent(query || 'SEDES DF')}`;
      console.log("Searching PCI Concursos:", searchUrl);
      
      const response = await axios.get(searchUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        },
        timeout: 5000
      });

      const html = response.data;
      
      // Basic regex parsing to extract links like:
      // <a href="https://www.pciconcursos.com.br/provas/download/especialista-em-assistencia-social-psicologo-sedes-df-ibrae-2019">Especialista em Assistência Social - Psicólogo (SEDES/DF - 2019)</a>
      // Note: PCI Concursos results usually look like: <div class="ca"> <a href="...">Cargo (Orgao/UF - Ano)</a> </div>
      const regex = /<div class="ca">[\s\S]*?<a href="([^"]+)"[^>]*>([\s\S]+?)<\/a>([\s\S]*?<\/div>)?/g;
      let match;
      let count = 0;
      
      while ((match = regex.exec(html)) !== null && count < 15) {
        let href = match[1];
        let text = match[2].replace(/<[^>]*>/g, '').trim(); // Remove any nested HTML tags
        
        // Extract organization and year if possible
        // Format is often "Cargo (Orgao/UF - Ano)" or "Cargo (Orgao/UF - Ano) - Banca"
        let institution = "Outro";
        let year = new Date().getFullYear();
        
        // Try parsing year
        const yearMatch = text.match(/\b(20\d{2}|19\d{2})\b/);
        if (yearMatch) {
          year = parseInt(yearMatch[1], 10);
        }
        
        // Try parsing institution
        if (text.includes("IBRAE")) institution = "IBRAE";
        else if (text.includes("Quadrix")) institution = "Quadrix";
        else if (text.includes("IADES")) institution = "IADES";
        else if (text.includes("Cebraspe") || text.includes("CESPE")) institution = "Cebraspe";
        else {
          // Guessing from link or surrounding text
          const parts = href.split('-');
          if (parts.length > 1) {
            const possibleInst = parts[parts.length - 2].toUpperCase();
            if (possibleInst.length >= 3 && possibleInst.length <= 8) {
              institution = possibleInst;
            }
          }
        }

        // Convert the regular page link to a direct PDF link:
        // Page link: "https://www.pciconcursos.com.br/provas/download/especialista-em-assistencia-social-psicologo-sedes-df-ibrae-2019"
        // PDF link:  "https://arquivo.pciconcursos.com.br/provas/download/especialista-em-assistencia-social-psicologo-sedes-df-ibrae-2019.pdf"
        let directUrl = href;
        if (href.includes("pciconcursos.com.br/provas/download/")) {
          directUrl = href.replace("pciconcursos.com.br/provas/download/", "arquivo.pciconcursos.com.br/provas/download/") + ".pdf";
        }

        // Check duplicates
        if (!results.some(r => r.url === href || r.directUrl === directUrl)) {
          results.push({
            title: text,
            institution,
            year,
            url: href,
            directUrl
          });
          count++;
        }
      }
    } catch (error) {
      console.warn("PCI Concursos scraper failed or timed out. Using curated list only:", error.message);
    }

    return results;
  },

  downloadFile: async (url, customFilename = null) => {
    try {
      // Resolve direct URL if it's a page
      let targetUrl = url;
      if (url.includes("pciconcursos.com.br/provas/download/") && !url.endsWith(".pdf")) {
        targetUrl = url.replace("pciconcursos.com.br/provas/download/", "arquivo.pciconcursos.com.br/provas/download/") + ".pdf";
      }

      // Generate filename from URL if none provided
      let filename = customFilename;
      if (!filename) {
        const urlParts = targetUrl.split('/');
        filename = urlParts[urlParts.length - 1];
        if (!filename.endsWith('.pdf')) {
          filename += '.pdf';
        }
      }
      
      const outputPath = path.join(DOWNLOADS_DIR, filename);
      console.log(`Downloading ${targetUrl} to ${outputPath}...`);

      const response = await axios({
        method: 'get',
        url: targetUrl,
        responseType: 'stream',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      });

      const writer = fs.createWriteStream(outputPath);
      response.data.pipe(writer);

      return new Promise((resolve, reject) => {
        writer.on('finish', () => resolve({
          success: true,
          filename,
          path: outputPath,
          sizeBytes: fs.statSync(outputPath).size
        }));
        writer.on('error', (err) => {
          fs.unlinkSync(outputPath);
          reject(err);
        });
      });
    } catch (error) {
      console.error(`Failed to download from ${url}:`, error);
      throw error;
    }
  }
};
