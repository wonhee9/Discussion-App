# Panduan Lengkap Mengambil Screenshot untuk Submission (Pemula)

Panduan ini dirancang untuk memandu Anda langkah demi langkah dalam menyiapkan GitHub Actions, memicu pemeriksaan otomatis (CI), menerapkan proteksi cabang (Branch Protection), dan mengambil screenshot yang diperlukan untuk kelulusan submission Anda.

---

## Daftar Screenshot yang Wajib Dikumpulkan
Pastikan hasil screenshot Anda disimpan di dalam folder `screenshot` dengan nama file yang tepat:
1. `1_ci_check_error.png`
2. `2_ci_check_pass.png`
3. `3_branch_protection.png`

---

## Tahap Persiapan: Hubungkan Proyek ke GitHub
Jika Anda belum mengunggah kode proyek ke GitHub, ikuti langkah-langkah berikut terlebih dahulu:
1. Buka [GitHub](https://github.com/) dan buat sebuah repositori baru (beri nama bebas, misal: `aplikasi-forum-diskusi`). Jangan centang opsi inisialisasi seperti README atau `.gitignore` karena proyek kita sudah memilikinya.
2. Buka Terminal atau Command Prompt di direktori proyek Anda.
3. Jalankan perintah berikut untuk menginisialisasi Git (jika belum) dan melakukan push ke repositori baru Anda:
   ```bash
   git init
   git add .
   git commit -m "initial commit"
   git branch -M master
   git remote add origin <URL_REPOSITORI_GITHUB_ANDA>
   git push -u origin master
   ```

---

## Langkah 1: Mendapatkan Screenshot `1_ci_check_error.png`
Tujuan dari langkah ini adalah menunjukkan bahwa sistem CI (GitHub Actions) bekerja dengan baik dan dapat mendeteksi kegagalan kode secara otomatis.

### Langkah demi Langkah:
1. **Buat Cabang (Branch) Baru**:
   Jangan melakukan pengujian langsung di branch `master`. Buatlah branch baru bernama `uji-ci` dengan menjalankan perintah berikut di terminal Anda:
   ```bash
   git checkout -b uji-ci
   ```
2. **Sengaja Merusak Salah Satu Pengujian**:
   * Buka berkas pengujian komponen Loading di `src/components/Loading.test.jsx`.
   * Pada baris ke-15, ubah assertion berikut:
     ```javascript
     // Dari:
     expect(container.firstChild).toBeNull();
     
     // Menjadi:
     expect(container.firstChild).not.toBeNull();
     ```
   * Simpan berkas tersebut.
3. **Commit dan Push Perubahan**:
   Kirim perubahan yang rusak tersebut ke GitHub dengan perintah berikut:
   ```bash
   git add src/components/Loading.test.jsx
   git commit -m "sengaja merusak pengujian loading"
   git push origin uji-ci
   ```
4. **Buat Pull Request (PR) di GitHub**:
   * Buka repositori Anda di situs GitHub. Anda akan melihat tombol kuning bertuliskan **Compare & pull request**. Klik tombol tersebut.
   * Pastikan target branch tujuan (base) adalah `master` dan branch asal (compare) adalah `uji-ci`.
   * Klik tombol **Create pull request**.
5. **Ambil Screenshot Error**:
   * Tunggu sekitar 1 hingga 2 menit agar GitHub Actions memproses alur kerja (workflow) `Continuous Integration`.
   * Anda akan melihat bagian pemeriksaan (checks) di bawah deskripsi PR Anda berubah menjadi merah silang dengan keterangan:
     `Continuous Integration / automation-test-job (pull_request) Failing after ...`
   * Ambil screenshot bagian pemeriksaan berwarna merah tersebut.
   * Simpan gambar tersebut ke dalam folder `screenshot` dengan nama **`1_ci_check_error.png`**.

---

## Langkah 2: Mendapatkan Screenshot `2_ci_check_pass.png`
Tujuan langkah ini adalah membuktikan bahwa sistem CI dapat mendeteksi kode yang sudah diperbaiki dan memberikan tanda sukses (lulus pengujian).

### Langkah demi Langkah:
1. **Perbaiki Kembali Pengujian**:
   * Buka kembali berkas `src/components/Loading.test.jsx`.
   * Kembalikan kode pengujian di baris ke-15 ke kondisi semula yang benar:
     ```javascript
     expect(container.firstChild).toBeNull();
     ```
   * Simpan berkas tersebut.
2. **Commit dan Push Perbaikan**:
   Kirim kode yang sudah benar ke GitHub menggunakan perintah berikut:
   ```bash
   git add src/components/Loading.test.jsx
   git commit -m "memperbaiki pengujian loading"
   git push origin uji-ci
   ```
3. **Ambil Screenshot Lulus (Pass)**:
   * Kembali ke halaman Pull Request yang sama di GitHub.
   * GitHub Actions akan mendeteksi commit baru Anda secara otomatis dan menjalankan ulang pengujian.
   * Tunggu sekitar 1-2 menit hingga status pemeriksaan berubah menjadi centang hijau dengan keterangan:
     `Continuous Integration / automation-test-job (pull_request) Successful in ...`
   * Ambil screenshot status pemeriksaan yang berwarna hijau sukses tersebut.
   * Simpan gambar tersebut ke dalam folder `screenshot` dengan nama **`2_ci_check_pass.png`**.

---

## Langkah 3: Mendapatkan Screenshot `3_branch_protection.png`
Tujuan langkah ini adalah memastikan branch utama (`master`) terlindungi sehingga tidak ada anggota tim yang dapat langsung menggabungkan kode rusak tanpa melalui persetujuan (review) atau pemeriksaan CI yang sukses.

### Langkah demi Langkah:
1. **Aktifkan Fitur Branch Protection**:
   * Di halaman repositori GitHub Anda, klik tab **Settings** di bagian menu atas.
   * Pada bilah samping kiri (sidebar), di bawah bagian *Code and automation*, klik menu **Branches**.
   * Di bagian *Branch protection rules*, klik tombol **Add branch protection rule**.
2. **Konfigurasi Aturan Proteksi**:
   * Pada kolom **Branch name pattern**, ketik nama branch utama Anda: `master`.
   * Centang opsi berikut:
     * **`Require a pull request before merging`** (Ini akan menonaktifkan penggabungan langsung tanpa PR).
     * **`Require status checks to pass before merging`** (Ini memastikan PR hanya bisa di-merge jika tes CI berhasil).
       * Di kolom pencarian yang muncul di bawahnya (*Search for status checks*), ketik **`automation-test-job`** lalu centang nama job tersebut yang muncul di daftar pencarian.
   * Gulir ke bawah halaman lalu klik tombol hijau **Create** (atau **Save changes**). Anda mungkin diminta memasukkan kata sandi GitHub Anda untuk verifikasi.
3. **Ambil Screenshot Blokir / Proteksi**:
   * Kembali ke halaman Pull Request (`uji-ci` -> `master`) yang Anda buat sebelumnya di GitHub.
   * *Catatan:* Jika Anda menggunakan akun pemilik repositori (admin), tombol merge mungkin masih terlihat aktif dengan keterangan "Merge without waiting for requirements to be met". Namun, Anda akan melihat pesan peringatan bahwa branch ini terlindungi dan membutuhkan persetujuan/pemeriksaan yang sukses.
   * Cari dan fokuskan layar Anda pada bagian keterangan status proteksi yang menampilkan informasi bahwa branch `master` dilindungi dan penggabungan diblokir jika syarat tidak terpenuhi (atau membutuhkan review persetujuan).
   * Ambil screenshot bagian kotak Merge PR yang menampilkan informasi proteksi aktif tersebut.
   * Simpan gambar tersebut ke dalam folder `screenshot` dengan nama **`3_branch_protection.png`**.

---

> [!IMPORTANT]
> Setelah Anda mendapatkan ketiga file gambar tersebut, pastikan struktur folder proyek Anda terlihat seperti ini sebelum melakukan kompresi ZIP untuk dikirim ke Dicoding:
> ```text
> aplikasi-forum-diskusi/
> ├── .github/
> │   └── workflows/
> │       └── ci.yml
> ├── screenshot/
> │   ├── INSTRUCTIONS.md (panduan ini)
> │   ├── 1_ci_check_error.png
> │   ├── 2_ci_check_pass.png
> │   └── 3_branch_protection.png
> ├── src/
> ├── package.json
> └── ... (berkas proyek lainnya)
> ```
