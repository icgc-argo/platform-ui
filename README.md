# Argo Platform client
[![Build Status](https://jenkins.qa.cancercollaboratory.org/job/ARGO/job/ui/job/develop/badge/icon)](https://jenkins.qa.cancercollaboratory.org/job/ARGO/job/ui/job/develop/)

This project was bootstrapped with [Create Next App](https://github.com/segmentio/create-next-app).

Find the most recent version of this guide at [here](https://github.com/segmentio/create-next-app/blob/master/lib/templates/default/README.md). And check out [Next.js repo](https://github.com/zeit/next.js) for the most up-to-date info.

## Development

- Install dependencies: `npm i`
- Set up environment: copy `.env.schema` to `.env` and update environment accordingly if needed. Out-of-the-box values are meant for local development.
- Dev commands:
  - `npm run dev-ui` for working on ui only
  - `npm run dev` for work that involves the custom server

## Uikit
[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg)](https://argo-ui-storybook.netlify.com)
[![Netlify Status](https://api.netlify.com/api/v1/badges/c7a6c178-9394-4213-a420-585466232d77/deploy-status)](https://app.netlify.com/sites/argo-ui-storybook/deploys)

`/uikit` contains the reusable UI components for Argo.

- ### Development:
  - `npm run storybook` to run start a local storybook.
  - creating a new component: `npm run create-component`
- ### Restriction:
  - `uikit` components should not reference (`import`) anything outside of the `uikit` directory
