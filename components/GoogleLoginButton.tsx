import GoogleLogin from 'uikit/Button/GoogleLogin';
import useAuthContext from 'global/hooks/useAuthContext';

const GoogleLoginButton: React.ComponentType<
  React.ComponentProps<typeof GoogleLogin> & {
    logoutToRoot?: boolean;
  }
> = ({ logoutToRoot = false, ...props }) => {
  const { logOut } = useAuthContext();
  return (
    <GoogleLogin
      {...props}
      onClick={e => {
        if (props.onClick) {
          props.onClick(e);
        }
        logOut({ toRoot: logoutToRoot });
      }}
    />
  );
};

export default GoogleLoginButton;
