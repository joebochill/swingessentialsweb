import React from 'react';
import { CircularProgress } from '@mui/material';
import { Section } from './Section';

type LoadingIndicatorProps = {
    show: boolean;
};
export const LoadingIndicator: React.FC<LoadingIndicatorProps> = (props) => {
    if (!props.show) return null;
    return (
        <Section>
            <CircularProgress />
        </Section>
    );
};
