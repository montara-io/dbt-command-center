from setuptools import setup, find_packages

setup(
    name="dbt-command-center",
    version="0.1.21",
    author="Montara team",
    author_email="support@montara.io",
    description="Stop drilling through dbt logs and start visualizing them",
    long_description="Stop drilling through dbt logs and start visualizing them",
    long_description_content_type="text/markdown",
    packages=find_packages(),
    install_requires=["jsonlines"],
    entry_points={
        "console_scripts": [
            "dcc=dbt_command_center.main:main",
        ]
    },
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires=">=3.6",
    package_data={"dbt_command_center": ["*.py", "index.html"]},
    include_package_data=True,
)
