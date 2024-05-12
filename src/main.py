import subprocess
import jsonlines
import os


def main():
    print("Starting Montara")

    # Run dbt command
    process = subprocess.Popen(
        ["dbt", "run", "--log-format-file", "json"],
        stdout=subprocess.PIPE,
        universal_newlines=True,
    )
    # Create the montara_target directory if it doesn't exist
    print("Creating montara_target directory")
    if not os.path.exists("montara_target"):
        os.makedirs("montara_target")

    print("Writing output to montara_target directory")
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
                window.onload = () => {
                    console.log("ready");
                };
                </script>
            </body>
            </html>

"""
        )

    print("Writing output to montara_target/output.jsonl")
    # Open the JSONL file in write mode
    with jsonlines.open("montara_target/output.jsonl", mode="w") as file:
        # Continuously write the output to the JSONL file
        while process.poll() is None:
            line = process.stdout.readline()
            # Write each line as a JSON object
            file.write({"output": line.strip()})


if __name__ == "__main__":
    main()
