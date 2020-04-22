import SimpleBarChart from '../SimpleBarChart';
import { fileTypeData } from '../SimpleBarChart/mockData';

export default () => {
  const totalSize = fileTypeData.reduce((acc, item) => item.count + acc, 0);
  const totalCount = fileTypeData.length;
  return (
    <SimpleBarChart
      data={fileTypeData}
      type={'data type'}
      totalDataSize={`${totalSize}`}
      totalCount={totalCount}
    />
  );
};
