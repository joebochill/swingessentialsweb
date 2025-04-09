import { Button, ButtonProps } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

export const SignInButton: React.FC<ButtonProps> = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <Button
            variant={'outlined'}
            color={'inherit'}
            onClick={(): void => {
                // check if the current route is not the login page
                if (location.pathname !== ROUTES.LOGIN) {
                    navigate(ROUTES.LOGIN, {
                        state: { from: { pathname: location.pathname } },
                    });
                }
            }}
            {...props}
        >
            SIGN IN
        </Button>
    );
};
