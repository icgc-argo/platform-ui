import { InMemoryCache } from 'apollo-cache-inmemory';

export default () =>
  new InMemoryCache({
    dataIdFromObject: obj => {
      if (obj.__typename === 'Program')
        return `PROGRAM::${(obj as { shortName: string }).shortName}`;
      else return obj.id;
    },
  });
