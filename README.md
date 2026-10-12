# 🐍 PythonVerse - Platform Tutorial & Latihan Soal Interaktif Anti-Menyontek

Aplikasi web interaktif komprehensif untuk mempelajari bahasa pemrograman Python dari tingkat dasar hingga mahir, dilengkapi dengan sistem bank soal dan **Generator Soal Prosedural 100% Anti-Menyontek**.

---

## 🚀 Cara Menjalankan Aplikasi

### Cara 1: Menggunakan `start.bat` (Paling Praktis di Windows)
Cukup klik dua kali (double-click) pada file:
```
start.bat
```
Server lokal Python akan otomatis berjalan dan browser default Anda akan langsung terbuka di alamat `http://127.0.0.1:8000`.

### Cara 2: Menjalankan Lewat Terminal / Command Prompt
Buka terminal di folder ini (`c:\codingan\web`), lalu jalankan:
```bash
python server.py
```
Aplikasi akan aktif di `http://127.0.0.1:8000`.

Playground memerlukan akses lewat server lokal karena runtime Python berjalan di browser menggunakan Web Worker dan WebAssembly.

---

## 🎯 Fitur Unggulan Anti-Menyontek (Anti-Cheating System)

Sesuai permintaan Anda agar **"soal bisa di-reset dan di-acak agar tidak menyontek"**, platform ini dibekali dengan 3 lapis perlindungan anti-hafalan:

1. 🔀 **Pengacakan Soal (Fisher-Yates Shuffle)**:
   - Setiap kali tombol *"Acak Soal & Opsi (Anti-Nyontek)"* ditekan, urutan soal diacak total secara acak murni. Soal nomor 1 di sesi sebelumnya tidak akan berada di posisi yang sama.
2. 🎲 **Pengacakan Posisi Pilihan Jawaban (A, B, C, D)**:
   - Opsi jawaban untuk setiap soal diacak secara independen. Jawaban benar tidak lagi selalu berada di posisi opsi tertentu.
3. ⚡ **Generator Soal Prosedural Dinamis (Tab: "Tebak Output Dinamis")**:
   - Fitur pamungkas anti-menyontek! Setiap kali tombol *"Generate Soal Acak Baru"* ditekan, sistem membuat cuplikan kode baru dengan **angka, string, indeks, dan logika acak**.
   - Tidak ada kunci jawaban statis yang bisa dihafal atau dicontek, karena nilai keluaran dihitung secara dinamis saat soal dibuat. Anda benar-benar diuji pemahaman logikanya!
4. 🔄 **Tombol Reset Sekali Klik**:
   - Tombol *"Reset Jawaban"* mengembalikan seluruh status jawaban menjadi kosong sehingga latihan bisa diulang dari awal dengan bersih.

---

## 📚 Kurikulum 15 Modul Tutorial Python Lengkap

1. **Modul 1: Pengenalan & Dasar Sintaks** (`print()`, `sep`, `end`, indentasi wajib, komentar & docstrings).
2. **Modul 2: Variabel & Tipe Data** (Aturan penamaan, `int`, `float`, `str`, `bool`, type casting).
3. **Modul 3: Operator Lengkap** (Aritmatika, Floor division `//`, Modulus `%`, Pangkat `**`, `is` vs `==`, `in`).
4. **Modul 4: Manipulasi String & Formatting** (Indexing, Slicing `[start:stop:step]`, method string, f-string).
5. **Modul 5: Kontrol Percabangan** (`if`, `elif`, `else`, nested if, ternary operator, Truthy/Falsy).
6. **Modul 6: Perulangan (Loops)** (`for`, `while`, `range()`, `break`, `continue`, `enumerate()`, `zip()`).
7. **Modul 7: Struktur Data - List** (Mutabilitas, list methods, List Comprehension).
8. **Modul 8: Struktur Data - Tuple & Set** (Immutabilitas tuple, unpacking, himpunan set unik, union/intersection).
9. **Modul 9: Struktur Data - Dictionary** (Pasangan key-value, `.get()`, Dictionary Comprehension).
10. **Modul 10: Fungsi & Modularitas** (`def`, `return`, `*args`, `**kwargs`, lambda functions, scope variabel).
11. **Modul 11: Penanganan Error & Eksepsi** (`try`, `except`, `else`, `finally`, `raise`).
12. **Modul 12: Operasi File I/O** (Mode `'r'`, `'w'`, `'a'`, context manager `with open(...)`).
13. **Modul 13: Pemrograman Berorientasi Objek (OOP)** (`class`, `__init__`, `self`, Inheritance, Enkapsulasi, Dunder methods).
14. **Modul 14: Modul & Pustaka Standar** (`math`, `random`, `datetime`, `json`, `os`).
15. **Modul 15: Fitur Lanjutan & Tips Pythonic** (Generators & `yield`, Decorators `@`, Zen of Python).

---

## 🛠️ Fitur Tambahan

- **Python Live Playground**: Scratchpad untuk menulis dan menjalankan kode Python dengan output di konsol. Cuplikan dari materi dapat dibuka di tab baru; tekan **Jalankan** atau **Ctrl+Enter** untuk mengeksekusinya. Python berjalan di browser melalui WebAssembly, sehingga kode pengunjung tidak dieksekusi di server.
- **Tantangan Koding Interaktif**: Problem solving dengan validasi test cases otomatis (Detektor Palindrom, Faktorial, Deret Fibonacci, dll).
- **Pencarian Cepat (Ctrl + K)**: Cari materi atau fungsi Python apa pun dalam sekejap.
- **Cheat Sheet Terpadu**: Tabel referensi cepat untuk metode string, list, dict, dan sintaks penting.
- **Progress Tracker & LocalStorage**: Riwayat modul yang telah selesai otomatis tersimpan di browser.

## 🌐 Deploy Publik di PythonAnywhere

Situs ini dilayani sebagai aplikasi WSGI dan file statis oleh `pythonanywhere_wsgi.py`. Python Playground menjalankan kode Python di browser menggunakan Pyodide WebAssembly; kode pengunjung tidak dikirim atau dieksekusi di server.

1. Buat akun di [PythonAnywhere](https://www.pythonanywhere.com/) dan buka tab **Web**.
2. Pilih **Add a new web app**, konfirmasi domain gratis `USERNAME.pythonanywhere.com`, lalu pilih **Manual configuration** dan versi Python yang tersedia di akun.
3. Buka tab **Consoles**, jalankan Bash console, lalu clone repository:
   ```bash
   git clone https://github.com/fazle-star/py-by-fazle.git
   ```
4. Kembali ke tab **Web**. Buka file WSGI yang ditampilkan pada bagian **Code**, hapus isinya, lalu masukkan konfigurasi berikut. Ganti `USERNAME` dengan username PythonAnywhere Anda:
   ```python
   import sys

   project_home = "/home/USERNAME/py-by-fazle"
   if project_home not in sys.path:
       sys.path.insert(0, project_home)

   from pythonanywhere_wsgi import application
   ```
5. Klik **Reload** pada halaman Web. Situs akan tersedia di `https://USERNAME.pythonanywhere.com`.

Jika repository sudah pernah di-clone, jalankan `cd ~/py-by-fazle && git pull` di Bash console untuk mengambil update. Playground memerlukan koneksi internet browser saat pertama kali memuat runtime dari jsDelivr. Kode dan progres tersimpan pada browser masing-masing pengunjung. Ketersediaan paket gratis, domain, dan proses pendaftaran mengikuti kebijakan PythonAnywhere saat ini; langkah ini tidak dapat melewati verifikasi pembayaran bila PythonAnywhere mewajibkannya pada akun Anda.
