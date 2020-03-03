import * as React from 'react';
import Typography from 'uikit/Typography';
import { css, styled } from 'uikit';
import Link from 'uikit/Link';
import Icon from 'uikit/Icon';
import { DACO_PATH } from 'global/constants/pages';

export default function DacoAccessStatusDisplay({ approved }: { approved: boolean }) {
  /** @description: making these components so it's easier to extract out later if needs arises */
  const ContainerComponent = styled('div')`
    display: flex;
    border: solid 1px ${({ theme }) => theme.colors.grey_2};
    padding: 8px;
    border-radius: 8px;
    & > :not(:last-child) {
      border-right: solid 1px ${({ theme }) => theme.colors.grey_2};
    }
  `;
  const SectionComponent = styled('div')`
    display: flex;
    align-items: center;
    &:not(:first-child) {
      padding-left: 8px;
      padding-right: 8px;
    }
    &:first-child {
      padding-right: 8px;
    }
    &:last-child {
      padding-left: 8px;
    }
  `;
  const Container: typeof ContainerComponent & {
    Section?: typeof SectionComponent;
  } = ContainerComponent;
  Container.Section = SectionComponent;
  return (
    <Container>
      <Container.Section>
        <div
          css={css`
            margin-right: 8px;
            flex: 1;
            display: flex;
            align-items: center;
          `}
        >
          {approved ? (
            <Icon name="success" fill="success" height="30px" />
          ) : (
            <Icon name="times_circle" fill="error" height="30px" />
          )}
        </div>
        {approved ? (
          <Typography variant="data" color="success_dark">
            DACO <br />
            Approved
          </Typography>
        ) : (
          <Typography variant="data" color="error_dark">
            Not DACO <br />
            Approved
          </Typography>
        )}
      </Container.Section>
      <Container.Section>
        {approved ? (
          <Typography variant="label" component="div">
            You have access to download controlled data.{' '}
            <Link withChevron underline={false}>
              VIEW FILES
            </Link>
          </Typography>
        ) : (
          <Typography variant="label" component="div">
            To download controlled data,{' '}
            <Link target="_blank" href={DACO_PATH}>
              apply for DACO access.
            </Link>
          </Typography>
        )}
      </Container.Section>
    </Container>
  );
}
