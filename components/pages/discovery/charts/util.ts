import { UikitTheme } from '@icgc-argo/uikit';

export const injectTheme = (injectedTheme: UikitTheme) => (config) => {
  if (Array.isArray(config)) {
    return config.map((config) => config(injectedTheme));
  }
  return config(injectedTheme);
};
