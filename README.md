# astro Repository Template

[![GitHub issues](https://img.shields.io/github/issues/runtime-machines/astro-template.svg)](https://github.com/runtime-machines/astro-template/issues)
[![GitHub last commit](https://img.shields.io/github/last-commit/runtime-machines/astro-template.svg)](https://github.com/runtime-machines/astro-template/commits/master)
[![Build Status](https://github.com/runtime-machines/astro-template/actions/workflows/ci.yml/badge.svg)](https://github.com/runtime-machines/astro-template/actions)
[![codecov](https://codecov.io/github/runtime-machines/astro-template/branch/master/graph/badge.svg?token=ML6UOZQGV7)](https://codecov.io/github/runtime-machines/astro-template)

⭐ `Star` this repository if you find it valuable and worth maintaining.

👁 `Watch` this repository to get notified about new releases, issues, etc.

## Description

This is a GitHub repository template for a astro website.
You can use it:

- to create a new repoisitory with automation and environment setup,
- as reference when improving automation for an existing repository.

It includes:

- continuous integration via [GitHub Actions](https://github.com/features/actions),
- build automation via [Yarn](./package.json),
- dependency management using [NPM Packages](https://docs.npmjs.com/),
- code formatting and linting using [eslint](https://eslint.org/docs/latest/),
- dependencies scanning and updating thanks to [Dependabot](https://dependabot.com),
- security code analysis using [CodeQL Action](https://docs.github.com/en/github/finding-security-vulnerabilities-and-errors-in-your-code/about-code-scanning),
- resource relocation for intensive scripts with [Partytown](https://partytown.builder.io/)

## Usage

1. Click the `Use this template` button (alt. clone or download this repository).
1. Replace all occurrences of `runtime-machines/astro-template` to `your_org/repo_name` in all files.
1. Update the following files:
   - [LICENSE](LICENSE) (when defined)
   - [README.md](README.md)

## Install

```sh
yarn
```

## Develop

```sh
yarn dev

```

## Build

```sh
yarn build

```

## Lint

```sh
yarn lint:eslint

```

## Details

## Supported Browsers

This setup uses [Browserslist](https://github.com/browserslist/browserslist) to target browsers.

The default list of supported browsers is listed in the `package.json` file:

```json
{
  "browserslist": {
    "production": [">0.2%", "not dead", "not op_mini all"],
    "development": ["last 1 chrome version", "last 1 firefox version", "last 1 safari version"]
  }
}
```

This means that supported browsers vary based on current usage data.

## License

This project license
