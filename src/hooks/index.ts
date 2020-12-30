import { useEffect, useRef } from 'react';
import ReactGA from 'react-ga';

// eslint-disable-next-line @typescript-eslint/ban-types
export const usePrevious = <T extends {}>(value: T): T | undefined => {
    const ref = useRef<T>();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
};
export const useCompare = (val: any): boolean => {
    const prevVal = usePrevious(val);
    return prevVal !== val;
};

export const useGoogleAnalyticsPageView = (): void => {
    useEffect(() => {
        ReactGA.pageview(window.location.pathname);
    }, []);
};

export const googleAnalyticsConversion = (conversionRoute: string = window.location.pathname): void => {
    ReactGA.pageview(conversionRoute);
};
