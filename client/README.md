# Argo Platform client

This project was bootstrapped with [Create Next App](https://github.com/segmentio/create-next-app).

Find the most recent version of this guide at [here](https://github.com/segmentio/create-next-app/blob/master/lib/templates/default/README.md). And check out [Next.js repo](https://github.com/zeit/next.js) for the most up-to-date info.

## Development

- Install dependencies: `npm i`
- Set up environment: copy `.env.schema` to `.env` and update environment accordingly if needed. Out-of-the-box values are meant for local development.

## Uikit

`/uikit` contains the reusable UI components for Argo.

- ### Development:
  - `npm run storybook` to run start a local storybook.
  - creating a new component: `npm run create-component`
- ### Restriction:
  - `uikit` components should not reference (`import`) anything outside of the `uikit` directory
