const Hr = styled('hr')`
  border: 0;
  width: 86px;
  height: 3px;
  border-radius: 1.5px;
  background-color: ${({ theme, color }) => theme.colors[color]};
  margin: 0;
`;
