# argo-platform

This repo contains the ICGC-Argo server-rendered front-end and its [GraphQl](https://graphql.org/learn/) BFF (Backend For Frontend) API gateway.

## Repo structure

```
argo-platform
|__ client (server-rendered React app)
|   |__ pages (Next.js routing wrappers)
|   |__ components (layout & stateful components)
|   |__ uikits (pure presentational components)
|   |__ global (utility functions, configs and constants)
|   |__ stories (Storybook stories, pulling from uikits)
|__ server (GraphQl API)
    |__ schemas (individual domain schemas,
        remote and locally defined)
```

Refer to [./client/README.md](./client/README.md) and [./server/README.md](./server/README.md) for each module's documentations.
