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

## Uikit

[![Netlify Status](https://api.netlify.com/api/v1/badges/378c5fea-f016-406c-9449-f3099441b0b1/deploy-status)](https://app.netlify.com/sites/argo-ui-storybook/deploys)
[![Storybook](https://img.shields.io/badge/React-Storybook-ff69b4)](https://argo-ui-storybook.netlify.com)
[![npm version](https://badge.fury.io/js/%40icgc-argo%2Fuikit.svg)](https://badge.fury.io/js/%40icgc-argo%2Fuikit)
[![TypeScript](https://img.shields.io/badge/types-%20TypeScript-blue)](https://www.typescriptlang.org/)
