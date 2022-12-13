/*
 * Copyright (c) 2022 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of
 * the GNU Affero General Public License v3.0. You should have received a copy of the
 * GNU Affero General Public License along with this program.
 *  If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import React, { useEffect, useState } from 'react';
import { Modal, css, Button } from '@icgc-argo/uikit/';
import { Textarea } from '@icgc-argo/uikit/form/Textarea';
import ModalPortal from 'components/Modal';
import MatchResults from './MatchResults';
import UploadButton from './UploadButton';
import { ClinicalEntitySearchResultResponse, defaultClinicalEntityFilters } from '../../common';
import CLINICAL_ENTITY_SEARCH_RESULTS_QUERY from '../gql/CLINICAL_ENTITY_SEARCH_RESULTS_QUERY';
import { useQuery } from '@apollo/client';

declare global {
  interface Window {
    showOpenFilePicker: any;
  }
}

const matchDonorIds = (text) =>
  text
    .match(/(^\d)\d*|((?<=,|, )|(?<=DO))\d*/gi)
    // Remove empty strings and duplicate matches
    ?.filter((match, index, self) => !!match && self.indexOf(match) == index)
    .map((idString) => parseInt(idString)) || [];

const matchSubmitterDonorIds = (text) =>
  text
    .split(',')
    ?.filter((match, index, self) => !!match && self.indexOf(match) == index)
    .map((str) => str.trim()) || [];

//searchResults prop is an array of Object contatining donor and submitter id
export default function FilterModal({
  setModalVisible,
  setSelectedDonors,
  programShortName,
}: {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedDonors: React.Dispatch<React.SetStateAction<string>>;
  programShortName: string;
}) {
  const [filterTextBox, setFilterTextBox] = useState('');

  //make matchID dynamic using useState
  const [numMatched, setNumMatched] = useState(0);
  const [numUnmatched, setNumUnmatched] = useState(0);
  const [matchedIds, setMatchedIds] = useState('');

  // Match text area contents for Donor ID #s
  const filterDonorIds = matchDonorIds(filterTextBox);

  // format text from text area of the filter modal from string to an array of strings
  const filterSubmitterIds = matchSubmitterDonorIds(filterTextBox)
    .filter((id) => parseInt(id) === NaN || !filterDonorIds.includes(matchDonorIds(id)[0]))
    .filter(Boolean);

  // enter the formatted array of string to query and return the matched strings
  const { data: searchResultData } = useQuery<ClinicalEntitySearchResultResponse>(
    CLINICAL_ENTITY_SEARCH_RESULTS_QUERY,
    {
      errorPolicy: 'all',
      variables: {
        programShortName,
        filters: {
          ...defaultClinicalEntityFilters,
          completionState: 'all',
          donorIds: filterDonorIds,
          submitterDonorIds: filterSubmitterIds,
          entityTypes: ['donor'],
        },
      },
    },
  );

  useEffect(() => {
    //format the string from text area of the modal to create an set of IDs, so we know the total number
    const filteredTextAreaIDs = new Set();

    const initialIdsCount = filterDonorIds.length + filterSubmitterIds.length;

    // remove the IDs in each result from the set. to then use the set size as the unmatched IDs count
    const queryResults = searchResultData?.clinicalSearchResults?.searchResults || [];

    queryResults.forEach((result) => {
      const donorIdMatch = filterDonorIds.includes(result.donorId);
      const submitterIdMatch = filterSubmitterIds.includes(result.submitterDonorId);

      if (donorIdMatch || submitterIdMatch) {
        filteredTextAreaIDs.add(result.donorId);
      }
    });

    // Update MatchResults Component with the matched and unmatched number
    const matchedCount = filteredTextAreaIDs.size;
    const unmatchedCount = initialIdsCount - filteredTextAreaIDs.size;

    setNumMatched(matchedCount);
    setNumUnmatched(unmatchedCount);
    setMatchedIds(Array.from(filteredTextAreaIDs).join(','));
  }, [searchResultData]);

  const handleResults = (results) => {
    if (filterTextBox) {
      setFilterTextBox(filterTextBox + ', ' + results);
    } else {
      setFilterTextBox(results);
    }
  };

  return (
    <ModalPortal>
      <Modal
        title={'Filter by List of IDs'}
        actionButtonText="View Results"
        actionDisabled={filterTextBox ? false : true}
        cancelText="Cancel"
        onActionClick={() => {
          setSelectedDonors(matchedIds);
          setModalVisible(false);
        }}
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
            placeholder="e.g. D05490, PCSI_0467, D05499"
            aria-label="Donor IDs"
            id="id_list"
            value={filterTextBox}
            onChange={(e) => setFilterTextBox(e.target.value)}
          />
          <br></br>
          <div>
            Choose a file to upload <b>&#40;.txt/.csv/.tsv&#41;</b>
          </div>
          <UploadButton onUpload={handleResults} />

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
            {/* section of matched and unmatched ID */}
            <MatchResults numMatched={numMatched} numUnmatched={numUnmatched} />
            {/* <Button> of clear button */}
            {filterTextBox && (
              <Button
                onClick={(e) => {
                  setFilterTextBox('');
                }}
                css={css`
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
