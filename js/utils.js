/**
 * Utilitas & Fungsi Helper untuk Python Learning Platform
 */

// Fisher-Yates Shuffle untuk mengacak array secara murni (mengembalikan array baru)
function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// LocalStorage Helper
function saveToStorage(key, value) {
    try {
        localStorage.setItem(`py_hub_${key}`, JSON.stringify(value));
    } catch (e) {
        console.error("Gagal menyimpan ke LocalStorage:", e);
    }
}

function getFromStorage(key, defaultValue = null) {
    try {
        const item = localStorage.getItem(`py_hub_${key}`);
        return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
        console.error("Gagal membaca dari LocalStorage:", e);
        return defaultValue;
    }
}

// Toast Notification
function showToast(message, type = 'info', duration = 3500) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    const bgColors = {
        success: 'bg-emerald-600 text-white border-emerald-500',
        error: 'bg-rose-600 text-white border-rose-500',
        warning: 'bg-amber-600 text-white border-amber-500',
        info: 'bg-indigo-600 text-white border-indigo-500'
    };

    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ'
    };

    toast.className = `flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border text-sm font-medium transition-all duration-300 transform translate-y-4 opacity-0 ${bgColors[type] || bgColors.info}`;
    toast.innerHTML = `
        <span class="font-bold text-base flex-shrink-0">${icons[type] || 'ℹ'}</span>
        <span class="flex-grow">${escapeHtml(message)}</span>
        <button class="opacity-70 hover:opacity-100 text-lg leading-none" onclick="this.parentElement.remove()">×</button>
    `;

    container.appendChild(toast);

    // Animasi masuk
    requestAnimationFrame(() => {
        toast.classList.remove('translate-y-4', 'opacity-0');
        toast.classList.add('translate-y-0', 'opacity-100');
    });

    // Auto hapus
    setTimeout(() => {
        toast.classList.add('translate-y-4', 'opacity-0');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// Escape HTML untuk mencegah XSS
function escapeHtml(text) {
    if (typeof text !== 'string') return text;
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// Salin teks ke Clipboard
async function copyToClipboard(text, successMsg = 'Kode berhasil disalin ke clipboard!') {
    try {
        await navigator.clipboard.writeText(text);
        showToast(successMsg, 'success');
    } catch (err) {
        // Fallback jika navigator.clipboard tidak diizinkan
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast(successMsg, 'success');
    }
}

const PYTHON_WORKER_URL = 'js/python-worker.js';
const PYTHON_EXECUTION_TIMEOUT_MS = 6000;
const PYTHON_STARTUP_TIMEOUT_MS = 120000;
let pythonWorker = null;
let pythonWorkerReady = null;
let pythonWorkerRequestId = 0;
let pythonExecutionQueue = Promise.resolve();
const pendingPythonRuns = new Map();

function getPythonWorker() {
    if (!pythonWorker) {
        pythonWorker = new Worker(PYTHON_WORKER_URL);
        pythonWorkerReady = new Promise((resolve, reject) => {
            const startupTimeout = setTimeout(() => {
                reject(new Error('Waktu persiapan Python habis. Periksa koneksi internet lalu coba lagi.'));
                resetPythonWorker();
            }, PYTHON_STARTUP_TIMEOUT_MS);

            pythonWorker.addEventListener('message', (event) => {
                if (event.data.type === 'ready') {
                    clearTimeout(startupTimeout);
                    resolve();
                    return;
                }

                if (event.data.type === 'startup-error') {
                    clearTimeout(startupTimeout);
                    reject(new Error(event.data.error));
                    resetPythonWorker();
                }
            });
            pythonWorker.addEventListener('error', (event) => {
                clearTimeout(startupTimeout);
                reject(new Error(event.message || 'Worker Python gagal dimuat.'));
                resetPythonWorker();
            }, { once: true });
        });
    }
    return pythonWorkerReady;
}

function resetPythonWorker() {
    if (pythonWorker) pythonWorker.terminate();
    pythonWorker = null;
    pythonWorkerReady = null;
}

function runPythonInWorker(code, persistent) {
    return getPythonWorker().then(() => new Promise((resolve) => {
        const worker = pythonWorker;
        const id = ++pythonWorkerRequestId;
        const timeout = setTimeout(() => {
            pendingPythonRuns.delete(id);
            resetPythonWorker();
            resolve({
                success: false,
                error: 'Batas waktu eksekusi terlampaui (6 detik). Kemungkinan ada perulangan tanpa henti.',
                stdout: '',
                stderr: 'TimeoutExpired',
                returncode: -1
            });
        }, PYTHON_EXECUTION_TIMEOUT_MS);

        pendingPythonRuns.set(id, { resolve, timeout });
        worker.addEventListener('message', function handleResult(event) {
            if (event.data.type !== 'result' || event.data.id !== id) return;
            worker.removeEventListener('message', handleResult);
            const pending = pendingPythonRuns.get(id);
            if (!pending) return;
            clearTimeout(pending.timeout);
            pendingPythonRuns.delete(id);
            resolve(event.data.result);
        });
        worker.postMessage({ type: 'run', id, code, persistent });
    })).catch((error) => ({
        success: false,
        error: `Python tidak dapat dimulai: ${error.message}`,
        stdout: '',
        stderr: 'PythonWorkerUnavailable',
        returncode: -1
    }));
}

// Python dieksekusi dalam Web Worker/WASM di browser, bukan di server publik.
function executePythonCode(code, { persistent = false } = {}) {
    const execution = pythonExecutionQueue.then(() => runPythonInWorker(code, persistent));
    pythonExecutionQueue = execution.then(() => undefined, () => undefined);
    return execution;
}

// Confetti effect jika nilai sempurna / lulus ujian
function triggerConfetti() {
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
}
