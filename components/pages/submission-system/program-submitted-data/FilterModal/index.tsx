import * as React from 'react';
import { useState } from 'react';
import Modal, { ModalContainer } from '@icgc-argo/uikit/Modal';
import Textarea from '@icgc-argo/uikit/form/Textarea';
import FileSelectButton from '@icgc-argo/uikit/FileSelectButton';
import styled from '@emotion/styled';
import { css } from '@icgc-argo/uikit';
import Button from '@icgc-argo/uikit/Button';
import ModalPortal from 'components/Modal';

export default function FilterModal({ setModalVisible }: { setModalVisible: any }) {
  const [idList, setIdList] = useState('');

  //make matchID dynamic
  const matchID = 3;
  const unmatchedID = 6;

  return (
    <ModalPortal>
      <Modal
        title={'Filter by List of IDs'}
        actionButtonText="View Results"
        actionDisabled={idList ? false : true}
        cancelText="Cancel"
        onActionClick={function noRefCheck() {}}
        onCancelClick={() => setModalVisible(false)}
        onCloseClick={() => setModalVisible(false)}
        ContainerEl={styled(ModalContainer)`
          width: 100%;
        `}
      >
        <div>
          <div>
            Type or copy-and-paste a list of <b>donor ids or submitter donor ids,</b> separated by
            new lines:
          </div>
          <br></br>
          <Textarea
            placeholder="e.g. D05490,
                    PCSI_0467,
                    D05499"
            aria-label="Donor IDs"
            id="donor_ids"
            css={css`
              height: 115px;
            `}
            value={idList}
            onChange={(e) => setIdList(e.target.value)}
          ></Textarea>
          <br></br>
          <div>
            Or choose a <b>txt</b> file to upload
          </div>
          <FileSelectButton
            css={css`
              margin-top: 7px;
            `}
            id="button-submission-file-select" // For Selenium
            isAsync
            variant="primary"
            size={'sm'}
            inputProps={{
              accept: '.tsv',
              multiple: true,
            }}
            onFilesSelect={null}
            // isLoading={isUploading}
            // disabled={!uploadEnabled}
            // Loader={(props) => <InstructionLoader text="VALIDATING FILES" {...props} />}
          >
            Browse
          </FileSelectButton>

          {/* parent <div> of the bottom four items, title, match ID, unmatched ID and clear button */}
          <div
            css={css`
              margin-top: 30px;
              display: flex;
              flex-direction: column;
              gap: 10px;
            `}
          >
            <b
              css={css`
                color: #0774d3;
              `}
            >
              Your ID List results in:
            </b>
            {/* <div> of matched ID */}
            <div
              css={css`
                display: flex;
                align-items: center;
              `}
            >
              Matched IDs:
              <b
                css={css`
                  margin-left: 4px;
                  color: #0774d3;
                `}
              >
                {matchID}
              </b>
            </div>
            {/* <div> of unmatched ID */}
            <div
              css={css`
                display: flex;
                align-items: center;
              `}
            >
              Unmatched IDs:
              <b
                css={css`
                  margin-left: 4px;
                  color: #0774d3;
                `}
              >
                {unmatchedID}
              </b>
            </div>

            {/* <Button> of clear button */}
            <Button
              onClick={() => setIdList('')}
              css={css`
                // background-color: inherit;
                border: none;
                width: fit-content;
                padding: 2px;
              `}
              variant="secondary"
            >
              <u>Clear Upload</u>
            </Button>
          </div>
        </div>
      </Modal>
    </ModalPortal>
  );
}
