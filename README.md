# Virtual Lab

**Virtual Lab** adalah aplikasi pembelajaran interaktif berbasis React Native menggunakan Expo. Aplikasi ini dirancang untuk memberikan pengalaman belajar yang menyenangkan dan fleksibel dengan berbagai fitur seperti navigasi tab, pencarian kursus, dan autentikasi pengguna.

---

## 🗂 Struktur Direktori

```plaintext
VIRTUAL-LAB
├── .expo/                    # File konfigurasi Expo
├── app/                      # Folder utama untuk routing dan halaman aplikasi
│   ├── (auth)/               # Halaman dan komponen untuk autentikasi pengguna
│   ├── (tabs)/               # Halaman untuk navigasi berbasis tab
│   ├── course/               # Halaman dan logika untuk kursus
│   ├── search/               # Halaman dan logika pencarian kursus
│   ├── _layout.jsx           # File konfigurasi layout utama
│   └── index.jsx             # Entry point untuk folder `app`
├── assets/                   # File statis seperti gambar dan ikon
├── components/               # Komponen reusable untuk UI
├── constants/                # Konstanta seperti warna, ukuran, dan teks default
├── context/                  # Context API untuk state management global
├── dist/                     # Build output (jika ada)
├── lib/                      # Utility library atau kode pendukung lainnya
├── node_modules/             # Folder dependency dari npm
├── .gitignore                # Daftar file/folder yang tidak di-track oleh Git
├── app.json                  # Konfigurasi aplikasi untuk Expo
├── babel.config.js           # Konfigurasi Babel
├── index.js                  # Entry point aplikasi
├── metro.config.js           # Konfigurasi Metro bundler
├── package-lock.json         # File lock untuk npm dependency
├── package.json              # File konfigurasi proyek Node.js
├── react-native.config.js    # Konfigurasi tambahan React Native
├── style.js                  # File untuk style global
└── smartlab.apk              # FIle APK dari mobile app
```

---

## 🚀 Cara Menjalankan Proyek

### Langkah 0: Download smartlab.APK untuk mobile atau masuk ke web
Link web : https://grey-giraffe-229125.hostingersite.com 

### Langkah 1: Clone Repositori
Clone repositori proyek ke komputer lokal menggunakan perintah berikut:

```bash
git clone <repository-url>
```

### Langkah 2: Masuk ke Direktori Proyek
Pindah ke direktori proyek dengan perintah berikut:

```bash
cd virtual-lab
```

### Langkah 3: Install Dependency
Untuk menginstal dependency yang diperlukan, jalankan salah satu perintah berikut:

Menggunakan npm:
```bash
npm install
```

Menggunakan yarn:
```bash
yarn install
```

### Langkah 4: Jalankan Aplikasi
Jalankan aplikasi menggunakan Expo dengan perintah berikut:

```bash
npx expo start
```

---

## 📦 Teknologi yang Digunakan

- **Framework**: React Native
- **Platform**: Expo
- **State Management**: Context API
- **Backend**: Appwrite

---

## ✨ Fitur Utama

1. **Autentikasi Pengguna**: Login dan pendaftaran pengguna.
2. **Navigasi Berbasis Tab**: Pengalaman pengguna yang intuitif dengan navigasi tab.
3. **Manajemen Kursus**: Daftar dan rincian kursus.
4. **Pencarian**: Fitur untuk mencari kursus berdasarkan kata kunci.

---

## 🧪 Testing

Untuk pengujian, gunakan emulator Android/iOS atau perangkat fisik melalui Expo Go.

---
