from setuptools import setup, find_packages

setup(
    name="dbt-command-center",
    version="0.1.1",
    author="Montara team",
    author_email="atardadi@gmail.com",
    description="Stop drilling through dbt logs and start visualizing them",
    long_description="Stop drilling through dbt logs and start visualizing them",
    long_description_content_type="text/markdown",
    packages=find_packages(),
    install_requires=["jsonlines"],
    entry_points={
        "console_scripts": [
            "dcc=src.main:main",
        ]
    },
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires=">=3.6",
    package_data={"src": ["main.py", "index.html"]},
    include_package_data=True,
)
