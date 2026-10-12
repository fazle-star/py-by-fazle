/**
 * Bank Soal Latihan Python (Static Quiz Bank)
 * Setiap soal memiliki pembahasan detail untuk pembelajaran tuntas.
 */

const STATIC_QUIZ_BANK = [
    // MODUL 1: Pengenalan & Sintaks
    {
        id: "q-m1-1",
        moduleId: "mod-1",
        topic: "Pengenalan & Sintaks",
        difficulty: "Mudah",
        question: "Apa fungsi parameter 'sep' pada fungsi print() di Python?",
        code: `print("Python", "Keren", "Banget", sep="-")`,
        options: [
            "Menentukan karakter pemisah antar argumen yang dicetak",
            "Menentukan karakter penutup di baris paling akhir",
            "Mengulang pencetakan teks sebanyak nilai tertentu",
            "Memisahkan string menjadi sebuah array"
        ],
        correctIndex: 0,
        explanation: "Parameter 'sep' (separator) menentukan pemisah antar argumen dalam print(). Kode di atas akan menghasilkan output 'Python-Keren-Banget'."
    },
    {
        id: "q-m1-2",
        moduleId: "mod-1",
        topic: "Pengenalan & Sintaks",
        difficulty: "Sedang",
        question: "Apa yang akan terjadi jika kita mencampur spasi dan tabulasi (Tab) secara tidak konsisten dalam indentasi Python?",
        code: null,
        options: [
            "Python mengeluarkan pesan error IndentationError / TabError",
            "Python otomatis merapikannya tanpa memberitahu kita",
            "Program tetap berjalan namun kecepatan kompilasi melambat",
            "Python mengabaikan semua baris yang mengandung tab"
        ],
        correctIndex: 0,
        explanation: "Python 3 melarang pencampuran tab dan spasi untuk indentasi dalam blok yang sama dan akan melempar TabError atau IndentationError."
    },
    {
        id: "q-m1-3",
        moduleId: "mod-1",
        topic: "Pengenalan & Sintaks",
        difficulty: "Mudah",
        question: "Bagaimana cara membuat komentar satu baris di Python?",
        code: null,
        options: [
            "Menggunakan tanda pagar (#)",
            "Menggunakan tanda garis miring ganda (//)",
            "Menggunakan tanda persen (%)",
            "Menggunakan tanda seru (!)"
        ],
        correctIndex: 0,
        explanation: "Komentar satu baris di Python diawali dengan tanda #. Sedangkan // adalah operator pembagian bulat (floor division)."
    },

    // MODUL 2: Variabel & Tipe Data
    {
        id: "q-m2-1",
        moduleId: "mod-2",
        topic: "Variabel & Tipe Data",
        difficulty: "Mudah",
        question: "Manakah dari nama variabel berikut yang VALID sesuai aturan Python?",
        code: null,
        options: [
            "_total_skor_2024",
            "2024_total_skor",
            "total-skor",
            "class"
        ],
        correctIndex: 0,
        explanation: "Variabel tidak boleh diawali angka (2024_total), tidak boleh mengandung tanda hubung (-), dan tidak boleh menggunakan reserved keyword seperti 'class'. Garis bawah di awal (_total_skor_2024) adalah valid."
    },
    {
        id: "q-m2-2",
        moduleId: "mod-2",
        topic: "Variabel & Tipe Data",
        difficulty: "Sedang",
        question: "Berapa tipe data dari variabel 'hasil' pada potongan kode berikut?",
        code: `x = 10
y = 2.0
hasil = x + y`,
        options: [
            "<class 'float'>",
            "<class 'int'>",
            "<class 'double'>",
            "<class 'number'>"
        ],
        correctIndex: 0,
        explanation: "Ketika int (10) dijumlahkan dengan float (2.0), Python melakukan konversi implisit (type coercion) menjadi float (12.0)."
    },
    {
        id: "q-m2-3",
        moduleId: "mod-2",
        topic: "Variabel & Tipe Data",
        difficulty: "Tantangan",
        question: "Apa output dari evaluasi fungsi bool() berikut?",
        code: `print(bool([]), bool("0"), bool(0))`,
        options: [
            "False True False",
            "False False False",
            "True True False",
            "False True True"
        ],
        correctIndex: 0,
        explanation: "List kosong [] bernilai Falsy (False). String '0' adalah string yang memiliki panjang karakter > 0 (bukan string kosong) sehingga bernilai Truthy (True). Angka numerik 0 bernilai Falsy (False)."
    },

    // MODUL 3: Operator
    {
        id: "q-m3-1",
        moduleId: "mod-3",
        topic: "Operator",
        difficulty: "Mudah",
        question: "Berapa hasil dari operasi pembagian bulat (//) dan modulus (%) berikut?",
        code: `print(19 // 4, 19 % 4)`,
        options: [
            "4 3",
            "4.75 3",
            "4 0",
            "3 4"
        ],
        correctIndex: 0,
        explanation: "19 dibagi 4 menghasilkan 4 dengan sisa bagi 3. Operator // membulatkan ke bawah menghasilkan 4, dan operator % mengambil sisa bagi yaitu 3."
    },
    {
        id: "q-m3-2",
        moduleId: "mod-3",
        topic: "Operator",
        difficulty: "Sedang",
        question: "Berapa nilai dari ekspresi aritmatika berikut berdasarkan prioritas operator?",
        code: `hasil = 2 ** 3 * 2 + 10 // 3
print(hasil)`,
        options: [
            "19",
            "20",
            "21",
            "18"
        ],
        correctIndex: 0,
        explanation: "Urutan prioritas: 1) Pangkat: 2**3 = 8. 2) Perkalian: 8*2 = 16. 3) Pembagian bulat: 10//3 = 3. 4) Penjumlahan: 16 + 3 = 19."
    },
    {
        id: "q-m3-3",
        moduleId: "mod-3",
        topic: "Operator",
        difficulty: "Tantangan",
        question: "Apa perbedaan utama antara operator '==' dan 'is' pada kode di bawah?",
        code: `a = [1, 2, 3]
b = [1, 2, 3]
print(a == b, a is b)`,
        options: [
            "True False (karena == membandingkan nilai, sedangkan is membandingkan identitas memori)",
            "True True (karena is dan == bekerja persis sama)",
            "False False (karena objek list selalu berbeda)",
            "False True (karena tipe datanya sama)"
        ],
        correctIndex: 0,
        explanation: "'==' memeriksa kesamaan nilai konten (keduanya [1, 2, 3] jadi True). Sedangkan 'is' memeriksa alamat objek di memori (a dan b adalah dua objek list terpisah di heap memory jadi False)."
    },

    // MODUL 4: Manipulasi String
    {
        id: "q-m4-1",
        moduleId: "mod-4",
        topic: "String",
        difficulty: "Mudah",
        question: "Apa output dari slicing teks berikut?",
        code: `kata = "INDONESIA"
print(kata[2:5])`,
        options: [
            "DON",
            "NDO",
            "DONE",
            "DONES"
        ],
        correctIndex: 0,
        explanation: "Index 0='I', 1='N', 2='D', 3='O', 4='N', 5='E'. Slicing [2:5] mengambil index 2, 3, 4 (batas akhir 5 tidak termasuk), sehingga hasilnya 'DON'."
    },
    {
        id: "q-m4-2",
        moduleId: "mod-4",
        topic: "String",
        difficulty: "Sedang",
        question: "Teknik slicing mana yang paling tepat untuk membalikkan string secara instan?",
        code: `s = "PYTHON"`,
        options: [
            "s[::-1]",
            "s[-1:0]",
            "s.reverse()",
            "reverse(s)"
        ],
        correctIndex: 0,
        explanation: "Slicing dengan step negatif s[::-1] membaca seluruh karakter dari belakang ke depan. String tidak memiliki method .reverse() karena string bersifat immutable."
    },
    {
        id: "q-m4-3",
        moduleId: "mod-4",
        topic: "String",
        difficulty: "Sedang",
        question: "Apa output dari kode pemformatan f-string berikut?",
        code: `pi = 3.14159265
print(f"Nilai: {pi:.2f}")`,
        options: [
            "Nilai: 3.14",
            "Nilai: 3.1",
            "Nilai: 3.141",
            "Nilai: 3.15"
        ],
        correctIndex: 0,
        explanation: "Format spesifier :.2f membulatkan bilangan float ke 2 angka di belakang koma, yaitu 3.14."
    },

    // MODUL 5: Percabangan
    {
        id: "q-m5-1",
        moduleId: "mod-5",
        topic: "Percabangan",
        difficulty: "Mudah",
        question: "Apa output dari potongan kode kondisional di bawah?",
        code: `x = 15
if x % 2 == 0:
    print("Genap")
elif x % 3 == 0 and x % 5 == 0:
    print("Kelipatan 15")
else:
    print("Ganjil Biasa")`,
        options: [
            "Kelipatan 15",
            "Genap",
            "Ganjil Biasa",
            "Error Sintaks"
        ],
        correctIndex: 0,
        explanation: "15 % 2 bukan 0 (False). Lalu masuk ke elif: 15 % 3 == 0 (True) dan 15 % 5 == 0 (True), sehingga kondisi elif terpenuhi dan mencetak 'Kelipatan 15'."
    },
    {
        id: "q-m5-2",
        moduleId: "mod-5",
        topic: "Percabangan",
        difficulty: "Sedang",
        question: "Berapa nilai 'pesan' setelah ternary operator dieksekusi?",
        code: `skor = 65
pesan = "Lulus" if skor >= 70 else "Remidi" if skor >= 60 else "Gagal"
print(pesan)`,
        options: [
            "Remidi",
            "Lulus",
            "Gagal",
            "None"
        ],
        correctIndex: 0,
        explanation: "Ini adalah ternary bersarang: skor >= 70 bernilai False, maka lanjut ke else yang mengevaluasi ('Remidi' if skor >= 60 else 'Gagal'). Karena 65 >= 60 bernilai True, hasilnya adalah 'Remidi'."
    },

    // MODUL 6: Perulangan
    {
        id: "q-m6-1",
        moduleId: "mod-6",
        topic: "Perulangan",
        difficulty: "Mudah",
        question: "Angka berapa saja yang dicetak oleh range(2, 9, 3)?",
        code: `for n in range(2, 9, 3):
    print(n, end=" ")`,
        options: [
            "2 5 8",
            "2 5 8 11",
            "2 4 6 8",
            "3 6 9"
        ],
        correctIndex: 0,
        explanation: "Mulai dari 2, ditambah 3 menjadi 5, ditambah 3 menjadi 8. Iterasi berikutnya adalah 11 yang melebihi batas henti 9, jadi outputnya adalah 2 5 8."
    },
    {
        id: "q-m6-2",
        moduleId: "mod-6",
        topic: "Perulangan",
        difficulty: "Sedang",
        question: "Apa output dari perulangan yang menggunakan pernyataan break berikut?",
        code: `total = 0
for i in range(1, 10):
    if i == 5:
        break
    if i % 2 == 0:
        continue
    total += i
print(total)`,
        options: [
            "4",
            "9",
            "16",
            "25"
        ],
        correctIndex: 0,
        explanation: "i=1 (ganjil -> total=1), i=2 (genap -> continue dilewati), i=3 (ganjil -> total=1+3=4), i=4 (genap -> continue dilewati), i=5 (kondisi break terpenuhi -> loop berhenti seketika). Maka total akhir = 4."
    },
    {
        id: "q-m6-3",
        moduleId: "mod-6",
        topic: "Perulangan",
        difficulty: "Tantangan",
        question: "Kapan klausa 'else' pada perulangan for...else AKAN dieksekusi di Python?",
        code: `for item in koleksi:
    ...
else:
    print("Blok else jalan")`,
        options: [
            "Ketika perulangan selesai secara alami tanpa dihentikan oleh 'break'",
            "Hanya ketika koleksi yang diiterasi dalam keadaan kosong",
            "Setiap kali perulangan dieksekusi, mirip blok finally",
            "Hanya jika perulangan berhenti karena perintah break"
        ],
        correctIndex: 0,
        explanation: "Fitur unik Python for...else dan while...else: blok else hanya akan dieksekusi jika perulangan selesai secara normal (exhausted) dan TIDAK PERNAH memicu perintah break."
    },

    // MODUL 7: List
    {
        id: "q-m7-1",
        moduleId: "mod-7",
        topic: "List",
        difficulty: "Mudah",
        question: "Apa method yang digunakan untuk menambahkan elemen baru di posisi PALING AKHIR sebuah list?",
        code: null,
        options: [
            ".append()",
            ".insert()",
            ".extend()",
            ".push()"
        ],
        correctIndex: 0,
        explanation: ".append(x) menambahkan satu item di akhir. .insert(i, x) menambahkan pada indeks spesifik. Catatan: Python tidak memiliki method .push() seperti JavaScript."
    },
    {
        id: "q-m7-2",
        moduleId: "mod-7",
        topic: "List",
        difficulty: "Sedang",
        question: "Berapa isi dari variabel 'hasil' pada List Comprehension berikut?",
        code: `angka = [1, 2, 3, 4, 5]
hasil = [x * 2 for x in angka if x > 2]
print(hasil)`,
        options: [
            "[6, 8, 10]",
            "[2, 4, 6, 8, 10]",
            "[4, 6, 8, 10]",
            "[3, 4, 5]"
        ],
        correctIndex: 0,
        explanation: "Elemen yang memenuhi x > 2 adalah 3, 4, 5. Masing-masing dikalikan 2 menjadi 3*2=6, 4*2=8, 5*2=10. Hasilnya [6, 8, 10]."
    },
    {
        id: "q-m7-3",
        moduleId: "mod-7",
        topic: "List",
        difficulty: "Tantangan",
        question: "Apa output dari operasi penyalinan list (shallow copy vs reference) berikut?",
        code: `a = [1, 2, [3, 4]]
b = a.copy()
b[0] = 99
b[2][0] = 88
print(a)`,
        options: [
            "[1, 2, [88, 4]]",
            "[99, 2, [88, 4]]",
            "[1, 2, [3, 4]]",
            "[99, 2, [3, 4]]"
        ],
        correctIndex: 0,
        explanation: ".copy() membuat shallow copy: elemen tingkat pertama disalin secara mandiri (a[0] tetap 1), tetapi objek bersarang seperti nested list [3, 4] tetap merujuk ke memori yang sama. Jadi b[2][0] = 88 ikut mengubah list di dalam a."
    },

    // MODUL 8: Tuple & Set
    {
        id: "q-m8-1",
        moduleId: "mod-8",
        topic: "Tuple & Set",
        difficulty: "Mudah",
        question: "Bagaimana cara mendefinisikan tuple yang hanya memiliki SATU elemen?",
        code: null,
        options: [
            "t = (10,)",
            "t = (10)",
            "t = tuple[10]",
            "t = [10,]"
        ],
        correctIndex: 0,
        explanation: "Di Python, tanda kurung (10) dianggap sebagai tanda kurung matematika biasa (int). Untuk menjadi tuple satu elemen, WAJIB diberi koma di akhir: (10,)."
    },
    {
        id: "q-m8-2",
        moduleId: "mod-8",
        topic: "Tuple & Set",
        difficulty: "Sedang",
        question: "Berapa panjang (len) dari himpunan (set) berikut?",
        code: `s = {1, 2, 2, 3, "3", 1, 4}
print(len(s))`,
        options: [
            "5",
            "7",
            "4",
            "6"
        ],
        correctIndex: 0,
        explanation: "Set otomatis menghapus duplikat. Nilai 1 dan 2 yang berulang disatukan. Angka 3 (int) dan string '3' (str) adalah tipe data berbeda sehingga keduanya disimpan terpisah. Elemen uniknya: {1, 2, 3, '3', 4} berjumlah 5 elemen."
    },

    // MODUL 9: Dictionary
    {
        id: "q-m9-1",
        moduleId: "mod-9",
        topic: "Dictionary",
        difficulty: "Mudah",
        question: "Metode apa yang paling aman untuk mengambil nilai dari dictionary tanpa memicu KeyError jika kuncinya tidak ada?",
        code: null,
        options: [
            "d.get(kunci, default)",
            "d[kunci]",
            "d.find(kunci)",
            "d.fetch(kunci)"
        ],
        correctIndex: 0,
        explanation: "Metode .get(kunci, default) mengembalikan nilai default (atau None) jika kunci tidak ditemukan, sehingga program tidak crash dengan KeyError."
    },
    {
        id: "q-m9-2",
        moduleId: "mod-9",
        topic: "Dictionary",
        difficulty: "Sedang",
        question: "Apa output dari kode pembaruan dictionary berikut?",
        code: `data = {"a": 1, "b": 2}
data["c"] = data.get("c", 0) + 5
data["a"] += 10
print(data)`,
        options: [
            "{'a': 11, 'b': 2, 'c': 5}",
            "{'a': 10, 'b': 2, 'c': 5}",
            "{'a': 11, 'b': 2}",
            "KeyError: 'c'"
        ],
        correctIndex: 0,
        explanation: "data.get('c', 0) mengembalikan 0 karena 'c' belum ada, lalu 0 + 5 = 5 dimasukkan ke key 'c'. Nilai key 'a' awalnya 1 ditambah 10 menjadi 11."
    },

    // MODUL 10: Fungsi
    {
        id: "q-m10-1",
        moduleId: "mod-10",
        topic: "Fungsi",
        difficulty: "Sedang",
        question: "Apa tipe data dari parameter *args dan **kwargs di dalam fungsi Python?",
        code: null,
        options: [
            "*args adalah Tuple, dan **kwargs adalah Dictionary",
            "*args adalah List, dan **kwargs adalah Tuple",
            "*args adalah Set, dan **kwargs adalah List",
            "Keduanya adalah List berurutan"
        ],
        correctIndex: 0,
        explanation: "*args mengemas argumen posisi menjadi Tuple, sedangkan **kwargs mengemas argumen bernama menjadi Dictionary."
    },
    {
        id: "q-m10-2",
        moduleId: "mod-10",
        topic: "Fungsi",
        difficulty: "Tantangan",
        question: "Mengapa menggunakan default argument bertipe mutable (seperti list kosong []) merupakan perangkap klasik di Python?",
        code: `def tambah_item(item, daftar=[]):
    daftar.append(item)
    return daftar

print(tambah_item("A"))
print(tambah_item("B"))`,
        options: [
            "Output kedua adalah ['A', 'B'] karena list default hanya dibuat sekali saat fungsi didefinisikan",
            "Output kedua adalah ['B'] karena list baru dibuat setiap kali dipanggil",
            "Python mengeluarkan SyntaxError karena argumen default tidak boleh list",
            "List otomatis terhapus setelah fungsi selesai dijalankan"
        ],
        correctIndex: 0,
        explanation: "Perangkap mutable default argument: objek list default dibuat satu kali saat fungsi dikompilasi, sehingga panggilan berikutnya memakai list yang sama! Solusi tepat: gunakan def tambah(item, daftar=None): if daftar is None: daftar = []"
    },

    // MODUL 11: Error Handling
    {
        id: "q-m11-1",
        moduleId: "mod-11",
        topic: "Error Handling",
        difficulty: "Sedang",
        question: "Kapan blok 'finally' akan dijalankan dalam struktur try-except-finally?",
        code: null,
        options: [
            "Selalu dijalankan, baik terjadi error maupun tidak",
            "Hanya jika tidak ada error sama sekali",
            "Hanya jika terjadi error yang ditangkap blok except",
            "Hanya jika terjadi error yang tidak dapat ditangani"
        ],
        correctIndex: 0,
        explanation: "Blok 'finally' dijamin pasti selalu dijalankan apapun yang terjadi, sangat ideal untuk menutup koneksi database atau menutup file."
    },
    {
        id: "q-m11-2",
        moduleId: "mod-11",
        topic: "Error Handling",
        difficulty: "Mudah",
        question: "Perintah apa yang digunakan untuk melempar/memicu eksepsi buatan sendiri secara sengaja di Python?",
        code: null,
        options: [
            "raise",
            "throw",
            "except",
            "panic"
        ],
        correctIndex: 0,
        explanation: "Python menggunakan kata kunci 'raise' untuk memicu eksepsi (berbeda dengan Java/C++/JavaScript yang menggunakan 'throw')."
    },

    // MODUL 12: File I/O
    {
        id: "q-m12-1",
        moduleId: "mod-12",
        topic: "File I/O",
        difficulty: "Mudah",
        question: "Apa keuntungan utama menggunakan 'with open(...) as f:' dibanding open() biasa?",
        code: null,
        options: [
            "File otomatis ditutup secara aman bahkan jika terjadi error di tengah proses",
            "File dibaca 10 kali lebih cepat ke memori RAM",
            "File otomatis dienkripsi dengan password",
            "Tidak perlu menentukan mode pembacaan file"
        ],
        correctIndex: 0,
        explanation: "Context manager 'with' menjamin metode file.close() akan dipanggil secara otomatis saat blok selesai, mencegah resource leak."
    },
    {
        id: "q-m12-2",
        moduleId: "mod-12",
        topic: "File I/O",
        difficulty: "Sedang",
        question: "Apa perbedaan mendasar antara mode 'w' dan mode 'a' saat membuka file?",
        code: null,
        options: [
            "Mode 'w' menimpa (overwrite) isi file lama, sedangkan mode 'a' menambahkan (append) data di akhir file",
            "Mode 'w' hanya untuk file teks, sedangkan mode 'a' hanya untuk file biner",
            "Mode 'w' membuka file dalam mode read-only, sedangkan mode 'a' bisa menulis",
            "Tidak ada perbedaan, keduanya menghasilkan perilaku yang identik"
        ],
        correctIndex: 0,
        explanation: "Mode 'w' (write) memotong panjang file menjadi 0 (menghapus isi lama). Mode 'a' (append) meletakkan pointer di akhir file sehingga data lama tetap aman."
    },

    // MODUL 13: OOP
    {
        id: "q-m13-1",
        moduleId: "mod-13",
        topic: "OOP",
        difficulty: "Mudah",
        question: "Apa nama parameter pertama yang wajib ditulis pada instance method dalam class Python?",
        code: `class Kucing:
    def suara(???):
        print("Meong")`,
        options: [
            "self",
            "this",
            "cls",
            "me"
        ],
        correctIndex: 0,
        explanation: "Konvensi standar Python adalah menggunakan nama 'self', yang merepresentasikan instance dari objek yang sedang memanggil method tersebut."
    },
    {
        id: "q-m13-2",
        moduleId: "mod-13",
        topic: "OOP",
        difficulty: "Sedang",
        question: "Bagaimana cara memanggil konstruktor class induk dari dalam class anak (subclass)?",
        code: null,
        options: [
            "super().__init__(*args)",
            "parent().__init__(*args)",
            "base().__init__(*args)",
            "this.__init__(*args)"
        ],
        correctIndex: 0,
        explanation: "Fungsi bawaan super() memberikan akses ke method dan konstruktor class induk dalam hierarki pewarisan (inheritance)."
    },
    {
        id: "q-m13-3",
        moduleId: "mod-13",
        topic: "OOP",
        difficulty: "Tantangan",
        question: "Apa fungsi dari dunder method __str__ pada sebuah class?",
        code: null,
        options: [
            "Menentukan representasi teks yang ramah manusia saat objek dicetak dengan print() atau str()",
            "Mengonversi nama class menjadi string",
            "Menghapus objek dari memori sistem secara paksa",
            "Memvalidasi apakah atribut bertipe string"
        ],
        correctIndex: 0,
        explanation: "Method __str__ mengembalikan string yang mudah dibaca pengguna ketika objek dimasukkan ke fungsi print() atau str()."
    },

    // MODUL 14: Modul Standar
    {
        id: "q-m14-1",
        moduleId: "mod-14",
        topic: "Modul Standar",
        difficulty: "Mudah",
        question: "Fungsi apa dari modul random yang digunakan untuk mengambil satu elemen acak dari sebuah list?",
        code: `import random
warna = ["merah", "kuning", "hijau"]`,
        options: [
            "random.choice(warna)",
            "random.pick(warna)",
            "random.sample_one(warna)",
            "random.shuffle(warna)"
        ],
        correctIndex: 0,
        explanation: "random.choice(seq) mengembalikan satu elemen acak. random.shuffle(seq) mengocok list di tempat, dan random.randint(a,b) menghasilkan angka bulat."
    },
    {
        id: "q-m14-2",
        moduleId: "mod-14",
        topic: "Modul Standar",
        difficulty: "Sedang",
        question: "Fungsi apa dari modul json yang digunakan untuk mengonversi Python Dictionary menjadi JSON String?",
        code: null,
        options: [
            "json.dumps()",
            "json.loads()",
            "json.stringify()",
            "json.encode()"
        ],
        correctIndex: 0,
        explanation: "json.dumps() (dump string) mengubah objek Python ke format teks JSON. Sebaliknya, json.loads() (load string) mem-parsing string JSON menjadi Dictionary Python."
    },

    // MODUL 15: Fitur Lanjutan
    {
        id: "q-m15-1",
        moduleId: "mod-15",
        topic: "Fitur Lanjutan",
        difficulty: "Sedang",
        question: "Apa kata kunci yang membedakan fungsi biasa dengan Generator function di Python?",
        code: null,
        options: [
            "yield",
            "generate",
            "return_next",
            "stream"
        ],
        correctIndex: 0,
        explanation: "Kata kunci 'yield' membuat fungsi menjadi generator, yang menghasilkan nilai satu per satu sesuai permintaan (lazy evaluation) tanpa menghabiskan RAM."
    },
    {
        id: "q-m15-2",
        moduleId: "mod-15",
        topic: "Fitur Lanjutan",
        difficulty: "Tantangan",
        question: "Simbol apa yang digunakan di atas definisi fungsi untuk menerapkan Decorator di Python?",
        code: `???decorator_saya
def proses():
    pass`,
        options: [
            "@",
            "#",
            "$",
            "&"
        ],
        correctIndex: 0,
        explanation: "Sintaks pie/at (@decorator) diletakkan tepat di atas fungsi yang didekorasi untuk menerapkan wrapper atau pemodifikasi fungsi secara sintaksis elegan."
    }
];

