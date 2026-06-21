import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import fs from 'fs';

//setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const GEMINI_MODEL = 'gemini-2.5-flash';

app.use(cors());
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

const GDI_CONTEXT = (() => {
    try {
        return fs.readFileSync(path.join(__dirname, 'gdi-knowledge.txt'), 'utf8');
    } catch (error) {
        console.error('Error: Gagal membaca file gdi-knowledge.txt.', error.message);
        return '';
    }
})();

app.post('/api/chat', async (req, res) => {
    const { conversation } = req.body;
    try {
        if (!Array.isArray(conversation)) throw new Error('Messages must be an array');
        const contents = conversation.map(({ role, text }) => ({
            role,
            parts: [{ text }]
        }));

        const response = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents,
            config: {
                temperature: 0.3,
                topP: 0.8,
                systemInstruction: `
Anda adalah GDI Smart Assistant, asisten informasi resmi untuk Gereja Duta Injil Sola Gracia.
Tugas Anda adalah membantu menjawab pertanyaan pengguna hanya mengenai informasi seputar Gereja Duta Injil Sola Gracia berdasarkan data dari GDI_CONTEXT berikut:
${GDI_CONTEXT}

Aturan Penjawaban:
1. Hanya jawab pertanyaan yang terkait dengan topik-topik berikut:
   - Jadwal ibadah (Ibadah Minggu, Ibadah Doa, Bible Study)
   - Event gereja
   - Bible Study
   - Renungan
   - Ketentuan ibadah
   - Pelayanan
   - Kontak admin
2. Jika pengguna bertanya tentang topik di luar lingkup Gereja Duta Injil Sola Gracia, Anda harus menolak dengan sopan dan mengarahkan mereka kembali ke topik GDI.
3. Jangan mengarang informasi. Jika informasi yang ditanyakan oleh pengguna tidak ada atau tidak tersedia di GDI_CONTEXT, Anda WAJIB menjawab dengan kalimat berikut:
   "Maaf, informasi tersebut belum tersedia. Silakan hubungi admin gereja."
4. Jawablah dengan bahasa Indonesia yang ramah, sopan, dan profesional.
`
            }
        });
        res.status(200).json({ result: response.text });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server ready on http://localhost:${PORT}`));