import { createContext, PropsWithChildren, useContext, useReducer, useState } from 'react';
import { FacetPanelOptions } from '../../data/facet';

type TContext = {
  isFacetExpanded: (path: string) => boolean;
  isFolderExpanded: (path: string) => boolean;
  isPanelExpanded: boolean;
  setVisiblePanels: (action: Actions) => void;
};

type TState = { folders: string[]; facets: string[]; allPanels: boolean };

const FacetContext = createContext<TContext | undefined>(undefined);

const ACTION_TYPES = {
  TOGGLE_ALL: 'TOGGLE_ALL',
  TOGGLE_PATH: 'TOGGLE_PATH',
  TOGGLE_FOLDER: 'TOGGLE_FOLDER',
} as const;

type ActionToggleAll = {
  type: typeof ACTION_TYPES.TOGGLE_ALL;
};

type ActionTogglePath = {
  type: typeof ACTION_TYPES.TOGGLE_PATH;
  facetPath: string;
};

type ActionToggleFolder = {
  type: typeof ACTION_TYPES.TOGGLE_FOLDER;
  name: string;
};

type Actions = ActionToggleAll | ActionTogglePath | ActionToggleFolder;

/**
 *
 * @param source
 * @param test
 * @returns
 */
const toggleArray = (source, test) => {
  return source.includes(test) ? source.filter((element) => element !== test) : source.concat(test);
};

/**
 *
 * @param staticFacetOptions
 * @returns
 */
const expandedReducer =
  (staticFacetOptions) =>
  (visiblePanels: TState, action: Actions): TState => {
    const allFacetPaths = staticFacetOptions.flatMap((folder) =>
      folder.contents.map((facet) => facet.facetPath),
    );

    const allFolderPaths = staticFacetOptions.map(({ name }) => name);

    switch (action.type) {
      case 'TOGGLE_ALL': {
        if (visiblePanels.allPanels) {
          return {
            facets: [],
            folders: [],
            allPanels: false,
          };
        } else {
          return {
            facets: allFacetPaths,
            folders: allFolderPaths,
            allPanels: true,
          };
        }
      }
      case 'TOGGLE_PATH': {
        const facetPath = action.facetPath;
        const facets = toggleArray(visiblePanels.facets, facetPath);
        return { ...visiblePanels, facets, allPanels: false };
      }
      case 'TOGGLE_FOLDER': {
        const name = action.name;
        const folders = toggleArray(visiblePanels.folders, name);
        return { ...visiblePanels, folders, allPanels: false };
      }
      default: {
        console.error('unknown action');
      }
    }
  };

const initialState: TState = { folders: [], facets: [], allPanels: false };
export const FacetStateProvider = ({
  staticFacetOptions,
  children,
}: PropsWithChildren<{ staticFacetOptions: FacetPanelOptions }>) => {
  const [searchQuery, setSearchQuery] = useState('');

  const [visiblePanels, setVisiblePanels] = useReducer(
    expandedReducer(staticFacetOptions),
    initialState,
  );

  const isFacetExpanded = (path: string) => visiblePanels.facets.includes(path);
  const isFolderExpanded = (folder: string) => visiblePanels.folders.includes(folder);
  const isPanelExpanded = visiblePanels.allPanels;

  const props = {
    isFacetExpanded,
    isFolderExpanded,
    isPanelExpanded,
    setVisiblePanels,
  };

  return <FacetContext.Provider value={props}>{children}</FacetContext.Provider>;
};

export const useFacetState = (): TContext => {
  const context = useContext(FacetContext);
  if (!context) {
    throw new Error('useFacetState has to be used within <FacetContext.Provider>');
  }
  return context;
};
