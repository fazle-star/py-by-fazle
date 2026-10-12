"""WSGI static-file application for PythonAnywhere."""

from http import HTTPStatus
import mimetypes
import os

PROJECT_DIR = os.path.realpath(os.path.dirname(__file__))
SECURITY_HEADERS = [
    ("X-Content-Type-Options", "nosniff"),
    ("Referrer-Policy", "strict-origin-when-cross-origin"),
    ("X-Frame-Options", "DENY"),
    ("Permissions-Policy", "camera=(), microphone=(), geolocation=()"),
    (
        "Content-Security-Policy",
        "default-src 'self'; "
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval' "
        "https://cdn.tailwindcss.com https://cdn.jsdelivr.net; "
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; "
        "font-src 'self' https://fonts.gstatic.com data:; "
        "connect-src 'self' https://cdn.jsdelivr.net; "
        "worker-src 'self' blob:; "
        "object-src 'none'; base-uri 'self'; frame-ancestors 'none'",
    ),
]


def application(environ, start_response):
    method = environ.get("REQUEST_METHOD", "GET")
    if method not in ("GET", "HEAD"):
        return respond(start_response, HTTPStatus.METHOD_NOT_ALLOWED, b"Method not allowed.")

    relative_path = environ.get("PATH_INFO", "/").lstrip("/")
    if not relative_path:
        relative_path = "index.html"

    if (
        relative_path != "index.html"
        and not relative_path.startswith(("css/", "js/"))
    ) or any(part.startswith(".") or part == ".." for part in relative_path.split("/")):
        return respond(start_response, HTTPStatus.NOT_FOUND, b"Not found.")

    try:
        file_path = os.path.realpath(os.path.join(PROJECT_DIR, relative_path))
        if os.path.commonpath((PROJECT_DIR, file_path)) != PROJECT_DIR or not os.path.isfile(file_path):
            return respond(start_response, HTTPStatus.NOT_FOUND, b"Not found.")
    except (OSError, ValueError):
        return respond(start_response, HTTPStatus.NOT_FOUND, b"Not found.")

    try:
        with open(file_path, "rb") as file:
            content = file.read()
    except OSError:
        return respond(start_response, HTTPStatus.INTERNAL_SERVER_ERROR, b"Could not read requested file.")

    content_type = mimetypes.guess_type(file_path)[0] or "application/octet-stream"
    if file_path.endswith(".js"):
        content_type = "text/javascript; charset=utf-8"
    elif content_type.startswith("text/") or content_type in ("application/javascript", "application/json"):
        content_type += "; charset=utf-8"

    headers = [
        ("Content-Type", content_type),
        ("Content-Length", str(len(content))),
        ("Cache-Control", "no-cache, no-store, must-revalidate"),
    ] + SECURITY_HEADERS
    start_response(f"{HTTPStatus.OK.value} {HTTPStatus.OK.phrase}", headers)
    return [b"" if method == "HEAD" else content]


def respond(start_response, status, content):
    headers = [
        ("Content-Type", "text/plain; charset=utf-8"),
        ("Content-Length", str(len(content))),
        ("Cache-Control", "no-store"),
    ] + SECURITY_HEADERS
    start_response(f"{status.value} {status.phrase}", headers)
    return [content]
