/*
 * Copyright (c) 2020 The Ontario Institute for Cancer Research. All rights reserved
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

import { css } from 'uikit';
import Container from 'uikit/Container';
import { Row, Col } from 'react-grid-system';
import Table from 'uikit/Table';
import Typography from 'uikit/Typography';
import Button from 'uikit/Button';
import Icon from 'uikit/Icon';
import Link from 'uikit/Link';
import { useTheme } from 'uikit/ThemeProvider';
import typography from 'uikit/theme/defaultTheme/typography';

const DataRow: React.ComponentType<{ name: string; link: string; fileCount: number }> = ({
  name,
  link,
  fileCount,
}) => (
  <Row
    justify="between"
    css={css`
      width: 100%;
    `}
  >
    <Col
      xs={10}
      css={css`
        white-space: nowrap;
        align-self: center;
      `}
    >
      <Typography variant="data">{name}</Typography>
    </Col>
    <Col
      xs={2}
      css={css`
        white-space: nowrap;
      `}
    >
      {fileCount === 0 ? (
        <div>
          <Icon
            css={css`
              white-space: nowrap;
              margin-top: 5px;
              margin-right: 10px;
            `}
            name="file"
            fill="grey_1"
            height="15px"
          />
          <Typography
            variant="caption"
            bold
            css={css`
              position: relative;
              white-space: nowrap;
              top: -3px;
            `}
          >
            {fileCount}
          </Typography>
        </div>
      ) : (
        <div>
          <Icon
            css={css`
              white-space: nowrap;
              margin-top: 5px;
              margin-right: 10px;
            `}
            name="file"
            fill="accent2"
            height="15px"
          />
          <Link
            css={css`
              position: relative;
              white-space: nowrap;
              top: -3px;
            `}
            bold
            href={link}
          >
            {fileCount}
          </Link>
        </div>
      )}
    </Col>
  </Row>
);

const FileTable: React.ComponentType<{ header: string; data: Array<any> }> = ({ header, data }) => {
  const theme = useTheme();
  return (
    <Col xs={12}>
      <Table
        variant="STATIC"
        parentRef={{ current: null }}
        showPagination={false}
        data={data}
        columns={[
          {
            sortable: false,
            Header: header.toUpperCase(),
            headerStyle: {
              background: theme.colors.secondary_4,
            },
            accessor: 'id',
            style: { whiteSpace: 'unset' },
          },
        ]}
      />
    </Col>
  );
};

export default () => {
  return (
    <Container
      css={css`
        padding: 20px;
        padding-top: 0px;
      `}
    >
      <Row justify="between">
        <Col>
          <Typography variant="subtitle" as="h2">
            Available Files
          </Typography>
        </Col>
        <Col
          css={css`
            display: flex;
            align-self: center;
            justify-content: right;
          `}
        >
          <Button
            css={css`
              white-space: nowrap;
            `}
            variant="text"
          >
            <Icon
              css={css`
                padding-right: 4px;
              `}
              name="download"
              fill="accent2_dark"
              height="12px"
            />
            Manifest
          </Button>
          <Button
            css={css`
              white-space: nowrap;
            `}
            variant="text"
          >
            View All
            <Icon
              css={css`
                padding-left: 3px;
                position: relative;
                top: 1px;
              `}
              name="chevron_right"
              fill="accent2_dark"
              height="12px"
            />
          </Button>
        </Col>
      </Row>
      <Row>
        <FileTable
          header={'Data Types'}
          data={[
            { id: <DataRow name={'Simple Nucleotide Variation'} link={'#'} fileCount={5} /> },
            { id: <DataRow name={'Copy Number Variation'} link={'#'} fileCount={21} /> },
          ]}
        />
        <FileTable
          header={'Experimental Strategies'}
          data={[
            { id: <DataRow name={'WXS'} link={'#'} fileCount={5} /> },
            { id: <DataRow name={'WGS'} link={'#'} fileCount={0} /> },
            { id: <DataRow name={'Targeted Sequencing'} link={'#'} fileCount={0} /> },
          ]}
        />
      </Row>
    </Container>
  );
};
