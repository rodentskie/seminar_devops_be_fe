## Description

Monorepo powered by [NX](https://nx.dev/)

[TypeScript Getting Started](https://nx.dev/getting-started/nx-and-typescript#create-a-typescript-based-application)

### Create a new TypeScript based library

To test add `--dry-run` on the end.

`nx g @nx/node:lib --name=delay --buildable --directory=library/delay`

### Create a TypeScript based application

To test add `--dry-run` on the end.

`nx g @nx/node:app api --framework express --directory apps/api`

### Create Next App

To test add `--dry-run` on the end.

`nx g @nx/next:app app --directory=apps/app`