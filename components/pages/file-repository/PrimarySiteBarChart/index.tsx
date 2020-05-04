import SimpleBarChart from '../SimpleBarChart';
import { primarySiteData } from '../SimpleBarChart/mockData';

export default () => {
  return <SimpleBarChart data={primarySiteData} type={'primary site'} />;
};
