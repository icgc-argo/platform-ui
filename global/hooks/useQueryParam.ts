/*
 * Copyright (c) 2025 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of
 * the GNU Affero General Public License v3.0. You should have received a copy of the
 * GNU Affero General Public License along with this program.
 *  If not, see <http://www.gnu.org/licenses/>.
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

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

/**
 * Module-level shadow of the committed query string. Updated synchronously on every
 * `setQueryParam` call so that concurrent writes within the same tick compose correctly
 * rather than each reading a stale `router.asPath`.
 */
let shadowQuery: Record<string, string> = {};

/**
 * The path most recently written to the router. While set, `syncShadowFromUrl` ignores
 * URL changes — they reflect the previous state and would overwrite the pending shadow.
 * Cleared once `router.asPath` catches up to this value.
 */
let pendingPath: string | null = null;

/** Subscribers notified after each write so all hook instances re-render with the new value. */
const subscribers = new Set<() => void>();

const notifySubscribers = () => subscribers.forEach((subscriber) => subscriber());

const parseQueryString = (queryString: string): Record<string, string> => {
  const entries = [...new URLSearchParams(queryString).entries()];
  return entries.reduce<Record<string, string>>((acc, [key, val]) => {
    acc[key] = val;
    return acc;
  }, {});
};

const buildPath = (basePath: string, query: Record<string, string>): string => {
  const queryString = new URLSearchParams(query).toString();
  return queryString ? `${basePath}?${queryString}` : basePath;
};

/**
 * Called on every render to keep the shadow in sync with the URL.
 *
 * Skips sync while a write is in flight (`pendingPath` is set) to prevent a stale
 * `router.asPath` from overwriting our pending shadow state. Once `router.asPath`
 * catches up to the path we wrote, clears the pending flag and resumes syncing.
 */
const syncShadowFromUrl = (asPath: string) => {
  if (pendingPath !== null) {
    if (asPath === pendingPath) {
      pendingPath = null;
    } else {
      return;
    }
  }
  shadowQuery = parseQueryString(asPath.split('?')[1] || '');
};

/**
 * Reads and writes a single URL query parameter, keeping it in sync across all
 * hook instances on the page.
 *
 * Handles concurrent writes from multiple instances correctly: each call to the
 * setter updates a module-level shadow store synchronously before the router
 * commits the change, so a second write in the same tick composes on top of the
 * first rather than reading stale router state.
 *
 * @param name - Query parameter key.
 * @param defaultValue - Value returned when the parameter is absent from the URL.
 * @param options.serialize - Converts `T` to the string stored in the URL.
 * @param options.deserialize - Parses the raw URL string back to `T`.
 * @param options.pushNavigation - When `true`, writes add a browser history entry
 *   (`router.push`). Defaults to `false` (`router.replace`).
 * @returns `[currentValue, setQueryParam]` — the current value and a setter.
 *   Pass `undefined` to the setter to remove the parameter from the URL entirely.
 */
const useQueryParam = <T>(
  name: string,
  defaultValue: T,
  {
    serialize,
    deserialize,
    pushNavigation = false,
  }: {
    serialize: (value: T) => string;
    deserialize: (raw: string) => T;
    pushNavigation?: boolean;
  },
): [T, (value: T | undefined) => void] => {
  const router = useRouter();

  // Intentional side-effect in render: syncs the shadow from the URL on each render so
  // back/forward navigation and external URL changes are picked up immediately.
  syncShadowFromUrl(router.asPath);

  // Re-render this instance whenever any instance calls setQueryParam.
  // useSyncExternalStore is unavailable in React 17, so we use a manual subscriber
  // pattern instead: useState provides the re-render mechanism and useEffect
  // registers/unregisters this instance's trigger for the lifetime of the component.
  const [, forceUpdate] = useState(0);
  useEffect(() => {
    const trigger = () => forceUpdate((count) => count + 1);
    subscribers.add(trigger);
    return () => {
      subscribers.delete(trigger);
    };
  }, []);

  const currentValue: T = name in shadowQuery ? deserialize(shadowQuery[name]) : defaultValue;

  const setQueryParam = (value: T | undefined) => {
    if (value === undefined) {
      delete shadowQuery[name];
    } else {
      shadowQuery[name] = serialize(value);
    }

    const newPath = buildPath(router.asPath.split('?')[0], shadowQuery);
    pendingPath = newPath;

    notifySubscribers();

    if (pushNavigation) {
      router.push(router.pathname, newPath);
    } else {
      router.replace(router.pathname, newPath);
    }
  };

  return [currentValue, setQueryParam];
};

export default useQueryParam;
