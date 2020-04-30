import { styled } from 'uikit';

export const FieldInputWrapper = styled('div')`
  width: 35%;
  &:first-of-type:not(:last-of-type) {
    border-radius: 10px 0 0 10px;
  }
`;

export const FieldDescriptionLabel = styled('div')`
  display: flex;
  width: 15%;
  height: 30px;
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
    border-right: 0px;
  }
  &:nth-last-of-type(2) {
    margin: 0px;
    border-radius: 0px;
    border-left: 0px;
    border-right: 0px;
  }
`;
