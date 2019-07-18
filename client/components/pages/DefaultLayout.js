import { css } from 'uikit';
import AppBar, { Logo, MenuGroup, MenuItem, Section } from 'uikit/AppBar';
import Button from 'uikit/Button';
import Footer from 'uikit/Footer';

const LinkToHome = props => <a style={{ cursor: 'pointer' }} {...props} onClick={() => 'TODO'} />;

const LinkToDataRepo = props => <a {...props} onClick={() => 'TODO'} />;

export default function DefaultLayout({ children }) {
  return (
    <div
      css={css`
        min-height: 100vh;
        display: grid;
        grid-template-rows: auto 1fr auto;
      `}
    >
      <AppBar>
        <Section>
          <Logo DomComponent={LinkToHome} />
          <MenuGroup>
            <MenuItem DomComponent={LinkToDataRepo}>Data Repository</MenuItem>
          </MenuGroup>
        </Section>
        <Section>
          <div
            css={css`
              display: flex;
              align-items: center;
              margin-right: 17px;
            `}
          >
            <Button>Login</Button>
          </div>
        </Section>
      </AppBar>
      {children}
      <Footer
        css={css`
          padding: 0 24px;
          box-shadow: 0 6px 0px 0px white, 0 1px 6px 0 rgba(0, 0, 0, 0.1),
            0 1px 5px 0 rgba(0, 0, 0, 0.08);
        `}
        links={[
          { displayName: 'Contact', href: '#' },
          { displayName: 'Documentation', href: '#' },
          { displayName: 'Privacy Policy', href: '#' },
          { displayName: 'Terms & Conditions', href: '#' },
          { displayName: 'Publication Policy', href: '#' },
        ]}
      />
    </div>
  );
}
