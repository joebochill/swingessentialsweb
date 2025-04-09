import React, { ReactNode } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Stack, StackProps } from '@mui/material';

export type EmptyStateProps = StackProps & {
    /** Additional components to render below */
    actions?: ReactNode;
    /** The secondary text to display */
    description?: ReactNode;
    /** The primary icon  */
    icon: ReactNode;
    /** The main text to display */
    title: string;
};

export const EmptyState: React.FC<EmptyStateProps> = (props) => {
    const { actions, description, icon, title, sx, ...otherProps } = props;

    return (
        <Stack
            justifyContent={'center'}
            alignItems={'center'}
            spacing={2}
            sx={[
                {
                    color: 'text.primary',
                    height: '100%',
                    minHeight: '100%',
                    textAlign: 'center',
                    padding: '1rem',
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
            {...otherProps}
        >
            {icon && (
                <Box
                    sx={{
                        color: 'text.secondary',
                        display: 'flex',
                        fontSize: 96,
                    }}
                >
                    {icon}
                </Box>
            )}
            {title && (
                <Typography variant="h6" color="inherit">
                    {title}
                </Typography>
            )}
            {description && (
                <Typography
                    variant="subtitle2"
                    color={'textSecondary'}
                    sx={(t) => ({
                        color: 'text.primary',
                        ...t.applyStyles('dark', {
                            color: 'text.secondary',
                        }),
                    })}
                >
                    {description}
                </Typography>
            )}
            {actions && <Box sx={{ width: '100%' }}>{actions}</Box>}
        </Stack>
    );
};
