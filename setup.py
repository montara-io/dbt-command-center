from setuptools import setup, find_packages

setup(
    name="dbt-run-visualizer",
    version="0.1",
    packages=find_packages(),
    install_requires=[],
    entry_points={
        "console_scripts": [
            "command-name=package.module:function",
        ]
    },
)
