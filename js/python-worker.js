importScripts('https://cdn.jsdelivr.net/pyodide/v0.27.7/full/pyodide.js');

const MAX_OUTPUT_CHARS = 100000;
let pyodide;

async function initializePython() {
    pyodide = await loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.27.7/full/'
    });
    self.postMessage({ type: 'ready' });
}

initializePython().catch((error) => {
    self.postMessage({
        type: 'startup-error',
        error: error.message || String(error)
    });
});

self.addEventListener('message', async (event) => {
    const { type, id, code, persistent } = event.data;
    if (type !== 'run' || !pyodide) return;

    let stdout = '';
    let stderr = '';
    let outputLength = 0;
    let truncated = false;
    const appendOutput = (stream, text) => {
        const remaining = MAX_OUTPUT_CHARS - outputLength;
        if (remaining <= 0) {
            truncated = true;
            return;
        }

        const part = text.slice(0, remaining);
        if (stream === 'stdout') stdout += part;
        else stderr += part;
        outputLength += part.length;
        if (part.length < text.length) truncated = true;
    };

    pyodide.setStdout({ batched: (text) => appendOutput('stdout', text) });
    pyodide.setStderr({ batched: (text) => appendOutput('stderr', text) });

    const startedAt = performance.now();
    let namespace;
    try {
        const options = {};
        if (persistent) {
            options.globals = pyodide.globals;
        } else {
            namespace = pyodide.runPython('dict()');
            options.globals = namespace;
            options.locals = namespace;
        }

        await pyodide.runPythonAsync(code, options);
        if (truncated) stdout += '\n[Output dipotong karena melebihi batas 100 KB.]';

        self.postMessage({
            type: 'result',
            id,
            result: {
                success: true,
                stdout,
                stderr,
                returncode: 0,
                execution_time: Number(((performance.now() - startedAt) / 1000).toFixed(3))
            }
        });
    } catch (error) {
        self.postMessage({
            type: 'result',
            id,
            result: {
                success: false,
                error: String(error),
                stdout,
                stderr,
                returncode: 1
            }
        });
    } finally {
        if (namespace) namespace.destroy();
    }
});
