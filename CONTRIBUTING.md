# Contributing

First of all, thank you!

## Commit Messages

This project uses [`semantic-release`](https://github.com/semantic-release/semantic-release) to manage its releases, and therefore your commit messages must follow a [strict commit message format](https://github.com/semantic-release/semantic-release#default-commit-message-format).

You may choose to use `npm run commit` instead of `git commit`, and you'll be presented with an interactive session that will generate your commit message for you.

## Linting TypeScript Code

Make sure that your code changes pass the project TSLint rules. You can find out by running `npm run lint`. The task also runs on the Continuous Integration environment and will fail the build if it does not pass.
