/**
 * Database Tutorial Python Lengkap (15 Modul Komprehensif)
 */

const TUTORIAL_DATA = [
    {
        id: "mod-1",
        title: "1. Pengenalan & Dasar Sintaks",
        level: "Pemula",
        category: "Dasar",
        icon: "terminal",
        badge: "Modul 01",
        description: "Mengenal bahasa Python, filosofi, indentasi khas, fungsi output print(), dan penulisan komentar.",
        readTime: "8 menit",
        sections: [
            {
                title: "Apa itu Python dan Mengapa Populer?",
                content: `
                    <p class="mb-3"><strong>Python</strong> adalah bahasa pemrograman tingkat tinggi (<em>high-level</em>), serbaguna (<em>general-purpose</em>), dan bertipe dinamis (<em>dynamically typed</em>) yang diciptakan oleh <strong>Guido van Rossum</strong> dan dirilis pertama kali pada tahun 1991.</p>
                    <div class="p-4 bg-slate-800/80 rounded-xl border border-slate-700 my-3">
                        <h4 class="font-semibold text-emerald-400 mb-2">Keunggulan Utama Python:</h4>
                        <ul class="list-disc list-inside space-y-1 text-slate-300">
                            <li><strong>Sintaks Bersih & Mudah Dibaca:</strong> Menyerupai bahasa Inggris biasa (pseudocode yang bisa dijalankan).</li>
                            <li><strong>Multi-Paradigma:</strong> Mendukung pemrograman berorientasi objek (OOP), fungsional, maupun prosedural.</li>
                            <li><strong>Ekosistem Raksasa:</strong> Populer dalam Data Science, Machine Learning / AI, Web Development (Django/FastAPI), Otomasi, hingga Cybersecurity.</li>
                            <li><strong>Cross-Platform:</strong> Berjalan di Windows, macOS, Linux tanpa perlu ubah kode.</li>
                        </ul>
                    </div>
                `
            },
            {
                title: "Program Pertama & Fungsi print()",
                content: `
                    <p class="mb-2">Untuk menampilkan teks ke layar atau terminal, gunakan fungsi bawaan <code>print()</code>.</p>
                    <p class="mb-3">Fungsi <code>print()</code> memiliki beberapa parameter opsional yang sangat berguna:</p>
                    <ul class="list-disc list-inside space-y-1 text-slate-300 mb-3">
                        <li><code>sep</code>: Pemisah antar argumen (default adalah spasi <code>" "</code>).</li>
                        <li><code>end</code>: Karakter penutup di akhir output (default adalah baris baru <code>"\\n"</code>).</li>
                    </ul>
                `,
                codeSnippet: `# Menampilkan teks sederhana
print("Halo Dunia, selamat datang di Python!")

# Menggunakan parameter sep (separator)
print("Apel", "Jeruk", "Mangga", sep=" - ")

# Menggunakan parameter end (tanpa ganti baris)
print("Sedang memuat data...", end=" ")
print("SELESAI!")`
            },
            {
                title: "Indentasi: Aturan Sakral di Python",
                content: `
                    <div class="p-4 bg-amber-950/40 border border-amber-600/50 rounded-xl mb-3">
                        <p class="text-amber-300 font-medium">⚠️ <strong>PENTING:</strong> Berbeda dengan bahasa C, C++, atau Java yang menggunakan kurung kurawal <code>{}</code> untuk menandai blok kode, Python menggunakan <strong>INDENTASI (spasi)</strong>!</p>
                    </div>
                    <p class="mb-2">Standar rekomendasi resmi Python (PEP 8) menyarankan menggunakan <strong>4 spasi</strong> untuk setiap level indentasi. Jika indentasi salah atau tidak konsisten, Python akan memunculkan error <code>IndentationError</code>.</p>
                `,
                codeSnippet: `# Contoh indentasi yang BENAR:
x = 10
if x > 5:
    print("Nilai x lebih besar dari 5")
    print("Baris ini masih dalam blok if")

print("Baris ini di luar blok if (tanpa indentasi)")`
            },
            {
                title: "Komentar dalam Python",
                content: `
                    <p class="mb-2">Komentar adalah baris kode yang diabaikan oleh penerjemah (interpreter) Python. Digunakan untuk mendokumentasikan kode agar mudah dipahami.</p>
                    <ul class="list-disc list-inside space-y-1 text-slate-300">
                        <li><strong>Komentar satu baris:</strong> Menggunakan tanda pagar <code>#</code>.</li>
                        <li><strong>Multi-line string / Docstring:</strong> Menggunakan tanda tiga kutip <code>""" ... """</code> atau <code>''' ... '''</code>.</li>
                    </ul>
                `,
                codeSnippet: `# Ini adalah komentar satu baris
x = 42 # Komentar inline di samping kode

"""
Ini adalah docstring atau komentar
yang bisa membentang di beberapa baris.
Sering digunakan untuk dokumentasi fungsi atau modul.
"""
print(f"Nilai x adalah {x}")`
            }
        ]
    },
    {
        id: "mod-2",
        title: "2. Variabel & Tipe Data",
        level: "Pemula",
        category: "Dasar",
        icon: "box",
        badge: "Modul 02",
        description: "Menyimpan data dengan variabel, aturan penamaan, tipe data primitif, dan konversi tipe (casting).",
        readTime: "10 menit",
        sections: [
            {
                title: "Konsep Variabel di Python",
                content: `
                    <p class="mb-3">Variabel di Python adalah penampung data (<em>pointer</em> atau referensi memori ke sebuah objek). Di Python, Anda <strong>tidak perlu mendeklarasikan tipe data secara eksplisit</strong>. Tipe data ditentukan otomatis saat nilai dimasukkan.</p>
                    <div class="p-3 bg-slate-800/80 rounded-xl border border-slate-700 mb-3">
                        <h4 class="font-semibold text-cyan-400 mb-1">Aturan Penamaan Variabel:</h4>
                        <ol class="list-decimal list-inside space-y-1 text-slate-300 text-sm">
                            <li>Hanya boleh berisi huruf (A-z), angka (0-9), dan garis bawah (<code>_</code>).</li>
                            <li><strong>TIDAK boleh</strong> diawali oleh angka (misal: <code>1nama</code> adalah salah).</li>
                            <li>Bersifat <strong>Case-Sensitive</strong>: <code>usia</code>, <code>Usia</code>, dan <code>USIA</code> adalah 3 variabel berbeda.</li>
                            <li>Gunakan gaya <code>snake_case</code> sesuai PEP 8 (contoh: <code>nama_lengkap</code>, <code>total_belanja</code>).</li>
                            <li>Hindari kata kunci bawaan (<em>reserved keywords</em>) seperti <code>for</code>, <code>while</code>, <code>class</code>, <code>if</code>, <code>def</code>.</li>
                        </ol>
                    </div>
                `,
                codeSnippet: `# Deklarasi variabel
nama = "Budi Santoso"    # String (str)
usia = 20                # Integer (int)
tinggi = 175.5           # Float (desimal)
is_aktif = True          # Boolean (bool)

print(nama, usia, tinggi, is_aktif)`
            },
            {
                title: "Tipe Data Primitif Dasar",
                content: `
                    <p class="mb-2">Python memiliki beberapa tipe data bawaan fundamental:</p>
                    <div class="overflow-x-auto my-3">
                        <table class="min-w-full text-sm text-left text-slate-300 border border-slate-700">
                            <thead class="bg-slate-800 text-slate-200">
                                <tr>
                                    <th class="px-3 py-2 border-b border-slate-700">Tipe Data</th>
                                    <th class="px-3 py-2 border-b border-slate-700">Keterangan</th>
                                    <th class="px-3 py-2 border-b border-slate-700">Contoh Nilai</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-800">
                                <tr>
                                    <td class="px-3 py-2 font-mono text-emerald-400">int</td>
                                    <td class="px-3 py-2">Bilangan bulat positif/negatif tanpa desimal</td>
                                    <td class="px-3 py-2 font-mono">10, -5, 0, 1000000</td>
                                </tr>
                                <tr>
                                    <td class="px-3 py-2 font-mono text-emerald-400">float</td>
                                    <td class="px-3 py-2">Bilangan pecahan desimal</td>
                                    <td class="px-3 py-2 font-mono">3.14, -0.05, 2.0</td>
                                </tr>
                                <tr>
                                    <td class="px-3 py-2 font-mono text-emerald-400">str</td>
                                    <td class="px-3 py-2">Teks (karakter yang diapit kutip tunggal/ganda)</td>
                                    <td class="px-3 py-2 font-mono">"Python", 'Halo'</td>
                                </tr>
                                <tr>
                                    <td class="px-3 py-2 font-mono text-emerald-400">bool</td>
                                    <td class="px-3 py-2">Nilai kebenaran logika (True atau False)</td>
                                    <td class="px-3 py-2 font-mono">True, False</td>
                                </tr>
                                <tr>
                                    <td class="px-3 py-2 font-mono text-emerald-400">NoneType</td>
                                    <td class="px-3 py-2">Menandakan ketiadaan nilai (null/kosong)</td>
                                    <td class="px-3 py-2 font-mono">None</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                `,
                codeSnippet: `# Mengecek tipe data dengan fungsi type()
nilai_pi = 3.14159
print(type(nilai_pi))   # <class 'float'>

status = True
print(type(status))     # <class 'bool'>

kosong = None
print(type(kosong))     # <class 'NoneType'>`
            },
            {
                title: "Konversi Tipe Data (Type Casting)",
                content: `
                    <p class="mb-2">Seringkali kita perlu mengubah satu tipe data ke tipe data lain, misalnya ketika menerima input teks dari pengguna dan ingin menghitungnya sebagai angka matematika.</p>
                    <p class="mb-3">Fungsi casting bawaan meliputi: <code>int()</code>, <code>float()</code>, <code>str()</code>, dan <code>bool()</code>.</p>
                `,
                codeSnippet: `# String angka diubah ke Integer dan Float
teks_angka = "150"
angka_bulat = int(teks_angka)
angka_desimal = float(teks_angka)

print(angka_bulat + 50)    # 200
print(angka_desimal)       # 150.0

# Angka diubah ke String
umur = 25
pesan = "Umur saya " + str(umur) + " tahun"
print(pesan)

# Konversi ke Boolean
print(bool(1))       # True
print(bool(0))       # False (0 bernilai falsy)
print(bool(""))      # False (String kosong bernilai falsy)
print(bool("Halo"))  # True`
            }
        ]
    },
    {
        id: "mod-3",
        title: "3. Operator Lengkap di Python",
        level: "Pemula",
        category: "Dasar",
        icon: "cpu",
        badge: "Modul 03",
        description: "Operator Aritmatika, Perbandingan, Logika, Penugasan, Identitas (is), dan Keanggotaan (in).",
        readTime: "10 menit",
        sections: [
            {
                title: "Operator Aritmatika",
                content: `
                    <p class="mb-2">Python menyediakan operator matematika standar beserta operator khusus seperti pembagian bulat (floor division) dan pemangkatan:</p>
                    <ul class="list-disc list-inside space-y-1 text-slate-300">
                        <li><code>+</code> : Penjumlahan</li>
                        <li><code>-</code> : Pengurangan</li>
                        <li><code>*</code> : Perkalian</li>
                        <li><code>/</code> : Pembagian biasa (hasil selalu berupa <code>float</code>)</li>
                        <li><code>//</code> : Floor Division (pembagian bulat dibulatkan ke bawah)</li>
                        <li><code>%</code> : Modulus (sisa bagi)</li>
                        <li><code>**</code> : Pangkat (Eksponensial)</li>
                    </ul>
                `,
                codeSnippet: `a = 17
b = 4

print("Pembagian biasa (/)    :", a / b)   # 4.25
print("Pembagian bulat (//)  :", a // b)  # 4
print("Modulus / Sisa Bagi (%) :", a % b)   # 1
print("Pangkat (**)            :", 2 ** 5)  # 32`
            },
            {
                title: "Operator Perbandingan & Logika",
                content: `
                    <p class="mb-2">Operator perbandingan menghasilkan nilai boolean (<code>True</code> atau <code>False</code>):</p>
                    <p class="mb-2"><code>==</code> (sama dengan), <code>!=</code> (tidak sama dengan), <code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code>.</p>
                    <p class="mb-3">Operator logika menggabungkan kondisi kebenaran:</p>
                    <ul class="list-disc list-inside space-y-1 text-slate-300">
                        <li><code>and</code> : Bernilai True jika <strong>kedua</strong> kondisi True.</li>
                        <li><code>or</code> : Bernilai True jika <strong>salah satu</strong> kondisi True.</li>
                        <li><code>not</code> : Membalikkan nilai logika (True jadi False, False jadi True).</li>
                    </ul>
                `,
                codeSnippet: `usia = 19
punya_ktp = True

# Logika AND
bisa_nyoblos = (usia >= 17) and punya_ktp
print("Bisa mencoblos?", bisa_nyoblos)  # True

# Logika NOT
sedang_libur = False
harus_kerja = not sedang_libur
print("Harus kerja?", harus_kerja)      # True`
            },
            {
                title: "Operator Identitas (is) vs Nilai (==) dan Keanggotaan (in)",
                content: `
                    <div class="p-3 bg-slate-800 rounded-xl border border-slate-700 mb-3">
                        <p class="text-slate-300"><strong>Perbedaan <code>==</code> vs <code>is</code>:</strong></p>
                        <p class="text-sm text-slate-400"><code>==</code> memeriksa apakah <strong>nilainya sama</strong>. Sedangkan <code>is</code> memeriksa apakah keduanya merujuk ke <strong>objek yang persis sama di memori</strong> (identitas alamat memori).</p>
                    </div>
                    <p class="mb-2">Operator keanggotaan <code>in</code> dan <code>not in</code> digunakan untuk memeriksa apakah suatu elemen terdapat di dalam sequence (string, list, tuple, dictionary).</p>
                `,
                codeSnippet: `# Identitas: is vs ==
list1 = [1, 2, 3]
list2 = [1, 2, 3]
list3 = list1

print(list1 == list2)   # True (nilainya sama)
print(list1 is list2)   # False (dua list berbeda di memori)
print(list1 is list3)   # True (merujuk ke list yang sama)

# Keanggotaan: in
buah = ["apel", "jeruk", "mangga"]
print("mangga" in buah)        # True
print("durian" not in buah)    # True`
            }
        ]
    },
    {
        id: "mod-4",
        title: "4. Manipulasi String & Formatting",
        level: "Pemula",
        category: "Dasar",
        icon: "type",
        badge: "Modul 04",
        description: "Indexing, Slicing [start:stop:step], Method string esensial, dan f-string yang elegan.",
        readTime: "11 menit",
        sections: [
            {
                title: "Indexing & Slicing String",
                content: `
                    <p class="mb-2">String di Python adalah kumpulan karakter berurutan (sequence) yang bersifat <strong>immutable</strong> (tidak dapat diubah setelah dibuat).</p>
                    <p class="mb-2">Indexing di Python berbasis <strong>0</strong> (nol) dari kiri, dan menggunakan indeks <strong>negatif (-1)</strong> untuk mengakses dari ujung kanan.</p>
                    <p class="mb-3">Sintaks Slicing: <code>string[start:stop:step]</code> (indeks <code>stop</code> bersifat non-inklusif/tidak diikutsertakan).</p>
                `,
                codeSnippet: `teks = "PYTHON"

# Indexing
print(teks[0])    # 'P'
print(teks[-1])   # 'N' (karakter terakhir)

# Slicing
print(teks[0:3])   # 'PYT' (karakter index 0, 1, 2)
print(teks[2:])    # 'THON' (dari index 2 sampai akhir)
print(teks[:4])    # 'PYTH' (dari awal sampai index 3)

# Membalikkan string dengan step -1
kebalikan = teks[::-1]
print(kebalikan)   # 'NOHTYP'`
            },
            {
                title: "Method String Paling Berguna",
                content: `
                    <p class="mb-2">Python memiliki puluhan method bawaan untuk memproses teks:</p>
                    <ul class="list-disc list-inside space-y-1 text-slate-300 text-sm">
                        <li><code>.upper()</code> / <code>.lower()</code> : Mengubah huruf kapital / kecil</li>
                        <li><code>.strip()</code> : Menghapus spasi putih di awal dan akhir teks</li>
                        <li><code>.replace(lama, baru)</code> : Mengganti substring</li>
                        <li><code>.split(pemisah)</code> : Memecah string menjadi list kata</li>
                        <li><code>.join(iterable)</code> : Menggabungkan list kata menjadi satu string</li>
                        <li><code>.startswith()</code> / <code>.endswith()</code> : Cek awalan / akhiran teks</li>
                    </ul>
                `,
                codeSnippet: `raw_data = "  kopi,teh,susu,jus  "

# Membersihkan spasi dan memecah menjadi list
bersih = raw_data.strip()
daftar_minuman = bersih.split(",")
print(daftar_minuman)  # ['kopi', 'teh', 'susu', 'jus']

# Menggabungkan kembali dengan pemisah rapi
gabung = " | ".join(daftar_minuman)
print(gabung)          # "kopi | teh | susu | jus"`
            },
            {
                title: "String Formatting Modern (f-string)",
                content: `
                    <p class="mb-2">Mulai dari Python 3.6+, <strong>f-string (Formatted String Literals)</strong> adalah cara paling cepat, ringkas, dan direkomendasikan untuk menggabungkan variabel dan ekspresi ke dalam string.</p>
                    <p class="mb-3">Cukup tambahkan huruf <code>f</code> sebelum tanda kutip pembuka, lalu letakkan variabel atau ekspresi di dalam kurung kurawal <code>{...}</code>.</p>
                `,
                codeSnippet: `nama = "Rian"
skor = 92.4567
barang = "Laptop"
harga = 8500000

# Format sederhana
print(f"Halo, {nama}! Selamat atas skor Anda: {skor:.2f}")

# Format angka ribuan dengan pemisah koma
print(f"Harga {barang}: Rp {harga:,}")

# Menjalankan ekspresi langsung di dalam kurung kurawal
print(f"Status: {'LULUS' if skor >= 75 else 'REMEDIAL'}")`
            }
        ]
    },
    {
        id: "mod-5",
        title: "5. Kontrol Alur: Percabangan",
        level: "Pemula",
        category: "Kontrol Alur",
        icon: "git-branch",
        badge: "Modul 05",
        description: "Pengambilan keputusan dengan if, elif, else, nested if, ternary operator, dan nilai Truthy/Falsy.",
        readTime: "9 menit",
        sections: [
            {
                title: "Struktur if, elif, dan else",
                content: `
                    <p class="mb-2">Percabangan memungkinkan program mengambil jalur eksekusi yang berbeda berdasarkan kondisi tertentu.</p>
                    <p class="mb-3">Di Python, kita menggunakan kata kunci <code>if</code>, <code>elif</code> (singkatan dari else if), dan <code>else</code>.</p>
                `,
                codeSnippet: `nilai = 82

if nilai >= 90:
    grade = "A (Istimewa)"
elif nilai >= 80:
    grade = "B (Sangat Baik)"
elif nilai >= 70:
    grade = "C (Cukup)"
else:
    grade = "D (Perlu Peningkatan)"

print(f"Nilai akhir Anda: {nilai} -> Grade: {grade}")`
            },
            {
                title: "Ternary Operator (Kondisional Satu Baris)",
                content: `
                    <p class="mb-2">Python mendukung sintaks kondisional satu baris yang sangat elegan dan bersih:</p>
                    <p class="mb-3 font-mono text-emerald-400 bg-slate-900 p-2 rounded">nilai_jika_true if kondisi else nilai_jika_false</p>
                `,
                codeSnippet: `usia = 18
status = "Dewasa" if usia >= 17 else "Anak-anak"
print(status)  # "Dewasa"

# Menentukan diskon
total_belanja = 120000
diskon = 0.1 if total_belanja > 100000 else 0.0
total_bayar = total_belanja * (1 - diskon)
print(f"Total bayar setelah diskon: Rp {total_bayar:,.0f}")`
            },
            {
                title: "Konsep Truthy dan Falsy",
                content: `
                    <p class="mb-2">Di Python, setiap objek memiliki nilai kebenaran bawaan saat dievaluasi dalam kondisi <code>if</code>:</p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 my-3">
                        <div class="p-3 bg-rose-950/30 border border-rose-800/40 rounded-xl">
                            <h5 class="font-bold text-rose-400 mb-1">Nilai Falsy (Dianggap False):</h5>
                            <ul class="text-xs space-y-1 text-slate-300 font-mono">
                                <li>None</li>
                                <li>False</li>
                                <li>0, 0.0</li>
                                <li>"" (String kosong)</li>
                                <li>[], (), {}, set() (Koleksi kosong)</li>
                            </ul>
                        </div>
                        <div class="p-3 bg-emerald-950/30 border border-emerald-800/40 rounded-xl">
                            <h5 class="font-bold text-emerald-400 mb-1">Nilai Truthy (Dianggap True):</h5>
                            <ul class="text-xs space-y-1 text-slate-300">
                                <li>Semua angka selain 0 (misal: 1, -5)</li>
                                <li>String yang memiliki isi (misal: "Halo")</li>
                                <li>List/Dict yang memiliki elemen</li>
                            </ul>
                        </div>
                    </div>
                `,
                codeSnippet: `keranjang = []  # List kosong (Falsy)

if keranjang:
    print("Keranjang berisi barang.")
else:
    print("Keranjang Anda masih kosong!")  # Baris ini yang dieksekusi`
            }
        ]
    },
    {
        id: "mod-6",
        title: "6. Perulangan: For & While",
        level: "Pemula",
        category: "Kontrol Alur",
        icon: "repeat",
        badge: "Modul 06",
        description: "Perulangan for, while, fungsi range(), pernyataan break, continue, pass, enumerate(), dan zip().",
        readTime: "12 menit",
        sections: [
            {
                title: "Perulangan for & Fungsi range()",
                content: `
                    <p class="mb-2">Perulangan <code>for</code> di Python digunakan untuk mengiterasi urutan elemen (seperti list, tuple, string, atau generator <code>range()</code>).</p>
                    <p class="mb-3">Fungsi <code>range(start, stop, step)</code> menghasilkan barisan angka:</p>
                    <ul class="list-disc list-inside space-y-1 text-slate-300 text-sm">
                        <li><code>range(5)</code> : 0, 1, 2, 3, 4 (dari 0 sampai sebelum 5)</li>
                        <li><code>range(1, 6)</code> : 1, 2, 3, 4, 5</li>
                        <li><code>range(1, 10, 2)</code> : 1, 3, 5, 7, 9 (melompat 2 angka)</li>
                    </ul>
                `,
                codeSnippet: `# Mencetak angka genap dari 2 sampai 10
for i in range(2, 11, 2):
    print(i, end=" ")
print()

# Iterasi langsung pada string
for huruf in "KODING":
    print(huruf, end="-")
print()`
            },
            {
                title: "Perulangan while & Kontrol: break, continue",
                content: `
                    <p class="mb-2">Perulangan <code>while</code> terus berjalan selama kondisi yang ditentukan bernilai <code>True</code>.</p>
                    <ul class="list-disc list-inside space-y-1 text-slate-300">
                        <li><code>break</code> : Menghentikan paksa perulangan saat itu juga.</li>
                        <li><code>continue</code> : Melewati sisa iterasi saat ini dan langsung lompat ke iterasi berikutnya.</li>
                        <li><code>pass</code> : Pernyataan kosong (placeholder) yang tidak melakukan apa-apa.</li>
                    </ul>
                `,
                codeSnippet: `hitung = 0
while True:
    hitung += 1
    
    if hitung == 3:
        print("Lewati angka 3!")
        continue  # Lewati angka 3
        
    print(f"Iterasi ke-{hitung}")
    
    if hitung >= 5:
        print("Mencapai batas, hentikan loop!")
        break  # Berhenti`
            },
            {
                title: "Fungsi Bantu: enumerate() dan zip()",
                content: `
                    <p class="mb-2"><strong>enumerate()</strong>: Mengembalikan pasangan indeks dan nilai dari suatu kumpulan data secara rapi.</p>
                    <p class="mb-3"><strong>zip()</strong>: Menggabungkan beberapa kumpulan data (iterable) secara paralel menjadi pasangan tupel.</p>
                `,
                codeSnippet: `# Menggunakan enumerate
bahasa = ["Python", "JavaScript", "Go", "Rust"]
for index, nama in enumerate(bahasa, start=1):
    print(f"Peringkat {index}: {nama}")

# Menggunakan zip
siswa = ["Ani", "Budi", "Citra"]
nilai = [95, 88, 91]
for s, n in zip(siswa, nilai):
    print(f"{s} memperoleh nilai {n}")`
            }
        ]
    },
    {
        id: "mod-7",
        title: "7. Struktur Data: List",
        level: "Menengah",
        category: "Struktur Data",
        icon: "list",
        badge: "Modul 07",
        description: "Koleksi data berurutan, indexing & slicing, method penting, dan sintaks magis List Comprehension.",
        readTime: "12 menit",
        sections: [
            {
                title: "Karakteristik & Operasi List",
                content: `
                    <p class="mb-3"><strong>List</strong> adalah struktur data paling umum di Python dengan karakteristik:</p>
                    <ul class="list-disc list-inside space-y-1 text-slate-300 mb-3">
                        <li><strong>Ordered:</strong> Urutan elemen selalu terjaga sesuai indeks.</li>
                        <li><strong>Mutable:</strong> Elemennya dapat diubah, ditambah, atau dihapus kapan saja.</li>
                        <li><strong>Menerima Duplikat:</strong> Boleh memiliki nilai yang sama berulang kali.</li>
                        <li><strong>Heterogen:</strong> Boleh berisi campuran tipe data yang berbeda.</li>
                    </ul>
                `,
                codeSnippet: `angka = [10, 20, 30, 40, 50]

# Modifikasi elemen
angka[0] = 99
print(angka)  # [99, 20, 30, 40, 50]

# Menambah elemen
angka.append(60)       # Tambah di akhir
angka.insert(1, 15)    # Sisipkan di index 1
print(angka)

# Menghapus elemen
angka.pop()            # Hapus elemen terakhir
angka.remove(30)       # Hapus nilai 30
print(angka)`
            },
            {
                title: "List Comprehension (Gaya Pythonic)",
                content: `
                    <p class="mb-2"><strong>List Comprehension</strong> adalah fitur khas Python untuk membuat list baru dari list yang sudah ada dengan sintaks yang sangat ringkas dan efisien.</p>
                    <p class="mb-3 font-mono text-cyan-400 bg-slate-900 p-2 rounded">[ekspresi for item in iterable if kondisi]</p>
                `,
                codeSnippet: `bilangan = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Tradisional vs List Comprehension:
# Ambil kuadrat dari bilangan yang genap saja
kuadrat_genap = [x ** 2 for x in bilangan if x % 2 == 0]
print("Kuadrat bilangan genap:", kuadrat_genap)
# Output: [4, 16, 36, 64, 100]`
            }
        ]
    },
    {
        id: "mod-8",
        title: "8. Struktur Data: Tuple & Set",
        level: "Menengah",
        category: "Struktur Data",
        icon: "layers",
        badge: "Modul 08",
        description: "Tuple yang kekal (immutable), unpacking, serta Set unik dan operasi himpunan (Union, Intersect).",
        readTime: "10 menit",
        sections: [
            {
                title: "Tuple: Kumpulan Data Kekal (Immutable)",
                content: `
                    <p class="mb-2"><strong>Tuple</strong> mirip seperti List, tetapi didefinisikan dengan tanda kurung biasa <code>()</code> dan bersifat <strong>IMMUTABLE</strong> (tidak dapat diubah, ditambah, atau dihapus setelah dibuat).</p>
                    <p class="mb-3">Tuple lebih hemat memori dan lebih cepat daripada List, sangat cocok untuk koordinat GPS, konfigurasi konstan, atau nilai balik fungsi.</p>
                `,
                codeSnippet: `koordinat = (106.8456, -6.2088)

# Mencoba ubah tuple akan menghasilkan TypeError:
# koordinat[0] = 100.0  # ERROR!

# Tuple Unpacking (Membongkar nilai ke variabel individual)
bujur, lintang = koordinat
print(f"Bujur: {bujur}, Lintang: {lintang}")

# Tuple satu elemen wajib diakhiri koma!
single = (42,)  # Tuple valid
bukan_tuple = (42)  # Ini hanya integer biasa`
            },
            {
                title: "Set: Himpunan Nilai Unik",
                content: `
                    <p class="mb-2"><strong>Set</strong> adalah kumpulan data yang <strong>tidak berurutan (unordered)</strong>, <strong>tidak memiliki indeks</strong>, dan <strong>TIDAK MENERIMA DUPLIKASI</strong>.</p>
                    <p class="mb-3">Set sangat ampuh untuk menghapus duplikat dari data dan melakukan operasi matematika himpunan:</p>
                `,
                codeSnippet: `# Menghapus duplikat secara instan dengan set
daftar_email = ["a@mail.com", "b@mail.com", "a@mail.com", "c@mail.com"]
email_unik = set(daftar_email)
print("Email unik:", email_unik)

# Operasi Himpunan Matematika
grup_a = {"Python", "JavaScript", "HTML"}
grup_b = {"Python", "Go", "Docker"}

print("Gabungan (Union |):", grup_a | grup_b)
print("Irisan (Intersection &):", grup_a & grup_b)
print("Selisih (Difference -):", grup_a - grup_b)`
            }
        ]
    },
    {
        id: "mod-9",
        title: "9. Struktur Data: Dictionary",
        level: "Menengah",
        category: "Struktur Data",
        icon: "book-open",
        badge: "Modul 09",
        description: "Struktur data pasangan Key-Value yang super cepat, method penting, dan Dictionary Comprehension.",
        readTime: "11 menit",
        sections: [
            {
                title: "Konsep Key-Value Pair",
                content: `
                    <p class="mb-2"><strong>Dictionary</strong> menyimpan data dalam bentuk pasangan <code>kunci: nilai</code> (key-value pair), mirip dengan JSON di web development.</p>
                    <p class="mb-3">Key pada dictionary harus bersifat <strong>unik</strong> dan <strong>immutable</strong> (biasanya berupa string atau integer).</p>
                `,
                codeSnippet: `mahasiswa = {
    "nim": "2024001",
    "nama": "Farhan Pratama",
    "ipk": 3.85,
    "jurusan": "Teknik Informatika",
    "hobi": ["Ngoding", "Catur", "Musik"]
}

# Mengakses data
print(mahasiswa["nama"])

# Menggunakan .get() agar aman jika key tidak ada (menghindari KeyError)
alamat = mahasiswa.get("alamat", "Alamat belum diisi")
print("Alamat:", alamat)

# Menambah / Memperbarui data
mahasiswa["semester"] = 4
mahasiswa["ipk"] = 3.90`
            },
            {
                title: "Iterasi & Dictionary Comprehension",
                content: `
                    <p class="mb-2">Kita dapat mengiterasi dictionary menggunakan method <code>.keys()</code>, <code>.values()</code>, atau <code>.items()</code>:</p>
                `,
                codeSnippet: `harga_produk = {"buku": 25000, "pensil": 5000, "tas": 150000}

# Iterasi dengan .items()
for barang, harga in harga_produk.items():
    print(f"- {barang.capitalize()}: Rp {harga:,}")

# Dictionary Comprehension: diskon 10% untuk semua barang
harga_diskon = {item: int(hrg * 0.9) for item, hrg in harga_produk.items()}
print("Harga setelah diskon:", harga_diskon)`
            }
        ]
    },
    {
        id: "mod-10",
        title: "10. Fungsi & Modularitas",
        level: "Menengah",
        category: "Fungsi",
        icon: "code",
        badge: "Modul 10",
        description: "Mendefinisikan fungsi (def), return, default argument, *args, **kwargs, lambda, dan scope variabel.",
        readTime: "14 menit",
        sections: [
            {
                title: "Mendefinisikan Fungsi & Nilai Balik",
                content: `
                    <p class="mb-2">Fungsi adalah blok kode terorganisir yang dapat digunakan kembali (reusable) untuk menjalankan tugas tertentu.</p>
                    <p class="mb-3">Didefinisikan menggunakan kata kunci <code>def</code>, dan mengembalikan hasil dengan <code>return</code>.</p>
                `,
                codeSnippet: `def hitung_luas_persegi_panjang(panjang, lebar=5):
    """Fungsi menghitung luas dengan parameter default lebar=5"""
    luas = panjang * lebar
    keliling = 2 * (panjang + lebar)
    return luas, keliling  # Mengembalikan tuple (luas, keliling)

hasil_luas, hasil_keliling = hitung_luas_persegi_panjang(10, 4)
print(f"Luas: {hasil_luas}, Keliling: {hasil_keliling}")`
            },
            {
                title: "Argumen Fleksibel: *args dan **kwargs",
                content: `
                    <ul class="list-disc list-inside space-y-1 text-slate-300 mb-3">
                        <li><code>*args</code> : Menerima sejumlah argumen posisi (positional arguments) yang tidak ditentukan jumlahnya sebagai <strong>Tuple</strong>.</li>
                        <li><code>**kwargs</code> : Menerima sejumlah argumen bernama (keyword arguments) sebagai <strong>Dictionary</strong>.</li>
                    </ul>
                `,
                codeSnippet: `def hitung_total(*angka):
    # angka terkumpul sebagai Tuple
    return sum(angka)

print("Total:", hitung_total(10, 20, 30, 40, 50))  # 150

def profil_pengguna(nama, **detail):
    # detail terkumpul sebagai Dictionary
    print(f"Nama: {nama}")
    for k, v in detail.items():
        print(f"  {k}: {v}")

profil_pengguna("Siti", kota="Bandung", role="Developer", exp="3 tahun")`
            },
            {
                title: "Fungsi Anonim (Lambda)",
                content: `
                    <p class="mb-2"><strong>Lambda</strong> adalah fungsi anonim berukuran mini yang hanya terdiri dari satu baris ekspresi:</p>
                    <p class="mb-3 font-mono text-amber-400 bg-slate-900 p-2 rounded">lambda argumen1, argumen2: ekspresi</p>
                `,
                codeSnippet: `# Lambda perkalian
kali = lambda a, b: a * b
print(kali(6, 7))  # 42

# Sering digunakan dengan fungsi bawaan seperti sorted(), map(), filter()
angka = [5, 2, 9, 1, 7]
urut = sorted(angka, key=lambda x: x)
print("Urut:", urut)`
            }
        ]
    },
    {
        id: "mod-11",
        title: "11. Penanganan Error & Eksepsi",
        level: "Menengah",
        category: "Keandalan Kode",
        icon: "shield-alert",
        badge: "Modul 11",
        description: "Menghindari program crash dengan blok try, except, else, finally, serta memicu error dengan raise.",
        readTime: "11 menit",
        sections: [
            {
                title: "Blok try - except - else - finally",
                content: `
                    <p class="mb-2">Saat terjadi kesalahan waktu proses (runtime error / Exception), alih-alih membiarkan program crash atau mati mendadak, kita menangani kesalahan tersebut secara anggun (graceful).</p>
                    <ul class="list-disc list-inside space-y-1 text-slate-300 mb-3">
                        <li><code>try</code> : Tempat meletakkan kode yang berpotensi menghasilkan error.</li>
                        <li><code>except</code> : Kode yang dieksekusi HANYA jika terjadi error tertentu.</li>
                        <li><code>else</code> : Kode yang dieksekusi JIKA TIDAK ADA error sama sekali.</li>
                        <li><code>finally</code> : Kode yang PASTI SELALU dieksekusi apa pun yang terjadi (biasanya untuk menutup koneksi atau membersihkan sumber daya).</li>
                    </ul>
                `,
                codeSnippet: `def bagi_angka(pembilang, penyebut):
    try:
        hasil = pembilang / penyebut
    except ZeroDivisionError:
        print("Kesalahan: Tidak bisa membagi angka dengan nol (0)!")
        return None
    except TypeError:
        print("Kesalahan: Tipe data harus angka!")
        return None
    else:
        print("Operasi berhasil tanpa hambatan.")
        return hasil
    finally:
        print("--- Selesai mengevaluasi ---")

print("Hasil:", bagi_angka(10, 2))
print("Hasil:", bagi_angka(10, 0))`
            },
            {
                title: "Memicu Eksepsi Manual dengan raise",
                content: `
                    <p class="mb-2">Anda dapat sengaja memicu eksepsi menggunakan perintah <code>raise</code> jika kondisi bisnis aplikasi tidak terpenuhi.</p>
                `,
                codeSnippet: `def daftarkan_usia(usia):
    if usia < 0:
        raise ValueError("Usia tidak boleh bernilai negatif!")
    if usia > 130:
        raise ValueError("Usia tidak masuk akal!")
    return f"Pendaftaran berhasil untuk usia {usia} tahun."

try:
    print(daftarkan_usia(25))
    print(daftarkan_usia(-5))
except ValueError as err:
    print("Ditangkap:", err)`
            }
        ]
    },
    {
        id: "mod-12",
        title: "12. Operasi File I/O",
        level: "Menengah",
        category: "Input / Output",
        icon: "file-text",
        badge: "Modul 12",
        description: "Membaca, menulis, dan menambah file dengan open(), mode 'r', 'w', 'a', dan context manager with.",
        readTime: "10 menit",
        sections: [
            {
                title: "Membaca & Menulis File dengan with open()",
                content: `
                    <div class="p-3 bg-emerald-950/40 border border-emerald-600/50 rounded-xl mb-3">
                        <p class="text-emerald-300 font-medium">💡 <strong>Best Practice Python:</strong> Selalu gunakan pernyataan <code>with open(...) as f:</code>. Python akan otomatis menutup file tersebut bahkan jika terjadi error di tengah proses!</p>
                    </div>
                    <ul class="list-disc list-inside space-y-1 text-slate-300 mb-3">
                        <li>Mode <code>'r'</code> : Read (membaca file yang ada).</li>
                        <li>Mode <code>'w'</code> : Write (menulis/menimpa file baru; isi lama akan terhapus).</li>
                        <li>Mode <code>'a'</code> : Append (menambahkan teks baru di baris akhir file).</li>
                    </ul>
                `,
                codeSnippet: `# Menulis file baru
with open("catatan.txt", "w", encoding="utf-8") as file:
    file.write("Catatan Hari Ini:\n")
    file.write("1. Belajar Python dasar\n")
    file.write("2. Latihan soal koding\n")

# Menambah baris baru (append)
with open("catatan.txt", "a", encoding="utf-8") as file:
    file.write("3. Menikmati secangkir kopi\n")

# Membaca isi file
with open("catatan.txt", "r", encoding="utf-8") as file:
    isi = file.read()
    print("--- Isi File ---")
    print(isi)`
            }
        ]
    },
    {
        id: "mod-13",
        title: "13. Pemrograman Berorientasi Objek (OOP)",
        level: "Lanjutan",
        category: "OOP",
        icon: "box",
        badge: "Modul 13",
        description: "Class, Object, konstruktor __init__, self, Pewarisan (Inheritance), Enkapsulasi, dan Dunder Methods.",
        readTime: "15 menit",
        sections: [
            {
                title: "Class, Object, dan Method __init__",
                content: `
                    <p class="mb-2"><strong>Class</strong> adalah cetak biru (blueprint) yang mendefinisikan atribut dan perilaku. <strong>Object</strong> adalah wujud nyata (instansiasi) dari class tersebut.</p>
                    <p class="mb-3">Method <code>__init__</code> adalah konstruktor yang otomatis dijalankan saat objek baru dibuat. Parameter <code>self</code> merujuk pada objek yang sedang aktif.</p>
                `,
                codeSnippet: `class Mobil:
    # Atribut Class (dimiliki bersama oleh semua objek)
    roda = 4

    # Konstruktor
    def __init__(self, merk, model, tahun):
        # Atribut Instance (milik masing-masing objek)
        self.merk = merk
        self.model = model
        self.tahun = tahun
        self.kecepatan = 0

    def gas(self, kenaikan):
        self.kecepatan += kenaikan
        print(f"{self.merk} {self.model} melaju di {self.kecepatan} km/jam.")

# Membuat instance objek
mobil_a = Mobil("Toyota", "Avanza", 2022)
mobil_b = Mobil("Honda", "Civic", 2023)

mobil_a.gas(40)
mobil_b.gas(80)`
            },
            {
                title: "Pewarisan (Inheritance) & super()",
                content: `
                    <p class="mb-2">Pewarisan memungkinkan class anak (Child Class) mewarisi atribut dan method dari class induk (Parent Class), sehingga kode tidak perlu ditulis ulang.</p>
                `,
                codeSnippet: `class Karyawan:
    def __init__(self, nama, gaji):
        self.nama = nama
        self.gaji = gaji

    def info(self):
        return f"{self.nama} | Gaji: Rp {self.gaji:,}"

class SoftwareEngineer(Karyawan):
    def __init__(self, nama, gaji, bahasa_pemrograman):
        # Memanggil konstruktor class induk
        super().__init__(nama, gaji)
        self.bahasa = bahasa_pemrograman

    def info(self):
        # Override method induk
        info_dasar = super().info()
        return f"{info_dasar} | Keahlian: {self.bahasa}"

dev = SoftwareEngineer("Dewi", 15000000, "Python & TypeScript")
print(dev.info())`
            },
            {
                title: "Enkapsulasi & Dunder Methods",
                content: `
                    <p class="mb-2"><strong>Enkapsulasi:</strong> Membatasi akses langsung ke data internal objek. Python menggunakan garis bawah ganda <code>__nama_variabel</code> untuk atribut private (Name Mangling).</p>
                    <p class="mb-3"><strong>Dunder / Magic Methods:</strong> Method khusus yang diawali dan diakhiri garis bawah ganda, seperti <code>__str__</code> untuk representasi teks dan <code>__len__</code>.</p>
                `,
                codeSnippet: `class RekeningBank:
    def __init__(self, pemilik, saldo_awal=0):
        self.pemilik = pemilik
        self.__saldo = saldo_awal  # Private attribute

    def setor(self, jumlah):
        if jumlah > 0:
            self.__saldo += jumlah
            print(f"Setoran Rp {jumlah:,} berhasil.")

    def get_saldo(self):
        return self.__saldo

    # Representasi string saat di-print
    def __str__(self):
        return f"Rekening [{self.pemilik}] - Saldo: Rp {self.__saldo:,}"

rek = RekeningBank("Bambang", 500000)
rek.setor(250000)
print(rek)  # Otomatis memicu __str__`
            }
        ]
    },
    {
        id: "mod-14",
        title: "14. Modul & Pustaka Standar Python",
        level: "Lanjutan",
        category: "Ekosistem",
        icon: "package",
        badge: "Modul 14",
        description: "Mengimpor modul bawaan Python: math, random, datetime, json, os, dan sys.",
        readTime: "11 menit",
        sections: [
            {
                title: "Modul math & random",
                content: `
                    <p class="mb-2">Python dilengkapi dengan baterai terpasang (<em>"Batteries Included"</em>), menyediakan modul bawaan siap pakai tanpa perlu instalasi tambahan.</p>
                `,
                codeSnippet: `import math
import random

# Modul math
print("Akar 144        :", math.sqrt(144))
print("Pembulatan ke atas :", math.ceil(4.1))
print("Faktorial 5!    :", math.factorial(5))

# Modul random
dadu = random.randint(1, 6)
print("Lempar dadu     :", dadu)

peserta = ["Andi", "Budi", "Cici", "Dedi"]
pemenang = random.choice(peserta)
print("Pemenang undian :", pemenang)`
            },
            {
                title: "Modul datetime & json",
                content: `
                    <p class="mb-2"><strong>datetime:</strong> Untuk manipulasi tanggal, waktu, dan format string.</p>
                    <p class="mb-3"><strong>json:</strong> Untuk konversi antara string JSON dan Dictionary Python (<code>json.dumps()</code> dan <code>json.loads()</code>).</p>
                `,
                codeSnippet: `from datetime import datetime
import json

# Waktu sekarang & formatting
sekarang = datetime.now()
print("Waktu sekarang:", sekarang.strftime("%d-%m-%Y %H:%M:%S"))

# Konversi Python Dictionary ke JSON String
data_user = {"id": 1, "username": "admin", "aktif": True}
json_string = json.dumps(data_user, indent=2)
print("Output JSON:\\n", json_string)

# Parsing JSON String kembali ke Dictionary Python
objek_kembali = json.loads(json_string)
print("Tipe hasil parse:", type(objek_kembali))`
            }
        ]
    },
    {
        id: "mod-15",
        title: "15. Fitur Lanjutan & Tips Pythonic",
        level: "Lanjutan",
        category: "Fitur Mahir",
        icon: "zap",
        badge: "Modul 15",
        description: "Generator & yield, Decorator fungsi, Regular Expressions (re), dan filosofi Zen of Python.",
        readTime: "13 menit",
        sections: [
            {
                title: "Generator & Kata Kunci yield",
                content: `
                    <p class="mb-2"><strong>Generator</strong> adalah fungsi khusus yang menghasilkan data satu per satu sesuai kebutuhan (<em>lazy evaluation</em>) alih-alih menyimpannya sekaligus dalam memori ram.</p>
                    <p class="mb-3">Menggunakan kata kunci <code>yield</code> bukan <code>return</code>. Sangat efisien untuk memproses jutaan baris data!</p>
                `,
                codeSnippet: `def hitung_mundur(n):
    while n > 0:
        yield n
        n -= 1

# Data dikonsumsi satu per satu tanpa membebani memori
for angka in hitung_mundur(5):
    print(angka, end=" -> ")
print("BOOM!")`
            },
            {
                title: "Decorator (@decorator)",
                content: `
                    <p class="mb-2"><strong>Decorator</strong> adalah fungsi yang menerima fungsi lain sebagai argumen dan memperluas perilakunya tanpa mengubah kode asli fungsi tersebut.</p>
                `,
                codeSnippet: `def pembungkus_logger(fungsi_asli):
    def wrapper(*args, **kwargs):
        print(f"[LOG] Memulai eksekusi fungsi: '{fungsi_asli.__name__}'")
        hasil = fungsi_asli(*args, **kwargs)
        print(f"[LOG] Eksekusi selesai.")
        return hasil
    return wrapper

@pembungkus_logger
def salam(nama):
    print(f"Halo, {nama}! Semoga harimu menyenangkan.")

salam("Sdr. Kurniawan")`
            },
            {
                title: "The Zen of Python",
                content: `
                    <p class="mb-2">Python memiliki panduan filosofi desain kode yang ditulis oleh Tim Peters. Anda bisa membacanya kapan saja di terminal Python dengan perintah <code>import this</code>.</p>
                    <div class="p-4 bg-slate-900 rounded-xl border border-slate-700 font-mono text-xs text-slate-300 space-y-1">
                        <p class="text-emerald-400 font-bold">The Zen of Python, by Tim Peters:</p>
                        <p>• Beautiful is better than ugly.</p>
                        <p>• Explicit is better than implicit.</p>
                        <p>• Simple is better than complex.</p>
                        <p>• Complex is better than complicated.</p>
                        <p>• Readability counts.</p>
                        <p>• Errors should never pass silently.</p>
                    </div>
                `
            }
        ]
    }
];

