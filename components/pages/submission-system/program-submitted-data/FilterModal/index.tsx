import React, { useState } from 'react';
import Modal from '@icgc-argo/uikit/Modal';
import Textarea from '@icgc-argo/uikit/form/Textarea';
import { useTheme } from '@icgc-argo/uikit/ThemeProvider';
import { css } from '@icgc-argo/uikit';
import Button from '@icgc-argo/uikit/Button';
import ModalPortal from 'components/Modal';
import MatchResults from './MatchResults';
import { fileOpen, supported } from 'browser-fs-access';

export default function FilterModal({ setModalVisible }: { setModalVisible: any }) {
  const [idList, setIdList] = useState('');
  const theme = useTheme();

  let fileHandle;
  const pickerOpts = {
    types: [
      {
        accept: {
          'text/*': ['.txt', '.csv'],
        },
      },
    ],
    excludeAcceptAllOption: true,
    multiple: true,
  };

  //make matchID dynamic
  const numMatched = 3;
  const numUnmatched = 6;

  return (
    <ModalPortal>
      <Modal
        title={'Filter by List of IDs'}
        actionButtonText="View Results"
        actionDisabled={idList ? false : true}
        cancelText="Cancel"
        // onActionClick={function noRefCheck() {}}
        onCancelClick={() => setModalVisible(false)}
        onCloseClick={() => setModalVisible(false)}
      >
        <div>
          <div>
            Type or copy-and-paste a list of <b>donor ids or submitter donor ids,</b> separated by a
            comma:
          </div>
          <br></br>
          <Textarea
            css={css`
              height: 135px;
            `}
            placeholder="e.g. D05490,
                    PCSI_0467,
                    D05499"
            aria-label="Donor IDs"
            id="id_list"
            value={idList}
            onChange={(e) => setIdList(e.target.value)}
          ></Textarea>
          <br></br>
          <div>
            Or choose a <b>.txt</b> or a <b>.csv</b> file to upload
          </div>

          <Button
            size="sm"
            onClick={async () => {
              if (supported) {
                try {
                  [fileHandle] = await window.showOpenFilePicker(pickerOpts);
                  const file = await fileHandle.getFile();
                  const content = await file.text();
                  console.log('supported');
                  if (idList) {
                    setIdList(idList + ', ' + content);
                  } else {
                    setIdList(content);
                  }
                } catch (abortError) {
                  return;
                }
              } else {
                console.log('unsupported');
                const blob = await fileOpen({ mimeTypes: ['text/*'], multiple: true });
              }
            }}
          >
            Browse
          </Button>

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
            <MatchResults numMatched={numMatched} numUnmatched={numUnmatched} />
            {/* <Button> of clear button */}
            {idList && (
              <Button
                onClick={(e) => {
                  setIdList('');
                }}
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
            )}
          </div>
        </div>
      </Modal>
    </ModalPortal>
  );
}
