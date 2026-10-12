/**
 * Modul Playground & Challenge Runner
 */

const SAMPLE_SNIPPETS = {
    hello: `# Program Pertama
nama = "Sobat Koding"
bahasa = "Python 3"
print(f"Halo, {nama}! Selamat belajar {bahasa}.")
print("Mari taklukkan semua materi dan latihan!")`,

    fizzbuzz: `# Algoritma Klasik FizzBuzz
for n in range(1, 21):
    if n % 15 == 0:
        print("FizzBuzz", end=" ")
    elif n % 3 == 0:
        print("Fizz", end=" ")
    elif n % 5 == 0:
        print("Buzz", end=" ")
    else:
        print(n, end=" ")
print()`,

    list_comp: `# List & Dictionary Comprehension
angka = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Kuadrat dari bilangan genap
kuadrat_genap = [x ** 2 for x in angka if x % 2 == 0]
print("Kuadrat Genap:", kuadrat_genap)

# Dictionary panjang kata
kata_list = ["python", "algoritma", "data", "kecerdasan"]
panjang_kata = {k: len(k) for k in kata_list}
print("Panjang Kata:", panjang_kata)`,

    oop: `# Pemrograman Berorientasi Objek (OOP)
class Hero:
    def __init__(self, nama, hp, attack):
        self.nama = nama
        self.hp = hp
        self.attack = attack

    def serang(self, lawan):
        print(f"⚔️ {self.nama} menyerang {lawan.nama} sebesar {self.attack} DMG!")
        lawan.hp -= self.attack
        print(f"🛡️ Sisa HP {lawan.nama}: {max(0, lawan.hp)}")

hero1 = Hero("Gatotkaca", 100, 25)
hero2 = Hero("Buto Ijo", 90, 20)

hero1.serang(hero2)
hero2.serang(hero1)`
};

// Pasang penanganan tombol TAB pada textarea editor agar menambah 4 spasi
function setupTabKeyHandler(textarea) {
    if (!textarea) return;
    textarea.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = this.selectionStart;
            const end = this.selectionEnd;
            const tabSpaces = "    "; // 4 spasi standar Python

            this.value = this.value.substring(0, start) + tabSpaces + this.value.substring(end);
            this.selectionStart = this.selectionEnd = start + tabSpaces.length;
        }
    });
}

// Menjalankan kode pada Playground
async function runPlaygroundCode() {
    const editor = document.getElementById('playground-editor');
    const outputElem = document.getElementById('playground-output');
    const statusElem = document.getElementById('playground-status');
    const runBtn = document.getElementById('btn-run-playground');

    if (!editor || !outputElem) return;

    const code = editor.value.trim();
    if (!code) {
        showToast("Editor masih kosong. Tulis kode Python Anda terlebih dahulu!", "warning");
        return;
    }

    // Tampilkan status proses
    runBtn.disabled = true;
    runBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
        Mengeksekusi...
    `;

    outputElem.innerHTML = `<span class="text-slate-500 italic">Menyiapkan interpreter Python lalu menjalankan kode...</span>`;

    const result = await executePythonCode(code, { persistent: true });

    runBtn.disabled = false;
    runBtn.innerHTML = `
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5v14l11-7L8 5Z"></path></svg>
        Jalankan <kbd class="hidden sm:inline text-[10px] font-normal text-emerald-100/70">Ctrl ↵</kbd>
    `;

    if (result.success) {
        let outputText = "";
        if (result.stdout) {
            outputText += `<div class="text-emerald-400 font-mono">${escapeHtml(result.stdout)}</div>`;
        }
        if (result.stderr) {
            outputText += `<div class="text-rose-400 font-mono mt-2">${escapeHtml(result.stderr)}</div>`;
        }
        if (!result.stdout && !result.stderr) {
            outputText += `<div class="text-slate-500 italic font-mono">[Program selesai tanpa output teks]</div>`;
        }

        outputElem.innerHTML = outputText;
        if (statusElem) {
            statusElem.innerHTML = `<span class="text-emerald-400 font-medium">✓ Selesai (${result.execution_time}s)</span>`;
        }
    } else {
        outputElem.innerHTML = `
            <div class="text-rose-400 font-mono">
                <div class="font-bold mb-1 flex items-center gap-1.5"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke-width="1.8"></circle><path stroke-linecap="round" stroke-width="1.8" d="M12 8v5m0 3h.01"></path></svg>Eksekusi gagal</div>
                <pre class="whitespace-pre-wrap">${escapeHtml(result.error || result.stderr)}</pre>
            </div>
        `;
        if (statusElem) {
            statusElem.innerHTML = `<span class="text-rose-400 font-medium">✕ Error</span>`;
        }
    }
}

// Menjalankan dan menguji solusi untuk Code Challenge
async function runChallengeTest(challengeId) {
    const challenge = CODE_CHALLENGES.find(c => c.id === challengeId);
    if (!challenge) return;

    const editor = document.getElementById(`challenge-editor-${challengeId}`);
    const resultsContainer = document.getElementById(`challenge-results-${challengeId}`);
    const runBtn = document.getElementById(`btn-test-challenge-${challengeId}`);

    if (!editor || !resultsContainer) return;

    const userCode = editor.value;
    runBtn.disabled = true;
    runBtn.innerHTML = "Menguji solusi...";

    resultsContainer.innerHTML = `<div class="text-slate-400 text-sm">Sedang memvalidasi seluruh test cases...</div>`;

    // Buat harness test runner di Python
    const delimiter = "__CHALLENGE_TEST_DELIM__";
    let testRunnerScript = userCode + `\n\n# --- AUTOMATED TEST RUNNER ---\n`;
    testRunnerScript += `print("${delimiter}")\n`;

    challenge.testCases.forEach((tc, idx) => {
        testRunnerScript += `try:\n`;
        testRunnerScript += `    hasil_${idx} = str(${tc.call})\n`;
        testRunnerScript += `    print(f"TEST_${idx}:" + hasil_${idx})\n`;
        testRunnerScript += `except Exception as err:\n`;
        testRunnerScript += `    print(f"TEST_${idx}:ERROR:" + str(err))\n`;
    });

    const result = await executePythonCode(testRunnerScript);
    runBtn.disabled = false;
    runBtn.innerHTML = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5v14l11-7L8 5Z"></path></svg>Jalankan & Uji Solusi`;

    if (!result.success) {
        resultsContainer.innerHTML = `
            <div class="p-3 bg-rose-950/40 border border-rose-800 rounded-xl text-rose-300 text-sm">
                <strong>Error saat menjalankan kode:</strong><br>
                <pre class="font-mono text-xs mt-1">${escapeHtml(result.error || result.stderr)}</pre>
            </div>
        `;
        return;
    }

    const fullOutput = result.stdout || "";
    const parts = fullOutput.split(delimiter);
    const testOutput = parts.length > 1 ? parts[1].trim() : "";

    let allPassed = true;
    let htmlResults = `<div class="space-y-2 mt-2">`;

    challenge.testCases.forEach((tc, idx) => {
        const regex = new RegExp(`TEST_${idx}:(.*)`);
        const match = testOutput.match(regex);
        const actual = match ? match[1].trim() : "Tidak ada output";
        const isError = actual.startsWith("ERROR:");
        const passed = !isError && actual === tc.expected.trim();

        if (!passed) allPassed = false;

        htmlResults += `
            <div class="flex items-center justify-between p-2.5 rounded-lg border text-xs font-mono ${passed ? 'bg-emerald-950/30 border-emerald-800/60 text-emerald-300' : 'bg-rose-950/30 border-rose-800/60 text-rose-300'}">
                <div>
                    <span class="font-bold">${passed ? '✓ LULUS' : '✕ GAGAL'}</span>: <code>${escapeHtml(tc.call)}</code>
                    ${!passed ? `<div class="text-slate-400 mt-0.5">Diharapkan: <code>${escapeHtml(tc.expected)}</code> | Dihasilkan: <code>${escapeHtml(actual)}</code></div>` : ''}
                </div>
            </div>
        `;
    });

    htmlResults += `</div>`;

    if (allPassed) {
        triggerConfetti();
        resultsContainer.innerHTML = `
            <div class="p-3 bg-emerald-950/50 border border-emerald-500 rounded-xl mb-2 text-emerald-300 font-semibold text-sm flex items-center gap-2">
                <span class="font-bold" aria-hidden="true">✓</span>
                <span>Semua test case berhasil lulus. Solusi Anda tepat.</span>
            </div>
        ` + htmlResults;
        showToast("Selamat! Seluruh test case berhasil dilewati!", "success");
    } else {
        resultsContainer.innerHTML = `
            <div class="p-3 bg-rose-950/50 border border-rose-600 rounded-xl mb-2 text-rose-300 font-semibold text-sm flex items-center gap-2">
                <span class="font-bold" aria-hidden="true">!</span>
                <span>Masih ada test case yang belum lulus. Silakan periksa kembali logika kode Anda.</span>
            </div>
        ` + htmlResults;
    }
}
