#!/usr/bin/env python3
"""Static web server for local development and Render deployment."""

import http.server
import os
import socketserver
import sys
import threading
import time
import webbrowser

PORT = int(os.environ.get("PORT", "8000"))
HOST = os.environ.get("HOST", "0.0.0.0" if "PORT" in os.environ else "127.0.0.1")
PROJECT_DIR = os.path.dirname(os.path.abspath(__file__))


class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("Referrer-Policy", "strict-origin-when-cross-origin")
        self.send_header("X-Frame-Options", "DENY")
        self.send_header("Permissions-Policy", "camera=(), microphone=(), geolocation=()")
        self.send_header(
            "Content-Security-Policy",
            "default-src 'self'; "
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval' "
            "https://cdn.tailwindcss.com https://cdn.jsdelivr.net; "
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; "
            "font-src 'self' https://fonts.gstatic.com data:; "
            "connect-src 'self' https://cdn.jsdelivr.net; "
            "worker-src 'self' blob:; "
            "object-src 'none'; base-uri 'self'; frame-ancestors 'none'",
        )
        super().end_headers()


class ThreadingHTTPServer(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True


def open_browser():
    time.sleep(1.2)
    try:
        webbrowser.open(f"http://127.0.0.1:{PORT}")
    except OSError as error:
        print(f"Browser tidak dapat dibuka otomatis: {error}", file=sys.stderr)


def run_server():
    os.chdir(PROJECT_DIR)
    with ThreadingHTTPServer((HOST, PORT), CustomHTTPRequestHandler) as httpd:
        print(f"PythonVerse berjalan di http://{HOST}:{PORT}")
        print("Tekan Ctrl+C untuk menghentikan server.")

        if HOST == "127.0.0.1":
            threading.Thread(target=open_browser, daemon=True).start()

        httpd.serve_forever()


if __name__ == "__main__":
    try:
        run_server()
    except KeyboardInterrupt:
        print("\nServer dihentikan.")
