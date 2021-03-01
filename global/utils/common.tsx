/*
 * Copyright (c) 2020 The Ontario Institute for Cancer Research. All rights reserved
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

import { format as formatDate } from 'date-fns';
import orderBy from 'lodash/orderBy';
import uniq from 'lodash/uniq';
import { LOGIN_PAGE_PATH } from 'global/constants/pages';

export const insertAt = <T extends any>(arr: T[]) => (i: number) => (element: T) => [
  ...arr.slice(0, i),
  element,
  ...arr.slice(i, arr.length),
];

export const asEnum = (obj, { name = 'enum' } = {}) =>
  new Proxy(obj, {
    get: (obj, prop) => {
      if (obj[prop]) {
        return obj[prop];
      } else {
        const error = new Error(`${String(prop)} is not a valid ${name}`);
        console.error(error);
        throw error;
      }
    },
    set: () => {
      throw new Error('enums are immutable');
    },
  });

const dateFormat = 'yyyy-MM-dd';
export const displayDate = (date: string | Date) => {
  const jsDate = typeof date === 'string' ? new Date(date) : date;
  return formatDate(jsDate, dateFormat);
}

const dateTimeFormat = { date: 'MMMM d, yyyy', time: 'h:mm a' };
export const displayDateAndTime = (date: string | Date) => {
  const jsDate = typeof date === 'string' ? new Date(date) : date;
  const formattedDate = formatDate(jsDate, dateTimeFormat.date);
  const formattedTime = formatDate(jsDate, dateTimeFormat.time);
  return `${formattedDate} at ${formattedTime}`;
};

export const sleep = (time: number = 2000) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });

export const exportToTsv = <Data extends { [k: string]: string | number }>(
  data: Array<Data>,
  options: {
    exclude?: Array<keyof Data>;
    include?: Array<keyof Data>;
    order?: Array<keyof Data>;
    fileName?: string;
    headerDisplays?: { [k in keyof Data]?: string };
  } = {},
): void => {
  const allKeys = uniq(
    data.reduce((acc, entry) => [...acc, ...Object.keys(entry)], [] as string[]),
  );

  const {
    exclude: excludeKeys = [],
    include: includeKeys = allKeys,
    order = allKeys,
    fileName = 'data.tsv',
    headerDisplays = allKeys.reduce<typeof options['headerDisplays']>(
      (acc, key) => ({
        ...acc,
        [key]: options.headerDisplays ? options.headerDisplays[key] : key,
      }),
      {},
    ),
  } = options;
  const orderedKeys = orderBy(allKeys, (key) => order.indexOf(key));

  /**
   * construct the tsv data
   */

  const filteredKeys = orderedKeys
    .filter((key) => !excludeKeys.includes(key))
    .filter((key) => includeKeys.includes(key));

  const dataRows: string[][] = data.map((entry) => filteredKeys.map((key) => String(entry[key])));
  const headerRow = filteredKeys.map((key) => headerDisplays[key]);
  const tsvString = [headerRow, ...dataRows].map((row) => row.join('\t')).join('\n');

  /**
   * export data to tsv
   */
  const fileContent = `data:text/tsv;charset=utf-8,${encodeURI(tsvString).split('#').join('%23')}`; // needs to do this after as encodeURI doesn't handle # properly
  const link = document.createElement('a');
  link.setAttribute('href', fileContent);
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const OAUTH_QUERY_PARAM_NAME = 'isOauth';

export const createRedirectURL = ({
  origin,
  path,
  query,
}: {
  origin: string;
  path: string;
  query?: string;
}): string => {
  if (['/', LOGIN_PAGE_PATH, 'undefined'].includes(path)) {
    return '';
  }
  const mergedQuery = `?${query ? `${query}&` : ''}${OAUTH_QUERY_PARAM_NAME}=true`;
  return `&redirect_uri=${origin}${path}${encodeURIComponent(mergedQuery)}`;
};

// source: https://www.npmjs.com/package/react-grid-system#configuration
export const reactGridBreakpoints = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};
