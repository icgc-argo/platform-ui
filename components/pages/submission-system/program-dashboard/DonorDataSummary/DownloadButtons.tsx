import { Row, Col } from 'react-grid-system';
import urlJoin from 'url-join';
import { css } from '@emotion/core';
import Button from 'uikit/Button';
import Icon from 'uikit/Icon';
import { usePageQuery } from 'global/hooks/usePageContext';
import Cookies from 'js-cookie';
import { EGO_JWT_KEY } from 'global/constants';
import { saveAs } from 'file-saver';
import React from 'react';
import { format as formatDate } from 'date-fns';
import { useToaster } from 'global/hooks/toaster';
import { TOAST_VARIANTS } from 'uikit/notifications/Toast';
import { getConfig } from 'global/config';

const DownloadButton = ({
  text,
  onClick,
  isLoading = false,
}: {
  text: string;
  onClick?: any;
  isLoading?: boolean;
}) => (
  <Button
    isLoading={isLoading}
    css={css`
      white-space: nowrap;
    `}
    variant="secondary"
    onClick={onClick}
  >
    <Icon
      css={css`
        padding-right: 4px;
      `}
      name="download"
      fill="accent2_dark"
      height="12px"
    />
    {text}
  </Button>
);

const DownloadButtons = () => {
  const toaster = useToaster();

  const { shortName: programShortName } = usePageQuery<{ shortName: string }>();

  const [buttonLoadingState, setButtonLoadingState] = React.useState({
    isDownloadAllLoading: false,
  });

  const checkResponseIs200 = (res: Response) => {
    if (res.status !== 200) {
      throw new Error('Download failed');
    }
    return res;
  };

  const handleDownloadAllError = () => {
    toaster.addToast({
      interactionType: 'CLOSE',
      title: `Download Error`,
      variant: TOAST_VARIANTS.ERROR,
      content: 'File failed to download.',
    });
    setButtonLoadingState({ ...buttonLoadingState, isDownloadAllLoading: false });
  };

  const onClickDownloadAll = () => {
    const { GATEWAY_API_ROOT } = getConfig();
    // const GATEWAY_API_ROOT = `http://localhost:9000`;
    const url = urlJoin(
      GATEWAY_API_ROOT,
      `/clinical/program/${programShortName}/all-clinical-data`,
    );

    setButtonLoadingState({ ...buttonLoadingState, isDownloadAllLoading: true });
    fetch(url, {
      headers: {
        authorization: `Bearer ${Cookies.get(EGO_JWT_KEY) || ''}`,
      },
      method: 'GET',
    })
      .then(checkResponseIs200)
      .then(res => res.blob())
      .then(blob => {
        const now = formatDate(Date.now(), 'YYYYMMDD');
        const fileName = `${programShortName}_Clinical_data_${now}.zip`;

        setButtonLoadingState({ ...buttonLoadingState, isDownloadAllLoading: false });

        saveAs(blob, fileName);
      })
      .catch(handleDownloadAllError);
  };

  return (
    <Row>
      <Col>
        <DownloadButton
          text={'All Clinical Data'}
          onClick={onClickDownloadAll}
          isLoading={buttonLoadingState.isDownloadAllLoading}
        />
      </Col>
      <Col>
        <DownloadButton text={'Missing Data'} />
      </Col>
      <Col>
        <DownloadButton text={'Table Data'} />
      </Col>
    </Row>
  );
};

export default DownloadButtons;
