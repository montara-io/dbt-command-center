import subprocess
import webbrowser
import jsonlines
import os


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

    print("Writing output to montara_target directory", flush=True)
    # Create an HTML file
    with open("montara_target/output.html", "w") as file:
        # Write the HTML content with the contents from ../web_application/index.html
        file.write(
            """
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
                            const json = JSON.parse(line);
                            console.log(json);
                        }
                        chunk = await reader.read();
                    }
                    
                    // Process the remaining chunk
                    const text = decoder.decode(chunk.value, { stream: true });
                    result += text;
                    const json = JSON.parse(result);
                    console.log(json);
                }
                window.onload = () => {
                    fetchJSONL('./output.jsonl');
                    setInterval(() => {
                        fetchJSONL('./output.jsonl');
                    }, 2000);
                    
                };
                </script>
            </body>
            </html>
"""
        )

    webbrowser.open_new_tab("file://" + os.path.abspath("montara_target/output.html"))
    print("Writing output to montara_target/output.jsonl", flush=True)
    with jsonlines.open("montara_target/output.jsonl", mode="w") as file:
        while process.poll() is None:
            line = process.stdout.readline()
            if line:
                # Write each line as a JSON object
                file.write({"output": line.strip() + "\n"})
                file._fp.flush()


if __name__ == "__main__":
    main()
