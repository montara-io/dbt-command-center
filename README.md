# 🚀 dbt Command Center

Never drill through endless dbt logs again. dbt Command Center is a local web application that provides a user-friendly interface to monitor and manage dbt runs.

## Getting started

- Install the package with `pip install dbt-command-center`
- Instead of running `dbt run` run `dcc`. You can also pass the same arguments as you would to `dbt run`. For example `dcc --models my_model --full-refresh`.

## Contributing

- Clone the repository with `git clone`

- If you changed your web application run `npm run build` to update the build folder.

- Run `cd web && npm run build && cd .. && rm -rf dist && python setup.py sdist bdist_wheel` to create source and binary distribution files in the dist/ directory.

- (Optional) Test your package locally by installing it with `pip install --force-reinstall --no-deps <path-to-git>/dbt-command-center/dist/dbt-command-center-0.1.2.tar.gz`

## Release a new version to PyPI

- Don't forget to update the version in `setup.py`

- Run `twine upload dist/*` to upload the distribution files to PyPI.
