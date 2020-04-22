import SimpleBarChart from '../SimpleBarChart';
import { primarySiteData } from '../SimpleBarChart/mockData';

export default () => {
  const totalDataSize = primarySiteData.reduce((acc, item) => item.count + acc, 0);
  const totalCount = primarySiteData.length;
  return (
    <SimpleBarChart
      data={primarySiteData}
      type={'primary site'}
      totalDataSize={`${totalDataSize}`}
      totalCount={totalCount}
    />
  );
};
