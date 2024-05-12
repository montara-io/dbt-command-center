from http.server import BaseHTTPRequestHandler, HTTPServer
import subprocess
import webbrowser
import jsonlines
import os
from urllib.parse import urlparse
import threading


html_content = """
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Montara report</title>
            </head>
            <body>
                <h1>Montara report</h1>
                <script>
                async function fetchJSONL(url) {
                    const jsonArray = [];
                    const response = await fetch(url);
                    const reader = response.body.getReader();
                    const decoder = new TextDecoder('utf-8');
                    let chunk = await reader.read();
                    let result = '';
                    
                    while (!chunk.done) {
                        const text = decoder.decode(chunk.value, { stream: true });
                        result += text;
                        const lines = result.split('\\n');
                        result = lines.pop();  // In case the last chunk ends with an incomplete line
                        for (const line of lines) {
                            // Process each line as JSON
                            try {
                                const json = JSON.parse(line.trim());
                                typeof json === 'object' && jsonArray.push(json);
                            } catch (error) {
                            }
                        }
                        chunk = await reader.read();
                    }
                    
                    // Process the remaining chunk
                    const text = decoder.decode(chunk.value, { stream: true });
                    if (text) {
                        result += text;
                    }
                    console.log(jsonArray);
                }
                window.onload = () => {
                    fetchJSONL('/montara_target/output.jsonl');
                    setInterval(() => {
                        fetchJSONL('/montara_target/output.jsonl');
                    }, 2000);
                    
                };
                </script>
            </body>
            </html>
"""


class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        parsed_path = urlparse(self.path)
        print(parsed_path.path)
        # Open and read the file
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
