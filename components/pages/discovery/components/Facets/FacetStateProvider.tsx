/*
 * Copyright (c) 2025 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of
 * the GNU Affero General Public License v3.0. You should have received a copy of the
 * GNU Affero General Public License along with this program.
 * If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import { createContext, PropsWithChildren, useContext, useReducer, useState } from 'react';

import { FacetPanelOptions } from '../../data/facet';

type TContext = {
  isFacetExpanded: (path: string) => boolean;
  isFolderExpanded: (path: string) => boolean;
  isExpanded: boolean;
  setVisiblePanels: (action: Actions) => void;
};

type TState = { folders: string[]; facets: string[] };

const FacetContext = createContext<TContext | undefined>(undefined);

export const FACET_VISIBILITY_TOGGLE_ACTIONS = {
  TOGGLE_ALL: 'TOGGLE_ALL',
  TOGGLE_PATH: 'TOGGLE_PATH',
  TOGGLE_FOLDER: 'TOGGLE_FOLDER',
} as const;

type ActionToggleAll = {
  type: typeof FACET_VISIBILITY_TOGGLE_ACTIONS.TOGGLE_ALL;
};

type ActionTogglePath = {
  type: typeof FACET_VISIBILITY_TOGGLE_ACTIONS.TOGGLE_PATH;
  facetPath: string;
};

type ActionToggleFolder = {
  type: typeof FACET_VISIBILITY_TOGGLE_ACTIONS.TOGGLE_FOLDER;
  name: string;
};

type Actions = ActionToggleAll | ActionTogglePath | ActionToggleFolder;

/**
 *
 * Tests if element is in array
 * - positive, removes it, return array
 * - negative, adds to array, return array
 *
 * @param source - array to test
 * @param test - element string
 * @returns toggled array
 */
const toggleArray = (source, test) => {
  return source.includes(test) ? source.filter((element) => element !== test) : source.concat(test);
};

/**
 * Handles toggling facet folders and facet groups
 */
const visibilityReducer =
  (staticFacetOptions) =>
  (visiblePanels: TState, action: Actions): TState => {
    const allFacetPaths = staticFacetOptions.flatMap((folder) =>
      folder.contents.map((facet) => facet.facetPath),
    );

    const allFolderPaths = staticFacetOptions.map(({ name }) => name);

    switch (action.type) {
      case FACET_VISIBILITY_TOGGLE_ACTIONS.TOGGLE_ALL: {
        const isExpanded = visiblePanels.facets.length > 0 || visiblePanels.folders.length > 0;
        if (isExpanded) {
          return {
            facets: [],
            folders: [],
          };
        } else {
          return {
            facets: allFacetPaths,
            folders: allFolderPaths,
          };
        }
      }
      case FACET_VISIBILITY_TOGGLE_ACTIONS.TOGGLE_PATH: {
        const facetPath = action.facetPath;
        const facets = toggleArray(visiblePanels.facets, facetPath);
        return { ...visiblePanels, facets };
      }
      case FACET_VISIBILITY_TOGGLE_ACTIONS.TOGGLE_FOLDER: {
        const name = action.name;
        const folders = toggleArray(visiblePanels.folders, name);
        return { ...visiblePanels, folders };
      }
      default: {
        console.error('unknown action');
      }
    }
  };

const initialState: TState = { folders: [], facets: [] };
export const FacetStateProvider = ({
  staticFacetOptions,
  children,
}: PropsWithChildren<{ staticFacetOptions: FacetPanelOptions }>) => {
  const [searchQuery, setSearchQuery] = useState('');

  const [visiblePanels, setVisiblePanels] = useReducer(
    visibilityReducer(staticFacetOptions),
    initialState,
  );

  const isFacetExpanded = (path: string) => visiblePanels.facets.includes(path);
  const isFolderExpanded = (folder: string) => visiblePanels.folders.includes(folder);
  const isExpanded = visiblePanels.facets.length > 0 || visiblePanels.folders.length > 0;

  const props = {
    isFacetExpanded,
    isFolderExpanded,
    isExpanded,
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
