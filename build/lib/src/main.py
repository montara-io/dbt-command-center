def main():
    print("Hello world")

    # Create an HTML file
    with open("output.html", "w") as file:
        # Write the HTML content
        file.write(
            """
    <html>
    <body>
    <h1>This is an HTML file</h1>
    <p>Some content goes here</p>
    </body>
    </html>
    """
        )


if __name__ == "__main__":
    main()
