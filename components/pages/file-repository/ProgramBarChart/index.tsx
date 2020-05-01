import SimpleBarChart from '../SimpleBarChart';
import { programData } from '../SimpleBarChart/mockData';

export default () => {
  return <SimpleBarChart data={programData} type={'program'} />;
};
