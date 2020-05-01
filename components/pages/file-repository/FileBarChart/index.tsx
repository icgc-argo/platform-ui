import SimpleBarChart from '../SimpleBarChart';
import { fileTypeData } from '../SimpleBarChart/mockData';

export default () => {
  return <SimpleBarChart data={fileTypeData} type={'data type'} />;
};
