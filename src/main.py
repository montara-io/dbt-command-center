from http.server import BaseHTTPRequestHandler, HTTPServer
import shutil
import subprocess
import sys
import webbrowser
import jsonlines
import os
from urllib.parse import urlparse
import threading
import importlib.resources

MONTARA_TARGET = "montara_target"

# Read a data file from the package
with importlib.resources.open_text("src", "index.html") as data_file:
    html_content = data_file.read()


class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        # content of the html file from the web_application/index.h
        parsed_path = urlparse(self.path)

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


def run_web_server(
    server_class=HTTPServer, handler_class=SimpleHTTPRequestHandler, port=8000
):
    server_address = ("", port)
    httpd = server_class(server_address, handler_class)
    print(f"Server running on port {port}")
    httpd.serve_forever()


def main():
    print("Starting Montara new", flush=True)

    # Create the montara_target directory if it doesn't exist
    print("Creating montara_target directory", flush=True)
    if os.path.exists(MONTARA_TARGET):
        shutil.rmtree(MONTARA_TARGET)
        print(f"Folder '{MONTARA_TARGET}' has been removed.")
    else:
        print(f"Folder '{MONTARA_TARGET}' does not exist.")
        os.makedirs(MONTARA_TARGET)

    print(f'Compiling dbt and saving the output to "{MONTARA_TARGET}"', flush=True)
    subprocess.run(
        ["dbt", "parse", "--target-path", MONTARA_TARGET],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        universal_newlines=True,
    )
    dbt_command = ["dbt", "run"] + sys.argv[1:] + ["--target-path", MONTARA_TARGET]
    strint_dbt_command = " ".join(
        ["dbt", "run"] + sys.argv[1:] + ["--target-path", MONTARA_TARGET]
    )
    print(f"Running {strint_dbt_command}", flush=True)

    process = subprocess.Popen(
        dbt_command,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        universal_newlines=True,
    )

    print("Opening web browser", flush=True)
    # Open run in a different thread
    run_thread = threading.Thread(target=run_web_server)
    run_thread.start()
    webbrowser.open_new_tab("http://localhost:8000")

    print(f"Writing output to {MONTARA_TARGET}/output.jsonl", flush=True)
    print(f"Clearing the contents of {MONTARA_TARGET}/output.jsonl", flush=True)
    with open(f"{MONTARA_TARGET}/output.jsonl", "w") as file:
        file.write("")
    with jsonlines.open(f"{MONTARA_TARGET}/output.jsonl", mode="w") as file:
        while process.poll() is None:
            line = process.stdout.readline()
            if line:
                # Write each line as a JSON object
                file.write({"output": line.strip()})
                file._fp.flush()


if __name__ == "__main__":
    main()
