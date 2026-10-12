/**
 * Tantangan Koding Interaktif (Interactive Coding Challenges)
 * Lengkap dengan test cases dan validator otomatis
 */

const CODE_CHALLENGES = [
    {
        id: "ch-1",
        title: "Tantangan 1: Cek Bilangan Genap atau Ganjil",
        difficulty: "Mudah",
        category: "Dasar & Kondisional",
        description: `
            <p>Buatlah fungsi bernama <code>cek_ganjil_genap(angka)</code> yang menerima sebuah integer <code>angka</code>.</p>
            <p>Fungsi harus mengembalikan string:</p>
            <ul class="list-disc list-inside space-y-1 text-slate-300 my-2">
                <li><code>"Genap"</code> jika angka habis dibagi 2.</li>
                <li><code>"Ganjil"</code> jika angka tidak habis dibagi 2.</li>
            </ul>
        `,
        starterCode: `def cek_ganjil_genap(angka):
    # Tulis logika Anda di sini
    pass

# Uji coba fungsi Anda:
print(cek_ganjil_genap(4))   # Seharusnya: Genap
print(cek_ganjil_genap(7))   # Seharusnya: Ganjil`,
        testCases: [
            { call: "cek_ganjil_genap(10)", expected: "Genap" },
            { call: "cek_ganjil_genap(15)", expected: "Ganjil" },
            { call: "cek_ganjil_genap(0)", expected: "Genap" },
            { call: "cek_ganjil_genap(-3)", expected: "Ganjil" }
        ],
        solution: `def cek_ganjil_genap(angka):
    return "Genap" if angka % 2 == 0 else "Ganjil"`,
        hint: "Gunakan operator modulus (%) untuk memeriksa sisa bagi angka dengan 2."
    },
    {
        id: "ch-2",
        title: "Tantangan 2: Pembalik Kata (Reverse String)",
        difficulty: "Mudah",
        category: "String & Slicing",
        description: `
            <p>Buatlah fungsi <code>balik_kata(teks)</code> yang membalikkan urutan karakter dalam string <code>teks</code>.</p>
            <p>Contoh: <code>"koding"</code> menjadi <code>"gnidok"</code>.</p>
        `,
        starterCode: `def balik_kata(teks):
    # Tulis logika Anda di sini
    pass

# Uji coba fungsi Anda:
print(balik_kata("koding"))
print(balik_kata("Python"))`,
        testCases: [
            { call: "balik_kata('halo')", expected: "olah" },
            { call: "balik_kata('Python')", expected: "nohtyP" },
            { call: "balik_kata('12345')", expected: "54321" }
        ],
        solution: `def balik_kata(teks):
    return teks[::-1]`,
        hint: "Gunakan teknik slicing Python dengan step -1: teks[::-1]."
    },
    {
        id: "ch-3",
        title: "Tantangan 3: Hitung Faktorial Bilangan",
        difficulty: "Sedang",
        category: "Perulangan & Fungsi",
        description: `
            <p>Buatlah fungsi <code>hitung_faktorial(n)</code> yang menghitung faktorial dari bilangan bulat positif <code>n</code>.</p>
            <p>Faktorial dari n (n!) adalah perkalian semua bilangan bulat positif dari 1 sampai n. Faktorial dari 0 adalah 1.</p>
            <p>Contoh: 5! = 5 × 4 × 3 × 2 × 1 = 120.</p>
        `,
        starterCode: `def hitung_faktorial(n):
    # Tulis kode Anda di sini
    pass

# Uji coba fungsi Anda:
print(hitung_faktorial(5))  # Seharusnya: 120
print(hitung_faktorial(0))  # Seharusnya: 1`,
        testCases: [
            { call: "hitung_faktorial(5)", expected: "120" },
            { call: "hitung_faktorial(0)", expected: "1" },
            { call: "hitung_faktorial(3)", expected: "6" },
            { call: "hitung_faktorial(6)", expected: "720" }
        ],
        solution: `def hitung_faktorial(n):
    hasil = 1
    for i in range(1, n + 1):
        hasil *= i
    return hasil`,
        hint: "Gunakan perulangan for dengan akumulator perkalian dimulai dari nilai 1."
    },
    {
        id: "ch-4",
        title: "Tantangan 4: Detektor Palindrom",
        difficulty: "Sedang",
        category: "String & Logika",
        description: `
            <p>Buat fungsi <code>is_palindrom(kata)</code> yang mengembalikan <code>True</code> jika suatu kata dibaca sama dari depan maupun belakang (mengabaikan huruf besar/kecil), dan <code>False</code> jika tidak.</p>
            <p>Contoh: <code>"Kasur"</code> -> False, <code>"Katak"</code> -> True, <code>"Madam"</code> -> True.</p>
        `,
        starterCode: `def is_palindrom(kata):
    # Tulis kode Anda di sini
    pass

# Uji coba fungsi Anda:
print(is_palindrom("Katak"))  # True
print(is_palindrom("Python")) # False`,
        testCases: [
            { call: "is_palindrom('katak')", expected: "True" },
            { call: "is_palindrom('Madam')", expected: "True" },
            { call: "is_palindrom('koding')", expected: "False" },
            { call: "is_palindrom('Level')", expected: "True" }
        ],
        solution: `def is_palindrom(kata):
    kata_bersih = kata.lower()
    return kata_bersih == kata_bersih[::-1]`,
        hint: "Ubah dulu semua huruf menjadi huruf kecil dengan .lower() sebelum membandingkannya dengan kebalikan teksnya."
    },
    {
        id: "ch-5",
        title: "Tantangan 5: Hitung Frekuensi Karakter",
        difficulty: "Sedang",
        category: "Dictionary",
        description: `
            <p>Buatlah fungsi <code>hitung_karakter(teks)</code> yang menghitung kemunculan setiap karakter dalam teks dan mengembalikannya dalam bentuk <strong>Dictionary</strong>.</p>
            <p>Contoh: <code>"kopi"</code> -> <code>{'k': 1, 'o': 1, 'p': 1, 'i': 1}</code>.</p>
        `,
        starterCode: `def hitung_karakter(teks):
    # Tulis kode Anda di sini
    pass

# Uji coba fungsi Anda:
print(hitung_karakter("buku"))  # {'b': 1, 'u': 2, 'k': 1}`,
        testCases: [
            { call: "hitung_karakter('buku')['u']", expected: "2" },
            { call: "hitung_karakter('buku')['b']", expected: "1" },
            { call: "hitung_karakter('indonesia')['n']", expected: "2" }
        ],
        solution: `def hitung_karakter(teks):
    frekuensi = {}
    for char in teks:
        frekuensi[char] = frekuensi.get(char, 0) + 1
    return frekuensi`,
        hint: "Gunakan method .get(char, 0) pada dictionary untuk menambah hitungan secara aman."
    },
    {
        id: "ch-6",
        title: "Tantangan 6: Deret Fibonacci",
        difficulty: "Tantangan",
        category: "List & Algoritma",
        description: `
            <p>Buatlah fungsi <code>deret_fibonacci(n)</code> yang menghasilkan list berisi <code>n</code> angka pertama dari deret Fibonacci.</p>
            <p>Deret dimulai dari 0 dan 1, di mana setiap angka berikutnya adalah penjumlahan dari dua angka sebelumnya: 0, 1, 1, 2, 3, 5, 8, ...</p>
        `,
        starterCode: `def deret_fibonacci(n):
    # Tulis kode Anda di sini
    pass

# Uji coba fungsi Anda:
print(deret_fibonacci(6))  # [0, 1, 1, 2, 3, 5]`,
        testCases: [
            { call: "deret_fibonacci(1)", expected: "[0]" },
            { call: "deret_fibonacci(2)", expected: "[0, 1]" },
            { call: "deret_fibonacci(5)", expected: "[0, 1, 1, 2, 3]" },
            { call: "deret_fibonacci(7)", expected: "[0, 1, 1, 2, 3, 5, 8]" }
        ],
        solution: `def deret_fibonacci(n):
    if n <= 0:
        return []
    if n == 1:
        return [0]
    deret = [0, 1]
    while len(deret) < n:
        deret.append(deret[-1] + deret[-2])
    return deret`,
        hint: "Tangani kasus n=1 ([0]), lalu gunakan perulangan while len(deret) < n untuk menambahkan deret[-1] + deret[-2]."
    }
];

