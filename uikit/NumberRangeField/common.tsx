import { styled } from 'uikit';

export const FieldInputWrapper = styled('div')`
  width: 35%;
  height: 100%;

  border: solid 1px ${({ theme }) => theme.colors.grey_1}!important;

  &:first-of-type:not(:last-of-type) {
    border-radius: 10px 0 0 10px !important;
  }
  &:last-of-type:not(:first-of-type) {
    margin: 0px;
    border-radius: 0 10px 10px 0 !important;
  }
`;

export const FieldDescriptionLabel = styled('div')`
  display: flex;
  width: 15%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.grey_2};
  color: ${({ theme }) => theme.colors.black};
  border: solid 1px ${({ theme }) => theme.colors.grey_1};

  font-size: 12px;
  line-height: 1.33;
  font-weight: normal;
  align-items: center;
  justify-content: center;
  &:first-of-type:not(:last-of-type) {
    border-radius: 10px 0 0 10px;
  }
  &:last-of-type:not(:first-of-type) {
    margin: 0px;
    border-radius: 0 10px 10px 0;
  }
`;
