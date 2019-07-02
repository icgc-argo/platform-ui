import { format as formatDate } from 'date-fns';

export const asEnum = (obj, { name = 'enum' } = {}) =>
  new Proxy(obj, {
    get: (obj, prop) => {
      if (obj[prop]) {
        return obj[prop];
      } else {
        const error = new Error(`${prop} is not a valid ${name}`);
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
