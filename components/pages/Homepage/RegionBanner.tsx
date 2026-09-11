import { css } from '@icgc-argo/uikit';
import { getConfig } from '../../../global/config';

const RegionBanner = ({ fontSize = '24px' }: { fontSize?: string }) => {
  const { RDPC_REGION_DISPLAY_NAME } = getConfig();
  return (
    <div
      css={css({
        borderRadius: '3px',
        backgroundColor: '#0774d3',
        padding: '4px 8px',
        color: 'white',
        fontSize,
        display: 'flex',
        alignItems: 'center',
      })}
    >
      {RDPC_REGION_DISPLAY_NAME}
    </div>
  );
};

export default RegionBanner;
