from http.server import BaseHTTPRequestHandler, HTTPServer
import os
import re
import sys
from urllib.parse import urlparse
import importlib.resources

MONTARA_TARGET = "montara_target"
DISABLE_ANALYTICS = "DCC_DISABLE_ANALYTICS"

# Read a data file from the package
with importlib.resources.open_text("dbt_command_center", "index.html") as data_file:
    html_content = data_file.read()


def is_analytics_disabled():
    return os.environ.get(DISABLE_ANALYTICS, "false") == "true"


class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        # content of the html file from the web_application/index.h
        parsed_path = urlparse(self.path)

        file_content = html_content
        if parsed_path.path == "/" and is_analytics_disabled():
            print("Analytics is disabled")
            file_content = re.sub(
                r"<!--START-ANONYMOUS_TRACKING-->(.*?)<!--END-ANONYMOUS_TRACKING-->",
                "<script>console.log('Anonymous tracking is disabled')</script>",
                file_content,
                flags=re.DOTALL,
            )

        file_content = file_content.encode()

        # if parsed file path is not empty
        if parsed_path.path != "/" and parsed_path.path != "":
            file_path = parsed_path.path[1:]
            if os.path.exists(file_path):
                with open(file_path, "rb") as file:
                    file_content = file.read()
            else:
                self.send_response(404)
                self.end_headers()
                return
        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.end_headers()
        self.wfile.write(file_content)


def run_web_server(
    server_class=HTTPServer, handler_class=SimpleHTTPRequestHandler, port=8000
):
    server_address = ("", port)

    # Redirect standard output and error to a null device or a log file
    null_device = open(os.devnull, "w")
    old_stdout = sys.stdout
    old_stderr = sys.stderr
    sys.stdout = null_device
    sys.stderr = null_device

    try:
        httpd = server_class(server_address, handler_class)
        print(f"Server running on port {port}")
        print("Open http://localhost:8000 in your browser")
        httpd.serve_forever()
    finally:
        # Restore standard output and error
        sys.stdout = old_stdout
        sys.stderr = old_stderr
        null_device.close()
