# Argo Platform client

[![Build Status](https://jenkins.qa.cancercollaboratory.org/buildStatus/icon?job=ARGO%2Fui%2Fdevelop)](https://jenkins.qa.cancercollaboratory.org/job/ARGO/job/ui/job/develop/)

This project was bootstrapped with [Create Next App](https://github.com/segmentio/create-next-app).

Find the most recent version of this guide at [here](https://github.com/segmentio/create-next-app/blob/master/lib/templates/default/README.md). And check out [Next.js repo](https://github.com/zeit/next.js) for the most up-to-date info.

## Development

### Setup

- Install dependencies: `npm i`
- Set up environment: copy `.env.schema` to `.env` and update environment accordingly if needed. Out-of-the-box values are meant for local development.
- Dev commands:
  - `npm run dev` for work that involves the custom server
  - `npm run build` alias for 'npm build' perform any necessary building/prep tasks for your project, prior to it being used in another project.
  - `npm run storybook` for starting the storybook on port 6006
  - `npm run build-storybook` equivalent to `npm run storybook`

### Writing commits

To keep commit messages consistent, we use [gitmoji-cli](https://www.npmjs.com/package/gitmoji-cli), available as a dev dependency

- `npm run commit` will start interactive commit tool
- configuring gitmoji-cli: `npm run gitmoji-config`

### Type checking

- `npm run type-check`: trigger TypeScript type check for whole repo
- `npm run type-check -- --watch`: runs the above with watch mode
  - Any `npm run type-check` triggers `tsc`, so any flag layed out [here](https://www.typescriptlang.org/docs/handbook/compiler-options.html) can be used
- If using [vscode](https://code.visualstudio.com/), `tsc` can also be run as a task in the editor:
  - `Cmd+Shift+B`, then select `tsc:build - tsconfig.json`
  - This will report errors in vscode's `PROBLEMS` tab

## Uikit

[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg)](https://argo-ui-storybook.netlify.com)
[![Netlify Status](https://api.netlify.com/api/v1/badges/c7a6c178-9394-4213-a420-585466232d77/deploy-status)](https://app.netlify.com/sites/argo-ui-storybook/deploys)

`/uikit` contains the reusable UI components for Argo.

- ### Development:
  - `npm run storybook` to run start a local storybook.
  - creating a new component: `npm run create-component`
- ### Restriction:
  - `uikit` components should not reference (`import`) anything outside of the `uikit` directory
