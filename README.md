# Dbt Run Visualizer
<!-- https://www.perplexity.ai/search/how-to-create-WJOfla1oQ3exPATGmEXYKQ -->

- Run `rm -rf dist && python setup.py sdist bdist_wheel` to create source and binary distribution files in the dist/ directory.

- (Optional) Test your package locally by installing it with `pip install --force-reinstall --no-deps /Users/dadiatar/git/dbt_run_visualizer/dist/dbt_run_visualizer-0.1.0.tar.gz` or `pip install --force-reinstall --no-deps /Users/dadiatar/git/dbt_run_visualizer/dist/dbt_run_visualizer-0.1.0-py3-none-any.whl`

## Release a new version to PyPI

- Run `twine upload dist/*` to upload the distribution files to PyPI.