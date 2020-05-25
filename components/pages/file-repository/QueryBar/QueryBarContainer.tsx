import React from 'react';
import Typography from 'uikit/Typography';
import Container from 'uikit/Container';
import Icon from 'uikit/Icon';
import { Col } from 'react-grid-system';
import { css } from 'uikit';
import QueryBar from './';
import isEmpty from 'lodash/isEmpty';
import { useTheme } from 'uikit/ThemeProvider';
import useFiltersContext from '../hooks/useFiltersContext';
import Button from 'uikit/Button';
import sqonBuilder from 'sqon-builder';
import { BUTTON_VARIANTS, BUTTON_SIZES } from 'uikit/Button';

import { PaddedRow } from '../index';

const QueryBarContainer = () => {
  const theme = useTheme();
  const { filters, setFilters } = useFiltersContext();

  return (
    <PaddedRow justify="around">
      <Col xl={12}>
        <Container
          css={css`
            margin-bottom: 8px;
            justify-content: start;
            padding: 2px 10px;
            border-radius: 0px;
            background-color: ${theme.colors.grey_4};
          `}
        >
          {isEmpty(filters) || filters.content.length === 0 ? (
            <Typography
              css={css`
                display: flex;
                align-items: center;
              `}
            >
              {/* for testing only */}
              <Button
                variant={BUTTON_VARIANTS.SECONDARY}
                size={BUTTON_SIZES.SM}
                onClick={() =>
                  setFilters(
                    sqonBuilder
                      .has('primary_site', ['lung', 'heart', 'brain', 'blood', 'kidney'])
                      .build(),
                  )
                }
              >
                Filters
              </Button>
              {/* for testing only */}
              <Icon
                css={css`
                  vertical-align: middle;
                  margin-right: 10px;
                `}
                name="arrow_left"
              />
              <span>Search the file repository by selecting filters</span>
            </Typography>
          ) : (
            <QueryBar filters={filters} />
          )}
        </Container>
      </Col>
    </PaddedRow>
  );
};

export default QueryBarContainer;
