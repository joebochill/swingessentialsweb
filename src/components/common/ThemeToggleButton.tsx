import { JSX } from 'react';
import { DarkMode, LightMode } from '@mui/icons-material';
import { IconButtonProps, useColorScheme, Tooltip, IconButton } from '@mui/material';
import { useDarkMode } from '../../hooks';

type ThemeType = 'light' | 'dark' | 'system';
export const ThemeToggleButton: React.FC<IconButtonProps> = (props): JSX.Element => {
    const { sx, ...other } = props;
    const { setMode } = useColorScheme();
    const { isDarkMode } = useDarkMode();

    const handleThemeChange = (theme: ThemeType) => {
        setMode(theme);
    };
    return (
        <Tooltip title={'Toggle theme'} placement="right">
            <IconButton
                sx={[{ color: 'inherit' }, ...(Array.isArray(sx) ? sx : [sx])]}
                onClick={() => handleThemeChange(isDarkMode ? 'light' : 'dark')}
                {...other}
            >
                {isDarkMode ? <DarkMode /> : <LightMode />}
            </IconButton>
        </Tooltip>
    );
};
