/**
 * Aplikasi Utama Python Tutorial & Interactive Quiz Hub (app.js)
 * Mengelola navigasi, render materi, bank soal dengan anti-menyontek,
 * generator dinamis, dan progres belajar.
 */

// State Global Aplikasi
const AppState = {
    currentTab: 'tutorial',
    currentModuleId: 'mod-1',
    completedModules: new Set(getFromStorage('completed_modules', [])),
    
    // State Kuis Pilihan Ganda Statis
    quiz: {
        filterModule: 'all',
        questions: [],          // Daftar soal aktif (bisa diacak)
        userAnswers: {},        // Map: questionId -> selectedOptionText
        isSubmitted: false,
        score: { correct: 0, total: 0, percentage: 0 },
        timerRunning: false,
        timerSeconds: 0,
        timerInterval: null
    },

    // State Kuis Dinamis (Procedural Generator)
    dynamicQuiz: {
        currentQuestion: null,
        selectedOption: null,
        isAnswered: false,
        stats: getFromStorage('dyn_stats', { totalAnswered: 0, correct: 0 })
    }
};

// Inisialisasi Saat Dokumen Siap
document.addEventListener('DOMContentLoaded', () => {
    initSidebar();
    initTutorialView();
    initQuizBank();
    initDynamicQuiz();
    initCodeChallenges();
    initPlayground();
    initSearchModal();
    updateGlobalStats();

    // Pulihkan tab dari URL hash jika ada
    const hash = window.location.hash.replace('#', '');
    if (['tutorial', 'quiz', 'dynamic', 'challenges', 'playground', 'cheatsheet'].includes(hash)) {
        switchTab(hash);
    } else {
        switchTab('tutorial');
    }
});

// Pergantian Tab Utama
function switchTab(tabName) {
    AppState.currentTab = tabName;
    window.location.hash = tabName;

    // Sembunyikan semua tab content
    document.querySelectorAll('.tab-view').forEach(el => el.classList.add('hidden'));

    // Tampilkan tab yang dipilih
    const target = document.getElementById(`tab-${tabName}`);
    if (target) target.classList.remove('hidden');

    // Update style tombol tab navigation
    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
        const forTab = btn.getAttribute('data-tab');
        if (forTab === tabName) {
            btn.classList.add('text-emerald-400', 'border-emerald-500', 'bg-emerald-500/10');
            btn.classList.remove('text-slate-400', 'border-transparent');
        } else {
            btn.classList.remove('text-emerald-400', 'border-emerald-500', 'bg-emerald-500/10');
            btn.classList.add('text-slate-400', 'border-transparent');
        }
    });

    // Jika tab adalah tutorial, render modul aktif
    if (tabName === 'tutorial') {
        renderCurrentModule();
    } else if (tabName === 'dynamic' && !AppState.dynamicQuiz.currentQuestion) {
        generateNewDynamicQuestion();
    }

    // Scroll ke atas dengan halus
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ==========================================================================
   BAGIAN 1: TUTORIAL & MATERI
   ========================================================================== */

function initSidebar() {
    const listContainer = document.getElementById('sidebar-module-list');
    if (!listContainer) return;

    listContainer.innerHTML = '';
    TUTORIAL_DATA.forEach((mod, idx) => {
        const isCompleted = AppState.completedModules.has(mod.id);
        const item = document.createElement('button');
        item.id = `sidebar-item-${mod.id}`;
        item.className = `w-full text-left p-3 rounded-xl transition-all duration-200 flex items-center justify-between group ${
            mod.id === AppState.currentModuleId 
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40 font-medium' 
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
        }`;

        item.onclick = () => {
            AppState.currentModuleId = mod.id;
            updateSidebarActive();
            renderCurrentModule();
            if (AppState.currentTab !== 'tutorial') {
                switchTab('tutorial');
            }
            // Close mobile drawer if opened
            const drawer = document.getElementById('sidebar-drawer');
            if (drawer && !drawer.classList.contains('-translate-x-full')) {
                toggleSidebarDrawer();
            }
        };

        item.innerHTML = `
            <div class="flex items-center gap-3 truncate">
                <span class="w-6 h-6 rounded-lg ${mod.id === AppState.currentModuleId ? 'bg-white/20' : 'bg-slate-800 text-slate-400'} flex items-center justify-center text-xs font-bold font-mono">
                    ${idx + 1}
                </span>
                <span class="truncate text-sm">${mod.title.replace(/^\d+\.\s*/, '')}</span>
            </div>
            <span class="module-check-icon text-xs ${isCompleted ? 'text-emerald-400' : 'text-transparent'}">
                ✓
            </span>
        `;
        listContainer.appendChild(item);
    });
}

function updateSidebarActive() {
    TUTORIAL_DATA.forEach(mod => {
        const item = document.getElementById(`sidebar-item-${mod.id}`);
        if (!item) return;
        const isCompleted = AppState.completedModules.has(mod.id);

        if (mod.id === AppState.currentModuleId) {
            item.className = "w-full text-left p-3 rounded-xl transition-all duration-200 flex items-center justify-between group bg-emerald-600 text-white shadow-lg shadow-emerald-900/40 font-medium";
        } else {
            item.className = "w-full text-left p-3 rounded-xl transition-all duration-200 flex items-center justify-between group text-slate-300 hover:bg-slate-800 hover:text-white";
        }

        const iconSpan = item.querySelector('.module-check-icon');
        if (iconSpan) {
            iconSpan.className = `module-check-icon text-xs ${isCompleted ? (mod.id === AppState.currentModuleId ? 'text-white' : 'text-emerald-400') : 'text-transparent'}`;
        }
    });
}

function initTutorialView() {
    renderCurrentModule();
}

function renderCurrentModule() {
    const mod = TUTORIAL_DATA.find(m => m.id === AppState.currentModuleId) || TUTORIAL_DATA[0];
    const container = document.getElementById('tutorial-content-area');
    if (!container) return;

    const isCompleted = AppState.completedModules.has(mod.id);
    const modIndex = TUTORIAL_DATA.findIndex(m => m.id === mod.id);
    const prevMod = modIndex > 0 ? TUTORIAL_DATA[modIndex - 1] : null;
    const nextMod = modIndex < TUTORIAL_DATA.length - 1 ? TUTORIAL_DATA[modIndex + 1] : null;

    let sectionsHtml = '';
    mod.sections.forEach((sec, idx) => {
        sectionsHtml += `
            <div class="mb-10 bg-slate-900/70 border border-slate-800 rounded-2xl p-6 lg:p-8 shadow-sm">
                <h3 class="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span class="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-xs font-mono font-bold">
                        ${idx + 1}
                    </span>
                    ${sec.title}
                </h3>
                <div class="text-slate-300 leading-relaxed space-y-3 tutorial-text-body">
                    ${sec.content}
                </div>
                ${sec.codeSnippet ? `
                    <div class="mt-5 rounded-xl overflow-hidden border border-slate-700 bg-slate-950">
                        <div class="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 text-xs">
                            <span class="text-slate-400 font-mono flex items-center gap-1.5">
                                <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Python 3
                            </span>
                            <div class="flex items-center gap-2">
                                <button class="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex items-center gap-1"
                                    onclick="copyToClipboard(\`${escapeForAttr(sec.codeSnippet)}\`)">
                                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M8 8V5h11v14H8v-3M5 9h9v10H5z"></path></svg>
                                    Salin
                                </button>
                                <button class="px-2.5 py-1 rounded bg-emerald-600/80 hover:bg-emerald-600 text-white transition-colors flex items-center gap-1 font-medium"
                                    data-code="${encodeURIComponent(sec.codeSnippet)}"
                                    onclick="sendSnippetToPlayground(this.dataset.code)">
                                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5v14l11-7L8 5Z"></path></svg>
                                    Coba di Playground
                                </button>
                            </div>
                        </div>
                        <pre class="p-4 overflow-x-auto text-sm text-emerald-300 font-mono leading-relaxed bg-slate-950/90 whitespace-pre"><code>${escapeHtml(sec.codeSnippet)}</code></pre>
                    </div>
                ` : ''}
            </div>
        `;
    });

    container.innerHTML = `
        <div class="max-w-4xl mx-auto">
            <!-- Header Modul -->
            <div class="mb-8 p-6 lg:p-8 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border border-slate-800 rounded-3xl relative overflow-hidden">
                <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div class="flex items-center gap-2">
                        <span class="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            ${mod.badge}
                        </span>
                        <span class="px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300">
                            Tingkat: ${mod.level}
                        </span>
                        <span class="px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300">
                            <svg class="w-3.5 h-3.5 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke-width="1.8"></circle><path stroke-linecap="round" stroke-width="1.8" d="M12 7v5l3 2"></path></svg>${mod.readTime}
                        </span>
                    </div>
                    <button id="btn-toggle-complete" 
                        class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                            isCompleted 
                                ? 'bg-emerald-600 text-white hover:bg-emerald-500' 
                                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                        }"
                        onclick="toggleModuleCompletion('${mod.id}')">
                        ${isCompleted ? '✓ Telah Dipelajari (Selesai)' : '○ Tandai Selesai'}
                    </button>
                </div>
                <h1 class="text-3xl lg:text-4xl font-extrabold text-white mb-3">
                    ${mod.title}
                </h1>
                <p class="text-slate-400 text-base leading-relaxed">
                    ${mod.description}
                </p>
                <div class="mt-6 flex flex-wrap gap-3">
                    <button class="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-semibold transition-all shadow-md flex items-center gap-2"
                        onclick="startQuizForModule('${mod.id}')">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M8 4h8a2 2 0 0 1 2 2v15H6V6a2 2 0 0 1 2-2Zm2-2h4v4h-4zM9 12h6m-6 4h6"></path></svg>
                        Kerjakan Latihan Soal Bab Ini
                    </button>
                </div>
            </div>

            <!-- Konten Seksi Materi -->
            ${sectionsHtml}

            <!-- Navigasi Bawah Antar Modul -->
            <div class="flex items-center justify-between gap-4 pt-6 border-t border-slate-800 mt-10">
                ${prevMod ? `
                    <button class="px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-all text-sm font-medium flex items-center gap-2"
                        onclick="navigateToModule('${prevMod.id}')">
                        ← Modul Sebelumnya: ${prevMod.title.replace(/^\d+\.\s*/, '')}
                    </button>
                ` : '<div></div>'}
                ${nextMod ? `
                    <button class="px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-all text-sm font-semibold flex items-center gap-2 shadow-lg shadow-emerald-950"
                        onclick="navigateToModule('${nextMod.id}')">
                        Modul Selanjutnya: ${nextMod.title.replace(/^\d+\.\s*/, '')} →
                    </button>
                ` : `
                    <button class="px-4 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white transition-all text-sm font-semibold flex items-center gap-2"
                        onclick="switchTab('quiz')">
                        🎓 Ikuti Ujian Komprehensif Seluruh Bab →
                    </button>
                `}
            </div>
        </div>
    `;
}

function navigateToModule(moduleId) {
    AppState.currentModuleId = moduleId;
    updateSidebarActive();
    renderCurrentModule();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleModuleCompletion(moduleId) {
    if (AppState.completedModules.has(moduleId)) {
        AppState.completedModules.delete(moduleId);
        showToast("Status modul diubah menjadi belum selesai.", "info");
    } else {
        AppState.completedModules.add(moduleId);
        showToast("Selamat! Modul berhasil diselesaikan.", "success");
    }
    saveToStorage('completed_modules', Array.from(AppState.completedModules));
    updateSidebarActive();
    renderCurrentModule();
    updateGlobalStats();
}

function sendSnippetToPlayground(code) {
    try {
        code = decodeURIComponent(code);
    } catch (error) {
        console.error("Gagal membaca kode snippet untuk Playground:", error);
        showToast("Snippet tidak bisa dimuat karena format kodenya tidak valid.", "error");
        return;
    }

    const playgroundUrl = new URL(window.location.href);
    playgroundUrl.hash = 'playground';
    playgroundUrl.searchParams.set('playgroundCode', code);

    const playgroundWindow = window.open(playgroundUrl.toString(), '_blank');
    if (!playgroundWindow) {
        showToast("Tab baru diblokir browser. Izinkan pop-up untuk membuka Playground.", "warning");
        return;
    }
    playgroundWindow.opener = null;
}

function escapeForAttr(str) {
    return str.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
}

/* ==========================================================================
   BAGIAN 2: BANK SOAL DENGAN SISTEM ANTI-MENYONTEK (ACAK & RESET)
   ========================================================================== */

function initQuizBank() {
    loadQuestions();
}

// Memuat soal berdasarkan filter aktif
function loadQuestions(shouldShuffle = true) {
    let rawList = [];
    if (AppState.quiz.filterModule === 'all') {
        rawList = [...STATIC_QUIZ_BANK];
    } else {
        rawList = STATIC_QUIZ_BANK.filter(q => q.moduleId === AppState.quiz.filterModule);
    }

    // Clone array agar objek tidak termutasi langsung
    let questions = rawList.map(q => {
        // Clone opsi dan buat representasi aman
        const originalCorrectOption = q.options[q.correctIndex];
        let options = [...q.options];

        // Jika minta diacak pilihannya:
        if (shouldShuffle) {
            options = shuffleArray(options);
        }

        return {
            id: q.id,
            moduleId: q.moduleId,
            topic: q.topic,
            difficulty: q.difficulty,
            question: q.question,
            code: q.code,
            options: options,
            correctOption: originalCorrectOption,
            explanation: q.explanation
        };
    });

    if (shouldShuffle) {
        questions = shuffleArray(questions);
    }

    AppState.quiz.questions = questions;
    AppState.quiz.userAnswers = {};
    AppState.quiz.isSubmitted = false;
    AppState.quiz.score = { correct: 0, total: questions.length, percentage: 0 };

    renderQuizView();
}

// RENDER TAMPILAN KUIS
function renderQuizView() {
    const container = document.getElementById('quiz-questions-list');
    const headerInfo = document.getElementById('quiz-header-info');
    const scoreArea = document.getElementById('quiz-score-area');
    if (!container) return;

    const { questions, userAnswers, isSubmitted, filterModule } = AppState.quiz;
    const answeredCount = Object.keys(userAnswers).length;

    // Render info filter di header
    if (headerInfo) {
        const filterTitle = filterModule === 'all' 
            ? 'Semua Modul (Ujian Menyeluruh)' 
            : (TUTORIAL_DATA.find(m => m.id === filterModule)?.title || 'Modul Tertentu');
        headerInfo.innerHTML = `
            <div class="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h2 class="text-2xl font-bold text-white flex items-center gap-2">
                        <svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M8 4h8a2 2 0 0 1 2 2v15H6V6a2 2 0 0 1 2-2Zm2-2h4v4h-4zM9 12h6m-6 4h6"></path></svg>
                        Latihan Soal & Anti-Menyontek
                    </h2>
                    <p class="text-slate-400 text-sm mt-1">
                        Cakupan: <strong class="text-emerald-400">${filterTitle}</strong> (${questions.length} Soal Aktif)
                    </p>
                </div>
                <div class="flex items-center gap-2 text-xs">
                    <span class="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300">
                        Terjawab: <strong class="text-white">${answeredCount} / ${questions.length}</strong>
                    </span>
                </div>
            </div>
        `;
    }

    // Tampilkan hasil skor jika sudah disubmit
    if (scoreArea) {
        if (isSubmitted) {
            const { correct, total, percentage } = AppState.quiz.score;
            const isPassed = percentage >= 70;
            scoreArea.classList.remove('hidden');
            scoreArea.innerHTML = `
                <div class="p-6 rounded-2xl border ${isPassed ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300' : 'bg-rose-950/40 border-rose-500/50 text-rose-300'} mb-8">
                    <div class="flex flex-wrap items-center justify-between gap-4">
                        <div class="flex items-center gap-4">
                            <div class="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-extrabold ${isPassed ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'}">
                                ${percentage}%
                            </div>
                            <div>
                                <h3 class="text-xl font-bold text-white">
                                    ${isPassed ? 'Selamat! Anda lulus kuis.' : 'Masih perlu latihan lagi.'}
                                </h3>
                                <p class="text-sm mt-0.5 opacity-90">
                                    Jawaban Benar: <strong>${correct}</strong> dari <strong>${total}</strong> soal. Passing grade: 70%.
                                </p>
                            </div>
                        </div>
                        <div class="flex gap-2">
                            <button class="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-md transition-all flex items-center gap-2"
                                onclick="resetAndShuffleQuiz()">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M16 3h5v5m-1-4-5 5M4 7h3c5 0 5 10 10 10h4m-5-4 5 4-5 4M4 17h3c1.2 0 2.1-.8 2.9-1.9"></path></svg>
                                Acak Ulang & Coba Lagi
                            </button>
                        </div>
                    </div>
                </div>
            `;
        } else {
            scoreArea.classList.add('hidden');
        }
    }

    // Render daftar soal
    if (questions.length === 0) {
        container.innerHTML = `
            <div class="p-12 text-center text-slate-400 bg-slate-900/50 rounded-2xl border border-slate-800">
                <p class="text-lg">Tidak ada soal yang tersedia untuk filter ini.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];

    questions.forEach((q, idx) => {
        const selectedVal = userAnswers[q.id];
        const isAnswered = selectedVal !== undefined;
        const isCorrect = isAnswered && selectedVal === q.correctOption;

        const qCard = document.createElement('div');
        qCard.className = `p-6 lg:p-7 rounded-2xl border transition-all ${
            isSubmitted 
                ? (isCorrect ? 'bg-emerald-950/20 border-emerald-800/60' : 'bg-rose-950/20 border-rose-800/60') 
                : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
        }`;

        let optionsHtml = '<div class="space-y-2.5 mt-4">';
        q.options.forEach((opt, optIdx) => {
            const letter = letters[optIdx] || '-';
            const isChecked = selectedVal === opt;
            let optStyle = 'bg-slate-950/80 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700';

            if (isSubmitted) {
                if (opt === q.correctOption) {
                    optStyle = 'bg-emerald-900/40 border-emerald-500 text-emerald-200 font-semibold';
                } else if (isChecked && opt !== q.correctOption) {
                    optStyle = 'bg-rose-900/40 border-rose-500 text-rose-200 line-through';
                }
            } else if (isChecked) {
                optStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-300 font-medium shadow-inner';
            }

            optionsHtml += `
                <button type="button" 
                    ${isSubmitted ? 'disabled' : ''}
                    class="w-full text-left p-3.5 rounded-xl border text-sm flex items-start gap-3 transition-all ${optStyle}"
                    onclick="selectQuizOption('${q.id}', \`${escapeForAttr(opt)}\`)">
                    <span class="w-6 h-6 rounded-lg bg-slate-800 border border-slate-700 flex-shrink-0 flex items-center justify-center font-mono font-bold text-xs ${
                        isChecked ? 'bg-emerald-600 text-white border-emerald-500' : 'text-slate-400'
                    }">
                        ${letter}
                    </span>
                    <span class="leading-relaxed flex-grow">${escapeHtml(opt)}</span>
                    ${isSubmitted && opt === q.correctOption ? '<span class="text-emerald-400 font-bold ml-2">✓ Jawaban Benar</span>' : ''}
                </button>
            `;
        });
        optionsHtml += '</div>';

        // Penjelasan pembahasan jika sudah disubmit
        let explanationHtml = '';
        if (isSubmitted) {
            explanationHtml = `
                <div class="mt-5 p-4 rounded-xl ${isCorrect ? 'bg-emerald-950/40 border border-emerald-800/50' : 'bg-slate-950 border border-slate-800'} text-xs leading-relaxed">
                    <div class="font-bold text-slate-200 mb-1 flex items-center gap-1.5">
                        <span class="text-amber-400" aria-hidden="true">i</span> Pembahasan Jawaban:
                    </div>
                    <div class="text-slate-300">${q.explanation}</div>
                </div>
            `;
        }

        qCard.innerHTML = `
            <div class="flex items-center justify-between gap-3 mb-2">
                <div class="flex items-center gap-2 text-xs">
                    <span class="font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                        Soal ${idx + 1}
                    </span>
                    <span class="text-slate-400 bg-slate-800 px-2 py-1 rounded-md">
                        ${q.topic}
                    </span>
                    <span class="text-slate-400 bg-slate-800 px-2 py-1 rounded-md">
                        ${q.difficulty}
                    </span>
                </div>
                ${isSubmitted ? `
                    <span class="text-xs font-bold px-2.5 py-1 rounded-md ${isCorrect ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}">
                        ${isCorrect ? '✓ Benar' : '✕ Salah'}
                    </span>
                ` : ''}
            </div>

            <h4 class="text-base font-semibold text-white mt-2 leading-relaxed">
                ${escapeHtml(q.question)}
            </h4>

            ${q.code ? `
                <div class="my-3 rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
                    <pre class="p-3.5 text-xs text-emerald-300 font-mono overflow-x-auto"><code>${escapeHtml(q.code)}</code></pre>
                </div>
            ` : ''}

            ${optionsHtml}
            ${explanationHtml}
        `;

        container.appendChild(qCard);
    });

    // Render tombol submit / evaluasi di bagian paling bawah
    const submitContainer = document.getElementById('quiz-submit-action');
    if (submitContainer) {
        if (!isSubmitted) {
            submitContainer.innerHTML = `
                <div class="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex flex-wrap items-center justify-between gap-4 mt-8">
                    <div>
                        <div class="text-white font-bold text-base">Selesai Menjawab?</div>
                        <div class="text-slate-400 text-xs mt-0.5">
                            Pastikan Anda sudah memeriksa seluruh jawaban sebelum mengunci hasil.
                        </div>
                    </div>
                    <div class="flex gap-3">
                        <button class="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-medium transition-all"
                            onclick="resetQuizAnswers()">
                            Bersihkan Jawaban
                        </button>
                        <button class="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-950 transition-all"
                            onclick="submitQuizAnswers()">
                            Kumpulkan & Evaluasi Nilai
                        </button>
                    </div>
                </div>
            `;
        } else {
            submitContainer.innerHTML = '';
        }
    }
}

// Memilih jawaban opsi
function selectQuizOption(questionId, optionText) {
    if (AppState.quiz.isSubmitted) return;
    AppState.quiz.userAnswers[questionId] = optionText;
    renderQuizView();
}

// Fitur Anti-Menyontek: Acak Soal & Acak Opsi Pilihan Jawaban
function resetAndShuffleQuiz() {
    loadQuestions(true); // true = shuffle questions & options
    showToast("Soal dan pilihan jawaban berhasil diacak ulang! Posisi jawaban telah berubah total.", "success");
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Fitur Reset Jawaban Saja
function resetQuizAnswers() {
    AppState.quiz.userAnswers = {};
    AppState.quiz.isSubmitted = false;
    renderQuizView();
    showToast("Jawaban telah dibersihkan kembali kosong.", "info");
}

// Ganti Filter Modul Kuis
function changeQuizFilter(moduleId) {
    AppState.quiz.filterModule = moduleId;
    loadQuestions(true);
}

// Mulai Kuis khusus untuk Modul tertentu dari halaman tutorial
function startQuizForModule(moduleId) {
    AppState.quiz.filterModule = moduleId;
    const filterSelect = document.getElementById('quiz-filter-select');
    if (filterSelect) filterSelect.value = moduleId;
    loadQuestions(true);
    switchTab('quiz');
}

// Evaluasi & Kumpulkan Jawaban
function submitQuizAnswers() {
    const { questions, userAnswers } = AppState.quiz;
    const total = questions.length;
    let correct = 0;

    questions.forEach(q => {
        if (userAnswers[q.id] === q.correctOption) {
            correct++;
        }
    });

    const percentage = Math.round((correct / total) * 100);
    AppState.quiz.score = { correct, total, percentage };
    AppState.quiz.isSubmitted = true;

    if (percentage >= 70) {
        triggerConfetti();
        showToast(`Hebat! Anda memperoleh skor ${percentage}% (${correct}/${total})!`, "success");
    } else {
        showToast(`Skor Anda: ${percentage}%. Pelajari kembali pembahasannya dan coba lagi!`, "warning");
    }

    renderQuizView();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ==========================================================================
   BAGIAN 3: GENERATOR SOAL DINAMIS (ANTI-NYONTEK TOTAL 100%)
   ========================================================================== */

function initDynamicQuiz() {
    // Dipanggil saat pertama kali atau tab dibuka
}

function generateNewDynamicQuestion() {
    const q = generateSingleDynamicQuestion();
    AppState.dynamicQuiz.currentQuestion = q;
    AppState.dynamicQuiz.selectedOption = null;
    AppState.dynamicQuiz.isAnswered = false;
    renderDynamicQuizView();
    showToast("Soal baru dengan angka acak telah digenerate!", "info");
}

function renderDynamicQuizView() {
    const container = document.getElementById('dynamic-quiz-card');
    if (!container) return;

    const q = AppState.dynamicQuiz.currentQuestion;
    if (!q) return;

    const { selectedOption, isAnswered } = AppState.dynamicQuiz;
    const letters = ['A', 'B', 'C', 'D'];

    let optionsHtml = '<div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-5">';
    q.options.forEach((opt, idx) => {
        let optStyle = "bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700";
        if (isAnswered) {
            if (idx === q.correctIndex) {
                optStyle = "bg-emerald-950/60 border-emerald-500 text-emerald-300 font-bold";
            } else if (idx === selectedOption) {
                optStyle = "bg-rose-950/60 border-rose-500 text-rose-300 line-through";
            }
        } else if (idx === selectedOption) {
            optStyle = "bg-emerald-950/80 border-emerald-500 text-emerald-300 font-bold";
        }

        optionsHtml += `
            <button type="button" 
                ${isAnswered ? 'disabled' : ''}
                class="p-4 rounded-xl border text-sm font-mono flex items-center justify-between transition-all ${optStyle}"
                onclick="selectDynamicOption(${idx})">
                <div class="flex items-center gap-3">
                    <span class="w-6 h-6 rounded-md bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold font-sans">
                        ${letters[idx]}
                    </span>
                    <span class="text-base">${escapeHtml(opt)}</span>
                </div>
                ${isAnswered && idx === q.correctIndex ? '<span class="text-emerald-400 font-sans text-xs">✓ Benar</span>' : ''}
            </button>
        `;
    });
    optionsHtml += '</div>';

    let explanationHtml = '';
    if (isAnswered) {
        const isUserCorrect = selectedOption === q.correctIndex;
        explanationHtml = `
            <div class="mt-6 p-5 rounded-2xl border ${isUserCorrect ? 'bg-emerald-950/30 border-emerald-800 text-emerald-200' : 'bg-slate-950 border-slate-800 text-slate-300'}">
                <div class="flex items-center gap-2 font-bold mb-2 ${isUserCorrect ? 'text-emerald-400' : 'text-amber-400'}">
                    <span>${isUserCorrect ? 'Tepat sekali!' : 'Pembahasan perhitungan:'}</span>
                </div>
                <div class="text-sm leading-relaxed">${q.explanation}</div>
                <div class="mt-4 pt-4 border-t border-slate-800/80 flex justify-end">
                    <button class="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-md transition-all flex items-center gap-2"
                        onclick="generateNewDynamicQuestion()">
                        Buat Soal Acak Baru Selanjutnya →
                    </button>
                </div>
            </div>
        `;
    }

    container.innerHTML = `
        <div class="p-6 lg:p-8 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl">
            <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div class="flex items-center gap-2 text-xs">
                    <span class="px-3 py-1 rounded-full font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                        Soal Prosedural Acak
                    </span>
                    <span class="px-3 py-1 rounded-full bg-slate-800 text-slate-300">
                        Topik: ${q.category}
                    </span>
                </div>
                <button class="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-xl border border-slate-700 transition-all flex items-center gap-1.5"
                    onclick="generateNewDynamicQuestion()">
                    Ganti Angka / Acak Baru
                </button>
            </div>

            <h3 class="text-xl font-bold text-white mb-2">
                ${escapeHtml(q.question)}
            </h3>

            <div class="my-4 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
                <div class="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
                    <span class="flex items-center gap-2"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="m8 8-4 4 4 4m8-8 4 4-4 4m-3-11-2 14"></path></svg>Python Snippet (Variabel Acak)</span>
                    <button class="hover:text-white" data-code="${encodeURIComponent(q.code)}" onclick="sendSnippetToPlayground(this.dataset.code)">
                        <svg class="w-3.5 h-3.5 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5v14l11-7L8 5Z"></path></svg>
                        Uji di Playground
                    </button>
                </div>
                <pre class="p-4 text-emerald-400 font-mono text-sm leading-relaxed overflow-x-auto"><code>${escapeHtml(q.code)}</code></pre>
            </div>

            ${optionsHtml}

            ${!isAnswered ? `
                <div class="mt-6 flex justify-end">
                    <button class="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl text-sm font-bold shadow-lg transition-all"
                        ${selectedOption === null ? 'disabled' : ''}
                        onclick="checkDynamicAnswer()">
                        Periksa Jawaban
                    </button>
                </div>
            ` : ''}

            ${explanationHtml}
        </div>
    `;
}

function selectDynamicOption(idx) {
    if (AppState.dynamicQuiz.isAnswered) return;
    AppState.dynamicQuiz.selectedOption = idx;
    renderDynamicQuizView();
}

function checkDynamicAnswer() {
    const q = AppState.dynamicQuiz.currentQuestion;
    const selected = AppState.dynamicQuiz.selectedOption;
    if (selected === null) return;

    AppState.dynamicQuiz.isAnswered = true;
    const isCorrect = selected === q.correctIndex;

    const stats = AppState.dynamicQuiz.stats;
    stats.totalAnswered++;
    if (isCorrect) {
        stats.correct++;
        triggerConfetti();
        showToast("Benar! Logika perhitungan Anda tepat!", "success");
    } else {
        showToast("Kurang tepat. Cek cara perhitungannya di bawah!", "error");
    }
    saveToStorage('dyn_stats', stats);

    renderDynamicQuizView();
}

/* ==========================================================================
   BAGIAN 4: TANTANGAN KODING (INTERACTIVE CODE CHALLENGES)
   ========================================================================== */

function initCodeChallenges() {
    const container = document.getElementById('challenges-list-container');
    if (!container) return;

    container.innerHTML = '';
    CODE_CHALLENGES.forEach((ch, idx) => {
        const card = document.createElement('div');
        card.className = "p-6 lg:p-8 bg-slate-900 border border-slate-800 rounded-3xl mb-8";

        let testCasesListHtml = '';
        ch.testCases.forEach(tc => {
            testCasesListHtml += `
                <li class="flex items-center justify-between text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                    <span class="text-slate-300">Input: <code>${escapeHtml(tc.call)}</code></span>
                    <span class="text-emerald-400 font-bold">Harus: <code>${escapeHtml(tc.expected)}</code></span>
                </li>
            `;
        });

        card.innerHTML = `
            <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div class="flex items-center gap-2">
                    <span class="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        ${ch.difficulty}
                    </span>
                    <span class="px-3 py-1 rounded-full text-xs bg-slate-800 text-slate-300">
                        ${ch.category}
                    </span>
                </div>
                <button class="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1"
                    onclick="alert('Petunjuk: ${escapeHtml(ch.hint)}')">
                    Butuh Petunjuk?
                </button>
            </div>

            <h3 class="text-xl font-bold text-white mb-2">
                ${ch.title}
            </h3>

            <div class="text-slate-300 text-sm leading-relaxed mb-4">
                ${ch.description}
            </div>

            <div class="mb-4">
                <h5 class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Test Cases yang Harus Lulus:</h5>
                <ul class="space-y-1.5">${testCasesListHtml}</ul>
            </div>

            <div class="rounded-2xl overflow-hidden border border-slate-700 bg-slate-950">
                <div class="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs text-slate-400">
                    <span class="font-mono">Editor Solusi Python</span>
                    <button class="text-xs text-slate-400 hover:text-white" onclick="document.getElementById('challenge-editor-${ch.id}').value = \`${escapeForAttr(ch.starterCode)}\`">
                        ↺ Reset Kode
                    </button>
                </div>
                <textarea id="challenge-editor-${ch.id}" 
                    class="w-full h-44 p-4 bg-slate-950 text-emerald-300 font-mono text-sm leading-relaxed outline-none resize-y border-none"
                    spellcheck="false">${escapeHtml(ch.starterCode)}</textarea>
            </div>

            <div class="mt-4 flex flex-wrap items-center justify-between gap-3">
                <button id="btn-test-challenge-${ch.id}"
                    class="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-md transition-all flex items-center gap-2"
                    onclick="runChallengeTest('${ch.id}')">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5v14l11-7L8 5Z"></path></svg>
                    Jalankan & Uji Solusi
                </button>
            </div>

            <div id="challenge-results-${ch.id}" class="mt-3"></div>
        `;

        container.appendChild(card);

        // Setup tab key handler pada textarea
        setTimeout(() => {
            setupTabKeyHandler(document.getElementById(`challenge-editor-${ch.id}`));
        }, 50);
    });
}

/* ==========================================================================
   BAGIAN 5: PLAYGROUND
   ========================================================================== */

function initPlayground() {
    const editor = document.getElementById('playground-editor');
    if (editor) {
        setupTabKeyHandler(editor);
        const searchParams = new URLSearchParams(window.location.search);
        const transferredCode = searchParams.get('playgroundCode');

        if (transferredCode !== null) {
            editor.value = transferredCode;

            const cleanUrl = new URL(window.location.href);
            cleanUrl.searchParams.delete('playgroundCode');
            window.history.replaceState(null, '', `${cleanUrl.pathname}${cleanUrl.search}${cleanUrl.hash}`);
        } else if (!editor.value.trim()) {
            editor.value = SAMPLE_SNIPPETS.hello;
        }

        editor.addEventListener('keydown', (event) => {
            if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
                event.preventDefault();
                runPlaygroundCode();
            }
        });
    }
}

function loadSampleSnippet(snippetKey) {
    const editor = document.getElementById('playground-editor');
    if (editor && SAMPLE_SNIPPETS[snippetKey]) {
        editor.value = SAMPLE_SNIPPETS[snippetKey];
        showToast("Snippet berhasil dimuat!", "info");
    }
}

function clearPlaygroundOutput() {
    const outputElem = document.getElementById('playground-output');
    if (outputElem) {
        outputElem.innerHTML = `<span class="text-slate-500 italic font-mono">[Konsol siap. Klik 'Jalankan' untuk melihat hasil]</span>`;
    }
}

/* ==========================================================================
   BAGIAN 6: PENCARIAN CEPAT (SEARCH MODAL CTRL+K)
   ========================================================================== */

function initSearchModal() {
    window.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            toggleSearchModal(true);
        }
        if (e.key === 'Escape') {
            toggleSearchModal(false);
        }
    });

    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            performSearch(e.target.value);
        });
    }
}

function toggleSearchModal(show) {
    const modal = document.getElementById('search-modal');
    const input = document.getElementById('search-input');
    if (!modal) return;

    if (show) {
        modal.classList.remove('hidden');
        if (input) {
            input.value = '';
            input.focus();
            performSearch('');
        }
    } else {
        modal.classList.add('hidden');
    }
}

function performSearch(query) {
    const resultsContainer = document.getElementById('search-results');
    if (!resultsContainer) return;

    const q = query.trim().toLowerCase();
    if (!q) {
        resultsContainer.innerHTML = `<div class="p-4 text-center text-slate-500 text-sm">Ketik topik materi yang ingin dicari (misal: "list", "fungsi", "loop", "oop", "try")...</div>`;
        return;
    }

    const matched = [];
    TUTORIAL_DATA.forEach(mod => {
        let matchModule = mod.title.toLowerCase().includes(q) || mod.description.toLowerCase().includes(q);
        if (matchModule) {
            matched.push({
                type: 'Modul',
                moduleId: mod.id,
                title: mod.title,
                snippet: mod.description
            });
        }

        mod.sections.forEach(sec => {
            if (sec.title.toLowerCase().includes(q) || sec.content.toLowerCase().includes(q)) {
                matched.push({
                    type: 'Materi',
                    moduleId: mod.id,
                    title: `${mod.title} → ${sec.title}`,
                    snippet: sec.title
                });
            }
        });
    });

    if (matched.length === 0) {
        resultsContainer.innerHTML = `<div class="p-6 text-center text-slate-400 text-sm">Tidak ditemukan hasil untuk "<strong>${escapeHtml(query)}</strong>".</div>`;
        return;
    }

    resultsContainer.innerHTML = '';
    matched.slice(0, 8).forEach(item => {
        const itemBtn = document.createElement('button');
        itemBtn.className = "w-full text-left p-3.5 rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-between group border-b border-slate-800/60 last:border-none";
        itemBtn.onclick = () => {
            toggleSearchModal(false);
            navigateToModule(item.moduleId);
            switchTab('tutorial');
        };
        itemBtn.innerHTML = `
            <div>
                <span class="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 mr-2">${item.type}</span>
                <span class="text-sm font-medium text-white group-hover:text-emerald-300">${escapeHtml(item.title)}</span>
                <p class="text-xs text-slate-400 mt-1 line-clamp-1">${escapeHtml(item.snippet)}</p>
            </div>
            <span class="text-slate-500 group-hover:text-white text-sm">→</span>
        `;
        resultsContainer.appendChild(itemBtn);
    });
}

function updateGlobalStats() {
    const progressElem = document.getElementById('global-progress-bar');
    const textElem = document.getElementById('global-progress-text');
    const mobileProgressElem = document.getElementById('mobile-global-progress-bar');
    const mobileTextElem = document.getElementById('mobile-global-progress-text');

    const totalMods = TUTORIAL_DATA.length;
    const completedCount = AppState.completedModules.size;
    const percent = Math.round((completedCount / totalMods) * 100);
    const progressText = `${percent}% Selesai (${completedCount}/${totalMods} Bab)`;

    if (progressElem) progressElem.style.width = `${percent}%`;
    if (textElem) textElem.innerText = progressText;
    if (mobileProgressElem) mobileProgressElem.style.width = `${percent}%`;
    if (mobileTextElem) mobileTextElem.innerText = progressText;
}

function openMobileSearch() {
    const drawer = document.getElementById('sidebar-drawer');
    if (drawer && !drawer.classList.contains('-translate-x-full')) {
        toggleSidebarDrawer();
    }
    toggleSearchModal(true);
}

// Mobile sidebar toggle
function toggleSidebarDrawer() {
    const drawer = document.getElementById('sidebar-drawer');
    const backdrop = document.getElementById('sidebar-backdrop');
    if (!drawer) return;

    const isOpen = !drawer.classList.contains('-translate-x-full');
    if (isOpen) {
        drawer.classList.add('-translate-x-full');
        if (backdrop) backdrop.classList.add('hidden');
    } else {
        drawer.classList.remove('-translate-x-full');
        if (backdrop) backdrop.classList.remove('hidden');
    }
}
