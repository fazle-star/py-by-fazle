/**
 * Generator Soal Dinamis & Prosedural (100% Anti-Menyontek)
 * Soal digenerate secara acak setiap saat dengan variabel dan angka baru,
 * sehingga jawaban tidak bisa dihafalkan atau dicontek!
 */

const DYNAMIC_GENERATORS = [
    // 1. Aritmatika & Prioritas Operator Acak
    {
        category: "Aritmatika & Operator",
        title: "Tebak Hasil Perhitungan Aritmatika",
        generate() {
            const a = Math.floor(Math.random() * 8) + 3;  // 3 - 10
            const b = Math.floor(Math.random() * 4) + 2;  // 2 - 5
            const c = Math.floor(Math.random() * 5) + 2;  // 2 - 6
            const d = Math.floor(Math.random() * 3) + 2;  // 2 - 4

            // Kode Python:
            const code = `a = ${a}\nb = ${b}\nc = ${c}\nd = ${d}\n\nhasil = (a * b) // c + (a % d)\nprint(hasil)`;
            
            // Perhitungan eksak:
            const mult = a * b;
            const floorDiv = Math.floor(mult / c);
            const mod = a % d;
            const correctVal = floorDiv + mod;

            // Buat opsi pengecoh yang realistis
            const distractor1 = Math.floor(mult / c) + (mult % d);
            const distractor2 = correctVal + (Math.random() > 0.5 ? 1 : -1) * (d);
            const distractor3 = correctVal + 2;

            const allOptions = Array.from(new Set([
                correctVal.toString(),
                distractor1.toString(),
                distractor2.toString(),
                distractor3.toString()
            ]));

            // Jika ada duplikat, tambahkan variasi
            while (allOptions.length < 4) {
                const dummy = (correctVal + (allOptions.length * 3)).toString();
                if (!allOptions.includes(dummy)) allOptions.push(dummy);
            }

            const shuffledOptions = shuffleArray(allOptions);
            const correctIndex = shuffledOptions.indexOf(correctVal.toString());

            return {
                type: "dynamic",
                category: "Aritmatika & Operator",
                question: "Berapa output yang dicetak oleh kode Python berikut?",
                code: code,
                options: shuffledOptions,
                correctIndex: correctIndex,
                explanation: `Langkah evaluasi:<br>
                1. Perkalian: <code>(${a} * ${b}) = ${mult}</code><br>
                2. Pembagian bulat: <code>${mult} // ${c} = ${floorDiv}</code><br>
                3. Modulus: <code>${a} % ${d} = ${mod}</code><br>
                4. Penjumlahan akhir: <code>${floorDiv} + ${mod} = ${correctVal}</code>.`
            };
        }
    },

    // 2. String Slicing Acak
    {
        category: "String Slicing",
        title: "Tebak Hasil Pemotongan String (Slicing)",
        generate() {
            const wordList = ["NUSANTARA", "ALGORITMA", "PROGRAMMING", "TEKNOLOGI", "DEVELOPER", "INDONESIA", "KOMPUTER"];
            const word = wordList[Math.floor(Math.random() * wordList.length)];
            const len = word.length;

            const start = Math.floor(Math.random() * 3);          // 0 - 2
            const stop = Math.floor(Math.random() * 4) + start + 3; // start+3 sampai len
            const boundedStop = Math.min(stop, len);

            const isReversed = Math.random() > 0.65;
            let code = "";
            let correctVal = "";
            let explanation = "";

            if (isReversed) {
                code = `kata = "${word}"\nprint(kata[::-1])`;
                correctVal = word.split("").reverse().join("");
                explanation = `Slicing <code>[::-1]</code> membaca string dari index paling akhir ke awal, menghasilkan kebalikan kata: <strong>${correctVal}</strong>.`;
            } else {
                code = `kata = "${word}"\nprint(kata[${start}:${boundedStop}])`;
                correctVal = word.substring(start, boundedStop);
                explanation = `Slicing <code>[${start}:${boundedStop}]</code> mengambil karakter dari indeks ${start} sampai sebelum indeks ${boundedStop}. Hasilnya adalah: <strong>'${correctVal}'</strong>.`;
            }

            // Distractors
            const dist1 = word.substring(start + 1, boundedStop + 1);
            const dist2 = word.substring(start, boundedStop - 1);
            const dist3 = word.substring(Math.max(0, start - 1), boundedStop);

            const optionsSet = new Set([correctVal, dist1, dist2, dist3]);
            if (optionsSet.size < 4) {
                optionsSet.add(word.substring(0, 3));
                optionsSet.add(word.slice(-3));
            }
            const allOptions = Array.from(optionsSet).slice(0, 4);
            const shuffledOptions = shuffleArray(allOptions);

            return {
                type: "dynamic",
                category: "String Slicing",
                question: "Berapa potongan teks yang dihasilkan dari kode slicing berikut?",
                code: code,
                options: shuffledOptions,
                correctIndex: shuffledOptions.indexOf(correctVal),
                explanation: explanation
            };
        }
    },

    // 3. List Indexing & Method Acak
    {
        category: "List & Array",
        title: "Tebak Nilai List Setelah Manipulasi",
        generate() {
            const baseNums = [10, 20, 30, 40, 50, 60, 70];
            const startIdx = Math.floor(Math.random() * 3);
            const sliceArr = baseNums.slice(startIdx, startIdx + 4);
            const addNum = Math.floor(Math.random() * 40) + 11;
            const popIdx = Math.floor(Math.random() * sliceArr.length);

            const code = `data = ${JSON.stringify(sliceArr)}\ndata.append(${addNum})\nkeluar = data.pop(${popIdx})\nprint(keluar, data[-1])`;

            // Simulasi di JS
            const copyArr = [...sliceArr];
            copyArr.push(addNum);
            const keluar = copyArr.splice(popIdx, 1)[0];
            const lastItem = copyArr[copyArr.length - 1];
            const correctVal = `${keluar} ${lastItem}`;

            const distractors = [
                `${addNum} ${keluar}`,
                `${keluar} ${copyArr[0]}`,
                `${sliceArr[0]} ${addNum}`,
                `${keluar} ${sliceArr[sliceArr.length - 1]}`
            ];

            const optionsSet = new Set([correctVal, ...distractors]);
            const allOptions = Array.from(optionsSet).slice(0, 4);
            const shuffledOptions = shuffleArray(allOptions);

            return {
                type: "dynamic",
                category: "List & Array",
                question: "Berapa dua nilai yang dicetak oleh operasi list berikut?",
                code: code,
                options: shuffledOptions,
                correctIndex: shuffledOptions.indexOf(correctVal),
                explanation: `1. <code>data.append(${addNum})</code> memasukkan ${addNum} ke ujung akhir list.<br>
                2. <code>data.pop(${popIdx})</code> mengeluarkan dan mengembalikan elemen di indeks ke-${popIdx}, yaitu <strong>${keluar}</strong>.<br>
                3. Elemen paling akhir <code>data[-1]</code> saat ini adalah <strong>${lastItem}</strong>.<br>
                Output: <code>${correctVal}</code>.`
            };
        }
    },

    // 4. Perulangan For & Akumulator Acak
    {
        category: "Perulangan & Akumulator",
        title: "Tebak Nilai Akhir Perulangan",
        generate() {
            const start = Math.floor(Math.random() * 3) + 1;  // 1 - 3
            const stop = Math.floor(Math.random() * 6) + 7;   // 7 - 12
            const step = Math.floor(Math.random() * 2) + 2;   // 2 - 3
            const bonus = Math.floor(Math.random() * 5) + 5;  // 5 - 9

            const code = `total = 0\nfor i in range(${start}, ${stop}, ${step}):\n    total += i\ntotal += ${bonus}\nprint(total)`;

            let loopTotal = 0;
            const seq = [];
            for (let i = start; i < stop; i += step) {
                loopTotal += i;
                seq.push(i);
            }
            const correctVal = loopTotal + bonus;

            const allOptions = [
                correctVal.toString(),
                (loopTotal).toString(),
                (correctVal + step).toString(),
                (correctVal - start).toString()
            ];

            const uniqueOptions = Array.from(new Set(allOptions));
            while (uniqueOptions.length < 4) {
                uniqueOptions.push((correctVal + uniqueOptions.length * 5).toString());
            }

            const shuffledOptions = shuffleArray(uniqueOptions);

            return {
                type: "dynamic",
                category: "Perulangan",
                question: "Berapa nilai variabel 'total' yang dicetak di akhir?",
                code: code,
                options: shuffledOptions,
                correctIndex: shuffledOptions.indexOf(correctVal.toString()),
                explanation: `Iterasi nilai <code>i</code> pada <code>range(${start}, ${stop}, ${step})</code> adalah: [${seq.join(", ")}].<br>
                Jumlah nilai dalam loop: <code>${loopTotal}</code>.<br>
                Ditambah bonus di luar loop: <code>${loopTotal} + ${bonus} = ${correctVal}</code>.`
            };
        }
    },

    // 5. Kondisional If-Else & Modulo Acak
    {
        category: "Logika Percabangan",
        title: "Tebak Alur Percabangan Dinamis",
        generate() {
            const num = Math.floor(Math.random() * 50) + 10;
            const divisor = Math.random() > 0.5 ? 4 : 5;

            const code = `x = ${num}\nif x % ${divisor} == 0:\n    status = "Habis Dibagi"\nelif x % 2 == 0:\n    status = "Genap Biasa"\nelse:\n    status = "Ganjil Unik"\nprint(status)`;

            let correctVal = "";
            let reason = "";
            if (num % divisor === 0) {
                correctVal = "Habis Dibagi";
                reason = `${num} habis dibagi ${divisor} (sisa 0).`;
            } else if (num % 2 === 0) {
                correctVal = "Genap Biasa";
                reason = `${num} tidak habis dibagi ${divisor}, tetapi merupakan bilangan genap.`;
            } else {
                correctVal = "Ganjil Unik";
                reason = `${num} tidak habis dibagi ${divisor} dan bukan bilangan genap (ganjil).`;
            }

            const options = ["Habis Dibagi", "Genap Biasa", "Ganjil Unik", "Error Modulo"];
            const shuffledOptions = shuffleArray(options);

            return {
                type: "dynamic",
                category: "Percabangan",
                question: "Apa output dari struktur kondisional berikut?",
                code: code,
                options: shuffledOptions,
                correctIndex: shuffledOptions.indexOf(correctVal),
                explanation: `Kondisi dievaluasi secara berurutan: ${reason} Sehingga status yang tercetak adalah <strong>'${correctVal}'</strong>.`
            };
        }
    },

    // 6. List Comprehension Acak
    {
        category: "List Comprehension",
        title: "Tebak Output List Comprehension",
        generate() {
            const multiplier = Math.floor(Math.random() * 3) + 2; // 2, 3, 4
            const threshold = Math.floor(Math.random() * 4) + 3;  // 3, 4, 5, 6
            const raw = [2, 3, 4, 5, 6, 7, 8];

            const code = `angka = [2, 3, 4, 5, 6, 7, 8]\nhasil = [x * ${multiplier} for x in angka if x > ${threshold}]\nprint(hasil)`;

            const filtered = raw.filter(x => x > threshold);
            const calculated = filtered.map(x => x * multiplier);
            const correctVal = JSON.stringify(calculated);

            // Distractors
            const dist1 = JSON.stringify(raw.map(x => x * multiplier));
            const dist2 = JSON.stringify(raw.filter(x => x > threshold));
            const dist3 = JSON.stringify(filtered.map(x => x + multiplier));

            const optionsSet = new Set([correctVal, dist1, dist2, dist3]);
            const allOptions = Array.from(optionsSet);
            const shuffledOptions = shuffleArray(allOptions);

            return {
                type: "dynamic",
                category: "List Comprehension",
                question: "Berapa list hasil evaluasi List Comprehension berikut?",
                code: code,
                options: shuffledOptions,
                correctIndex: shuffledOptions.indexOf(correctVal),
                explanation: `Elemen dari list yang memenuhi <code>x > ${threshold}</code> adalah [${filtered.join(", ")}].<br>
                Masing-masing elemen dikalikan ${multiplier}: [${calculated.join(", ")}].`
            };
        }
    },

    // 7. Dictionary Key Lookup & Update Acak
    {
        category: "Dictionary",
        title: "Tebak Nilai Dictionary Dinamis",
        generate() {
            const keys = ["apel", "jeruk", "mangga", "pisang"];
            const pickedKey = keys[Math.floor(Math.random() * keys.length)];
            const val1 = Math.floor(Math.random() * 20) + 10;
            const inc = Math.floor(Math.random() * 15) + 5;

            const code = `stok = {"apel": 15, "jeruk": 20, "mangga": 30}\ntotal = stok.get("${pickedKey}", 5) + ${inc}\nprint(total)`;

            const dictObj = { apel: 15, jeruk: 20, mangga: 30 };
            const baseVal = dictObj[pickedKey] !== undefined ? dictObj[pickedKey] : 5;
            const correctVal = (baseVal + inc).toString();

            const dist1 = (baseVal).toString();
            const dist2 = (5 + inc).toString();
            const dist3 = (baseVal + inc + 10).toString();

            const optionsSet = new Set([correctVal, dist1, dist2, dist3]);
            while (optionsSet.size < 4) {
                optionsSet.add((Math.floor(Math.random() * 50) + 1).toString());
            }

            const shuffledOptions = shuffleArray(Array.from(optionsSet));

            return {
                type: "dynamic",
                category: "Dictionary",
                question: "Berapa nilai variabel 'total' yang dicetak?",
                code: code,
                options: shuffledOptions,
                correctIndex: shuffledOptions.indexOf(correctVal),
                explanation: `<code>stok.get("${pickedKey}", 5)</code> mengembalikan nilai ${baseVal} ${pickedKey in dictObj ? `(karena key '${pickedKey}' ada di kamus)` : `(karena key '${pickedKey}' tidak ada, diambil nilai default 5)`}.<br>
                Ditambah ${inc}: <code>${baseVal} + ${inc} = ${correctVal}</code>.`
            };
        }
    }
];

// Fungsi untuk membuat 1 soal dinamis acak
function generateSingleDynamicQuestion() {
    const generator = DYNAMIC_GENERATORS[Math.floor(Math.random() * DYNAMIC_GENERATORS.length)];
    return generator.generate();
}

// Fungsi untuk membuat kumpulan 5-10 soal dinamis acak
function generateDynamicExam(count = 5) {
    const questions = [];
    const availableGenerators = [...DYNAMIC_GENERATORS];
    
    // Acak urutan generator
    const shuffledGen = shuffleArray(availableGenerators);
    for (let i = 0; i < count; i++) {
        const gen = shuffledGen[i % shuffledGen.length];
        const q = gen.generate();
        q.id = `dyn-q-${i + 1}-${Date.now()}`;
        questions.push(q);
    }
    return questions;
}

