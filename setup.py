from setuptools import setup, find_packages

setup(
    name="dbt_run_visualizer",
    version="0.1.0",
    author="Dadi Atar",
    author_email="dadi@montara.io",
    description="Stop drilling through dbt logs and start visualizing them",
    long_description="Stop drilling through dbt logs and start visualizing them",
    long_description_content_type="text/markdown",
    packages=find_packages(),
    install_requires=["jsonlines"],
    entry_points={
        "console_scripts": [
            "mnt=src.main:main",
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
