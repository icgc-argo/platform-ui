# Features Config

The ARGO UI has many features which have been added over time and for logistical reasons were not enabled by default. Documented here are a description of the current feature flags, describing what setting the flag as `true` will enable, and what additional env configs are expected when that flag is enabled.

## `FEATURE_RDPC_NODE_UI`

For converting the ARGO UI from a central platform UI into a UI for a single RDPC in a wider network.

When this is `true`:
- Regional Banner will be shown, displaying the RDPC short name for this node. Example: `Toronto` or `Tokyo`
  - Must set `RDPC_REGION_DISPLAY_NAME` in the env config to select the name to show in this tag

When this is `false`:
- The "Latest News" section of the homepage will be shown. This was part of the original ARGO design, the news is hardcoded into the site so cannot be modified easily per region.

## `FEATURE_DISCOVERY_NETWORK_SEARCH`

Enables the federated search mode for the Data Discovery page, using arranger network search.

Will not have any effect unless `FEATURE_DATA_DISCOVERY_ENABLED=true` is set, enabling the discovery page.

Requires `NETWORK_SEARCH_LOCAL_NODE_ID` to be set to the node ID for this RDPC, as configured on the Discovery Arranger instance local to this RDPC.

## `FEATURE_DATA_DISCOVERY_ENABLED`

Enables the Data Discovery page. This new page is available through a tab in the header, and can only be accessed by users with DACO permissions. It allows complex queries over the publicly released data set, using clinical and file properties to filter a data cohort. Individual donors and files cannot be listed, but an aggregate statistical description of the cohort is shown via select charts.

