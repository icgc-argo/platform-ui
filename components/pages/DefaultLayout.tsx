import NavBar from 'components/NavBar';
import Footer from '../Footer';
import { PageContainer } from 'uikit/PageLayout';
import styled from '@emotion/styled';

const ThreeRowPageContainer = styled(PageContainer)`
  grid-template-rows: 58px 1fr 59px; /* header + content + footer + 1px border */
`;

export default function DefaultLayout({ children }) {
  return (
    <ThreeRowPageContainer>
      <NavBar />
      <div>{children}</div>
      <Footer />
    </ThreeRowPageContainer>
  );
}
