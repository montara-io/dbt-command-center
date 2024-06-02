# 🚀 dbt Command Center

Never drill through endless dbt logs again. dbt Command Center is a local web application that provides a user-friendly interface to monitor and manage dbt runs.

[Watch a 2-minute demo](https://www.loom.com/share/bdf717b0f1b048fa883233fc74e038ec?sid=55a8eeeb-6a48-4866-84fc-d0966c68fd81)

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
