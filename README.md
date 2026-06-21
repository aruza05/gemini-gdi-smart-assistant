# GDI Smart Assistant

GDI Smart Assistant adalah aplikasi chatbot berbasis Node.js, Express, dan Gemini API yang membantu pengguna mendapatkan informasi seputar GDI secara cepat dan interaktif.

Chatbot ini dirancang untuk menjawab pertanyaan mengenai jadwal ibadah, event gereja, Bible Study, renungan, pelayanan, kontak admin, serta informasi umum yang tersedia pada knowledge base project.

## Target Pengguna

- Jemaat GDI yang membutuhkan informasi gereja secara cepat.
- Pengunjung baru yang ingin mengetahui jadwal ibadah dan informasi umum GDI.
- Admin atau tim pelayanan yang ingin menyediakan kanal informasi otomatis berbasis chatbot.

## Fitur Utama

- Chatbot AI untuk menjawab pertanyaan seputar GDI.
- Informasi jadwal ibadah, event gereja, Bible Study, pelayanan, dan kontak admin.
- Knowledge base lokal melalui file `gdi-knowledge.txt`.
- Antarmuka chat berbasis web yang responsif.
- Integrasi Gemini API melalui backend Express.
- Guardrail agar asisten tetap menjawab sesuai konteks informasi GDI.

## Teknologi yang Digunakan

- Node.js
- Express.js
- Gemini API
- Google Gen AI SDK (`@google/genai`)
- HTML
- CSS
- JavaScript
- npm
- dotenv
- cors

## Struktur Folder Singkat

```text
gemini-gdi-smart-assistant/
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── gdi-knowledge.txt
├── index.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## Cara Instalasi

1. Masuk ke folder project.

```bash
cd gemini-gdi-smart-assistant
```

2. Install dependency menggunakan npm.

```bash
npm install
```

## Cara Membuat File `.env`

Buat file `.env` di root folder project.

```bash
touch .env
```

Isi file `.env` dengan environment variable berikut:

```env
GEMINI_API_KEY=masukkan_api_key_gemini_anda
```

Ganti `masukkan_api_key_gemini_anda` dengan API key Gemini yang valid.

## Cara Menjalankan Project

Jalankan server dengan perintah berikut:

```bash
npm start
```

Jika server berhasil berjalan, aplikasi akan tersedia di port `3000`.

## Cara Membuka Aplikasi di Browser

Buka browser, lalu akses URL berikut:

[http://localhost:3000](http://localhost:3000/)

## Catatan Keamanan

File `.env` berisi API key dan data sensitif, sehingga tidak boleh di-upload ke GitHub atau dibagikan secara publik.

Pastikan file `.env` sudah masuk ke `.gitignore` sebelum melakukan commit. Jangan pernah menulis API key langsung di dalam file kode seperti `index.js`, file frontend, atau README.

## Screenshot

Tambahkan screenshot tampilan aplikasi pada bagian ini.

```text
Placeholder screenshot:

[ Screenshot halaman chatbot GDI Smart Assistant ]
```

## Author

Ade Ruyani Zaenudin
