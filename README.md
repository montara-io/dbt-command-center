# 🚀 dbt Command Center

## Local env setup

- If you changed your web application run `npm run build` to update the build folder.

- Run `rm -rf dist && cd web && npm run build && cd .. && python setup.py sdist bdist_wheel` to create source and binary distribution files in the dist/ directory.

- (Optional) Test your package locally by installing it with `pip install --force-reinstall --no-deps <path-to-git>/dbt-command-center/dist/dbt-command-center-0.1.1.tar.gz`

## Release a new version to PyPI

- Don't forget to update the version in `setup.py`

- Run `twine upload dist/*` to upload the distribution files to PyPI.
