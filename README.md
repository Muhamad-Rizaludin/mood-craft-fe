# MoodCraft Client (Frontend)

Frontend React application untuk MoodCraft - aplikasi mood board dengan interface bahasa Indonesia.

## Setup

### Prerequisites
- Node.js 18+
- Server MoodCraft yang sudah berjalan

### Installation

1. Install dependencies:
```bash
npm install
```

2. Setup environment variables:
```bash
cp .env.example .env
```

Edit `.env` dan sesuaikan dengan URL server Anda:
```env
VITE_API_URL=http://localhost:5000
```

3. Jalankan development server:
```bash
npm run dev
```

4. Buka browser di `http://localhost:3000`

### Build untuk Production

1. Build aplikasi:
```bash
npm run build
```

2. Preview build:
```bash
npm run preview
```

Files akan di-generate di folder `dist/`

## Configuration

### Environment Variables

- `VITE_API_URL`: URL server backend (default: http://localhost:5000)

### Development Proxy

Vite secara otomatis akan memproxy request API ke server backend:
- `/api/*` → Backend server
- `/uploads/*` → Backend server untuk static files

## Deployment

### Static Hosting (Vercel, Netlify, dll)

1. Build aplikasi: `npm run build`
2. Upload folder `dist/` ke hosting provider
3. Pastikan setup environment variable `VITE_API_URL` ke URL server production

### Vercel

1. Connect repository ke Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Setup environment variable:
   - `VITE_API_URL` = URL server production Anda

### Netlify

1. Connect repository ke Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Setup environment variable di Netlify dashboard

## Features

- ✅ React + TypeScript + Vite
- ✅ Tailwind CSS + Shadcn/UI
- ✅ Drag & Drop interface
- ✅ Image upload dan management
- ✅ Responsive design
- ✅ Bahasa Indonesia interface
- ✅ Export mood board sebagai PNG

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn/UI components
│   ├── draggable-item.tsx
│   ├── mood-board-card.tsx
│   └── ...
├── pages/              # Page components
│   ├── dashboard.tsx   # Main dashboard
│   ├── board-editor.tsx # Board editor
│   └── landing.tsx     # Landing page
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── App.tsx             # Main app component
```

## API Integration

Client berkomunikasi dengan server melalui:
- REST API untuk CRUD operations
- File upload untuk gambar
- Session-based authentication

Semua request API secara otomatis di-handle oleh query client dengan caching dan error handling.