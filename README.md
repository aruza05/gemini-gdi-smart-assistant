# GDI Smart Assistant

GDI Smart Assistant adalah aplikasi chatbot berbasis AI (Gemini 2.5 Flash) yang dirancang untuk membantu jemaat dan pengunjung mendapatkan informasi seputar **Gereja Duta Injil Sola Gracia (GDI)** secara cepat, ramah, dan interaktif.

## Fitur Utama

- **Informasi Terintegrasi**: Memberikan informasi jadwal ibadah (Minggu, Rabu, Sabtu), event gereja, ketentuan ibadah, dan kontak admin secara instan.
- **Dynamic Knowledge Base**: Chatbot membaca basis pengetahuan secara dinamis dari file eksternal `gdi-knowledge.txt`.
- **User Interface Interaktif**: Halaman web chat responsif dengan micro-animations, formatting teks markdown dasar, dan loading animation.
- **Guardrails AI**: Membatasi jawaban chatbot hanya pada informasi seputar Gereja Duta Injil Sola Gracia dan menolak pertanyaan di luar topik dengan sopan.

## Struktur Folder

```
gemini-gdi-smart-assistant/
├── public/
│   ├── index.html       # Antarmuka web chat
│   ├── script.js        # Logika frontend chat & markdown formatter
│   └── style.css        # Desain layout & animasi loading
├── .env                 # Konfigurasi environment (diabaikan oleh git)
├── .gitignore           # Daftar file yang diabaikan oleh Git
├── gdi-knowledge.txt    # Knowledge base gereja (sumber data asisten)
├── index.js             # Server backend Node.js / Express & integrasi Gemini API
├── package.json         # Konfigurasi dependensi project
└── README.md            # Dokumentasi project
```

## Teknologi yang Digunakan

- **Backend**: Node.js & Express.js
- **Frontend**: Vanilla HTML5, CSS3, & JavaScript
- **AI Engine**: `@google/genai` (Google Gemini SDK) menggunakan model `gemini-2.5-flash`
- **Utility**: `dotenv`, `cors`

## Cara Menjalankan Project

1. **Clone repository & masuk ke direktori project**:
   ```bash
   cd gemini-gdi-smart-assistant
   ```

2. **Install dependensi**:
   ```bash
   npm install
   ```

3. **Buat file `.env`**:
   Buat file bernama `.env` di root project dan masukkan API Key Gemini Anda.

4. **Jalankan server**:
   ```bash
   npm start
   # atau jika menggunakan nodemon / dev script:
   npm run dev
   ```

5. **Akses aplikasi**:
   Buka browser dan akses [http://localhost:3000](http://localhost:3000).

## Contoh Isi `.env`

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
```

## Contoh Pertanyaan untuk Testing

Berikut beberapa contoh pertanyaan untuk menguji kemampuan asisten:
- *"Kapan jadwal ibadah hari Minggu?"*
- *"Di mana lokasi dan apa itu Gereja Duta Injil Sola Gracia?"*
- *"Apa saja event yang tersedia?"*
- *"Bagaimana ketentuan mengikuti ibadah?"*
- *"Siapa kontak admin gereja?"*
- *"Apakah ada ibadah doa di hari Rabu?"*
- *(Uji guardrail)* *"Tolong jelaskan resep membuat kue black forest"* -> Asisten akan menolak menjawab dengan sopan dan mengarahkan kembali ke topik GDI.

## Catatan Penting

- **Keamanan**: File `.env` (yang berisi API key sensitif) dan direktori `node_modules` telah dikonfigurasi di `.gitignore` agar tidak diunggah ke GitHub demi menjaga keamanan data.
- **Knowledge Base**: Semua informasi tentang gereja disimpan secara dinamis di file `gdi-knowledge.txt`. Anda dapat memperbarui informasi gereja secara langsung di file tersebut tanpa perlu mengubah kode backend `index.js`.
