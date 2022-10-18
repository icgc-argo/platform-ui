# Argo Platform client

[![TypeScript](https://img.shields.io/badge/types-%20TypeScript-blue)](https://www.typescriptlang.org/)
[![Prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://prettier.io/)

| Release    | Build Status                                                                                                                                                                    |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Edge**   | [![Build Status](https://jenkins.qa.cancercollaboratory.org/buildStatus/icon?job=ARGO%2Fui%2Fdevelop)](https://jenkins.qa.cancercollaboratory.org/job/ARGO/job/ui/job/develop/) |
| **Latest** | [![Build Status](https://jenkins.qa.cancercollaboratory.org/buildStatus/icon?job=ARGO%2Fui%2Fmaster)](https://jenkins.qa.cancercollaboratory.org/job/ARGO/job/ui/job/master/)   |

This project was bootstrapped with [Create Next App](https://github.com/segmentio/create-next-app).

Find the most recent version of this guide [here](https://github.com/segmentio/create-next-app/blob/master/lib/templates/default/README.md), and check out [Next.js repo](https://github.com/zeit/next.js) for the most up-to-date info on Next JS.

## Local development

### Starting local back-end services

A [docker-compose](https://docs.docker.com/compose/) setup is available in the [`compose`](./compose) folder.
Navigate to `/compose` (`cd ./compose`) and Follow the instructions found in [`compose/README.md`](compose/README.md) to start a local cluster of Argo Platform micro services.

### Setup

- Install dependencies: `npm ci`
- Set up environment: copy `.env.schema` to `.env` and update environment accordingly. Out-of-the-box values are meant for local development.
- Dev commands:
  - `npm run dev` starts local dev server
  - `npm run build` creates a production build.
  - `npm run force-resolutions` fixes vulnerable dependencies listed in `package.json > resolutions`

### Writing commits

To keep commit messages consistent, we use [gitmoji](https://gitmoji.dev). To easily access emojis on Mac, press ctrl+cmd+space.

### Type checking

- `npm run type-check`: trigger TypeScript type check for whole repo
- `npm run type-check -- --watch`: runs the above with watch mode
  - Any `npm run type-check` triggers `tsc`, so any flag layed out [here](https://www.typescriptlang.org/docs/handbook/compiler-options.html) can be used
- If using [vscode](https://code.visualstudio.com/) (recommended), `tsc` can also be run as a task in the editor:
  - `Cmd+Shift+B`, then select `tsc:build - tsconfig.json`
  - This will report errors in vscode's `PROBLEMS` tab

### GraphQL

- We use [GraphQL Code Generator](https://www.graphql-code-generator.com/) to generate an introspection schema and types.
- Install the [GraphQL VSCode plugin](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql) for code suggestions based on the schema as well as syntax highlighting.

- On first build, comment out the `schema` item in `graphql.config.yaml`, because the schema hasn't been generated yet. After building once, uncomment that line.
- Modify `./codegen.yml` to get the schema either from your configured API or a local file.
- `npm run gql-check` to check your GraphQL files and run a build.
- `npm run dev` will also watch for GraphQL changes.
- Name your GraphQL documents appropriately: They need to go in a `gql` folder and have `_QUERY` `_MUTATION` `_FRAGMENT` at the end of the filename. They also need to be `*.ts` files.

## Uikit
This project is built with UI components provided by `@icgc-argo/uikit`. For more information, please visit:
- [Github](https://github.com/icgc-argo/uikit)
- [![npm version](https://badge.fury.io/js/@icgc-argo%2Fuikit.svg)](https://badge.fury.io/js/@icgc-argo%2Fuikit)
- [![Storybook](https://img.shields.io/badge/React-Storybook-ff69b4)](https://argo-ui-storybook.netlify.com)
