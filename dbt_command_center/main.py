import shutil
import subprocess
import sys
import webbrowser
import jsonlines
import os
from dbt_command_center import montara_http
import threading

MONTARA_TARGET = "montara_target"
DISABLE_ANALYTICS = "DCC_DISABLE_ANALYTICS"


def main():
    if len(sys.argv) < 2:
        print(
            """
Usage: dcc <dbt_command> [args]
For example: dcc run
            
See documentation at https://github.com/montara-io/dbt-command-center
"""
        )
        return
    print("🚀 dbt Command Center is starting", flush=True)

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
    run_thread = threading.Thread(target=montara_http.run_web_server)
    run_thread.start()
    webbrowser.open_new_tab("http://localhost:8000")

    print(f"Writing output to {MONTARA_TARGET}/output.jsonl")
    with open(f"{MONTARA_TARGET}/output.jsonl", "w") as file:
        print(f"Clearing the contents of {MONTARA_TARGET}/output.jsonl")
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
