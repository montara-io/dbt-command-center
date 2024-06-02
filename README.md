# 🚀 dbt Command Center

Never drill through endless dbt logs again. dbt Command Center is a local web application that provides a user-friendly interface to monitor and manage dbt runs.

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/bdf717b0f1b048fa883233fc74e038ec?sid=38b89105-dff6-4a93-bd9c-c9005c7bbaa1" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

## Getting started

- Install the package with `pip install dbt-command-center`
- Run `dcc` instead of `dbt` to start the dbt Command Center. You can pass the same arguments as you would to `dbt run`. For example `dcc run --models my_model --full-refresh`.

## Contributing

- Clone the repository with `git clone`

- If you changed your web application run `npm run build` to update the build folder.

- Run `cd web && npm run build && cd .. && rm -rf dist && python setup.py sdist bdist_wheel` to create source and binary distribution files in the dist/ directory.

- (Optional) Test your package locally by installing it with `pip install --force-reinstall --no-deps <path-to-git>/dbt-command-center/dist/dbt_command_center-<version>.tar.gz`

## Release a new version to PyPI

- Don't forget to update the version in `setup.py`

- A new version is automatically released with every push to the main branch. The GitHub Action will build the package and upload it to PyPI.

### Anonymous usage data

We strive to make dbt Command Center better by understanding how it is used. To do this, we collect anonymous usage data. This does not include any personal information or data from your dbt runs. You can opt-out by setting the environment variable `DCC_DISABLE_ANALYTICS` to `true`.
