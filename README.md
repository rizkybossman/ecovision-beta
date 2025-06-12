# EcoVision – Web App Deteksi Sampah dan Rekomendasi Aksi Berbasis Cuaca

Ini adalah paragraf pengantar biasa yang menjelaskan secara singkat tujuan utama proyek.

### Deskripsi Singkat

**EcoVision** adalah aplikasi web berbasis AI yang bertujuan meningkatkan kesadaran masyarakat dalam memilah sampah dan memahami kondisi cuaca ekstrem. Dengan integrasi klasifikasi gambar dan data cuaca, pengguna mendapatkan edukasi sekaligus rekomendasi aksi ramah lingkungan berbasis lokasi.

### Demo Langsung

🔗 [Klik di sini untuk mencoba aplikasi](https://ecovision-beta.vercel.app/)

### Video Demo / Presentasi *(Opsional tapi dianjurkan)*

🎥 [Lihat video demo aplikasi](https://drive.google.com/file/d/16KzX2OQvjWIRdBiMfM_YKed5Qa02brU8/view?usp=sharing) <br/>
🎥 [Lihat video presentasi](https://www.youtube.com/watch?v=your-video-id)

### Fitur Utama

* 📸 **Klasifikasi gambar sampah** (organik, anorganik, daur ulang)
* 🌦️ **Rekomendasi aksi** berdasarkan cuaca *real-time* (BMKG)
* 🗺️ **Deteksi lokasi pengguna otomatis** (geolocation)
* 📊 **UI responsif dan edukatif** berbasis React + Tailwind
* ⚙️ **Model AI berjalan langsung di browser** (on-device)

### Teknologi yang Digunakan

#### Front-End

* React
* Tailwind CSS
* React Router DOM
* Framer Motion
* React Icons
* React Dropzone
* React Scroll
* Styled JSX

#### Peta & Lokasi

* Leaflet
* React-Leaflet
* Nominatim API
* Navigator.geolocation

#### Machine Learning

* TensorFlow.js
* `@tensorflow-models/mobilenet`
* TensorFlow Lite
* SavedModel

#### Build System

* Webpack
* Babel
* PostCSS
* Tailwind Config

#### API dan Data

* BMKG API
* OpenStreetMap (Nominatim)
* `fetch` API

#### Deployment

* Vercel

### Cara Menjalankan Proyek Lokal

1.  **Clone Repository**

    ```bash
    git clone [https://github.com/username/ecovision.git](https://github.com/username/ecovision.git)
    cd ecovision
    ```

2.  **Install Dependencies**

    ```bash
    npm install
    ```

3.  **Jalankan Aplikasi di Localhost**

    ```bash
    npm run dev
    ```

4.  **Build untuk Produksi**

    ```bash
    npm run build
    ```

---

### Struktur Folder
```markdown


ecovision/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── ml-model/
│   ├── utils/
│   └── App.jsx
├── tailwind.config.js
├── index.html
├── package.json
├── README.md


---

```
### Model AI

* **Model**: MobileNet *(custom fine-tuned)*
* **Format**: TensorFlow.js + TensorFlow Lite
* **Input**: gambar dengan kategori `[organik, anorganik, daur ulang]`
* **Lokasi**: `/src/ml-model/model.json`

### Kontributor

* Dicksa Ananda Cristian Tue (ML)
* Abdan Syakura (ML)
* Zulfi Ramadhan (ML)
* Rizky Maulana (Frontend)
* Gilber Kristanto (Frontend)

### Lisensi

[MIT License](https://opensource.org/licenses/MIT) – Silakan gunakan, kontribusikan, dan modifikasi dengan tetap menyertakan kredit.

### Kontak

Jika ada pertanyaan, hubungi melalui:

* **Email**: mc350d5y0560@student.devacademy.id
* **LinkedIn**: [linkedin.com/in/dicksa](https://www.linkedin.com/in/dicksa)
