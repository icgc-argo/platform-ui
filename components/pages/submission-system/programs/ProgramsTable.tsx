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

import {
  css,
  InteractiveIcon,
  Link,
  PercentageBar,
  Table,
  TableColumnConfig,
} from '@icgc-argo/uikit';
import { PROGRAM_DASHBOARD_PATH, PROGRAM_SHORT_NAME_PATH } from 'global/constants/pages';
import get from 'lodash/get';
import NextLink from 'next/link';
import { ComponentType, createRef, ElementType, useMemo } from 'react';

type ArgoMembershipKey = 'FULL' | 'ASSOCIATE';
type ProgramsTableProgram = {
  shortName: string;
  name: string | null;
  cancerTypes: Array<string>;
  countries: Array<string> | null;
  membershipType: ArgoMembershipKey | null;
  genomicDonors: number | null;
  submittedDonors: number | null;
  commitmentDonors: number | null;
  administrators: Array<any>;
};
type TableProgramInternal = ProgramsTableProgram & { donorPercentage: number };
type CellProps = { original: TableProgramInternal };

const MembershipDisplayName: { [key in ArgoMembershipKey]: string } = {
  FULL: 'FULL',
  ASSOCIATE: 'ASSOCIATE',
};

const FormattedCell: ComponentType<{ cellInfo: TableProgramInternal }> = ({
  children,
  cellInfo,
}) => {
  const isRenderingOnMultipleRows = useMemo(() => {
    return cellInfo.countries.length > 1 || cellInfo.cancerTypes.length > 1;
  }, [cellInfo]);

  return (
    <div
      css={css`
        width: 100%;
        align-self: ${isRenderingOnMultipleRows ? `flex-start` : `center`};
      `}
    >
      {children}
    </div>
  );
};

export default function ProgramsTable(tableProps: {
  programs: Array<ProgramsTableProgram>;
  onProgramUsersClick: ({ program }: { program: ProgramsTableProgram }) => void;
  onProgramEditClick: ({ program }: { program: ProgramsTableProgram }) => void;
  loading: boolean;
  loadingUser: boolean;
  LoadingComponent: ElementType;
}) {
  const data: Array<TableProgramInternal> = tableProps.programs.map((p) => ({
    ...p,
    donorPercentage: (p.submittedDonors || 0) / (p.commitmentDonors || 1),
  }));
  const columns: Array<TableColumnConfig<TableProgramInternal>> = [
    {
      Header: 'Short Name',
      accessor: 'shortName',
      Cell: ({ original }) => (
        <FormattedCell cellInfo={original}>
          <NextLink
            href={PROGRAM_DASHBOARD_PATH}
            as={PROGRAM_DASHBOARD_PATH.replace(PROGRAM_SHORT_NAME_PATH, original.shortName)}
          >
            <Link>{original.shortName}</Link>
          </NextLink>
        </FormattedCell>
      ),
    },
    {
      Header: 'Program Name',
      accessor: 'name',
      Cell: ({ original }) => <FormattedCell cellInfo={original}>{original.name}</FormattedCell>,
    },
    {
      Header: 'Cancer Types',
      accessor: 'cancerTypes',
      Cell: ({ original }) => (
        <FormattedCell cellInfo={original}>
          {original.cancerTypes.map((cancerType, i) => (
            <div key={cancerType}>
              {cancerType}
              {i < original.cancerTypes.length - 1 && ','}
            </div>
          ))}
        </FormattedCell>
      ),
    },
    {
      Header: 'Countries',
      accessor: 'countries',
      Cell: ({ original }) => {
        const list = original.countries || [];
        return (
          <FormattedCell cellInfo={original}>
            {list.map((country, i) => (
              <div key={country}>
                {country}
                {i < list.length - 1 && ','}
              </div>
            ))}
          </FormattedCell>
        );
      },
    },
    {
      Header: 'Membership',
      accessor: 'membershipType',
      Cell: ({ original }) => (
        <FormattedCell cellInfo={original}>
          {original.membershipType ? MembershipDisplayName[original.membershipType] : ''}
        </FormattedCell>
      ),
    },
    {
      Header: 'Administrators',
      accessor: 'administrators',
      Cell: ({ original }) => {
        const adminLinks = get(original, 'administrators', []).map((admin, idx) => (
          <Link
            key={admin.email}
            href={`mailto: ${admin.email}`}
            css={css`
              margin-right: 0.5em;
            `}
          >
            {admin.firstName + ' ' + admin.lastName}
            {idx != original.administrators.length - 1 && ','}
          </Link>
        ));

        const cellContent = tableProps.loadingUser ? <>Loading</> : adminLinks;

        return <FormattedCell cellInfo={original}>{cellContent}</FormattedCell>;
      },
    },
    {
      Header: 'Donor Status',
      accessor: 'donorPercentage',
      width: 200,
      Cell: ({ original }) => (
        <FormattedCell cellInfo={original}>
          <PercentageBar
            nom={original.submittedDonors}
            denom={original.commitmentDonors}
            css={css`
              display: flex;
              justify-content: flex-start;
            `}
          />
        </FormattedCell>
      ),
    },
    {
      Header: 'Actions',
      sortable: false,
      width: 100,
      Cell: ({ original }) => (
        <FormattedCell
          cellInfo={original}
          css={css`
            width: 100%;
          `}
        >
          <div
            css={css`
              width: 100%;
              display: flex;
              flex-direction: row;
              justify-content: space-around;
              flex: 1;
            `}
          >
            <InteractiveIcon
              position="bottom"
              html={<span>Manage users</span>}
              height="20px"
              width="20px"
              name="users"
              onClick={() => tableProps.onProgramUsersClick({ program: original })}
            />
            <InteractiveIcon
              position="bottom"
              html={<span>Edit program</span>}
              height="20px"
              width="20px"
              name="edit"
              onClick={() => tableProps.onProgramEditClick({ program: original })}
            />
          </div>
        </FormattedCell>
      ),
    },
  ];
  return (
    <Table
      parentRef={createRef()}
      data={data}
      columns={columns}
      showPagination={false}
      loading={tableProps.loading}
      pageSize={tableProps.programs.length}
      LoadingComponent={tableProps.LoadingComponent}
    />
  );
}
