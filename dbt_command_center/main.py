from http.server import BaseHTTPRequestHandler, HTTPServer
import shutil
import subprocess
import sys
import webbrowser
import jsonlines
import os
import re
from urllib.parse import urlparse
import threading
import importlib.resources

MONTARA_TARGET = "montara_target"
DISABLE_ANALYTICS = "DCC_DISABLE_ANALYTICS"

# Read a data file from the package
with importlib.resources.open_text("dbt_command_center", "index.html") as data_file:
    html_content = data_file.read()


def replace_between_delimiters(text, start_delim, end_delim, replacement):
    parts = []
    current_part = ""
    in_delim = False
    start_delim_len = len(start_delim)
    end_delim_len = len(end_delim)

    for i in range(len(text)):
        char = str(text[i])  # Convert char to string
        if not in_delim and text[i : i + start_delim_len] == start_delim:
            in_delim = True
            parts.append(current_part)
            current_part = ""
            i += start_delim_len - 1  # Skip the start delimiter
        elif in_delim and text[i : i + end_delim_len] == end_delim:
            in_delim = False
            parts.append(replacement)
            i += end_delim_len - 1  # Skip the end delimiter
            current_part = ""
        elif in_delim:
            current_part += char
        else:
            current_part += char

    parts.append(current_part)
    return "".join(parts)


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
    httpd = server_class(server_address, handler_class)
    print(f"Server running on port {port}")
    httpd.serve_forever()


def main():
    print("Starting Montara new", flush=True)

    dbt_command = sys.argv[1]
    dbt_full_command = ["dbt"] + sys.argv[1:] + ["--target-path", MONTARA_TARGET]
    strint_dbt_command = " ".join(dbt_full_command)
    print(f"Running {strint_dbt_command}", flush=True)
    if dbt_command == "compile" or dbt_command == "parse":
        process = subprocess.Popen(
            dbt_full_command,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            universal_newlines=True,
        )
        while process.poll() is None:
            line = process.stdout.readline()
            if line:
                print(line.strip())
        return

    # Create the montara_target directory if it doesn't exist
    print("Creating montara_target directory", flush=True)
    if os.path.exists(MONTARA_TARGET):
        shutil.rmtree(MONTARA_TARGET)
        print(f"Folder '{MONTARA_TARGET}' has been cleared.")
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

    process = subprocess.Popen(
        dbt_full_command,
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
