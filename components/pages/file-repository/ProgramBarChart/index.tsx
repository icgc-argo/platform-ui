import SimpleBarChart from '../SimpleBarChart';
import { programData } from '../SimpleBarChart/mockData';

export default () => {
  const totalCount = programData.length;
  return <SimpleBarChart data={programData} type={'program'} totalCount={totalCount} />;
};
