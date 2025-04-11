import type {} from '@mui/material/themeCssVarsAugmentation';
import { createTheme } from '@mui/material/styles';

const purple = {
    50: '#f1f0f4',
    100: '#bdbcd0',
    200: '#918fb0',
    300: '#656290',
    400: '#4F4C81',
    500: '#231f61',
    600: '#1f1b59',
    700: '#1a174f',
    800: '#151245',
    900: '#0c0a33',
};

export const red = {
    50: '#f9e8e8',
    100: '#efc5c5',
    200: '#e59e9e',
    300: '#da7777',
    400: '#d2595a',
    500: '#ca3c3d',
    600: '#c53637',
    700: '#bd2e2f',
    800: '#b72727',
    900: '#ab1a1a',
};

export const SwingEssentialsTheme = createTheme({
    cssVariables: { colorSchemeSelector: 'class' },
    typography: {
        fontFamily: '"Open Sans", Helvetica, Roboto, sans-serif',
        fontWeightMedium: 600,
    },
    shape: {
        borderRadius: 0,
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: ({ theme }) =>
                    theme.unstable_sx({
                        display: 'flex',
                        flexDirection: 'column',
                    }),
            },
        },
        MuiCardHeader: {
            styleOverrides: {
                root: ({ theme }) =>
                    theme.unstable_sx({
                        flex: '0 0 auto',
                        backgroundColor: 'primary.main',
                        color: 'primary.contrastText',
                    }),
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: ({ theme }) =>
                    theme.unstable_sx({
                        position: 'relative',
                        '&.Mui-selected': {
                            backgroundColor: 'action.selected',
                            '&:after': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: 4,
                                height: '100%',
                                backgroundColor: 'secondary.main',
                            },
                        },
                    }),
            },
        },
        MuiListItemText: {
            defaultProps: {
                slotProps: {
                    primary: {
                        variant: 'body1',
                        color: 'text.primary',
                        fontWeight: 600,
                    },
                    secondary: {
                        variant: 'subtitle2',
                        color: 'text.primary',
                        fontWeight: 400,
                    },
                },
            },
        },
        MuiDialog: {
            defaultProps: {
                fullWidth: true,
                maxWidth: 'sm',
                closeAfterTransition: false,
            },
        },
        MuiFormHelperText: {
            styleOverrides: {
                contained: ({ theme }) =>
                    theme.unstable_sx({
                        ml: 0,
                        mr: 0,
                        color: 'text.primary',
                        '&.Mui-error': {
                            color: 'error.contrastText',
                            m: 0,
                            px: 2,
                            py: 1,
                            backgroundColor: 'error.main',
                        },
                    }),
            },
        },
        MuiFilledInput: {
            styleOverrides: {
                root: ({ theme }) =>
                    theme.unstable_sx({
                        '&.Mui-error:after, &.Mui-error:before': {
                            borderBottomColor: 'error.light',
                        },
                    }),
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: ({ theme }) =>
                    theme.unstable_sx({
                        '&.Mui-error': {
                            color: 'error.main',
                        },
                        ...theme.applyStyles(
                            'dark',
                            theme.unstable_sx({
                                '&.Mui-error': {
                                    color: 'error.light',
                                },
                            })
                        ),
                    }),
                shrink: ({ theme }) =>
                    theme.applyStyles(
                        'dark',
                        theme.unstable_sx({
                            '&.Mui-error': {
                                color: 'error.light',
                            },
                        })
                    ),
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    lineHeight: 2,
                },
            },
        },
        MuiDialogActions: {
            styleOverrides: {
                root: ({ theme }) =>
                    theme.unstable_sx({
                        px: 3,
                        py: 2,
                        justifyContent: 'space-between',
                    }),
            },
        },
    },
    colorSchemes: {
        light: {
            palette: {
                mode: 'light',
                primary: {
                    light: purple[50],
                    main: purple[400],
                    dark: purple[500],
                },
                secondary: {
                    light: purple[50],
                    main: purple[400],
                    dark: purple[500],
                },
                error: {
                    light: red[50],
                    main: red[500],
                    dark: red[700],
                    contrastText: '#fff',
                },
                background: {
                    default: '#eef0f0',
                    paper: '#ffffff',
                },
                text: {
                    primary: purple[500],
                    secondary: '#424e54',
                },
                action: {
                    hover: purple[50],
                    selected: purple[50],
                },
            },
        },
        dark: {
            palette: {
                mode: 'dark',
                primary: {
                    light: purple[50],
                    main: purple[400],
                    dark: purple[500],
                },
                secondary: {
                    light: '#fff',
                    main: '#fff',
                    dark: '#fff',
                    contrastText: purple[500],
                },
                error: {
                    light: red[200],
                    main: red[500],
                    dark: red[700],
                    contrastText: '#fff',
                },
                background: {
                    default: '#000000',
                    paper: '#121212',
                },
                text: {
                    primary: '#ffffff',
                    secondary: purple[50],
                },
                action: {
                    hover: 'rgba(255,255,255,0.05)',
                    selected: 'rgba(255,255,255,0.08)',
                },
            },
        },
    },
});
