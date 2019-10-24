import { format as formatDate } from 'date-fns';
import orderBy from 'lodash/orderBy';
import uniq from 'lodash/uniq';

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

const standardDate = 'YYYY-MM-DD';
export const displayDate = date => formatDate(date, standardDate);

const dateTimeFormat = 'MMMM D, YYYY [at] h:mm A';
export const displayDateAndTime = date => formatDate(new Date(date), dateTimeFormat);

export const sleep = (time: number = 2000) =>
  new Promise(resolve => {
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
        [key]: options.headerDisplays[key] || key,
      }),
      {},
    ),
  } = options;
  const orderedKeys = orderBy(allKeys, key => order.indexOf(key));

  /**
   * construct the tsv data
   */
  const filteredKeys = orderedKeys
    .filter(key => !excludeKeys.includes(key))
    .filter(key => includeKeys.includes(key));
  const dataRows: string[][] = data.map(entry => filteredKeys.map(key => String(entry[key])));
  const headerRow = filteredKeys.map(key => headerDisplays[key]);
  const tsvString = [headerRow, ...dataRows].map(row => row.join('\t')).join('\n');

  /**
   * export data to tsv
   */
  const fileContent = `data:text/tsv;charset=utf-8,${encodeURI(tsvString)
    .split('#')
    .join('%23')}`; // needs to do this after as encodeURI doesn't handle # properly
  const link = document.createElement('a');
  link.setAttribute('href', fileContent);
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
