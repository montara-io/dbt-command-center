from setuptools import setup, find_packages

setup(
    name="dbt_run_visualizer",
    version="0.0.1",
    packages=find_packages(),
    install_requires=["jsonlines"],
    entry_points={
        "console_scripts": [
            "mnt=src.main:main",
        ]
    },
    package_data={"src": ["main.py", "index.html"]},
    include_package_data=True,
)
