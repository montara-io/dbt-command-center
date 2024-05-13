from http.server import BaseHTTPRequestHandler, HTTPServer
import subprocess
import webbrowser
import jsonlines
import os
from urllib.parse import urlparse
import threading


class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        # content of the html file from the web_application/index.h
        with open("web_application/public/index.html", "r") as file:
            html_content = file.read()
        parsed_path = urlparse(self.path)
        print(parsed_path.path)

        file_content = html_content.encode()
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


def run(server_class=HTTPServer, handler_class=SimpleHTTPRequestHandler, port=8000):
    server_address = ("", port)
    httpd = server_class(server_address, handler_class)
    print(f"Server running on port {port}")
    httpd.serve_forever()


def main():
    print("Starting Montara")

    # Run dbt command
    process = subprocess.Popen(
        ["dbt", "run", "--log-format-file", "json"],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        universal_newlines=True,
    )

    # Create the montara_target directory if it doesn't exist
    print("Creating montara_target directory", flush=True)
    if not os.path.exists("montara_target"):
        os.makedirs("montara_target")

    webbrowser.open_new_tab("http://localhost:8000")
    # Open run in a different thread
    run_thread = threading.Thread(target=run)
    run_thread.start()

    print("Writing output to montara_target/output.jsonl", flush=True)
    with jsonlines.open("montara_target/output.jsonl", mode="w") as file:
        while process.poll() is None:
            line = process.stdout.readline()
            if line:
                # Write each line as a JSON object
                file.write({"output": line.strip()})
                file._fp.flush()


if __name__ == "__main__":
    main()
