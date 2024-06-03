# 🚀 dbt Command Center

Never drill through endless dbt logs again. dbt Command Center is a local web application that provides a user-friendly interface to monitor and manage dbt runs.

<div>
  <a href="https://www.loom.com/share/99c67a35a912476aaa0742b176abf2f1">
    <p>Watch a 2-min demo video</p>
  </a>
  <a href="https://www.loom.com/share/99c67a35a912476aaa0742b176abf2f1">
    <img style="max-width:300px;" src="https://cdn.loom.com/sessions/thumbnails/99c67a35a912476aaa0742b176abf2f1-1717394143314-with-play.gif">
  </a>
</div>


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
